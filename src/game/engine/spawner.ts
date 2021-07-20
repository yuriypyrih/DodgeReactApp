import Game from "./game";
import store from "../../redux/store";
import { setProgress } from "../../redux/slices/gameSlice";
import { getLevel1, level1Stars } from "./levels/getLevel1";
import { getLevel2, level2Stars } from "./levels/getLevel2";
import { sec } from "../../utils/deltaTime";

type SpawnerProps = {
  game: Game;
};

export default class Spawner {
  game: Game;
  executionSequence: number;
  roundTimer: number;
  levelStars: number[][];
  constructor({ game }: SpawnerProps) {
    this.game = game;

    this.executionSequence = 0;
    this.roundTimer = 0; // Throu calculations 1 sec of real Time is about roundTimer = 60
    this.levelStars = [level1Stars, level2Stars];
  }

  reset() {
    this.executionSequence = 0;
    this.roundTimer = sec(0);
  }

  startLevel(level: number) {
    this.updateHudProgress();
    this.reset();
    //hud.reset():
  }

  updateHudProgress() {
    // console.log(
    //   "I tried",
    //   this.levelStars[this.game.level - 1].length,
    //   this.game.level
    // );
    store.dispatch(
      setProgress({
        max_stars: this.levelStars[this.game.level - 1].length,
        total_stars_collected: this.game.player.stars,
        star_timers: this.levelStars[this.game.level - 1],
      })
    );
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
      getLevel1(this.game);
    } else if (this.game.level === 2) {
      getLevel2(this.game);
    }
  }
}
