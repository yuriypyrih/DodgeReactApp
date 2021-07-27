import { ENTITY_ID } from "../enum/entitiy_id";
import { COLOR } from "../enum/colors";
import GameObject from "../engine/gameObject";
import { Rectangle } from "../types/Rectangle";
import Game from "../engine/game";
import BasicBullet from "./basic_bullet";
import TitanBullet from "./titan_bullet";

type TitanBossProps = {
  game: Game;
  position?: { x: number; y: number };
  velX?: number;
  velY?: number;
};

export default class TitanBoss extends GameObject {
  game: Game;
  awaken: boolean;
  bullet_timer: number;
  awakening_timer: number;
  growingTimer: number;
  angle: number;

  constructor({ game, position, velX = 0, velY = 1 }: TitanBossProps) {
    super({
      id: ENTITY_ID.TITAN_BOSS,
      width: 5,
      height: 5,
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
    this.growingTimer = 0;
    this.angle = 180;
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

  awakenFunction() {
    if (!this.awaken && this.gameObject.position.y >= 10) {
      this.awaken = true;
      this.gameObject.velY = 0;
      this.gameObject.velX = 5;
    }
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

  fireBullets() {
    this.bullet_timer++;
    if (this.awaken && this.bullet_timer % 80 === 0) {
      let offset = this.gameObject.velX > 0 ? 20 : -20;
      let origin_x =
        this.gameObject.position.x + this.gameObject.width / 2 + offset;
      let origin_y = this.gameObject.position.y + this.gameObject.height - 5;

      this.game.gameObjects.push(
        new TitanBullet({
          game: this.game,
          position: { x: -30, y: 300 },
          boss: this,
        })
      );
      this.game.gameObjects.push(
        new TitanBullet({
          game: this.game,
          position: {
            x: 80,
            y: this.game.canvas.canvasHeight + 10,
          },
          boss: this,
        })
      );
      this.game.gameObjects.push(
        new TitanBullet({
          game: this.game,
          position: {
            x: this.game.canvas.canvasWidth / 2,
            y: this.game.canvas.canvasHeight + 10,
          },
          boss: this,
        })
      );
      this.game.gameObjects.push(
        new TitanBullet({
          game: this.game,
          position: {
            x: this.game.canvas.canvasWidth - 80,
            y: this.game.canvas.canvasHeight + 10,
          },
          boss: this,
        })
      );
      this.game.gameObjects.push(
        new TitanBullet({
          game: this.game,
          position: { x: this.game.canvas.canvasWidth + 10, y: 300 },
          boss: this,
        })
      );
    }
  }

  draw(context: any) {
    context.beginPath();
    const gradient = context.createRadialGradient(
      this.gameObject.position.x + this.gameObject.width / 2,
      this.gameObject.position.y + this.gameObject.height / 2,
      1,
      this.gameObject.position.x + this.gameObject.width / 2,
      this.gameObject.position.y + this.gameObject.height / 2,
      this.gameObject.width / 2
    );
    gradient.addColorStop(0, "transparent");
    gradient.addColorStop(
      Math.min(1 * (this.gameObject.width / 300), 1),
      COLOR.DARK_BLUE
    );
    gradient.addColorStop(1, COLOR.DARK_BLUE);
    context.fillStyle = gradient;
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

    this.gameObject.position.x =
      (1 + Math.cos(this.angle)) *
        (this.game.canvas.canvasWidth / 2 - this.gameObject.width / 2) +
      20;
    this.angle += 0.02;

    this.growingTimer++;

    if (this.growingTimer > 10 && this.gameObject.width < 300) {
      this.gameObject.width += 1;
      this.gameObject.height += 1;
      this.growingTimer = 0;
    }
    this.game.gameObjects.forEach((object: GameObject) => {
      if (this.collision(object.getBounds())) {
        if (object.gameObject.id === ENTITY_ID.BULLET) {
          this.game.gameObjects.splice(
            this.game.gameObjects.indexOf(object),
            1
          );
          if (this.gameObject.width < 400) {
            this.gameObject.width += 1;
            this.gameObject.height += 1;
          }
        }
      }
    });
  }
}
