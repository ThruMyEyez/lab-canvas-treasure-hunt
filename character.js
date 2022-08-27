class Character {
  constructor(row, col) {
    this.row = row;
    this.col = col;
    this.score = 0;
    this.direction = "d";
  }
  moveUp() {
    if (this.row > 0) {
      this.row -= 1;
      this.direction = "u";
    }
  }
  moveRight() {
    if (this.col < 9) {
      this.col += 1;
      this.direction = "r";
    }
  }
  moveDown() {
    if (this.row < 9) {
      this.row += 1;
      this.direction = "d";
    }
  }
  moveLeft() {
    if (this.col > 0) {
      this.col -= 1;
      this.direction = "l";
    }
  }
  drawScores() {
    return this.score;
  }
  drawPlayer(imgUp, imgDown, imgLeft, imgRight) {
    if (this.direction === "d") {
      ctx.drawImage(
        imgDown,
        (width / 10) * this.col,
        (height / 10) * this.row,
        50,
        50
      );
    } else if (this.direction === "u") {
      ctx.drawImage(
        imgUp,
        (width / 10) * this.col,
        (height / 10) * this.row,
        50,
        50
      );
    } else if (this.direction === "l") {
      ctx.drawImage(
        imgLeft,
        (width / 10) * this.col,
        (height / 10) * this.row,
        50,
        50
      );
    } else if (this.direction === "r") {
      ctx.drawImage(
        imgRight,
        (width / 10) * this.col,
        (height / 10) * this.row,
        50,
        50
      );
    }
  }
}
// END OF CHARACTER CLASS
