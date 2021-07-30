import { ENTITY_ID } from "../enum/entitiy_id";
import { COLOR } from "../enum/colors";
import GameObject from "./gameObject";
import Game from "./game";
import { Rectangle } from "../types/Rectangle";
import store from "../../redux/store";
import { setGameState, setHP, setPoisoned } from "../../redux/slices/gameSlice";
import Trail from "./trail";
import {
  playAnimation,
  playText,
  setDarkness,
} from "../../redux/slices/vfxSlice";
import { VFX } from "../enum/vfx";
import { GAME_STATE } from "../enum/game_state";
import { RELICS_NAME } from "../enum/relics_name";
import { RelicType } from "../types/RelicType";

type PlayerProps = {
  game: Game;
};

export default class Player extends GameObject {
  game: Game;
  gameWidth: number;
  gameHeight: number;
  health: number;
  death_thresholder: number;
  readonly IMMUNITY_IN_MILISEC: number;
  readonly MAGNET_POWER: number;
  recently_damaged: number;
  stars: number;
  milestone: boolean;
  poisoned: boolean;
  lastPoisonedDate: number;
  maxSpeed: number;
  maxDiagonialSpeed: number;
  developerMode: boolean;
  magneticY: number;
  magneticX: number;
  darkness: number;
  relic: RelicType | null;
  relic_available_uses: number;

  constructor({ game }: PlayerProps) {
    super({
      id: ENTITY_ID.PLAYER,
      width: 25,
      height: 25,
      position: {
        x: 0,
        y: 0,
      },
      velY: 0,
      velX: 0,
    });
    this.gameWidth = game.canvas.canvasWidth;
    this.gameHeight = game.canvas.canvasHeight;
    this.game = game;
    this.health = 100;
    this.death_thresholder = -10;
    this.IMMUNITY_IN_MILISEC = 1000;
    this.MAGNET_POWER = 9;
    this.recently_damaged = 0;
    this.stars = 0;
    this.milestone = false;
    this.poisoned = false;
    this.developerMode = true;
    this.lastPoisonedDate = Date.now();
    this.magneticY = 0;
    this.magneticX = 0;
    this.darkness = 0;
    this.relic = null;
    this.relic_available_uses = 0;

    this.gameObject.position = {
      x: game.canvas.canvasWidth / 2 - this.gameObject.width / 2,
      y: game.canvas.canvasHeight / 2 - this.gameObject.height / 2,
    };

    this.maxSpeed = 6;
    this.maxDiagonialSpeed = Math.ceil(this.maxSpeed / Math.sqrt(2));
  }

  moveLeft() {
    this.gameObject.velX = -this.maxSpeed;
  }

  moveRight() {
    this.gameObject.velX = this.maxSpeed;
  }

  moveUp() {
    this.gameObject.velY = -this.maxSpeed;
  }

  moveDown() {
    this.gameObject.velY = this.maxSpeed;
  }

  stopX() {
    this.gameObject.velX = 0;
  }

  stopY() {
    this.gameObject.velY = 0;
  }

  reset() {
    this.gameObject.position = {
      x: this.game.canvas.canvasWidth / 2 - this.gameObject.width / 2,
      y: this.game.canvas.canvasHeight / 2 - this.gameObject.height / 2,
    };
    this.health = 100;
    this.recently_damaged = 0;
    this.stars = 0;
    this.milestone = false;
    this.poisoned = false;
    this.darkness = 0;

    if (this.relic) {
      this.relic_available_uses = this.relic.max_uses;
    } else {
      this.relic_available_uses = 0;
    }
  }

  getBounds() {
    const rectange: Rectangle = {
      x: this.gameObject.position.x,
      y: this.gameObject.position.y,
      width: this.gameObject.width,
      height: this.gameObject.height,
    };
    return rectange;
  }

  collision(rectangle: Rectangle) {
    // collision detected!
    if (
      this.gameObject.position.x < rectangle.x + rectangle.width &&
      this.gameObject.position.x + this.gameObject.width > rectangle.x &&
      this.gameObject.position.y < rectangle.y + rectangle.height &&
      this.gameObject.position.y + this.gameObject.height > rectangle.y
    ) {
      return true;
    } else {
      return false;
    }
  }

  victoryConditionCheck() {
    if (this.stars >= 3 && !this.developerMode) {
      store.dispatch(setGameState(GAME_STATE.PAGE_VICTORY));
      this.game.close();
      return true;
    } else {
      return false;
    }
  }

  defeatConditionCheck() {
    if (this.health <= this.death_thresholder && !this.developerMode) {
      store.dispatch(setGameState(GAME_STATE.PAGE_DEFEAT));
      this.game.close();
      return true;
    } else {
      return false;
    }
  }

