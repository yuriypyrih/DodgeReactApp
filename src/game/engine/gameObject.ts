import { ENTITY_ID } from "../enum/entitiy_id";
import { Rectangle } from "../types/Rectangle";

type GameObjectProps = {
  id: ENTITY_ID;
  width: number;
  height: number;
  position: { x: number; y: number };
  velX: number;
  velY: number;
};

export default abstract class GameObject {
  gameObject: GameObjectProps;
  constructor({ id, width, height, position, velX, velY }: GameObjectProps) {
    this.gameObject = {
      id,
      width,
      height,
      position,
      velX,
      velY,
    };
  }

  abstract update(deltaTime: number): void;
  abstract draw(g: any): void;
  abstract getBounds(): Rectangle;
}
