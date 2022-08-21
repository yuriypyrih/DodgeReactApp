import { ENTITY_ID } from "../enum/entitiy_id";
import { COLOR } from "../enum/colors";
import GameObject from "../engine/gameObject";
import { Rectangle } from "../types/Rectangle";
import Game from "../engine/game";
import BasicEnemy from "./basic_enemy";
import BasicBoss from "./basic_boss";
import TracerBoss from "./tracer_boss";
import BomberBoss from "./bomber_boss";
import VenomBoss from "./venom_boss";
import SlimeBoss from "./slime_boss";
import WormBoss from "./worm_boss";
import GhostBoss from "./ghost_boss";

type BasicBossProps = {
  game: Game;
  position?: { x: number; y: number };
  velX?: number;
  velY?: number;
};

export default class MimicBoss extends GameObject {
  game: Game;
  awaken: boolean;
  awakening_timer: number;
  enemyMimicked: GameObject | null;
  prevMimicked: number | null;

  constructor({ game, position, velX = 0, velY = 0.3 }: BasicBossProps) {
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
    this.enemyMimicked = null;
    this.prevMimicked = null;
  }

  getBounds() {
    if (this.enemyMimicked) {
      return this.enemyMimicked.getBounds();
    } else {
      const rectangle: Rectangle = {
        x: this.gameObject.position.x,
        y: this.gameObject.position.y,
        width: this.gameObject.width,
        height: this.gameObject.height,
      };
      return rectangle;
    }
  }

  fear() {
    // DO nothing
  }

  awakenFunction() {
    if (!this.awaken && this.gameObject.position.y >= 10) {
      this.awaken = true;
      this.gameObject.velY = 0;
      this.gameObject.velX = 5;
    }
  }

  draw(context: any) {
    if (this.enemyMimicked) {
      this.enemyMimicked.draw(context);
    } else {
      context.fillStyle = COLOR.WHITE;
      context.fillRect(
        this.gameObject.position.x,
        this.gameObject.position.y,
        this.gameObject.width,
        this.gameObject.height
      );
    }
  }

  update(deltaTime: number) {
    this.awakenFunction();

    if (
      this.gameObject.position.x >=
        this.game.canvas.canvasWidth - this.gameObject.width ||
      (this.prevMimicked === 0 &&
        this.gameObject.position.x >=
          this.game.canvas.canvasWidth - this.gameObject.width - 10 &&
        this.gameObject.position.y <= 20)
    ) {
      this.gameObject.position.x =
        this.game.canvas.canvasWidth - this.gameObject.width - 10;
      // this.gameObject.velX *= -1;
      const MAX_NUMBER = 7;
      let randomNum = Math.floor(Math.random() * MAX_NUMBER);
      if (randomNum === this.prevMimicked) {
        if (randomNum === MAX_NUMBER - 1) randomNum = 0;
        else randomNum++;
      }
      this.prevMimicked = randomNum;
      this.gameObject.position.y = 10;
      if (randomNum === 0) {
        this.enemyMimicked = new WormBoss({
          game: this.game,
          position: this.gameObject.position,
          velX: -5,
          velY: 0,
          skipAwakening: true,
        });
      } else if (randomNum === 1) {
        this.enemyMimicked = new TracerBoss({
          game: this.game,
          position: this.gameObject.position,
          velX: -6,
          velY: 0,
          skipAwakening: true,
        });
      } else if (randomNum === 2) {
        this.enemyMimicked = new BomberBoss({
          game: this.game,
          position: this.gameObject.position,
          velX: -6,
          velY: 0,
          skipAwakening: true,
        });
      } else if (randomNum === 3) {
        this.enemyMimicked = new VenomBoss({
          game: this.game,
          position: this.gameObject.position,
          velX: -6,
          velY: 0,
          skipAwakening: true,
        });
      } else if (randomNum === 4) {
        this.enemyMimicked = new SlimeBoss({
          game: this.game,
          position: this.gameObject.position,
          velX: -3,
          velY: 0,
          skipAwakening: true,
        });
      } else if (randomNum === 5) {
        this.enemyMimicked = new BasicBoss({
          game: this.game,
          position: this.gameObject.position,
          velX: -6,
          velY: 0,
          skipAwakening: true,
        });
      } else if (randomNum === 6) {
        this.enemyMimicked = new GhostBoss({
          game: this.game,
          position: this.gameObject.position,
          velX: -6,
          velY: 0,
          skipAwakening: true,
        });
      }

      if (this.enemyMimicked) {
        this.gameObject = this.enemyMimicked.gameObject;
      }
    }

    if (this.enemyMimicked) this.enemyMimicked.update(deltaTime);
    else {
      // Updating the entity's position based on its velocity (if it has one)
      this.gameObject.position.x += this.gameObject.velX;
      this.gameObject.position.y += this.gameObject.velY;
    }
  }
}
