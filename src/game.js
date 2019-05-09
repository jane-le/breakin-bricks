import Paddle from "/src/paddle";
import InputHandler from "/src/input";
import Ball from "/src/ball";
import {
  buildLevel,
  level0,
  level1,
  level2,
  level3,
  level4,
  level5
} from "/src/levels";

const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
  NEWLEVEL: 4,
  GAMECOMPLETE: 5
};

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameHeight = gameHeight;
    this.gameWidth = gameWidth;
    this.gamestate = GAMESTATE.MENU;
    this.paddle = new Paddle(this);
    this.ball = new Ball(this);
    this.gameObjects = [];
    this.bricks = [];
    this.lives = 3;
    this.levels = [level0, level1, level2, level3, level4, level5];
    new InputHandler(this.paddle, this);
    this.currentLevel = 1;
  }
  start() {
    if (
      this.gamestate !== GAMESTATE.MENU &&
      this.gamestate !== GAMESTATE.NEWLEVEL
    )
      return;
    this.bricks = buildLevel(this, this.levels[this.currentLevel]);
    this.ball.reset();
    this.gameObjects = [this.paddle, this.ball];
    this.gamestate = GAMESTATE.RUNNING;
  }

  update(deltaTime) {
    if (this.lives === 0) {
      this.gamestate = GAMESTATE.GAMEOVER;
    }
    if (this.currentLevel === this.levels.length) {
      this.gamestate = GAMESTATE.GAMECOMPLETE;
    }
    if (
      this.gamestate === GAMESTATE.PAUSED ||
      this.gamestate === GAMESTATE.MENU
    )
      return;
    if (this.bricks.length === 0) {
      this.currentLevel++;
      this.gamestate = GAMESTATE.NEWLEVEL;
      this.start();
    }
    [...this.gameObjects, ...this.bricks].forEach(object =>
      object.update(deltaTime)
    );
    //scoreboard

    this.bricks = this.bricks.filter(object => !object.markedForDeletion);
  }

  draw(ctx) {
    [...this.gameObjects, ...this.bricks].forEach(object => object.draw(ctx));

    //Scoreboard
    ctx.font = "16px Lato";
    ctx.fillStyle = "white";
    ctx.fillText(
      "Level: " + this.currentLevel,
      this.gameWidth - 40,
      this.gameHeight - 40
    );
    ctx.fillText(
      "Lives: " + this.lives,
      this.gameWidth - 40,
      this.gameHeight - 20
    );

    if (this.gamestate === GAMESTATE.GAMECOMPLETE) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(255,255,255)";
      ctx.fill();
      ctx.font = "30px Lato";
      ctx.fillStyle = "#433765";
      ctx.textAlign = "center";
      ctx.fillText(
        "congratulations, you have completed the game",
        this.gameWidth / 2,
        this.gameHeight / 2 + 150
      );
    }

    if (this.gamestate === GAMESTATE.PAUSED) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,0.5)";
      ctx.fill();

      ctx.font = "30px Lato";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("paused", this.gameWidth / 2, this.gameHeight / 2 + 100);
    }
    if (this.gamestate === GAMESTATE.MENU) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(255,255,255)";
      ctx.fill();
      ctx.font = "60px Lato";
      ctx.fillStyle = "#433765";
      ctx.textAlign = "center";
      ctx.fillText("welcome", this.gameWidth / 2, this.gameHeight / 2);
      ctx.font = "20px Lato";
      ctx.fillText(
        "use the arrow keys to move left and right",
        this.gameWidth / 2,
        this.gameHeight / 2 + 125
      );
      ctx.fillText(
        "press p to pause",
        this.gameWidth / 2,
        this.gameHeight / 2 + 150
      );
      ctx.fillText(
        "press spacebar to start",
        this.gameWidth / 2,
        this.gameHeight / 2 + 175
      );
    }
    if (this.gamestate === GAMESTATE.GAMEOVER) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(255,255,255)";
      ctx.fill();

      ctx.font = "20px Lato";
      ctx.fillStyle = "#433765";
      ctx.textAlign = "center";
      ctx.fillText(
        "please refresh the browser to try again",
        this.gameWidth / 2,
        this.gameHeight / 2 + 150
      );
      ctx.fillText("gameover", this.gameWidth / 2, this.gameHeight / 2 + 125);
    }
  }

  togglePause() {
    if (this.gamestate === GAMESTATE.RUNNING) {
      this.gamestate = GAMESTATE.PAUSED;
    } else {
      this.gamestate = GAMESTATE.RUNNING;
    }
  }
}
