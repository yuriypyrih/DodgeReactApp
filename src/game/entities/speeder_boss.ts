import { ENTITY_ID } from "../enum/entitiy_id";
import { COLOR } from "../enum/colors";
import Trail from "../engine/trail";
import GameObject from "../engine/gameObject";
import { Rectangle } from "../types/Rectangle";
import Game from "../engine/game";
import BasicBullet from "./basic_bullet";
import SpeederBullet from "./speeder_bullet";

type SpeederBossProps = {
  game: Game;
  position?: { x: number; y: number };
  velX?: number;
  velY?: number;
};

export default class SpeederBoss extends GameObject {
  game: Game;
  awaken: boolean;
  bullet_timer: number;
  awakening_timer: number;
  MAX_SPEED: number;

  constructor({ game, position, velX = 0, velY = 0.3 }: SpeederBossProps) {
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
    this.MAX_SPEED = 25;
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

    if (!this.awaken && this.gameObject.position.y >= 10) {
      this.awaken = true;
      this.gameObject.velY = 0;
      this.gameObject.velX = 5;
    }

    if (this.awaken && this.bullet_timer % 40 === 0) {
      let offset = this.gameObject.velX > 0 ? 20 : -20;
      let origin_x =
        this.gameObject.position.x + this.gameObject.width / 2 + offset;
      let origin_y = this.gameObject.position.y + this.gameObject.height - 5;
      this.game.gameObjects.push(
        new SpeederBullet({
          game: this.game,
          position: { x: origin_x, y: origin_y },
          velX: 5 * (this.gameObject.velX / this.MAX_SPEED),
          velY: Math.max(
            1,
            5 *
              ((this.MAX_SPEED - Math.abs(this.gameObject.velX)) /
                this.MAX_SPEED)
          ),
        })
      );
    }
  }

  draw(context: any) {
    context.fillStyle = COLOR.LIGHT_BLUE;
    context.fillRect(
      this.gameObject.position.x,
      this.gameObject.position.y,
      this.gameObject.width,
      this.gameObject.height
    );
  }

  update(deltaTime: number) {
    // this.awakening_timer += deltaTime;
    this.fireBullets();

    // Creating a Trail particle and add it to the list
    this.game.particleObjects.push(
      new Trail({
        x: this.gameObject.position.x,
        y: this.gameObject.position.y,
        reductor: (this.gameObject.width * 3) / 4,
        color: COLOR.LIGHT_BLUE,
        width: this.gameObject.width,
        height: this.gameObject.height,
        life: 0.7 * (Math.abs(this.gameObject.velX) / this.MAX_SPEED),
        minus: 0.02,
        game: this.game,
      })
    );

    // Updating the entity's position based on its velocity (if it has one)
    this.gameObject.position.x += this.gameObject.velX;
    this.gameObject.position.y += this.gameObject.velY;

    if (
      this.gameObject.position.x <= 0 ||
      this.gameObject.position.x >=
        this.game.canvas.canvasWidth - this.gameObject.width
    ) {
      this.gameObject.velX *= -1;
      if (
        this.gameObject.velX < this.MAX_SPEED &&
        this.gameObject.velX > -this.MAX_SPEED
      ) {
        this.gameObject.velX *= 1.5;
      }
    }
  }
}
