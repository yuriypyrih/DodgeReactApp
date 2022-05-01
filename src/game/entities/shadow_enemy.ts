import { ENTITY_ID } from "../enum/entitiy_id";
import { COLOR } from "../enum/colors";
import GameObject from "../engine/gameObject";
import { Rectangle } from "../types/Rectangle";
import Trail from "../engine/trail";
import Game from "../engine/game";

type ShadowEnemyProps = {
  game: Game;
  position: { x: number; y: number };
  velX?: number;
  velY?: number;
  maxRadius?: number;
  disableWallCollision?: boolean;
};

export default class ShadowEnemy extends GameObject {
  game: Game;
  readonly MAX_AURA_RADIUS: number;
  aura_radius_1: number;
  aura_radius_2: number;
  disableWallCollision: boolean;

  constructor({
    game,
    position,
    velX = 5,
    velY = 5,
    maxRadius = 300,
    disableWallCollision = false,
  }: ShadowEnemyProps) {
    super({
      id: ENTITY_ID.SHADOW_AURA,
      width: 20,
      height: 20,
      position,
      velY,
      velX,
    });

    this.game = game;
    this.MAX_AURA_RADIUS = maxRadius;
    this.aura_radius_1 = this.MAX_AURA_RADIUS;
    this.aura_radius_2 = this.MAX_AURA_RADIUS / 2;
    this.disableWallCollision = disableWallCollision;
  }

  getBounds() {
    const rectange: Rectangle = {
      x: this.gameObject.position.x - this.MAX_AURA_RADIUS / 2 - 20,
      y: this.gameObject.position.y - this.MAX_AURA_RADIUS / 2 - 20,
      width: this.gameObject.width + this.MAX_AURA_RADIUS + 40,
      height: this.gameObject.height + this.MAX_AURA_RADIUS + 40,
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
    context.fillStyle = COLOR.BLACK;
    context.fillRect(
      this.gameObject.position.x,
      this.gameObject.position.y,
      this.gameObject.width,
      this.gameObject.height
    );

    context.strokeStyle = COLOR.BLACK;
    context.globalAlpha = 0.2;
    context.beginPath();
    context.arc(
      this.gameObject.position.x + this.gameObject.width / 2,
      this.gameObject.position.y + this.gameObject.height / 2,
      this.MAX_AURA_RADIUS / Math.sqrt(2),
      0,
      2 * Math.PI
    );
    context.stroke();
    const multiplier_1 = Math.min(
      (this.MAX_AURA_RADIUS - this.aura_radius_1) / this.MAX_AURA_RADIUS,
      1
    );
    context.globalAlpha = 1 * multiplier_1;
    context.beginPath();
    context.arc(
      this.gameObject.position.x + this.gameObject.width / 2,
      this.gameObject.position.y + this.gameObject.height / 2,
      this.aura_radius_1 / Math.sqrt(2),
      0,
      2 * Math.PI
    );
    context.stroke();
    const multiplier_2 = Math.min(
      (this.MAX_AURA_RADIUS - this.aura_radius_2) / this.MAX_AURA_RADIUS,
      1
    );
    context.globalAlpha = 1 * multiplier_2;
    context.beginPath();
    context.arc(
      this.gameObject.position.x + this.gameObject.width / 2,
      this.gameObject.position.y + this.gameObject.height / 2,
      this.aura_radius_2 / Math.sqrt(2),
      0,
      2 * Math.PI
    );
    context.stroke();
    context.globalAlpha = 1;
  }

  update(deltaTime: number) {
    // Updating the entity's position based on its velocity (if it has one)
    this.gameObject.position.x += this.gameObject.velX;
    this.gameObject.position.y += this.gameObject.velY;

    this.aura_radius_1 += 4;
    this.aura_radius_2 += 4;
    if (this.aura_radius_1 >= this.MAX_AURA_RADIUS) this.aura_radius_1 = 0;
    if (this.aura_radius_2 >= this.MAX_AURA_RADIUS) this.aura_radius_2 = 0;

    // Creating a Trail particle and add it to the list
    this.game.particleObjects.push(
      new Trail({
        x: this.gameObject.position.x,
        y: this.gameObject.position.y,
        reductor: 12,
        color: COLOR.BLACK,
        width: this.gameObject.width,
        height: this.gameObject.height,
        life: 0.7,
        minus: 0.02,
        game: this.game,
      })
    );

    if (!this.disableWallCollision) {
      if (
        this.gameObject.position.y <= 0 ||
        this.gameObject.position.y >=
          this.game.canvas.canvasHeight - this.gameObject.height
      )
        this.gameObject.velY *= -1;
      if (
        this.gameObject.position.x <= 0 ||
        this.gameObject.position.x >=
          this.game.canvas.canvasWidth - this.gameObject.width
      )
        this.gameObject.velX *= -1;
    }
  }
}
