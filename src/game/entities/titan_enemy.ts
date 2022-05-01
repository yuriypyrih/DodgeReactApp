import { ENTITY_ID } from "../enum/entitiy_id";
import { COLOR } from "../enum/colors";
//import Trail from "../engine/trail";
import GameObject from "../engine/gameObject";
import { Rectangle } from "../types/Rectangle";
import Trail from "../engine/trail";
import Game from "../engine/game";

type TitanEnemyyProps = {
  game: Game;
  position: { x: number; y: number };
  velX?: number;
  velY?: number;
};

export default class TitanEnemy extends GameObject {
  game: Game;
  growingTimer: number;
  MAX_SIZE: number;

  constructor({ game, position, velX = 5, velY = 5 }: TitanEnemyyProps) {
    super({
      id: ENTITY_ID.BASIC_ENEMY,
      width: 5,
      height: 5,
      position,
      velY,
      velX,
    });

    this.game = game;
    this.growingTimer = -100;
    this.MAX_SIZE = 250;
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
    context.fillStyle = COLOR.DARK_BLUE;
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
        reductor: Math.min(this.gameObject.width / 2, 20),
        color: COLOR.DARK_BLUE,
        width: this.gameObject.width,
        height: this.gameObject.height,
        life: Math.max(
          0.7 * ((this.MAX_SIZE - this.gameObject.width) / this.MAX_SIZE),
          0.2
        ),
        minus: 0.02,
        game: this.game,
      })
    );

    this.growingTimer++;

    if (this.growingTimer > 50 && this.gameObject.width < this.MAX_SIZE) {
      this.gameObject.width += 5;
      this.gameObject.height += 5;
      this.gameObject.velY -= 0.2;
      this.gameObject.velX -= 0.2;
      this.growingTimer = 0;
    }

    if (this.gameObject.position.y <= 0 && this.gameObject.velY < 0)
      this.gameObject.velY *= -1;
    if (
      this.gameObject.position.y >=
        this.game.canvas.canvasHeight - this.gameObject.height &&
      this.gameObject.velY > 0
    )
      this.gameObject.velY *= -1;
    if (this.gameObject.position.x <= 0 && this.gameObject.velX < 0)
      this.gameObject.velX *= -1;
    if (
      this.gameObject.position.x >=
        this.game.canvas.canvasWidth - this.gameObject.width &&
      this.gameObject.velX > 0
    )
      this.gameObject.velX *= -1;
  }
}
