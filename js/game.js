class Game {
  constructor() {

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

    car1.scale = 0.1;
    car2.scale = 0.1;
    car3.scale = 0.1;
    car4.scale = 0.1;

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

      var index = 0;
      var x;
      var y;
      for (var p in allPlayers) {
        index = index + 1;
        x = allPlayers[p].positionX;
        y = allPlayers[p].positionY;
        cars[index - 1].x = x;
        cars[index - 1].y = y;
        if(index==player.index){
          fill("purple")
          ellipse(x,y,70,70)
          camera.position.y = cars[index - 1].y
        }

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
}