  assignRelic(relic: RelicType | null) {
    this.relic = relic;
    if (relic) {
      this.relic_available_uses = relic.max_uses;
    } else {
      this.relic_available_uses = 0;
    }
  }

  useActiveRelic() {
    if (this.relic && this.relic_available_uses > 0) {
      this.relic_available_uses--;
      if (this.relic.name === RELICS_NAME.IMMUNITY) {
        this.recently_damaged = -40;
      }
    }
  }

  draw(context: any) {
    context.fillStyle = COLOR.WHITE;
    context.fillRect(
      this.gameObject.position.x,
      this.gameObject.position.y,
      this.gameObject.width,
      this.gameObject.height
    );
  }

  update(deltaTime: number) {
    store.dispatch(setHP(this.health));

    if (this.victoryConditionCheck()) return null;
    if (this.defeatConditionCheck()) return null;

    if (this.gameObject.velX !== 0 && this.gameObject.velY !== 0) {
      this.gameObject.velX > 0
        ? (this.gameObject.velX = this.maxDiagonialSpeed)
        : (this.gameObject.velX = this.maxDiagonialSpeed * -1);
      this.gameObject.velY > 0
        ? (this.gameObject.velY = this.maxDiagonialSpeed)
        : (this.gameObject.velY = this.maxDiagonialSpeed * -1);
    }

    // Updating the Player's position based on its velocity
    this.gameObject.position.x += this.gameObject.velX;
    this.gameObject.position.y += this.gameObject.velY;

    // Creating a Trail particle and add it to the list
    this.game.particleObjects.push(
      new Trail({
        x: this.gameObject.position.x,
        y: this.gameObject.position.y,
        reductor: 0,
        color: COLOR.WHITE,
        width: this.gameObject.width,
        height: this.gameObject.height,
        life: 0.2,
        minus: 0.03,
        game: this.game,
      })
    );

    // Keeping track of when it was last time damaged, by default it start with 0 when the game start
    this.recently_damaged += deltaTime;

    if (this.poisoned) {
      const freshPoison = Date.now();
      if (freshPoison - this.lastPoisonedDate > 1000) {
        store.dispatch(setPoisoned(true));
        this.lastPoisonedDate = freshPoison;
        this.health -= 3;
      }
    }

    if (this.darkness > 0) {
      this.darkness -= 0.01;
      if (this.darkness < 0) {
        this.darkness = 0;
      }
      store.dispatch(setDarkness(this.darkness));
    }

    this.game.gameObjects.forEach((object: GameObject) => {
      if (this.collision(object.getBounds())) {
        // You're immune to dmg when healed
        if (object.gameObject.id === ENTITY_ID.HEALTH_PACK) {
          //Animation.pulseAqua();
          this.game.gameObjects.splice(
            this.game.gameObjects.indexOf(object),
            1
          );
          this.health += 30;
          store.dispatch(playAnimation(VFX.PULSE_GREEN));
          this.recently_damaged = 0;
        }

        if (object.gameObject.id === ENTITY_ID.STAR) {
          this.stars++;
          //IMPORTANT: First update the stars and then the hudProgress
          this.game.spawner.updateHudProgress();
          //store.dispatch(collectStar());
          //Animation.pulseGold();
          this.game.gameObjects.splice(
            this.game.gameObjects.indexOf(object),
            1
          );
          this.milestone = true;
          this.recently_damaged = 0;
        }

        if (object.gameObject.id === ENTITY_ID.BASIC_ENEMY) {
          // Take the damage only after the end of Immunity has expired
          // And reset the recently_damaged
          if (this.recently_damaged > this.IMMUNITY_IN_MILISEC) {
            store.dispatch(playAnimation(VFX.PULSE_RED));
            this.health -= 25;
            this.recently_damaged = 0;
          }
        }

        if (
          object.gameObject.id === ENTITY_ID.BOSS ||
          object.gameObject.id === ENTITY_ID.TITAN_BOSS
        ) {
          if (this.recently_damaged > this.IMMUNITY_IN_MILISEC) {
            store.dispatch(playAnimation(VFX.PULSE_RED));
            this.health -= 30;
            this.recently_damaged = 0;
          }
        }
        if (object.gameObject.id === ENTITY_ID.EXPLOSION) {
          if (this.recently_damaged > this.IMMUNITY_IN_MILISEC) {
            store.dispatch(playAnimation(VFX.PULSE_RED));
            this.health -= 50;
            this.recently_damaged = 0;
          }
        }
        if (object.gameObject.id === ENTITY_ID.BULLET) {
          if (this.recently_damaged > this.IMMUNITY_IN_MILISEC) {
            store.dispatch(playAnimation(VFX.PULSE_RED));
            this.health -= 10;
            this.recently_damaged = 0;
            this.game.gameObjects.splice(
              this.game.gameObjects.indexOf(object),
              1
            );
          }
        }

        if (object.gameObject.id === ENTITY_ID.VENOM) {
          // Take the damage only after the end of Immunity has expired
          // And reset the recently_damaged
          if (this.recently_damaged > this.IMMUNITY_IN_MILISEC) {
            //Animation.pulsePurple();
            if (!this.poisoned) {
              this.poisoned = true;
              store.dispatch(playText(["POISONED"]));
            }
            store.dispatch(playAnimation(VFX.PULSE_PURPLE));
            this.health -= 15;
            this.recently_damaged = 0;
          }
        }

        if (object.gameObject.id === ENTITY_ID.VENOM_BULLET) {
          // Take the damage only after the end of Immunity has expired
          // And reset the recently_damaged
          if (this.recently_damaged > this.IMMUNITY_IN_MILISEC) {
            //Animation.pulsePurple();
            if (!this.poisoned) {
              this.poisoned = true;
              store.dispatch(playText(["POISONED"]));
            }
            store.dispatch(playAnimation(VFX.PULSE_PURPLE));
            this.health -= 10;
            this.recently_damaged = 0;
            this.game.gameObjects.splice(
              this.game.gameObjects.indexOf(object),
              1
            );
          }
        }

        if (object.gameObject.id === ENTITY_ID.SHADOW_AURA) {
          this.getHitByBodyAura(object, 25);
          this.darkness += 0.02;
          if (this.darkness > 1) {
            this.darkness = 1;
          }
          store.dispatch(setDarkness(this.darkness));
        }

        if (object.gameObject.id === ENTITY_ID.MAGNET_AURA_PLUS) {
          this.applyMagneticForce(object, "plus");
        }
        if (object.gameObject.id === ENTITY_ID.MAGNET_AURA_MINUS) {
          this.applyMagneticForce(object, "minus");
        }

        //this.game.gameObjects.splice(this.game.gameObjects.indexOf(object), 1);

        //console.log("Yes collision");
      } else {
        //console.log(object);
        //console.log("No collision");
      }
    }); //End of checking for collision with the gameObjects

    // Reseting health if above 100
    if (this.health > 100) this.health = 100;

    // Player Collision with left wall
    if (this.gameObject.position.x < 0) this.gameObject.position.x = 0;

    // Player Collision with right wall
    if (this.gameObject.position.x + this.gameObject.width > this.gameWidth) {
      this.gameObject.position.x = this.gameWidth - this.gameObject.width;
    }

    // Player Collision with top wall
    if (this.gameObject.position.y < 0) this.gameObject.position.y = 0;

    // Player Collision with bottom wall
    if (this.gameObject.position.y + this.gameObject.height > this.gameHeight) {
      this.gameObject.position.y = this.gameHeight - this.gameObject.height;
    }
  }

