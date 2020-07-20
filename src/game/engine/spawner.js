import Animation from "./animation";
import BasicEnemy from "./../entities/basic_enemy";
import BasicBoss from "./../entities/basic_boss";
import SpeederEnemy from "../entities/speeder_enemy";
import BouncerEnemy from "../entities/bouncer_enemy";
import WormEnemy from "../entities/worm_enemy";
import SmartEnemy from "../entities/smart_enemy";
import VenomEnemy from "../entities/venom_enemy";
import Healthpack from "../entities/healthpack";
import Star from "../entities/star";

export default class Spawner {
    constructor(game) {
        this.game = game;
        this.level = 0;
        this.executionSequence = 0;
        this.roundTimer = 0; // Throu calculations 1 sec of real Time is about roundTimer = 60
    }


    reset() {
        this.level = 0;
        this.executionSequence = 0;
        this.roundTimer = 0;
    }

    startLevel(level) {
        this.reset();
        //hud.reset():

        this.level = level;
    }

    spawnRandomHealthpack() {
        let random_x = Math.floor(Math.random() * (this.game.gameWidth - 30)) + 2;
        let random_y = Math.floor(Math.random() * (this.game.gameHeight - 80)) + 50;
        this.game.gameObjects.push(new Healthpack(this.game, random_x, random_y));
    }

    update(deltaTime) {
        this.roundTimer++;
        if (this.game.player.milestone) {
            this.executionSequence++;
            this.game.player.milestone = false;
        }

        if (this.roundTimer % 777 === 0 && this.game.player.health !== 100 && this.level !== 1) {
            //  this.spawnRandomHealthpack();
        }


        if (this.level === 1) {
            if (this.roundTimer === 60) {
                //Animation.tutorialCards(1);
            }
            else if (this.roundTimer === 300) {
                this.game.gameObjects.push(new BasicEnemy(this.game, 1, 1));
            }
            else if (this.roundTimer === 320) {
                //Animation.tutorialCards(2);
            }
            else if (this.roundTimer === 860) {
                this.game.gameObjects.push(new Healthpack(this.game, 600, 90));
                //Animation.tutorialCards(3);
            }
            else if (this.roundTimer === 1230) {
                this.game.gameObjects.push(new Star(this.game, this.game.gameWidth / 2 - 20, 50));
                //Animation.tutorialCards(4);
            }
            else if (this.executionSequence === 1) {
                this.executionSequence++;
                this.roundTimer = 1231;
                //Animation.tutorialCards(5);
            }
            else if (this.roundTimer === 1340 && this.executionSequence === 2) {
                this.game.gameObjects.push(new BasicEnemy(this.game, 1, 20));
            }
            else if (this.roundTimer === 1440 && this.executionSequence === 2) {
                this.game.gameObjects.push(new BasicEnemy(this.game, 20, 1));
            }
            else if (this.roundTimer === 1700 && this.executionSequence === 2) {
                this.spawnRandomHealthpack();
            }
            else if (this.roundTimer === 2200 && this.executionSequence === 2) {
                this.game.gameObjects.push(new Star(this.game, this.game.gameWidth / 2 - 20, this.game.gameHeight / 2 - 20));
            }
            else if (this.executionSequence === 3) {
                this.executionSequence++;
                this.roundTimer = 2201;
                this.game.clearEnemies();
                //Animation.tutorialCards(6);
            }
            else if (this.roundTimer === 2240 && this.executionSequence === 4) {
                this.game.gameObjects.push(new BasicBoss(this.game, this.game.gameWidth / 2 - 25, -50));
            }
            else if (this.roundTimer === 3350 && this.executionSequence === 4) {
                this.game.gameObjects.push(new Star(this.game, this.game.gameWidth / 2 - 20, 50));
            }
        }
        else if (this.level === 2) {
            if (this.roundTimer === 1) {
                this.game.gameObjects.push(new VenomEnemy(this.game, 100, 1));
                this.game.gameObjects.push(new BasicEnemy(this.game, 200, 1));
                this.game.gameObjects.push(new SpeederEnemy(this.game, 300, 1));
                this.game.gameObjects.push(new WormEnemy(this.game, 1, 1));
                this.game.gameObjects.push(new BouncerEnemy(this.game, 400, 1));
            }
        }

    }
}