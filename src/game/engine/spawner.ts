import BasicEnemy from "../entities/basic_enemy";
import BasicBoss from "../entities/basic_boss";
import SpeederEnemy from "../entities/speeder_enemy";
import BouncerEnemy from "../entities/bouncer_enemy";
import WormEnemy from "../entities/worm_enemy";
import SmartEnemy from "../entities/smart_enemy";
import VenomEnemy from "../entities/venom_enemy";
import Healthpack from "../entities/healthpack";
import Star from "../entities/star";
import Game from "./game";
import store from "../../redux/store";
import { setProgress } from "../../redux/slices/gameSlice";

type SpawnerProps = {
  game: Game;
};

export default class Spawner {
  game: Game;
  executionSequence: number;
  roundTimer: number;
  constructor({ game }: SpawnerProps) {
    this.game = game;

    this.executionSequence = 0;
    this.roundTimer = 0; // Throu calculations 1 sec of real Time is about roundTimer = 60
  }

  reset() {
    this.executionSequence = 0;
    this.roundTimer = 0;
  }

  startLevel(level: number) {
    store.dispatch(
      setProgress({
        max_stars: 3,
        total_stars_collected: 0,
        star_timers: [30, 120, 160],
      })
    );
    this.reset();
    //hud.reset():
  }

  spawnRandomHealthpack() {
    let random_x =
      Math.floor(Math.random() * (this.game.canvas.canvasWidth - 30)) + 2;
    let random_y =
      Math.floor(Math.random() * (this.game.canvas.canvasHeight - 80)) + 50;
    //this.game.gameObjects.push(new Healthpack(this.game, random_x, random_y));
  }

  update(deltaTime: number) {
    this.roundTimer++;
    //store.dispatch(setTimer(this.roundTimer));

    if (this.game.player.milestone) {
      this.executionSequence++;
      this.game.player.milestone = false;
    }

    if (
      this.roundTimer % 777 === 0 &&
      this.game.player.health !== 100 &&
      this.game.level !== 1
    ) {
      //  this.spawnRandomHealthpack();
    }

    if (this.game.level === 1) {
      if (this.executionSequence === 0) {
        if (this.roundTimer === 20) {
          this.game.gameObjects.push(
            new BasicEnemy({ game: this.game, position: { x: 1, y: 1 } })
          );
        } else if (this.roundTimer === 30) {
          this.game.gameObjects.push(
            new Star({ game: this.game, position: { x: 300, y: 100 } })
          );
        } else if (this.roundTimer > 31) {
          this.roundTimer = 31;
        }
      } else if (this.executionSequence === 1) {
        this.executionSequence++;
        this.roundTimer = 31;
        //store.dispatch(setTimer(this.roundTimer));
      } else if (this.executionSequence === 2) {
        if (this.roundTimer === 40) {
          this.game.gameObjects.push(
            new BasicEnemy({ game: this.game, position: { x: 1, y: 1 } })
          );
        } else if (this.roundTimer === 120) {
          this.game.gameObjects.push(
            new Star({ game: this.game, position: { x: 600, y: 200 } })
          );
        } else if (this.roundTimer > 121) {
          this.roundTimer = 121;
        }
      } else if (this.executionSequence === 3) {
        this.executionSequence++;
        this.roundTimer = 121;
        //store.dispatch(setTimer(this.roundTimer));
      } else if (this.executionSequence === 4) {
        if (this.roundTimer === 140) {
          this.game.gameObjects.push(
            new BasicEnemy({ game: this.game, position: { x: 1, y: 1 } })
          );
        } else if (this.roundTimer === 160) {
          this.game.gameObjects.push(
            new Star({ game: this.game, position: { x: 600, y: 400 } })
          );
        } else if (this.roundTimer > 161) {
          this.roundTimer = 161;
        }
      } else if (this.executionSequence === 5) {
        this.executionSequence++;
        this.roundTimer = 161;
        //store.dispatch(setTimer(this.roundTimer));
      }
    }
  }
}
