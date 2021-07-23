import { ENTITY_ID } from "../enum/entitiy_id";
import { COLOR } from "../enum/colors";
//import Trail from "../engine/trail";
import GameObject from "../engine/gameObject";
import { Rectangle } from "../types/Rectangle";
import Trail from "../engine/trail";
import Game from "../engine/game";

type WormBulletProps = {
  game: Game;
  position: { x: number; y: number };
  velX?: number;
  velY?: number;
};

export default class WormBullet extends GameObject {
  game: Game;
  switchTimer: number;
  toggleDirection: boolean;

  constructor({ game, position, velX = 5, velY = 5 }: WormBulletProps) {
    super({
      id: ENTITY_ID.BULLET,
      width: 5,
      height: 5,
      position,
      velY,
      velX,
    });

    this.game = game;
    this.switchTimer = 0;
    this.toggleDirection = true;
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

  draw(context: any) {
    context.fillStyle = COLOR.PINK;
    context.fillRect(
      this.gameObject.position.x,
      this.gameObject.position.y,
      this.gameObject.width,
      this.gameObject.height
    );
  }

  update(deltaTime: number) {
    // Updating the entity's position based on its velocity (if it has one)
    this.gameObject.position.x += this.gameObject.velX;
    this.gameObject.position.y += this.gameObject.velY;

    this.switchTimer++;

    if (this.switchTimer >= 4) {
      this.switchTimer = 0;
      if (Math.abs(this.gameObject.velX) === 0) {
        this.gameObject.velX = this.toggleDirection ? 5 : -5;
        this.gameObject.velY = 0;
        this.toggleDirection = !this.toggleDirection;
      } else {
        this.gameObject.velX = 0;
        this.gameObject.velY = 5;
      }
    }

    // Creating a Trail particle and add it to the list
    this.game.particleObjects.push(
      new Trail({
        x: this.gameObject.position.x,
        y: this.gameObject.position.y,
        reductor: 0,
        color: COLOR.PINK,
        width: this.gameObject.width,
        height: this.gameObject.height,
        life: 0.8,
        minus: 0.04,
        game: this.game,
      })
    );

    if (
      this.gameObject.position.y <= 0 ||
      this.gameObject.position.y >=
        this.game.canvas.canvasHeight - this.gameObject.height
    ) {
      this.game.gameObjects.splice(this.game.gameObjects.indexOf(this), 1);
    }
    if (
      this.gameObject.position.x <= 0 ||
      this.gameObject.position.x >=
        this.game.canvas.canvasWidth - this.gameObject.width
    ) {
      this.game.gameObjects.splice(this.game.gameObjects.indexOf(this), 1);
    }
  }
}
