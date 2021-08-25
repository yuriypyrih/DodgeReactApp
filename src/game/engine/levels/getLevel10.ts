import { playText } from "../../../redux/slices/vfxSlice";
import store from "../../../redux/store";
import { sec } from "../../../utils/deltaTime";
import { Stars } from "../../types/Stars";
import Game from "../game";
import GhostEnemy from "../../entities/ghost_enemy";
import Star from "../../entities/star";
import GhostBoss from "../../entities/ghost_boss";
import WormEnemy from "../../entities/worm_enemy";

export const level10Stars: Stars = [7, 35, 50];

const levelStars = level10Stars;

export const getLevel10 = (game: Game): null => {
  if (game.spawner.executionSequence === 0) {
    if (game.spawner.roundTimer === sec(0.1)) {
      store.dispatch(playText(["LEVEL 10", "Ghost"]));
    } else if (game.spawner.roundTimer === sec(1.5)) {
      game.gameObjects.push(new GhostEnemy({ game, position: { x: 1, y: 1 } }));
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
    if (game.spawner.roundTimer === sec(levelStars[0] + 1)) {
      game.gameObjects.push(new WormEnemy({ game, position: { x: 1, y: 1 } }));
    }
    if (game.spawner.roundTimer === sec(levelStars[0] + 2)) {
      game.gameObjects.push(
        new GhostEnemy({ game, position: { x: 40, y: 10 } })
      );
    } else if (game.spawner.roundTimer === sec(levelStars[0] + 3)) {
      game.gameObjects.push(
        new GhostEnemy({ game, position: { x: 1, y: 100 } })
      );
    } else if (game.spawner.roundTimer === sec(levelStars[0] + 4)) {
      game.gameObjects.push(
        new GhostEnemy({ game, position: { x: 60, y: 1 } })
      );
    } else if (game.spawner.roundTimer === sec(levelStars[0] + 5)) {
      game.gameObjects.push(new GhostEnemy({ game, position: { x: 0, y: 0 } }));
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
    if (game.spawner.roundTimer === sec(levelStars[1] + 1)) {
      game.gameObjects.push(
        new GhostBoss({
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
