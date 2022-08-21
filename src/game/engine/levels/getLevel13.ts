import { playText } from "../../../redux/slices/vfxSlice";
import store from "../../../redux/store";
import { sec } from "../../../utils/deltaTime";
import { Stars } from "../../types/Stars";
import Game from "../game";
import WormEnemy from "../../entities/worm_enemy";
import SlimeEnemy from "../../entities/slime_enemy";
import Star from "../../entities/star";
import VenomEnemy from "../../entities/venom_enemy";
import BomberEnemy from "../../entities/bomber_enemy";

export const level13Stars: Stars = [16, 25, 36];

export const getLevel13 = (game: Game): null => {
  if (game.spawner.executionSequence === 0) {
    if (game.spawner.roundTimer === sec(0.1)) {
      store.dispatch(playText(["LEVEL 13", "Marathon V2"]));
    } else if (game.spawner.roundTimer === sec(2)) {
      game.gameObjects.push(
        new WormEnemy({ game, position: { x: 750, y: 10 } })
      );
    } else if (game.spawner.roundTimer === sec(2.2)) {
      game.gameObjects.push(
        new WormEnemy({ game, position: { x: 600, y: 10 } })
      );
    } else if (game.spawner.roundTimer === sec(2.4)) {
      game.gameObjects.push(
        new WormEnemy({ game, position: { x: 450, y: 10 } })
      );
    } else if (game.spawner.roundTimer === sec(2.6)) {
      game.gameObjects.push(
        new WormEnemy({ game, position: { x: 300, y: 10 } })
      );
    } else if (game.spawner.roundTimer === sec(2.8)) {
      game.gameObjects.push(
        new WormEnemy({ game, position: { x: 150, y: 10 } })
      );
    } else if (game.spawner.roundTimer === sec(3)) {
      game.gameObjects.push(
        new SlimeEnemy({ game, position: { x: 1, y: 10 } })
      );
      game.gameObjects.push(
        new SlimeEnemy({ game, position: { x: 1, y: 200 } })
      );
      game.gameObjects.push(
        new SlimeEnemy({ game, position: { x: 1, y: 400 } })
      );
    } else if (game.spawner.roundTimer === sec(4)) {
      game.gameObjects.push(
        new SlimeEnemy({ game, position: { x: 1, y: 10 } })
      );
      game.gameObjects.push(
        new SlimeEnemy({ game, position: { x: 1, y: 200 } })
      );
      game.gameObjects.push(
        new SlimeEnemy({ game, position: { x: 1, y: 400 } })
      );
    } else if (game.spawner.roundTimer === sec(level13Stars[0])) {
      game.gameObjects.push(
        new Star({
          game,
          position: {
            x: game.canvas.canvasWidth - 60,
            y: game.canvas.canvasHeight - 60,
          },
        })
      );
    }
  } else if (game.spawner.executionSequence === 1) {
    game.clearEnemies();
    game.spawner.executionSequence++;
    game.spawner.roundTimer = sec(level13Stars[0]) + 1;
  } else if (game.spawner.executionSequence === 2) {
    if (game.spawner.roundTimer === sec(level13Stars[0] + 1.2)) {
      game.gameObjects.push(
        new VenomEnemy({ game, position: { x: 1, y: 20 } })
      );
      game.gameObjects.push(
        new VenomEnemy({ game, position: { x: 1, y: 350 } })
      );
    } else if (game.spawner.roundTimer === sec(level13Stars[0] + 2.2)) {
      game.gameObjects.push(
        new VenomEnemy({ game, position: { x: 1, y: 20 } })
      );
      game.gameObjects.push(
        new VenomEnemy({ game, position: { x: 1, y: 350 } })
      );
    } else if (game.spawner.roundTimer === sec(level13Stars[0] + 3.2)) {
      game.gameObjects.push(
        new VenomEnemy({ game, position: { x: 1, y: 20 } })
      );
      game.gameObjects.push(
        new VenomEnemy({ game, position: { x: 1, y: 350 } })
      );
    } else if (game.spawner.roundTimer === sec(level13Stars[0] + 4.2)) {
      game.gameObjects.push(
        new VenomEnemy({ game, position: { x: 1, y: 20 } })
      );
      game.gameObjects.push(
        new VenomEnemy({ game, position: { x: 1, y: 350 } })
      );
    } else if (game.spawner.roundTimer === sec(level13Stars[0] + 5.2)) {
      game.gameObjects.push(
        new VenomEnemy({ game, position: { x: 1, y: 20 } })
      );
      game.gameObjects.push(
        new VenomEnemy({ game, position: { x: 1, y: 350 } })
      );
    } else if (game.spawner.roundTimer === sec(level13Stars[0] + 6.2)) {
      game.gameObjects.push(
        new VenomEnemy({ game, position: { x: 1, y: 20 } })
      );
      game.gameObjects.push(
        new VenomEnemy({ game, position: { x: 1, y: 350 } })
      );
    } else if (game.spawner.roundTimer === sec(level13Stars[1])) {
      game.gameObjects.push(
        new Star({
          game,
          position: {
            x: 20,
            y: 60,
          },
        })
      );
    }
  } else if (game.spawner.executionSequence === 3) {
    game.clearEnemies();
    game.spawner.executionSequence++;
    game.spawner.roundTimer = sec(level13Stars[1]) + 1;
  } else if (game.spawner.executionSequence === 4) {
    if (game.spawner.roundTimer === sec(level13Stars[1] + 1.2)) {
      game.gameObjects.push(
        new BomberEnemy({ game, position: { x: 1, y: 20 } })
      );
    } else if (game.spawner.roundTimer === sec(level13Stars[1] + 2.2)) {
      game.gameObjects.push(
        new BomberEnemy({ game, position: { x: 1, y: 20 } })
      );
    }
    if (game.spawner.roundTimer === sec(level13Stars[1] + 3.2)) {
      game.gameObjects.push(
        new BomberEnemy({ game, position: { x: 1, y: 20 } })
      );
    } else if (game.spawner.roundTimer === sec(level13Stars[1] + 4.2)) {
      game.gameObjects.push(
        new BomberEnemy({ game, position: { x: 1, y: 20 } })
      );
    } else if (game.spawner.roundTimer === sec(level13Stars[1] + 5.2)) {
      game.gameObjects.push(
        new BomberEnemy({ game, position: { x: 1, y: 20 } })
      );
    } else if (game.spawner.roundTimer === sec(level13Stars[2])) {
      game.gameObjects.push(
        new Star({
          game,
          position: {
            x: game.canvas.canvasWidth - 60,
            y: game.canvas.canvasHeight - 60,
          },
        })
      );
    }
  }

  return null;
};
