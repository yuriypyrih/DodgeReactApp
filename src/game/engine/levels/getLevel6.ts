import { playText } from "../../../redux/slices/vfxSlice";
import store from "../../../redux/store";
import { sec } from "../../../utils/deltaTime";
import { Stars } from "../../types/Stars";
import Game from "../game";
import SpeederEnemy from "../../entities/speeder_enemy";
import Star from "../../entities/star";
import BasicEnemy from "../../entities/basic_enemy";
import { level2Stars } from "./getLevel2";
import TracerEnemy from "../../entities/tracer_enemy";

export const level6Stars: Stars = [7, 42, 52];

export const getLevel6 = (game: Game): null => {
  if (game.spawner.executionSequence === 0) {
    if (game.spawner.roundTimer === sec(0.1)) {
      store.dispatch(playText(["LEVEL 6", "Bomber"]));
    } else if (game.spawner.roundTimer === sec(1.5)) {
      game.gameObjects.push(
        new BasicEnemy({ game, position: { x: 1, y: 40 } })
      );
    } else if (game.spawner.roundTimer === sec(level2Stars[0])) {
      game.gameObjects.push(
        new Star({
          game,
          position: { x: game.canvas.canvasWidth / 2 - 20, y: 50 },
        })
      );
    }
  } else if (game.spawner.executionSequence === 1) {
    game.spawner.executionSequence++;
    game.spawner.roundTimer = sec(level2Stars[0]) + 1;
  } else if (game.spawner.executionSequence === 2) {
    if (game.spawner.roundTimer === sec(8)) {
      game.gameObjects.push(
        new BasicEnemy({ game, position: { x: 40, y: 10 } })
      );
    } else if (game.spawner.roundTimer === sec(9)) {
      game.gameObjects.push(
        new BasicEnemy({ game, position: { x: 1, y: 120 } })
      );
    } else if (game.spawner.roundTimer === sec(10)) {
      game.gameObjects.push(
        new TracerEnemy({ game, position: { x: 1, y: 120 } })
      );
    }
  }
  return null;
};
