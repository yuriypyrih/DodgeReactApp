import { ENTITY_ID } from "../enum/entitiy_id";
import { COLOR } from "../enum/colors";
import GameObject from "../engine/gameObject";
import { Rectangle } from "../models/Rectangle";

type StarProps = {
  game: any;
  position: { x: number; y: number };
  size_max?: number;
  size_min?: number;
};

export default class Star extends GameObject {
  game: any;
  size_max: number;
  size_min: number;

  constructor({ game, position, size_max = 16, size_min = 10 }: StarProps) {
    super({
      id: ENTITY_ID.STAR,
      width: 2 * size_max + size_min,
      height: 2 * size_max + size_min,
      position,
      velY: 0,
      velX: 0,
    });

    this.game = game;
    this.size_max = size_max;
    this.size_min = size_min;
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
    context.strokeStyle = COLOR.WHITE;

    context.beginPath();
    this.drawStar(context);
    context.fill();
    context.beginPath();
    this.drawStar(context);
    context.stroke();
  }

  update(deltaTime: number) {
    // do nothing
  }
  drawStar(context: any) {
    // CROSS Beggning top corner
    context.moveTo(
      this.gameObject.position.x + this.size_max + this.size_min / 2,
      this.gameObject.position.y
    );
    // Move to center-top-right corner;
    context.lineTo(
      this.gameObject.position.x + this.size_max + this.size_min,
      this.gameObject.position.y + this.size_max
    );
    // Move to right croner;
    context.lineTo(
      this.gameObject.position.x + this.gameObject.width,
      this.gameObject.position.y + this.size_max + this.size_min / 2
    );
    // Move to center-bottom-right croner;
    context.lineTo(
      this.gameObject.position.x + this.size_max + this.size_min,
      this.gameObject.position.y + this.size_max + this.size_min
    );
    // Move to bottom croner;
    context.lineTo(
      this.gameObject.position.x + this.size_max + this.size_min / 2,
      this.gameObject.position.y + this.gameObject.height
    );
    // Move to center-bottom-left croner;
    context.lineTo(
      this.gameObject.position.x + this.size_max,
      this.gameObject.position.y + this.size_max + this.size_min
    );
    // Move to left croner;
    context.lineTo(
      this.gameObject.position.x,
      this.gameObject.position.y + this.size_max + this.size_min / 2
    );
    // Move to center-top-left croner;
    context.lineTo(
      this.gameObject.position.x + this.size_max,
      this.gameObject.position.y + this.size_max
    );
    // Move to top corner;
    context.moveTo(
      this.gameObject.position.x + this.size_max + this.size_min / 2,
      this.gameObject.position.y
    );
  }
}
