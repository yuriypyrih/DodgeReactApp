import { ENTITY_ID } from "../enum/entitiy_id";
import { COLOR } from "../enum/colors";
import Game from "./game";

type TrailProps = {
  x: number;
  y: number;
  reductor: number;
  color: COLOR;
  secondaryColor?: COLOR;
  diagonialBottomRight?: boolean;
  width: number;
  height: number;
  life: number;
  minus: number;
  game: Game;
  shadowAlpha?: number;
};

export default class Trail {
  id: ENTITY_ID;
  x: number;
  y: number;
  reductor: number;
  color: COLOR;
  secondaryColor?: COLOR;
  diagonialBottomRight?: boolean;
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
    secondaryColor,
    diagonialBottomRight,
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
    this.secondaryColor = secondaryColor;
    this.diagonialBottomRight = diagonialBottomRight;
    this.width = width - reductor;
    this.height = height - reductor;
    this.life = life;
    this.minus = minus;
    this.game = game;
  }

  draw(context: any) {
    context.globalAlpha = this.life;
    if (
      this.diagonialBottomRight !== undefined &&
      this.secondaryColor !== undefined
    ) {
      if (this.diagonialBottomRight) {
        //top-left to bottom-right
        context.fillStyle = this.color;
        context.beginPath();
        context.moveTo(this.x, this.y);
        context.lineTo(this.x, this.y + this.height);
        context.lineTo(this.x + this.width, this.y + this.height);
        context.fill();
        context.fillStyle = this.secondaryColor;
        context.beginPath();
        context.moveTo(this.x + this.width, this.y);
        context.lineTo(this.x + this.width, this.y + this.height);
        context.lineTo(this.x, this.y);
        context.fill();
      } else {
        //bottom-right to top-left
        context.fillStyle = this.secondaryColor;
        context.beginPath();
        context.moveTo(this.x, this.y);
        context.lineTo(this.x + this.width, this.y);
        context.lineTo(this.x, this.y + this.height);
        context.fill();
        context.fillStyle = this.color;
        context.beginPath();
        context.moveTo(this.x + this.width, this.y);
        context.lineTo(this.x, this.y + this.height);
        context.lineTo(this.x + this.width, this.y + this.height);
        context.fill();
      }
    } else {
      context.fillStyle = this.color;
      context.fillRect(this.x, this.y, this.width, this.height);
    }

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
