import { setGameState } from "../redux/slices/gameSlice";
import store from "../redux/store";
import Game from "./engine/game";
import { GAME_STATE } from "./enum/game_state";

let context: CanvasRenderingContext2D | null = null;

export const setContext = (newContext: any) => {
  context = newContext;
};

const startEngine = () => {
  const canvas = <HTMLCanvasElement>(
    document.getElementById("gameScreen-canvas")
  );

  if (canvas) {
    context = canvas.getContext("2d");
    // const GAME_WIDTH = canvas.offsetWidth;
    // const GAME_HEIGHT = canvas.offsetHeight;
  }

  const GAME_WIDTH = 900;
  const GAME_HEIGHT = 500;

  // Initiating our game engine and run it.
  // We pass default values for canvasWidth and canvasHeight since we initialize the Game at App level
  // But we have to pass the actual canvas size at game.Start just to make sure
  let game = new Game({ canvasWidth: GAME_WIDTH, canvasHeight: GAME_HEIGHT });
  //game.start();
  //game.spawner.startLevel(1);

  let lastTime = 0;
  let elapsed = 0;

  function gameLoop(timestamp: number) {
    if (game.gameState === GAME_STATE.PLAYING || context !== null) {
      let deltaTime = timestamp - lastTime;
      elapsed += deltaTime;
      lastTime = timestamp;

      // elapsed >= 1000 / 100 Throttling the game aat 60fps
      if (elapsed >= 1000 / 100) {
        // Clear Screen
        context?.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
        // Update Logic and Redraw
        game.update(elapsed);
        game.draw(context);
        //Resetting elapsed after passing it into the game
        elapsed = 0;
      }
    }

    requestAnimationFrame(gameLoop);
  }

  requestAnimationFrame(gameLoop);

  return game;
};

export default startEngine;
