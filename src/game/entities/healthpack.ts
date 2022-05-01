import { ENTITY_ID } from "../enum/entitiy_id";
import { COLOR } from "../enum/colors";
import GameObject from "../engine/gameObject";
import { Rectangle } from "../types/Rectangle";
import Game from "../engine/game";

type HealthpackProps = {
  game: Game;
  position: { x: number; y: number };
};

export default class Healthpack extends GameObject {
  game: Game;

  constructor({ game, position }: HealthpackProps) {
    super({
      id: ENTITY_ID.HEALTH_PACK,
      width: 30,
      height: 30,
      position,
      velY: 0,
      velX: 0,
    });

    this.game = game;
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

  draw(context: any) {
    context.fillStyle = COLOR.AQUA;
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
  }

  update(deltaTime: number) {}
}
