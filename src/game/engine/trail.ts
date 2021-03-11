import { ENTITY_ID } from "../enum/entitiy_id";
import { COLOR } from "../enum/colors";
import Game from "./game";

type TrailProps = {
  x: number;
  y: number;
  reductor: number;
  color: COLOR;
  width: number;
  height: number;
  life: number;
  minus: number;
  game: Game;
};

export default class Trail {
  id: ENTITY_ID;
  x: number;
  y: number;
  reductor: number;
  color: COLOR;
  width: number;
  height: number;
  life: number;
  minus: number;
  game: Game;

  constructor({
    x,
    y,
    reductor,
    color,
    width,
    height,
    life,
    minus,
    game,
  }: TrailProps) {
    this.id = ENTITY_ID.TRAIL;
    this.x = x + reductor / 2;
    this.y = y + reductor / 2;
    this.reductor = reductor;
    this.color = color;
    this.width = width - reductor;
    this.height = height - reductor;
    this.life = life;
    this.minus = minus;
    this.game = game;
  }

  draw(context: any) {
    context.fillStyle = this.color;

    context.globalAlpha = this.life;
    context.fillRect(this.x, this.y, this.width, this.height);

    context.globalAlpha = 1;
  }

  update(deltaTime: any) {
    this.life = this.life - this.minus;
    if (this.life <= 0.1) {
      this.game.particleObjects.splice(
        this.game.particleObjects.indexOf(this),
        1
      );
    }
  }
}
