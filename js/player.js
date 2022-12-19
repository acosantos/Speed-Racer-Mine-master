class Player {
  constructor() {
    this.name = null
    this.index = null
    this.positionX = 0
    this.positionY = 400
    this.rank = 0
    this.distance = 0
    this.rotation = 0

  }
  getCount() {
    database.ref("playerCount").on("value", data => {
      playerCount = data.val()
    })
  }
  updateCount(count) {
    database.ref("/").update({
      playerCount: count
    })
  }
  addPlayer() {
    if (this.index == 1) {
      this.positionX = width / 2 - 250
    } else if (this.index == 2) {
      this.positionX = width / 2 - 100
    } else if (this.index == 3) {
      this.positionX = width / 2 + 100
    } else if (this.index == 4) {
      this.positionX = width / 2 + 250
    }
    var playerIndex = "players/player" + this.index
    database.ref(playerIndex).set({
      name: this.name,
      positionX: this.positionX,
      positionY: this.positionY,
      rank: this.rank,
      distance: this.distance,
    })
  }
  static getPlayerInfo() {
    database.ref("players").on("value", data => {
      allPlayers = data.val()
    })
  }
  playerControls() {
    if (keyIsDown(UP_ARROW)) {
      this.positionY -= 10
      this.distance += 10
      this.update()
    }
    if (keyIsDown(LEFT_ARROW)) {
      this.positionX -= 5
      this.update()
    }
    if(keyIsDown(RIGHT_ARROW)){
      this.positionX += 5
      this.update()
    }


  }
  update() {
    var playerIndex = "players/player" + this.index
    database.ref(playerIndex).update({

      positionX: this.positionX,
      positionY: this.positionY,
      rank: this.rank,
      distance: this.distance,
    })
  }
  getCarsAtEnd(){
    database.ref("carsAtEnd").on("value", data => {
      this.rank = data.val()
    })
  }
  updateCarsAtEnd(rank){
    database.ref("/").update({
      carsAtEnd: rank
    })
  }
}
