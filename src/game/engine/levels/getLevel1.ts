import { playText } from "../../../redux/slices/vfxSlice";
import store from "../../../redux/store";
import { sec } from "../../../utils/deltaTime";
import BasicBoss from "../../entities/basic_boss";
import BasicEnemy from "../../entities/basic_enemy";
import Healthpack from "../../entities/healthpack";
import Star from "../../entities/star";
import { Stars } from "../../types/Stars";
import Game from "../game";

export const level1Stars: Stars = [24, 42, 52];

const levelStars = level1Stars;

export const getLevel1 = (game: Game): null => {
  if (game.spawner.executionSequence === 0) {
    if (game.spawner.roundTimer === sec(0.1)) {
      store.dispatch(playText(["LEVEL 1", "Scout"]));
    } else if (game.spawner.roundTimer === sec(4.5)) {
      store.dispatch(playText(["Use Arrows ←↑↓→ ", "to move around"]));
    } else if (game.spawner.roundTimer === sec(9)) {
      store.dispatch(playText(["Dodge the enemies"]));
    } else if (game.spawner.roundTimer === sec(12)) {
      game.gameObjects.push(
        new BasicEnemy({ game, position: { x: 1, y: 40 } })
      );
    } else if (game.spawner.roundTimer === sec(18)) {
      store.dispatch(playText(["Healthpacks are randomly", "generated"]));
      game.gameObjects.push(
        new Healthpack({ game, position: { x: 650, y: 100 } })
      );
    } else if (game.spawner.roundTimer === sec(levelStars[0])) {
      store.dispatch(playText(["Collect all stars", "to win!"]));
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
    if (game.spawner.roundTimer === sec(25)) {
      game.gameObjects.push(
        new BasicEnemy({ game, position: { x: 1, y: 40 } })
      );
    } else if (game.spawner.roundTimer === sec(27)) {
      game.gameObjects.push(
        new BasicEnemy({ game, position: { x: 1, y: 60 } })
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
    if (game.spawner.roundTimer === sec(42.5)) {
      game.gameObjects.push(
        new BasicBoss({
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
