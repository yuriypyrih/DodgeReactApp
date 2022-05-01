import { ENTITY_ID } from "../enum/entitiy_id";
import { COLOR } from "../enum/colors";
import GameObject from "../engine/gameObject";
import { Rectangle } from "../types/Rectangle";
import Trail from "../engine/trail";
import Game from "../engine/game";

type TracerBulletProps = {
  game: Game;
  position: { x: number; y: number };
  velX?: number;
  velY?: number;
};

export default class TracerBullet extends GameObject {
  game: Game;

  constructor({ game, position, velX = 5, velY = 5 }: TracerBulletProps) {
    super({
      id: ENTITY_ID.BULLET,
      width: 6,
      height: 6,
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

  draw(context: any) {
    context.fillStyle = COLOR.YELLOW;
    context.fillRect(
      this.gameObject.position.x,
      this.gameObject.position.y,
      this.gameObject.width,
      this.gameObject.height
    );
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

  update(deltaTime: number) {
    // Updating the entity's position based on its velocity (if it has one)
    this.gameObject.position.x += this.gameObject.velX;
    this.gameObject.position.y += this.gameObject.velY;

    // Creating a Trail particle and add it to the list
    this.game.particleObjects.push(
      new Trail({
        x: this.gameObject.position.x,
        y: this.gameObject.position.y,
        reductor: 0,
        color: COLOR.YELLOW,
        width: this.gameObject.width,
        height: this.gameObject.height,
        life: 0.8,
        minus: 0.04,
        game: this.game,
      })
    );

    if (this.gameObject.position.y <= 0) {
      this.game.gameObjects.splice(this.game.gameObjects.indexOf(this), 1);
    }
    if (
      this.gameObject.position.x <= 0 ||
      this.gameObject.position.x >=
        this.game.canvas.canvasWidth - this.gameObject.width
    ) {
      this.game.gameObjects.splice(this.game.gameObjects.indexOf(this), 1);
    }

    if (
      this.gameObject.position.y >=
      this.game.canvas.canvasHeight - this.gameObject.height
    ) {
      const diffY =
        this.gameObject.position.y -
        this.game.player.gameObject.position.y -
        16;
      const diffX =
        this.gameObject.position.x -
        this.game.player.gameObject.position.x -
        16;
      const distance = Math.sqrt(
        (this.gameObject.position.x - this.game.player.gameObject.position.x) **
          2 +
          (this.gameObject.position.y -
            this.game.player.gameObject.position.y) **
            2
      );
      this.gameObject.velX = (-10 / distance) * diffX;
      this.gameObject.velY = (-10 / distance) * diffY;
    }
  }
}
