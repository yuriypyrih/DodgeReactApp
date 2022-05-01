import { ENTITY_ID } from "../enum/entitiy_id";
import { COLOR } from "../enum/colors";
import GameObject from "../engine/gameObject";
import { Rectangle } from "../types/Rectangle";
import Game from "../engine/game";
import WormBullet from "./worm_bullet";
import Trail from "../engine/trail";

type WormBossProps = {
  game: Game;
  position?: { x: number; y: number };
  velX?: number;
  velY?: number;
};

export default class WormBoss extends GameObject {
  game: Game;
  awaken: boolean;
  bullet_timer: number;
  awakening_timer: number;
  MAX_SPEED: number;

  constructor({ game, position, velX = 0, velY = 0.3 }: WormBossProps) {
    super({
      id: ENTITY_ID.BOSS,
      width: 50,
      height: 50,
      position: position
        ? position
        : { x: game.canvas.canvasWidth / 2 - 25, y: -60 },
      velY,
      velX,
    });

    this.game = game;
    this.awaken = false;
    this.awakening_timer = 0;
    this.bullet_timer = 0;
    this.MAX_SPEED = 14;
  }

  fear() {
    // DO nothing
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

  fireBullets() {
    this.bullet_timer++;

    if (this.awaken && this.bullet_timer % 10 === 0) {
      let offset = this.gameObject.velX > 0 ? 20 : -20;
      let origin_x =
        this.gameObject.position.x + this.gameObject.width / 2 + offset;
      let origin_y = this.gameObject.position.y + this.gameObject.height - 5;
      this.game.gameObjects.push(
        new WormBullet({
          game: this.game,
          position: { x: origin_x, y: origin_y },
          velX: 0,
          velY: 6,
        })
      );
    }
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
    if (!this.awaken && this.gameObject.position.y >= 10) {
      this.awaken = true;
      this.gameObject.velY = 0;
      this.gameObject.velX = 5;
    }

    if (this.gameObject.velX === -5) this.fireBullets();

    // Updating the entity's position based on its velocity (if it has one)
    this.gameObject.position.x += this.gameObject.velX;
    this.gameObject.position.y += this.gameObject.velY;

    if (this.awaken) {
      // Top wall
      if (this.gameObject.position.y <= 0) {
        this.gameObject.position.y = 1;
        this.gameObject.velX = -5;
        this.gameObject.velY = 0;
      }
      // Bottom wall
      else if (
        this.gameObject.position.y >=
        this.game.canvas.canvasHeight - this.gameObject.height
      ) {
        this.gameObject.position.y =
          this.game.canvas.canvasHeight - (this.gameObject.height + 1);
        this.gameObject.velX = this.MAX_SPEED;
        this.gameObject.velY = 0;
      }
      // Left wall
      else if (this.gameObject.position.x <= 0) {
        this.gameObject.position.x = 1;
        this.gameObject.velX = 0;
        this.gameObject.velY = this.MAX_SPEED;
      }
      // Right wall
      else if (
        this.gameObject.position.x >=
        this.game.canvas.canvasWidth - this.gameObject.width
      ) {
        if (this.gameObject.velX !== Math.abs(this.MAX_SPEED)) {
          this.gameObject.velX *= -1;
        } else {
          this.gameObject.position.x =
            this.game.canvas.canvasWidth - (this.gameObject.width + 1);
          this.gameObject.velX = 0;
          this.gameObject.velY = -this.MAX_SPEED;
        }
      }
    }

    // Creating a Trail particle and add it to the list
    if (
      Math.abs(this.gameObject.velY) === this.MAX_SPEED ||
      Math.abs(this.gameObject.velX) === this.MAX_SPEED
    )
      this.game.particleObjects.push(
        new Trail({
          x: this.gameObject.position.x,
          y: this.gameObject.position.y,
          reductor: (this.gameObject.width * 3) / 4,
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
