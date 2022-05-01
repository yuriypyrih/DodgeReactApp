import { ENTITY_ID } from "../enum/entitiy_id";
import { COLOR } from "../enum/colors";
//import Trail from "../engine/trail";
import GameObject from "../engine/gameObject";
import { Rectangle } from "../types/Rectangle";
import Trail from "../engine/trail";
import Game from "../engine/game";
import { RELICS_NAME } from "../enum/relics_name";

type GhostEnemyProps = {
  game: Game;
  position: { x: number; y: number };
  velX?: number;
  velY?: number;
};

export default class GhostEnemy extends GameObject {
  game: Game;
  shadowAlpha: number;
  goStealth: boolean;
  stealthTimer: number;

  constructor({ game, position, velX = 5, velY = 5 }: GhostEnemyProps) {
    super({
      id: ENTITY_ID.BASIC_ENEMY,
      width: 20,
      height: 20,
      position,
      velY,
      velX,
    });

    this.game = game;
    this.shadowAlpha = 1;
    this.goStealth = true;
    this.stealthTimer = 0;
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
    context.fillStyle = COLOR.LIGHT_GREY;
    context.globalAlpha = this.shadowAlpha;
    context.fillRect(
      this.gameObject.position.x,
      this.gameObject.position.y,
      this.gameObject.width,
      this.gameObject.height
    );

    context.globalAlpha = 1;
  }

  update(deltaTime: number) {
    // Updating the entity's position based on its velocity (if it has one)
    this.gameObject.position.x += this.gameObject.velX;
    this.gameObject.position.y += this.gameObject.velY;

    this.stealthTimer++;

    let minShadowAlpha = 0;
    if (this.game.player.relic?.name === RELICS_NAME.NIGHT_VISION) {
      minShadowAlpha = 0.2;
    }

    if (this.goStealth && this.stealthTimer > 20) {
      this.shadowAlpha -= 0.01;
      if (this.shadowAlpha < minShadowAlpha) {
        this.shadowAlpha = minShadowAlpha;
        this.stealthTimer = 0;
        this.goStealth = false;
      }
    } else if (!this.goStealth && this.stealthTimer > 20) {
      this.shadowAlpha += 0.01;
      if (this.shadowAlpha > 1) {
        this.shadowAlpha = 1;
        this.stealthTimer = 0;
        this.goStealth = true;
      }
    }

    // Creating a Trail particle and add it to the list
    this.game.particleObjects.push(
      new Trail({
        x: this.gameObject.position.x,
        y: this.gameObject.position.y,
        reductor: 12,
        color: COLOR.GREY,
        width: this.gameObject.width,
        height: this.gameObject.height,
        life: this.getShadowTrailAlpha(),
        minus: 0.015,
        game: this.game,
      })
    );

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

  private getShadowTrailAlpha = () => {
    const alpha = this.shadowAlpha - 0.2;
    if (alpha < 0) return 0;
    else return alpha;
  };
}
