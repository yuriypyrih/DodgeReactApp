import { playText } from "../../../redux/slices/vfxSlice";
import store from "../../../redux/store";
import { sec } from "../../../utils/deltaTime";
import { Stars } from "../../types/Stars";
import Game from "../game";
import SpeederEnemy from "../../entities/speeder_enemy";
import Star from "../../entities/star";
import TracerEnemy from "../../entities/tracer_enemy";
import BomberBoss from "../../entities/bomber_boss";
import BomberEnemy from "../../entities/bomber_enemy";
import BasicEnemy from "../../entities/basic_enemy";

export const level6Stars: Stars = [7, 15, 30];

const levelStars = level6Stars;

export const getLevel6 = (game: Game): null => {
  if (game.spawner.executionSequence === 0) {
    if (game.spawner.roundTimer === sec(0.1)) {
      store.dispatch(playText(["LEVEL 6", "Bomber"]));
    } else if (game.spawner.roundTimer === sec(1.5)) {
      game.gameObjects.push(
        new BomberEnemy({ game, position: { x: 1, y: 40 } })
      );
    } else if (game.spawner.roundTimer === sec(levelStars[0])) {
      game.gameObjects.push(
        new Star({
          game,
          position: { x: game.canvas.canvasWidth / 2 - 20, y: 50 },
        })
      );
    }
  } else if (game.spawner.executionSequence === 1) {
    game.spawner.executionSequence++;
    game.spawner.roundTimer = sec(levelStars[0]) + 1;
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
    } else if (game.spawner.roundTimer === sec(levelStars[1])) {
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
    game.spawner.roundTimer = sec(levelStars[1]) + 1;
  } else if (game.spawner.executionSequence === 4) {
    if (game.spawner.roundTimer === sec(15.5)) {
      game.gameObjects.push(
        new BomberBoss({
          game,
        })
      );
    } else if (game.spawner.roundTimer === sec(levelStars[2])) {
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
