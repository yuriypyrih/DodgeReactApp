import { ENTITY_ID } from "../enum/entitiy_id";
import { COLOR } from "../enum/colors";
//import Trail from "../engine/trail";
import GameObject from "../engine/gameObject";
import { Rectangle } from "../models/Rectangle";
import Trail from "../engine/trail";
import Game from "../engine/game";

type SlimeEnemyProps = {
  game: Game;
  position: { x: number; y: number };
  velX?: number;
  velY?: number;
};

export default class SlimeEnemy extends GameObject {
  game: Game;

  constructor({ game, position, velX = 1.8, velY = 1.2 }: SlimeEnemyProps) {
    super({
      id: ENTITY_ID.BASIC_ENEMY,
      width: 20,
      height: 20,
      position,
      velY,
      velX,
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
    // Updating the entity's position based on its velocity (if it has one)
    this.gameObject.position.x += this.gameObject.velX;
    this.gameObject.position.y += this.gameObject.velY;

    // Creating a Trail particle and add it to the list

    this.game.particleObjects.push(
      new Trail({
        x: this.gameObject.position.x,
        y: this.gameObject.position.y,
        reductor: 12,
        color: COLOR.GREEN,
        width: this.gameObject.width,
        height: this.gameObject.height,
        life: 0.7,
        minus: 0.02,
        game: this.game,
      })
    );

    this.gameObject.velY += 0.14;

    //TODO put barrier on top Y < 0
    if (
      this.gameObject.position.y <= 0 ||
      this.gameObject.position.y >=
        this.game.canvas.canvasHeight - this.gameObject.height
    )
      this.gameObject.velY = -10;
    if (
      this.gameObject.position.x <= 0 ||
      this.gameObject.position.x >=
        this.game.canvas.canvasWidth - this.gameObject.width
    )
      this.gameObject.velX *= -1;
  }
}
