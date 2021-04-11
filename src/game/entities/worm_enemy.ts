import { ENTITY_ID } from "../enum/entitiy_id";
import { COLOR } from "../enum/colors";
//import Trail from "../engine/trail";
import GameObject from "../engine/gameObject";
import { Rectangle } from "../types/Rectangle";
import Trail from "../engine/trail";
import Game from "../engine/game";

type WormEnemyProps = {
  game: Game;
  position: { x: number; y: number };
  velX?: number;
  velY?: number;
};

export default class WormEnemy extends GameObject {
  game: Game;
  maxSpeed: number;

  constructor({ game, position, velX = 0, velY = 4 }: WormEnemyProps) {
    super({
      id: ENTITY_ID.BASIC_ENEMY,
      width: 35,
      height: 35,
      position,
      velY,
      velX,
    });

    this.game = game;
    this.maxSpeed = 14;
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

    // Top wall
    if (this.gameObject.position.y <= 0) {
      this.gameObject.position.y = 1;
      this.gameObject.velX = -this.maxSpeed;
      this.gameObject.velY = 0;
    }
    // Bottom wall
    else if (
      this.gameObject.position.y >=
      this.game.canvas.canvasHeight - this.gameObject.height
    ) {
      this.gameObject.position.y =
        this.game.canvas.canvasHeight - (this.gameObject.height + 1);
      this.gameObject.velX = this.maxSpeed;
      this.gameObject.velY = 0;
    }
    // Left wall
    else if (this.gameObject.position.x <= 0) {
      this.gameObject.position.x = 1;
      this.gameObject.velX = 0;
      this.gameObject.velY = this.maxSpeed;
    }
    // Right wall
    else if (
      this.gameObject.position.x >=
      this.game.canvas.canvasWidth - this.gameObject.width
    ) {
      this.gameObject.position.x =
        this.game.canvas.canvasWidth - (this.gameObject.width + 1);
      this.gameObject.velX = 0;
      this.gameObject.velY = -this.maxSpeed;
    }

    // Creating a Trail particle and add it to the list
    this.game.particleObjects.push(
      new Trail({
        x: this.gameObject.position.x,
        y: this.gameObject.position.y,
        reductor: 26,
        color: COLOR.PINK,
        width: this.gameObject.width,
        height: this.gameObject.height,
        life: 0.8,
        minus: 0.015,
        game: this.game,
      })
    );
  }
}
