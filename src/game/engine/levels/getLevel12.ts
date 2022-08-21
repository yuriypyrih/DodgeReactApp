import { playText } from "../../../redux/slices/vfxSlice";
import store from "../../../redux/store";
import { sec } from "../../../utils/deltaTime";
import { Stars } from "../../types/Stars";
import Game from "../game";
import MimicEnemy from "../../entities/mimic_enemy";
import Star from "../../entities/star";
import MimicBoss from "../../entities/mimic_boss";

export const level12Stars: Stars = [18, 30, 55];

export const getLevel12 = (game: Game): null => {
  if (game.spawner.executionSequence === 0) {
    if (game.spawner.roundTimer === sec(0.1)) {
      store.dispatch(playText(["LEVEL 12", "Glitch"]));
    } else if (game.spawner.roundTimer === sec(2)) {
      game.gameObjects.push(
        new MimicEnemy({ game, position: { x: 10, y: 20 } })
      );
    } else if (game.spawner.roundTimer === sec(level12Stars[0])) {
      game.gameObjects.push(
        new Star({
          game,
          position: { x: game.canvas.canvasWidth / 2 - 20, y: 50 },
        })
      );
    }
  } else if (game.spawner.executionSequence === 1) {
    game.spawner.executionSequence++;
    game.spawner.roundTimer = sec(level12Stars[0]) + 1;
  }
  if (game.spawner.executionSequence === 2) {
    if (game.spawner.roundTimer === sec(level12Stars[0] + 1.2)) {
      game.gameObjects.push(
        new MimicEnemy({ game, position: { x: 10, y: 20 } })
      );
    } else if (game.spawner.roundTimer === sec(level12Stars[0] + 2.6)) {
      game.gameObjects.push(
        new MimicEnemy({ game, position: { x: 10, y: 220 } })
      );
    } else if (game.spawner.roundTimer === sec(level12Stars[1])) {
      game.gameObjects.push(
        new Star({
          game,
          position: { x: game.canvas.canvasWidth / 2 - 20, y: 50 },
        })
      );
    }
  } else if (game.spawner.executionSequence === 3) {
    game.clearEnemies();
    game.spawner.executionSequence++;
    game.spawner.roundTimer = sec(level12Stars[1]) + 1;
  } else if (game.spawner.executionSequence === 4) {
    if (game.spawner.roundTimer === sec(level12Stars[1] + 1.2)) {
      game.gameObjects.push(
        new MimicBoss({
          game,
        })
      );
    }
    if (game.spawner.roundTimer === sec(level12Stars[2])) {
      game.gameObjects.push(
        new Star({
          game,
          position: { x: game.canvas.canvasWidth / 2 - 20, y: 50 },
        })
      );
    }
  }
  return null;
};
