import { ENTITY_ID } from "../enum/entitiy_id";
import { COLOR } from "../enum/colors";
import GameObject from "../engine/gameObject";
import { Rectangle } from "../types/Rectangle";
import Game from "../engine/game";

type ExplosionProps = {
  game: Game;
  position: { x: number; y: number };
};

export default class Explosion extends GameObject {
  game: Game;
  explosionTimer: number;
  explosionAddition: number;
  EXPLOSION_ADD: number;
  MAX_EXPLOSION_RAD: number;
  MAX_DMG_RADIUS: number;

  constructor({ game, position }: ExplosionProps) {
    super({
      id: ENTITY_ID.EXPLOSION,
      width: 10,
      height: 10,
      position,
      velY: 0,
      velX: 0,
    });

    this.game = game;
    this.explosionTimer = 0;
    this.EXPLOSION_ADD = 10;
    this.explosionAddition = this.EXPLOSION_ADD;
    this.MAX_EXPLOSION_RAD = 200;
    this.MAX_DMG_RADIUS = 340;
  }

  getBounds() {
    const rectange: Rectangle = {
      x: this.gameObject.position.x - this.gameObject.width / 2,
      y: this.gameObject.position.y - this.gameObject.height / 2,
      width: this.gameObject.width,
      height: this.gameObject.height,
    };
    return rectange;
  }

  fear() {
    // DO nothing
  }

  draw(context: any) {
    // context.strokeStyle = "white";
    // const rect = this.getBounds();
    // context.strokeRect(rect.x, rect.y, rect.width, rect.height);
    context.beginPath();
    const gradient = context.createRadialGradient(
      this.gameObject.position.x + 10,
      this.gameObject.position.y + 10,
      Math.min(
        this.MAX_EXPLOSION_RAD - 40,
        Math.max(this.explosionTimer - 40, 0)
      ),
      this.gameObject.position.x + 10,
      this.gameObject.position.y + 10,
      Math.min(this.MAX_EXPLOSION_RAD, this.explosionTimer)
    );
    gradient.addColorStop(0, "transparent");
    gradient.addColorStop(1, COLOR.RED);

    context.arc(
      this.gameObject.position.x + 10,
      this.gameObject.position.y + 10,
      Math.min(this.MAX_EXPLOSION_RAD, this.explosionTimer),
      0,
      2 * Math.PI,
      false
    );

    context.fillStyle = gradient;
    context.fill();
  }

  update(deltaTime: number) {
    this.gameObject.width = Math.ceil(
      this.MAX_DMG_RADIUS * (this.explosionTimer / this.MAX_EXPLOSION_RAD)
    );
    this.gameObject.height = Math.ceil(
      this.MAX_DMG_RADIUS * (this.explosionTimer / this.MAX_EXPLOSION_RAD)
    );
    this.explosionTimer += Math.max(this.explosionAddition, 0);
    this.explosionAddition =
      (this.EXPLOSION_ADD * (this.MAX_EXPLOSION_RAD - this.explosionTimer)) /
      this.MAX_EXPLOSION_RAD;

    if (
      this.explosionTimer >= this.MAX_EXPLOSION_RAD ||
      this.explosionAddition <= 1
    ) {
      // this.explosionTimer = 0;
      // this.explosionAddition = this.EXPLOSION_ADD;
      this.game.gameObjects.splice(this.game.gameObjects.indexOf(this), 1);
    }
  }
}
