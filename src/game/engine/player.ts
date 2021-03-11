import { ENTITY_ID } from "../enum/entitiy_id";
import { COLOR } from "../enum/colors";
import GameObject from "./gameObject";
import Game from "./game";
import { Rectangle } from "../models/Rectangle";
import store from "../../redux/store";
import {
  collectStar,
  setGameState,
  setHP,
  setProgress,
} from "../../redux/slices/gameSlice";
import Trail from "./trail";
import { playAnimation } from "../../redux/slices/vfxSlice";
import { VFX } from "../enum/vfx";
import { GAME_STATE } from "../enum/game_state";

type PlayerProps = {
  game: Game;
};

export default class Player extends GameObject {
  game: Game;
  gameWidth: number;
  gameHeight: number;
  health: number;
  death_thresholder: number;
  readonly IMMUNITY_IN_MILISEC: number;
  recently_damaged: number;
  stars: number;
  milestone: boolean;
  poisoned: boolean;
  maxSpeed: number;
  maxDiagonialSpeed: number;
  developerMode: boolean;

  constructor({ game }: PlayerProps) {
    super({
      id: ENTITY_ID.PLAYER,
      width: 20,
      height: 20,
      position: {
        x: 0,
        y: 0,
      },
      velY: 0,
      velX: 0,
    });
    this.gameWidth = game.canvas.canvasWidth;
    this.gameHeight = game.canvas.canvasHeight;
    this.game = game;
    this.health = 100;
    this.death_thresholder = 0;
    this.IMMUNITY_IN_MILISEC = 1000;
    this.recently_damaged = 0;
    this.stars = 0;
    this.milestone = false;
    this.poisoned = false;
    this.developerMode = false;

    this.gameObject.position = {
      x: game.canvas.canvasWidth / 2 - this.gameObject.width / 2,
      y: game.canvas.canvasHeight / 2 - this.gameObject.height / 2,
    };

    this.maxSpeed = 8;
    this.maxDiagonialSpeed = Math.ceil(this.maxSpeed / Math.sqrt(2));
  }

  moveLeft() {
    this.gameObject.velX = -this.maxSpeed;
  }

  moveRight() {
    this.gameObject.velX = this.maxSpeed;
  }

  moveUp() {
    this.gameObject.velY = -this.maxSpeed;
  }

  moveDown() {
    this.gameObject.velY = this.maxSpeed;
  }

  stopX() {
    this.gameObject.velX = 0;
  }

  stopY() {
    this.gameObject.velY = 0;
  }

  reset() {
    this.gameObject.position = {
      x: this.game.canvas.canvasWidth / 2 - this.gameObject.width / 2,
      y: this.game.canvas.canvasHeight / 2 - this.gameObject.height / 2,
    };
    this.health = 100;
    this.recently_damaged = 0;
    this.stars = 0;
    this.milestone = false;
    this.poisoned = false;
  }

  getBounds() {
    const rectange: Rectangle = {
      x: this.gameObject.position.x,
      y: this.gameObject.position.y,
      width: this.gameObject.width,
      height: this.gameObject.height,
    };
    return rectange;
  }

  collision(rectangle: Rectangle) {
    // collision detected!
    if (
      this.gameObject.position.x < rectangle.x + rectangle.width &&
      this.gameObject.position.x + this.gameObject.width > rectangle.x &&
      this.gameObject.position.y < rectangle.y + rectangle.height &&
      this.gameObject.position.y + this.gameObject.height > rectangle.y
    ) {
      return true;
    } else {
      return false;
    }
  }

  draw(context: any) {
    context.fillStyle = COLOR.WHITE;
    context.fillRect(
      this.gameObject.position.x,
      this.gameObject.position.y,
      this.gameObject.width,
      this.gameObject.height
    );
    // context.fillStyle = COLOR.RED;
    // context.fillRect(
    //   this.gameObject.position.x,
    //   this.gameObject.position.y,
    //   this.gameObject.width,
    //   this.gameObject.height
    // );
    // context.fillStyle = COLOR.WHITE;
    // context.fillRect(
    //   this.gameObject.position.x + 4,
    //   this.gameObject.position.y + 4,
    //   this.gameObject.width - 8,
    //   this.gameObject.height - 8
    // );
  }

