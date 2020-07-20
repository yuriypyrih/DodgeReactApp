import { ENTITY_ID } from "../enum/entitiy_id";
import { COLOR } from "../enum/colors";
import Trail from "../engine/trail";

export default class BasicBullet {

    constructor(game, x, y, velX, velY) {
        this.id = ENTITY_ID.BASIC_ENEMY;
        this.width = 5;
        this.height = 5;
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.game = game;

        this.position = { x, y };

        //this.maxSpeed = 7;
        this.velX = velX;
        this.velY = velY;
    }

    draw(context) {
        context.fillStyle = COLOR.RED;
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update(deltaTime) {
        // Updating the entity's position based on its velocity (if it has one)
        this.position.x += this.velX;
        this.position.y += this.velY;

        // Creating a Trail particle and add it to the list
        this.game.particleObjects.push(new Trail(this.position.x, this.position.y, 0, COLOR.RED, this.width, this.height, 0.6, 0.05, this.game.particleObjects));

        if (this.position.y <= 0 || this.position.y >= this.gameHeight - this.height) {
            this.game.gameObjects.splice(this.game.gameObjects.indexOf(this), 1);
        }
        if (this.position.x <= 0 || this.position.x >= this.gameWidth - this.width) {
            this.game.gameObjects.splice(this.game.gameObjects.indexOf(this), 1);
        }

    }
}