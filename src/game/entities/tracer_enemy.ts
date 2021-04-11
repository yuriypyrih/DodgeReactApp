import { ENTITY_ID } from "../enum/entitiy_id";
import { COLOR } from "../enum/colors";
//import Trail from "../engine/trail";
import GameObject from "../engine/gameObject";
import { Rectangle } from "../types/Rectangle";
import Trail from "../engine/trail";
import Game from "../engine/game";

type TracerEnemyProps = {
  game: Game;
  position: { x: number; y: number };
  velX?: number;
  velY?: number;
};

export default class TracerEnemy extends GameObject {
  game: Game;
  maxSpeed: number;

  constructor({ game, position, velX = 0, velY = 0 }: TracerEnemyProps) {
    super({
      id: ENTITY_ID.BASIC_ENEMY,
      width: 20,
      height: 20,
      position,
      velY,
      velX,
    });

    this.game = game;
    this.maxSpeed = 3;
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
    context.fillStyle = COLOR.YELLOW;
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
        color: COLOR.YELLOW,
        width: this.gameObject.width,
        height: this.gameObject.height,
        life: 0.6,
        minus: 0.008,
        game: this.game,
      })
    );

    let diffY = Math.ceil(
      this.gameObject.position.y - (this.game.player.gameObject.position.y + 5)
    );
    let diffX = Math.ceil(
      this.gameObject.position.x - (this.game.player.gameObject.position.x + 5)
    );
    let distance = Math.ceil(
      Math.sqrt(
        (this.gameObject.position.x - this.game.player.gameObject.position.x) *
          (this.gameObject.position.x -
            this.game.player.gameObject.position.x) +
          (this.gameObject.position.y -
            this.game.player.gameObject.position.y) *
            (this.gameObject.position.y -
              this.game.player.gameObject.position.y)
      )
    );

    if (distance < 1) distance = 1;

    this.gameObject.velX = (-this.maxSpeed / distance) * diffX;
    this.gameObject.velY = (-this.maxSpeed / distance) * diffY;
  }
}
