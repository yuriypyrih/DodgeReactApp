import { ENTITY_ID } from "../enum/entitiy_id";
import { COLOR } from "../enum/colors";
import Trail from "../engine/trail";

export default class WormEnemy {

    constructor(game, x, y) {
        this.id = ENTITY_ID.BASIC_ENEMY;
        this.width = 35;
        this.height = 35;
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.game = game;

        this.position = { x, y };

        this.maxSpeed = 14;
        this.velX = 0;
        this.velY = 4;
    }

    draw(context) {
        context.fillStyle = COLOR.PINK;
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update(deltaTime) {
        // Updating the entity's position based on its velocity (if it has one)
        this.position.x += this.velX;
        this.position.y += this.velY;


        // Top wall
        if (this.position.y <= 0) {
            this.position.y = 1;
            this.velX = -this.maxSpeed;
            this.velY = 0;
        }
        // Bottom wall
        else if (this.position.y >= this.gameHeight - this.height) {
            this.position.y = this.gameHeight - (this.height + 1);
            this.velX = this.maxSpeed;
            this.velY = 0;
        }
        // Left wall
        else if (this.position.x <= 0) {
            this.position.x = 1;
            this.velX = 0;
            this.velY = this.maxSpeed;
        }
        // Right wall
        else if (this.position.x >= this.gameWidth - this.width) {
            this.position.x = this.gameWidth - (this.width + 1);
            this.velX = 0;
            this.velY = -this.maxSpeed;
        }




        // Creating a Trail particle and add it to the list
        this.game.particleObjects.push(new Trail(this.position.x, this.position.y, this.width - 10, COLOR.PINK, this.width, this.height, 0.7, 0.015, this.game.particleObjects));

    }
}