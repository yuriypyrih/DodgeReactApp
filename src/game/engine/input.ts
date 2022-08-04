import Game from "./game";

type InputHandlerProps = {
  game: Game;
};

const keyDownEvents = (event: any, game: Game) => {
  switch (event.code) {
    case "ArrowLeft":
      game.player.moveLeft();
      break;
    case "ArrowUp":
      game.player.moveUp();
      break;
    case "ArrowRight":
      game.player.moveRight();
      break;
    case "ArrowDown":
      game.player.moveDown();
      break;
    case "KeyQ":
      game.player.useActiveRelic();
      break;
    case "Space":
      game.togglePause();
      break;
    case "Escape":
      game.togglePause();
      break;
  }
};

const keyUpEvents = (event: any, game: Game) => {
  switch (event.code) {
    case "ArrowLeft":
      if (game.player.gameObject.velX < 0) game.player.stopX();
      break;
    case "ArrowUp":
      if (game.player.gameObject.velY < 0) game.player.stopY();
      break;
    case "ArrowRight":
      if (game.player.gameObject.velX > 0) game.player.stopX();
      break;
    case "ArrowDown":
      if (game.player.gameObject.velY > 0) game.player.stopY();
      break;
  }
};

export default class InputHandler {
  game: Game;
  constructor({ game }: InputHandlerProps) {
    this.game = game;
  }

  // keyDownEvents = (event: any) => {
  //   switch (event.code) {
  //     case "ArrowLeft":
  //       this.game.player.moveLeft();
  //       break;
  //     case "ArrowUp":
  //       this.game.player.moveUp();
  //       break;
  //     case "ArrowRight":
  //       this.game.player.moveRight();
  //       break;
  //     case "ArrowDown":
  //       this.game.player.moveDown();
  //       break;
  //     case "KeyQ":
  //       this.game.player.useActiveRelic();
  //       break;
  //     case "Space":
  //       this.game.togglePause();
  //       break;
  //     case "Escape":
  //       this.game.togglePause();
  //       break;
  //   }
  // };

  initEvents() {
    console.log("EVENTS INIT");
    document.addEventListener("keydown", (event) =>
      keyDownEvents(event, this.game)
    );
    document.addEventListener("keyup", (event) =>
      keyUpEvents(event, this.game)
    );
  }

  terminate() {
    document.removeEventListener("keydown", (event) =>
      keyDownEvents(event, this.game)
    );
    document.removeEventListener("keyup", (event) =>
      keyUpEvents(event, this.game)
    );
  }
}
