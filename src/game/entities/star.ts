import { ENTITY_ID } from "../enum/entitiy_id";
import { COLOR } from "../enum/colors";
import GameObject from "../engine/gameObject";
import { Rectangle } from "../types/Rectangle";

type StarProps = {
  game: any;
  position: { x: number; y: number };
};

export default class Star extends GameObject {
  game: any;
  pulseTimer: number;
  readonly MAX_PULSE: number;

  constructor({ game, position }: StarProps) {
    super({
      id: ENTITY_ID.STAR,
      width: 30,
      height: 30,
      position,
      velY: 0,
      velX: 0,
    });

    this.game = game;
    this.pulseTimer = 0;
    this.MAX_PULSE = 60;
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

  draw(context: any) {
    context.fillStyle = COLOR.GOLD;
    context.strokeStyle = COLOR.GOLD;
    context.beginPath();
    context.moveTo(
      this.gameObject.position.x + this.gameObject.width / 2,
      this.gameObject.position.y
    );
    context.lineTo(
      this.gameObject.position.x + this.gameObject.width,
      this.gameObject.position.y + this.gameObject.height / 2
    );
    context.lineTo(
      this.gameObject.position.x + this.gameObject.width / 2,
      this.gameObject.position.y + this.gameObject.height
    );
    context.lineTo(
      this.gameObject.position.x,
      this.gameObject.position.y + this.gameObject.height / 2
    );
    context.stroke();
    context.fill();
    context.globalAlpha = Math.max(
      0,
      (this.MAX_PULSE - this.pulseTimer) / this.MAX_PULSE
    );
    context.strokeStyle = COLOR.GOLD;
    context.beginPath();
    context.arc(
      this.gameObject.position.x + this.gameObject.width / 2,
      this.gameObject.position.y + this.gameObject.height / 2,
      this.pulseTimer / Math.sqrt(2),
      0,
      2 * Math.PI
    );
    context.stroke();
    context.globalAlpha = 1;
  }

  update(deltaTime: number) {
    this.pulseTimer++;
    if (this.pulseTimer > this.MAX_PULSE) this.pulseTimer = 0;
  }
}
