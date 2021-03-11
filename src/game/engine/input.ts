import { GAME_STATE } from "../enum/game_state";
import Game from "./game";

type InputHandlerProps = {
  game: Game;
};

export default class InputHandler {
  game: Game;
  constructor({ game }: InputHandlerProps) {
    this.game = game;
    document.addEventListener("keydown", (event) => {
      switch (event.code) {
        case "ArrowLeft":
          this.game.player.moveLeft();
          break;

        case "ArrowUp":
          this.game.player.moveUp();
          break;

        case "ArrowRight":
          this.game.player.moveRight();
          break;

        case "ArrowDown":
          this.game.player.moveDown();
          break;
        case "Space":
          this.game.togglePause();
          break;
        case "Escape":
          this.game.togglePause();
          break;
      }
    });

    document.addEventListener("keyup", (event) => {
      switch (event.code) {
        case "ArrowLeft":
          if (this.game.player.gameObject.velX < 0) this.game.player.stopX();
          break;

        case "ArrowUp":
          if (this.game.player.gameObject.velY < 0) this.game.player.stopY();
          break;
        case "ArrowRight":
          if (this.game.player.gameObject.velX > 0) this.game.player.stopX();
          break;

        case "ArrowDown":
          if (this.game.player.gameObject.velY > 0) this.game.player.stopY();
          break;
      }
    });
  }
}
