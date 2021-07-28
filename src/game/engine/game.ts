import InputHandler from "./input";
import Player from "./player";
import { GAME_STATE } from "../enum/game_state";
import { ENTITY_ID } from "../enum/entitiy_id";
import GameObject from "./gameObject";
//import Menu from "./menu";
import Hud from "./hud";
import Spawner from "./spawner";
import Trail from "./trail";
import { setGameState } from "../../redux/slices/gameSlice";
import store from "../../redux/store";

type GameProps = {
  canvasWidth: number;
  canvasHeight: number;
};

export default class Game {
  level: number;
  dev: boolean;
  gameObjects: GameObject[];
  particleObjects: Trail[];
  canvas: GameProps;
  gameState: GAME_STATE;
  player: Player;
  spawner: Spawner;
  hud: Hud;

  constructor({ canvasHeight, canvasWidth }: GameProps) {
    this.canvas = { canvasHeight, canvasWidth };
    // experimental level;

    this.level = 1;
    // Dev option for debugging
    this.dev = true;
    /**
     * gameObjects -> Player can interact with (Player excluded)
     * particleObject -> Player usually cannot interact with
     */
    this.gameObjects = [];
    this.particleObjects = [];

    this.gameState = GAME_STATE.PLAYING;

    this.spawner = new Spawner({ game: this });
    //this.menu = new Menu(this, this.spawner);
    this.hud = new Hud({ game: this });
    this.player = new Player({ game: this });

    // TESTING
    // this.menu.playGame(this.level);

    new InputHandler({ game: this });
  }

  //This function runs once per reload of the page
  start(level: number) {
    this.level = level;
    this.spawner.startLevel(this.level);
  }

  close() {
    this.gameState = GAME_STATE.CLOSED;
    this.gameObjects = [];
    this.particleObjects = [];
  }

  reset() {
    this.gameObjects = [];
    this.particleObjects = [];
    this.player.reset();
    this.togglePause(GAME_STATE.PLAYING);
    this.spawner.reset();
    this.spawner.startLevel(this.level);
  }

  clearEnemies() {
    for (let i = 0; i < this.gameObjects.length; i++) {
      if (
        this.gameObjects[i].gameObject.id === ENTITY_ID.BASIC_ENEMY ||
        this.gameObjects[i].gameObject.id === ENTITY_ID.VENOM
      ) {
        this.gameObjects.splice(i, 1);
        i--;
      }
    }

    // this.gameObjects.forEach(object => {
    //     if (object.id === ENTITY_ID.BASIC_ENEMY) {
    //         this.gameObjects.splice(this.gameObjects.indexOf(object), 1);
    //     }
    // });
  }

  togglePause(optionalState?: GAME_STATE) {
    if (optionalState) {
      this.gameState = optionalState;
    } else if (this.gameState === GAME_STATE.PAUSED) {
      this.gameState = GAME_STATE.PLAYING;
    } else {
      this.gameState = GAME_STATE.PAUSED;
    }
    store.dispatch(setGameState(this.gameState));
  }

  update(deltaTime: number) {
    if (this.gameState === GAME_STATE.PLAYING) {
      this.particleObjects.forEach((object) => object.update(deltaTime));
      this.gameObjects.forEach((object) => object.update(deltaTime));
      this.spawner.update(deltaTime);
      this.hud.update(deltaTime);
      this.player.update(deltaTime);
    }
  }

  draw(context: any) {
    // if (this.gameState === GAME_STATE.PLAYING) {
    this.particleObjects.forEach((object) => object.draw(context));
    this.gameObjects.forEach((object) => object.draw(context));
    this.hud.draw(context);
    this.player.draw(context);
    //}
  }
}
