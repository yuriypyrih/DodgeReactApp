import { ENTITY_ID } from "../enum/entitiy_id";
import { COLOR } from "../enum/colors";
import GameObject from "../engine/gameObject";
import { Rectangle } from "../types/Rectangle";
import Game from "../engine/game";
import VenomBullet from "./venom_bullet";

type VenomBossProps = {
  game: Game;
  position?: { x: number; y: number };
  velX?: number;
  velY?: number;
  skipAwakening?: boolean;
};

export default class VenomBoss extends GameObject {
  game: Game;
  awaken: boolean;
  bullet_timer: number;
  awakening_timer: number;
  skipAwakening: boolean;

  constructor({
    game,
    position,
    velX = 0,
    velY = 0.3,
    skipAwakening = false,
  }: VenomBossProps) {
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
    this.skipAwakening = skipAwakening;
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

  fear() {
    // DO nothing
  }

  awakenFunction() {
    if (!this.awaken && this.skipAwakening) {
      this.awaken = true;
    }
    if (!this.awaken && this.gameObject.position.y >= 10) {
      this.awaken = true;
      this.gameObject.velY = 0;
      this.gameObject.velX = 5;
    }
  }

  fireBullets() {
    this.bullet_timer++;
    if (this.awaken && this.bullet_timer % 40 === 0) {
      let offset = this.gameObject.velX > 0 ? 20 : -20;
      let origin_x =
        this.gameObject.position.x + this.gameObject.width / 2 + offset;
      let origin_y = this.gameObject.position.y + this.gameObject.height - 5;
      this.game.gameObjects.push(
        new VenomBullet({
          game: this.game,
          position: { x: origin_x, y: origin_y },
          velX: -3,
          velY: 4,
        })
      );
      this.game.gameObjects.push(
        new VenomBullet({
          game: this.game,
          position: { x: origin_x, y: origin_y },
          velX: 0,
          velY: 5,
        })
      );
      this.game.gameObjects.push(
        new VenomBullet({
          game: this.game,
          position: { x: origin_x, y: origin_y },
          velX: 3,
          velY: 4,
        })
      );
      this.game.gameObjects.push(
        new VenomBullet({
          game: this.game,
          position: { x: origin_x, y: origin_y },
          velX: 5,
          velY: 3,
        })
      );
      this.game.gameObjects.push(
        new VenomBullet({
          game: this.game,
          position: { x: origin_x, y: origin_y },
          velX: -5,
          velY: 3,
        })
      );
    }
  }

  draw(context: any) {
    context.fillStyle = COLOR.PURPLE;
    context.fillRect(
      this.gameObject.position.x,
      this.gameObject.position.y,
      this.gameObject.width,
      this.gameObject.height
    );
  }

  update(deltaTime: number) {
    this.awakenFunction();
    this.fireBullets();
    // Updating the entity's position based on its velocity (if it has one)
    this.gameObject.position.x += this.gameObject.velX;
    this.gameObject.position.y += this.gameObject.velY;

    if (
      this.gameObject.position.x <= 0 ||
      this.gameObject.position.x >=
        this.game.canvas.canvasWidth - this.gameObject.width
    )
      this.gameObject.velX *= -1;
  }
}
