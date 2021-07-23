import { ENTITY_ID } from "../enum/entitiy_id";
import { COLOR } from "../enum/colors";
import GameObject from "../engine/gameObject";
import { Rectangle } from "../types/Rectangle";
import Trail from "../engine/trail";
import Game from "../engine/game";

type MagnetEnemyProps = {
  game: Game;
  position: { x: number; y: number };
  velX?: number;
  velY?: number;
  type: "plus" | "minus";
};

export default class MagnetEnemy extends GameObject {
  game: Game;
  readonly ΜΑΧ_AURA_RADIUS: number;
  aura_radius_1: number;
  aura_radius_2: number;
  type: "plus" | "minus";

  constructor({ game, position, velX = 5, velY = 5, type }: MagnetEnemyProps) {
    super({
      id:
        type === "plus"
          ? ENTITY_ID.MAGNET_AURA_PLUS
          : ENTITY_ID.MAGNET_AURA_MINUS,
      width: 20,
      height: 20,
      position,
      velY,
      velX,
    });
    this.ΜΑΧ_AURA_RADIUS = 300;
    this.aura_radius_1 = type === "minus" ? 0 : this.ΜΑΧ_AURA_RADIUS;
    this.aura_radius_2 = this.ΜΑΧ_AURA_RADIUS / 2;
    this.game = game;
    this.type = type;
  }

  getBounds() {
    const rectange: Rectangle = {
      x: this.gameObject.position.x - this.ΜΑΧ_AURA_RADIUS / 2 - 20,
      y: this.gameObject.position.y - this.ΜΑΧ_AURA_RADIUS / 2 - 20,
      width: this.gameObject.width + this.ΜΑΧ_AURA_RADIUS + 40,
      height: this.gameObject.height + this.ΜΑΧ_AURA_RADIUS + 40,
    };
    return rectange;
  }

  draw(context: any) {
    context.fillStyle = this.type === "minus" ? COLOR.LIGHT_BLUE : COLOR.RED;
    context.fillRect(
      this.gameObject.position.x,
      this.gameObject.position.y,
      this.gameObject.width,
      this.gameObject.height
    );

    // HIT BOX
    // context.strokeRect(
    //   this.gameObject.position.x - this.ΜΑΧ_AURA_RADIUS / 2 - 20,
    //   this.gameObject.position.y - this.ΜΑΧ_AURA_RADIUS / 2 - 20,
    //   this.gameObject.width + this.ΜΑΧ_AURA_RADIUS + 40,
    //   this.gameObject.height + this.ΜΑΧ_AURA_RADIUS + 40
    // );
    context.strokeStyle = this.type === "minus" ? COLOR.RED : COLOR.LIGHT_BLUE;
    context.globalAlpha = this.type === "minus" ? 0.1 : 0.05;
    context.beginPath();
    context.arc(
      this.gameObject.position.x + this.gameObject.width / 2,
      this.gameObject.position.y + this.gameObject.height / 2,
      this.ΜΑΧ_AURA_RADIUS / Math.sqrt(2),
      0,
      2 * Math.PI
    );
    context.stroke();
    const multiplier_1 = Math.min(
      (this.ΜΑΧ_AURA_RADIUS - this.aura_radius_1) / this.ΜΑΧ_AURA_RADIUS,
      1
    );
    context.globalAlpha =
      this.type === "minus" ? 0.6 * multiplier_1 : 0.4 * multiplier_1;
    context.beginPath();
    context.arc(
      this.gameObject.position.x + this.gameObject.width / 2,
      this.gameObject.position.y + this.gameObject.height / 2,
      this.aura_radius_1 / Math.sqrt(2),
      0,
      2 * Math.PI
    );
    context.stroke();
    const multiplier_2 = Math.min(
      (this.ΜΑΧ_AURA_RADIUS - this.aura_radius_2) / this.ΜΑΧ_AURA_RADIUS,
      1
    );
    context.globalAlpha =
      this.type === "minus" ? 0.6 * multiplier_2 : 0.4 * multiplier_2;
    context.beginPath();
    context.arc(
      this.gameObject.position.x + this.gameObject.width / 2,
      this.gameObject.position.y + this.gameObject.height / 2,
      this.aura_radius_2 / Math.sqrt(2),
      0,
      2 * Math.PI
    );
    context.stroke();
    context.globalAlpha = 1;
  }

  update(deltaTime: number) {
    // Updating the entity's position based on its velocity (if it has one)
    this.gameObject.position.x += this.gameObject.velX;
    this.gameObject.position.y += this.gameObject.velY;

    if (this.type === "plus") {
      this.aura_radius_1 += 4;
      this.aura_radius_2 += 4;
      if (this.aura_radius_1 >= this.ΜΑΧ_AURA_RADIUS) this.aura_radius_1 = 0;
      if (this.aura_radius_2 >= this.ΜΑΧ_AURA_RADIUS) this.aura_radius_2 = 0;
    } else {
      this.aura_radius_1 -= 4;
      this.aura_radius_2 -= 4;
      if (this.aura_radius_1 <= 0) this.aura_radius_1 = this.ΜΑΧ_AURA_RADIUS;
      if (this.aura_radius_2 <= 0) this.aura_radius_2 = this.ΜΑΧ_AURA_RADIUS;
    }

    // Creating a Trail particle and add it to the list
    this.game.particleObjects.push(
      new Trail({
        x: this.gameObject.position.x,
        y: this.gameObject.position.y,
        reductor: 12,
        color: this.type === "minus" ? COLOR.RED : COLOR.LIGHT_BLUE,
        width: this.gameObject.width,
        height: this.gameObject.height,
        life: 0.7,
        minus: 0.02,
        game: this.game,
      })
    );
    this.game.particleObjects.push(
      new Trail({
        x: this.gameObject.position.x,
        y: this.gameObject.position.y,
        reductor: 12,
        color: this.type === "minus" ? COLOR.LIGHT_BLUE : COLOR.RED,
        width: this.gameObject.width,
        height: this.gameObject.height,
        life: 1,
        minus: 0.1,
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
}
