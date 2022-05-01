import { ENTITY_ID } from "../enum/entitiy_id";
import { COLOR } from "../enum/colors";
import GameObject from "../engine/gameObject";
import { Rectangle } from "../types/Rectangle";
import Trail from "../engine/trail";
import Game from "../engine/game";
import Explosion from "./explosion";

type BomberEnemyProps = {
  game: Game;
  position: { x: number; y: number };
  velX?: number;
  velY?: number;
};

export default class BomberEnemy extends GameObject {
  game: Game;

  constructor({ game, position, velX = 5, velY = 5 }: BomberEnemyProps) {
    super({
      id: ENTITY_ID.BASIC_ENEMY,
      width: 20,
      height: 20,
      position,
      velY,
      velX,
    });
    this.game = game;
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

  fear(x: number, y: number) {
    const size = this.gameObject.height / 2;
    if (this.gameObject.position.x + size <= x && this.gameObject.velX > 0)
      this.gameObject.velX *= -1;
    else if (this.gameObject.position.x + size > x && this.gameObject.velX < 0)
      this.gameObject.velX *= -1;
    if (this.gameObject.position.y + size <= y && this.gameObject.velY > 0)
      this.gameObject.velY *= -1;
    else if (this.gameObject.position.y + size > y && this.gameObject.velY < 0)
      this.gameObject.velY *= -1;
  }

  draw(context: any) {
    context.fillStyle = COLOR.RED;
    context.fillRect(
      this.gameObject.position.x,
      this.gameObject.position.y,
      this.gameObject.width,
      this.gameObject.height
    );
    context.fillStyle = COLOR.ORANGE;
    const shift = 6;
    context.fillRect(
      this.gameObject.position.x + (this.gameObject.velX > 0 ? 0 : shift),
      this.gameObject.position.y + (this.gameObject.velY > 0 ? 0 : shift),
      this.gameObject.width - shift,
      this.gameObject.height - shift
    );
  }

  update(deltaTime: number) {
    // Updating the entity's position based on its velocity (if it has one)
    this.gameObject.position.x += this.gameObject.velX;
    this.gameObject.position.y += this.gameObject.velY;

    // Creating a Trail particle and add it to the list
    this.game.particleObjects.push(
      new Trail({
        x: this.gameObject.position.x,
        y: this.gameObject.position.y,
        reductor: 12,
        color: COLOR.ORANGE,
        width: this.gameObject.width,
        height: this.gameObject.height,
        life: 0.7,
        minus: 0.02,
        game: this.game,
      })
    );

    if (
      this.gameObject.position.y <= 0 ||
      this.gameObject.position.y >=
        this.game.canvas.canvasHeight - this.gameObject.height
    ) {
      this.gameObject.velY *= -1;
      this.game.gameObjects.push(
        new Explosion({
          game: this.game,
          position: {
            x: this.gameObject.position.x + 10,
            y: this.gameObject.position.y + 10,
          },
        })
      );
    }

    if (
      this.gameObject.position.x <= 0 ||
      this.gameObject.position.x >=
        this.game.canvas.canvasWidth - this.gameObject.width
    ) {
      this.gameObject.velX *= -1;
      this.game.gameObjects.push(
        new Explosion({
          game: this.game,
          position: {
            x: this.gameObject.position.x + 10,
            y: this.gameObject.position.y + 10,
          },
        })
      );
    }
  }
}
