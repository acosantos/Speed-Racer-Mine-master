var database;
var form, game, player;
var playerCount = 0, gameState = 0;
var car1, car2, car3, car4, cars = [];
var car1img, car2img, car3img, car4img;
var bgimg, trackimg;
var allPlayers;
var endBg;
var blastImg;


function preload() {
  bgimg = loadImage("./assets/images/background1.png");
  car1img = loadImage("./assets/images/car1.png");
  car2img = loadImage("./assets/images/car2.png");
  car3img = loadImage("./assets/images/car3.png");
  car4img = loadImage("./assets/images/car4.png");
  trackimg = loadImage("./assets/images/track.png");
  endBg = loadImage("./assets/images/leaderboard1.png");
  blastImg = loadImage("./assets/images/blast.png");
}

function setup() {
  database = firebase.database()
  canvas = createCanvas(950, 470);

  game = new Game();
  game.getState();
  game.start();
}

function draw() {
  if (gameState === 0) {
    background(bgimg);
  }
  if(playerCount == 4){
    game.updateState(1)
  }
  if(gameState == 1){
    clear()
    game.play()
  }
  if (gameState == 2){
    clear()
    background(endBg);
    game.end()
  }
}