  private getHitByBodyAura(obj: GameObject, damage: number) {
    if (this.recently_damaged > this.IMMUNITY_IN_MILISEC) {
      if (
        this.collision({
          x: obj.gameObject.position.x,
          y: obj.gameObject.position.y,
          width: obj.gameObject.width,
          height: obj.gameObject.height,
        })
      ) {
        this.health -= damage;
        this.recently_damaged = 0;
      }
    }
  }

  private applyMagneticForce(obj: GameObject, type: "minus" | "plus") {
    this.getHitByBodyAura(obj, 25);

    let diffY = Math.ceil(
      this.gameObject.position.y - (obj.gameObject.position.y + 5)
    );
    let diffX = Math.ceil(
      this.gameObject.position.x - (obj.gameObject.position.x + 5)
    );
    let distance = Math.ceil(
      Math.sqrt(
        (this.gameObject.position.x - obj.gameObject.position.x) *
          (this.gameObject.position.x - obj.gameObject.position.x) +
          (this.gameObject.position.y - obj.gameObject.position.y) *
            (this.gameObject.position.y - obj.gameObject.position.y)
      )
    );

    if (distance < 1) distance = 1;

    if (distance < 30) return null;

    const max_distance = 300;
    const force = Math.min((max_distance - distance) / max_distance, 1);

    if (type === "minus") {
      this.gameObject.position.x +=
        (-this.MAGNET_POWER / distance) * diffX * force;
      this.gameObject.position.y +=
        (-this.MAGNET_POWER / distance) * diffY * force;
    } else {
      this.gameObject.position.x -=
        (-this.MAGNET_POWER / distance) * diffX * force;
      this.gameObject.position.y -=
        (-this.MAGNET_POWER / distance) * diffY * force;
    }
  }
}
