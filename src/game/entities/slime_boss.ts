import { ENTITY_ID } from "../enum/entitiy_id";
import { COLOR } from "../enum/colors";
import Trail from "../engine/trail";
import GameObject from "../engine/gameObject";
import { Rectangle } from "../types/Rectangle";
import Game from "../engine/game";
import SlimeBullet from "./slime_bullet";

type SlimeBossProps = {
  game: Game;
  position?: { x: number; y: number };
  velX?: number;
  velY?: number;
  skipAwakening?: boolean;
};

export default class SlimeBoss extends GameObject {
  game: Game;
  awaken: boolean;
  bullet_timer: number;
  skipAwakening: boolean;

  constructor({
    game,
    position,
    velX = 0,
    velY = 0.3,
    skipAwakening = false,
  }: SlimeBossProps) {
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
    this.bullet_timer = 0;
    this.skipAwakening = skipAwakening;
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

  awakenFunction() {
    if (!this.awaken && this.skipAwakening) {
      this.awaken = true;
    }
    if (!this.awaken && this.gameObject.position.y >= 10) {
      this.awaken = true;
      this.gameObject.velY = 0;
      this.gameObject.velX = 2;
    }
  }

  fireBullets() {
    this.bullet_timer++;

    if (this.awaken && this.bullet_timer % 10 === 0) {
      let offset = this.gameObject.velX > 0 ? 20 : -20;
      let origin_x =
        this.gameObject.position.x + this.gameObject.width / 2 + offset;
      let origin_y = this.gameObject.position.y + this.gameObject.height - 5;
      this.game.gameObjects.push(
        new SlimeBullet({
          game: this.game,
          position: { x: origin_x, y: origin_y },
          velX: 5,
          velY: 0,
        })
      );
      this.game.gameObjects.push(
        new SlimeBullet({
          game: this.game,
          position: { x: origin_x, y: origin_y },
          velX: -5,
          velY: 0,
        })
      );
    }
  }

  draw(context: any) {
    context.fillStyle = COLOR.GREEN;
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

    // Creating a Trail particle and add it to the list
    this.game.particleObjects.push(
      new Trail({
        x: this.gameObject.position.x,
        y: this.gameObject.position.y,
        reductor: (this.gameObject.width * 5) / 6,
        color: COLOR.GREEN,
        width: this.gameObject.width,
        height: this.gameObject.height,
        life: 0.8,
        minus: 0.01,
        game: this.game,
      })
    );

    // Updating the entity's position based on its velocity (if it has one)
    this.gameObject.position.x += this.gameObject.velX;
    this.gameObject.position.y += this.gameObject.velY;

    if (this.awaken) {
      this.gameObject.velY += 0.14;

      if (
        this.gameObject.position.y >=
        this.game.canvas.canvasHeight - this.gameObject.height
      )
        this.gameObject.velY = -11.2;
      if (
        this.gameObject.position.x <= 0 ||
        this.gameObject.position.x >=
          this.game.canvas.canvasWidth - this.gameObject.width
      )
        this.gameObject.velX *= -1;
    }
  }
}