  update(deltaTime: number) {
    if (this.stars >= 3 && !this.developerMode) {
      store.dispatch(setGameState(GAME_STATE.PAGE_VICTORY));
      this.game.close();
      return null;
    } else if (this.health <= this.death_thresholder && !this.developerMode) {
      store.dispatch(setGameState(GAME_STATE.PAGE_DEFEAT));
      this.game.close();
      return null;
    }
    store.dispatch(setHP(this.health));
    if (this.health)
      if (this.gameObject.velX !== 0 && this.gameObject.velY !== 0) {
        this.gameObject.velX > 0
          ? (this.gameObject.velX = this.maxDiagonialSpeed)
          : (this.gameObject.velX = this.maxDiagonialSpeed * -1);
        this.gameObject.velY > 0
          ? (this.gameObject.velY = this.maxDiagonialSpeed)
          : (this.gameObject.velY = this.maxDiagonialSpeed * -1);
      }

    // Updating the Player's position based on its velocity
    this.gameObject.position.x += this.gameObject.velX;
    this.gameObject.position.y += this.gameObject.velY;

    // Creating a Trail particle and add it to the list
    this.game.particleObjects.push(
      new Trail({
        x: this.gameObject.position.x,
        y: this.gameObject.position.y,
        reductor: 0,
        color:
          this.recently_damaged > this.IMMUNITY_IN_MILISEC
            ? COLOR.WHITE
            : COLOR.RED,
        width: this.gameObject.width,
        height: this.gameObject.height,
        life: 0.2,
        minus: 0.03,
        game: this.game,
      })
    );

    // Keeping track of when it was last time damaged, by default it start with 0 when the game start
    this.recently_damaged += deltaTime;

    this.game.gameObjects.forEach((object: GameObject) => {
      if (this.collision(object.getBounds())) {
        // You're immune to dmg when healed
        if (object.gameObject.id === ENTITY_ID.HEALTH_PACK) {
          //Animation.pulseAqua();
          this.game.gameObjects.splice(
            this.game.gameObjects.indexOf(object),
            1
          );
          this.health += 30;
          this.recently_damaged = 0;
        }

        if (object.gameObject.id === ENTITY_ID.STAR) {
          store.dispatch(collectStar());
          //Animation.pulseGold();
          this.game.gameObjects.splice(
            this.game.gameObjects.indexOf(object),
            1
          );
          this.stars++;
          this.milestone = true;
          this.recently_damaged = 0;
        }

        if (object.gameObject.id === ENTITY_ID.BASIC_ENEMY) {
          // Take the damage only after the end of Immunity has expired
          // And reset the recently_damaged
          if (this.recently_damaged > this.IMMUNITY_IN_MILISEC) {
            //Animation.pulseRed();
            store.dispatch(playAnimation(VFX.PULSE_RED));
            this.health -= 25;
            this.recently_damaged = 0;
          }
        }

        //this.game.gameObjects.splice(this.game.gameObjects.indexOf(object), 1);

        //console.log("Yes collision");
      } else {
        //console.log(object);
        //console.log("No collision");
      }
    }); //End of checking for collision with the gameObjects

    // Reseting health if above 100
    if (this.health > 100) this.health = 100;

    // Player Collision with left wall
    if (this.gameObject.position.x < 0) this.gameObject.position.x = 0;

    // Player Collision with right wall
    if (this.gameObject.position.x + this.gameObject.width > this.gameWidth) {
      this.gameObject.position.x = this.gameWidth - this.gameObject.width;
    }

    // Player Collision with top wall
    if (this.gameObject.position.y < 0) this.gameObject.position.y = 0;

    // Player Collision with bottom wall
    if (this.gameObject.position.y + this.gameObject.height > this.gameHeight) {
      this.gameObject.position.y = this.gameHeight - this.gameObject.height;
    }
  }
}
