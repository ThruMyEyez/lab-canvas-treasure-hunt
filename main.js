//Initialize canvas & variables
const canvas = document.querySelector("canvas"),
  ctx = canvas.getContext("2d"),
  width = canvas.width,
  height = canvas.height;
//Initialize sprite variables ==>
const treasureImg = new Image(),
  charD = new Image(),
  charU = new Image(),
  charL = new Image(),
  charR = new Image(),
  grassImg = new Image(),
  secCharSpriteSheet = new Image();
treasureImg.src = "./images/treasure.png";
charD.src = "./images/character-down.png";
charU.src = "./images/character-up.png";
charL.src = "./images/character-left.png";
charR.src = "./images/character-right.png";
grassImg.src = "./images/grass.png";
secCharSpriteSheet.src = "./images/Snail.png";

//Treasure Generator class
class Treasure {
  constructor() {
    this.row = 0;
    this.col = 0;
  }
  setRandomPosition() {
    this.row = Math.floor(Math.random() * 10);
    this.col = Math.floor(Math.random() * 10);
  }
  drawTreasure(treasureImage) {
    ctx.drawImage(
      treasureImage,
      (width / 10) * this.col,
      (height / 10) * this.row,
      50,
      50
    );
    //ctx.beginPath();
    //ctx.arc(50 * this.row, 50 * this.col, 20, 0, Math.PI * 2);
    //ctx.arc(50 * this.row, 50 * this.col, 3, 0, Math.PI * 2);
    //ctx.stroke();
    //ctx.closePath();
  }
  foundTreasure(_player) {
    if (_player.row === tres.row && _player.col === tres.col) {
      _player.score += 1;
      this.setRandomPosition();
    }
  }
}
//!❗ Make the FPS based Animation Classes external for future re-use ❗❓
class Player2 extends Character {
  constructor(row, col) {
    super(row, col);
    this.scale = 1;
    this.spriteWidth = 48;
    this.spriteHeight = 48;
    this.spriteCols = 0;
    this.animIdx = 0;
    this.framesNr = 0;
    this.animTicksSecond = 3;
  }
  drawSprites(image, _fps) {
    const loopArr = [0, 1, 2];
    this.animIdx;
    this.animTimer(_fps);
    if (this.direction === "d") this.spriteCols = 0;
    if (this.direction === "l") this.spriteCols = 1;
    if (this.direction === "r") this.spriteCols = 2;
    if (this.direction === "u") this.spriteCols = 3;
    ctx.drawImage(
      image,
      this.spriteWidth * loopArr[this.animIdx],
      this.spriteHeight * this.spriteCols,
      this.spriteWidth,
      this.spriteHeight,
      50 * this.col,
      50 * this.row,
      this.spriteWidth * this.scale,
      this.spriteHeight * this.scale
    );
    if (this.animIdx >= 2) this.animIdx = 0;
  }
  animTimer(_fps) {
    this.framesNr++;
    if (this.framesNr % (_fps / this.animTicksSecond) === 0) {
      this.animIdx++;
      this.framesNr = 0;
      // console.log(true);
    }
    //if (this.frames === 20) {
    //  this.frames = 0;
    //}
  }
}

const player = new Character(0, 0),
  secPlayer = new Player2(7, 7),
  tres = new Treasure();
tres.setRandomPosition();

// drawGrid func ==>
function drawGrid() {
  //cols
  for (let i = 1; i < 10; i++) {
    ctx.beginPath();
    ctx.moveTo((width / 10) * i, 0);
    ctx.lineTo((width / 10) * i, width);
    ctx.stroke();
  } // rows
  for (let j = 1; j < 10; j++) {
    ctx.beginPath();
    ctx.moveTo(0, (j * height) / 10);
    ctx.lineTo(height, (j * height) / 10);
    ctx.stroke();
  }
}
// draw the floor func ==>
function drawFloor(floorImg) {
  const floor = ctx.createPattern(floorImg, "repeat");
  ctx.fillStyle = floor;
  ctx.fillRect(0, 0, width, height);
}
// minimal ui (scores) ==>
const scoreUI = (_fps) => {
  ctx.fillStyle = "#ccc";
  ctx.font = "21px Silkscreen";
  ctx.fillText(`P1 Score: ${player.score}`, 330, 30);
  ctx.fillText(`P2 Score: ${secPlayer.score}`, 330, 75);
  ctx.fillText(`FPS: ${_fps}`, 330, 475);
};

let fps, passedSeconds, lastTimeStamp;

function drawEverything(timeStamp) {
  //get FPS and clear screen ==>
  passedSeconds = (timeStamp - lastTimeStamp) / 1000;
  lastTimeStamp = timeStamp;
  fps = Math.round(1 / passedSeconds);
  ctx.clearRect(0, 0, width, height);

  // render the content ==>
  drawFloor(grassImg);
  drawGrid();
  tres.drawTreasure(treasureImg);
  player.drawPlayer(charU, charD, charL, charR);
  secPlayer.drawSprites(secCharSpriteSheet, fps);
  tres.foundTreasure(player);
  tres.foundTreasure(secPlayer);
  scoreUI(fps);
  requestAnimationFrame(drawEverything);
  const fpsUI = document.getElementById("fps"),
    p1 = document.querySelector("#p1score"),
    p2 = document.querySelector("#p2score");
  fpsUI.innerText = fps;
  p1.innerText = player.score;
  p2.innerText = secPlayer.score;
}

drawEverything();

const f = document.getElementById("fps"),
  p1 = document.querySelector("#p1score"),
  p2 = document.querySelector("#p2score");
f.innerText = fps;
p1.innerText = player.score;
p2.innerText = secPlayer.score;
window.addEventListener("keydown", (event) => {
  //console.log(event);
  //stop moving screen to up down ect.
  event.preventDefault();
  switch (event.keyCode) {
    case 37:
      player.moveLeft();
      break;
    case 38:
      player.moveUp();
      break;
    case 39:
      player.moveRight();
      break;
    case 40:
      player.moveDown();
      break;
    case 87:
      secPlayer.moveUp();
      break;
    case 65:
      secPlayer.moveLeft();
      break;
    case 83:
      secPlayer.moveDown();
      break;
    case 68:
      secPlayer.moveRight();
      break;
  }
});
