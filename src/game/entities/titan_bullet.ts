import { ENTITY_ID } from "../enum/entitiy_id";
import { COLOR } from "../enum/colors";
import GameObject from "../engine/gameObject";
import { Rectangle } from "../types/Rectangle";
import Trail from "../engine/trail";
import Game from "../engine/game";

type TitanBulletProps = {
  game: Game;
  position: { x: number; y: number };
  velX?: number;
  velY?: number;
  boss: GameObject;
};

export default class TitanBullet extends GameObject {
  game: Game;
  boss: GameObject;
  maxSpeed: number;

  constructor({ game, position, velX = 5, velY = 5, boss }: TitanBulletProps) {
    super({
      id: ENTITY_ID.BULLET,
      width: 5,
      height: 5,
      position,
      velY,
      velX,
    });
    this.boss = boss;
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
    context.fillStyle = COLOR.DARK_BLUE;
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
        reductor: 0,
        color: COLOR.DARK_BLUE,
        width: this.gameObject.width,
        height: this.gameObject.height,
        life: 0.8,
        minus: 0.04,
        game: this.game,
      })
    );

    let diffY = Math.ceil(
      this.gameObject.position.y - (this.boss.gameObject.position.y + 5)
    );
    let diffX = Math.ceil(
      this.gameObject.position.x - (this.boss.gameObject.position.x + 5)
    );
    let distance = Math.ceil(
      Math.sqrt(
        (this.gameObject.position.x - this.boss.gameObject.position.x) *
          (this.gameObject.position.x - this.boss.gameObject.position.x) +
          (this.gameObject.position.y - this.boss.gameObject.position.y) *
            (this.gameObject.position.y - this.boss.gameObject.position.y)
      )
    );

    if (distance < 1) distance = 1;

    this.gameObject.velX = (-this.maxSpeed / distance) * diffX;
    this.gameObject.velY = (-this.maxSpeed / distance) * diffY;
  }
}
