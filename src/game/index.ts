import { setGameState } from "../redux/slices/gameSlice";
import store from "../redux/store";
import Game from "./engine/game";
import { GAME_STATE } from "./enum/game_state";

const startEngine = () => {
  const canvas = <HTMLCanvasElement>(
    document.getElementById("gameScreen-canvas")
  );
  const context = canvas.getContext("2d");

  const GAME_WIDTH = canvas.offsetWidth;
  const GAME_HEIGHT = canvas.offsetHeight;

  //console.log(GAME_HEIGHT);
  //console.log(GAME_WIDTH);

  // Initiating our game engine and run it.
  let game = new Game({ canvasWidth: GAME_WIDTH, canvasHeight: GAME_HEIGHT });
  //game.start();
  //game.spawner.startLevel(1);

  let lastTime = 0;

  function gameLoop(timestamp: number) {
    if (game.gameState === GAME_STATE.CLOSED) {
      //Abort the loop when the gameState is CLOSED
      store.dispatch(setGameState(GAME_STATE.CLOSED));
      return null;
    }

    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    // Clear Screen
    context?.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    game.update(deltaTime);
    game.draw(context);
    requestAnimationFrame(gameLoop);
  }

  requestAnimationFrame(gameLoop);

  return game;
};

export default startEngine;
