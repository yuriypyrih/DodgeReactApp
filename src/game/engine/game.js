import InputHandler from "./input";
import Player from "./player";
import { GAME_STATE } from "./../enum/game_state";
import { ENTITY_ID } from "./../enum/entitiy_id";
import BasicEnemy from "./../entities/basic_enemy";
import SpeederEnemy from "../entities/speeder_enemy";
import BouncerEnemy from "../entities/bouncer_enemy";
import WormEnemy from "../entities/worm_enemy";
import SmartEnemy from "../entities/smart_enemy";
import Menu from "./menu";
import Hud from "./hud";
import Spawner from "./spawner";



export default class Game {
    constructor(level, gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        // experimental level;
        this.level = level;

        // Dev option for debugging
        this.dev = true;

        /**
         * gameObjects -> Player can interact with (Player excluded)
         * particleObject -> Player cannot interact with 
        */
        this.gameObjects = [];
        this.particleObjects = [];

        this.gameState = GAME_STATE.MENU;
        // THIS WILL CHANGE LATER WHEN BACK-END WILL BE READY
        this.totalLevels = 2;


    }

    // This function runs once per reload of the page
    start() {
        this.spawner = new Spawner(this);
        this.menu = new Menu(this, this.spawner);
        this.hud = new Hud(this, this.spawner);
        this.player = new Player(this);

        // TESTING
        this.menu.playGame(this.level);

        new InputHandler(this.player, this);
    }

    clearEnemies() {
        for (let i = 0; i < this.gameObjects.length; i++) {
            if (this.gameObjects[i].id === ENTITY_ID.BASIC_ENEMY) {
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

    update(deltaTime) {

        if (this.gameState === GAME_STATE.PLAYING) {
            this.gameObjects.forEach(object => object.update(deltaTime));
            this.particleObjects.forEach(object => object.update(deltaTime));
            this.spawner.update(deltaTime);
            this.hud.update(deltaTime);
            this.player.update(deltaTime);
        }
    }

    draw(context) {
        if (this.gameState === GAME_STATE.PLAYING) {
            this.particleObjects.forEach(object => object.draw(context));
            this.gameObjects.forEach(object => object.draw(context));
            this.hud.draw(context);
            this.player.draw(context);
        }

    }
}