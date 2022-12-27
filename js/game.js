class Game {
  constructor() {
    this.resetButton = createImg("./assets/images/reset.png")
    this.resetButton.hide()
  }

  start() {

    form = new Form();
    form.display();
    player = new Player();
    player.getCount();

    car1 = createSprite(this.positionX, this.positionY);
    car2 = createSprite(this.positionX, this.positionY);
    car3 = createSprite(this.positionX, this.positionY);
    car4 = createSprite(this.positionX, this.positionY);

    car1.addImage(car1img);
    car2.addImage(car2img);
    car3.addImage(car3img);
    car4.addImage(car4img);

    car1.addImage("blast",blastImg)
    car2.addImage("blast",blastImg)
    car3.addImage("blast",blastImg)
    car4.addImage("blast",blastImg)
    
    car1.scale = 0.1;
    car2.scale = 0.1;
    car3.scale = 0.1;
    car4.scale = 0.1;

    car1.debug = true
    car2.debug = true
    car3.debug = true
    car4.debug = true
    
    cars = [car1, car2, car3, car4];
  }
  getState() {
    database.ref("gameState").on("value", data => {
      gameState = data.val()
    })
  }
  updateState(state) {
    database.ref("/").update({
      gameState: state
    })
  }
  play() {
    form.hide()
    Player.getPlayerInfo()
    player.getCarsAtEnd()
    if (allPlayers !== undefined) {
      player.playerControls()
      background("#263238");
      image(trackimg, 0, -height * 4, width, height * 5);
      this.resetGame()
      var index = 0;
      var x;
      var y;
      for (var p in allPlayers) {
        index = index + 1;
        x = allPlayers[p].positionX;
        y = allPlayers[p].positionY;
        cars[index - 1].x = x;
        cars[index - 1].y = y;
        
       
        if(player.blast&&player.index == index){
          cars[index - 1].changeImage("blast")
          cars[index - 1].scale = 0.3
        }

        if(keyIsDown(UP_ARROW)&&!player.blast){
          cars[index - 1].rotation = allPlayers[p].rotation
        }
        if(keyIsDown(LEFT_ARROW)&&!player.blast){
          cars[index - 1].rotation = allPlayers[p].rotation
        }
        if(keyIsDown(RIGHT_ARROW)&&!player.blast){
          cars[index - 1].rotation = allPlayers[p].rotation
        }

        if(index==player.index){
          fill("purple")
          ellipse(x,y,70,70)
          camera.position.y = cars[index - 1].y
        }
        this.handleCarColision(player.index)
      }
      if(player.distance>2400){
        gameState = 2
        player.rank += 1
        player.updateCarsAtEnd(player.rank)
        player.update()
      }
    
      drawSprites()
    }
  }
  end(){
    form.end()
  }
  resetGame(){
    this.resetButton.show()
    this.resetButton.position(850,20)
    this.resetButton.size(50,50)
    this.resetButton.mouseClicked(()=>{
      database.ref("/").set({
        gameState: 0,
        carsAtEnd: 0,
        playerCount: 0,
        players:{}
      })
      window.location.reload()
    })
  }
  handleCarColision(index){
   // carro 1
    if(index - 1 == 0){
      if(cars[index - 1].collide(cars[1])||
      cars[index - 1].collide(cars[2])||
      cars[index - 1].collide(cars[3])
      ){

        player.blast = true
        player.update()
      }

    }
    // carro 2
    if(index - 1 == 1){
      if(cars[index - 1].collide(cars[0])||
      cars[index - 1].collide(cars[2])||
      cars[index - 1].collide(cars[3])
      ){
        
        player.blast = true
        player.update()
      }

    }
    // carro 3
    if(index - 1 == 2){
      if(cars[index - 1].collide(cars[0])||
      cars[index - 1].collide(cars[1])||
      cars[index - 1].collide(cars[3])
      ){
        
        player.blast = true
        player.update()
      }

    }
    // carro 4
    if(index - 1 == 3){
      if(cars[index - 1].collide(cars[0])||
      cars[index - 1].collide(cars[1])||
      cars[index - 1].collide(cars[2])
      ){
        
        player.blast = true
        player.update()
      }

    }
  }
}
