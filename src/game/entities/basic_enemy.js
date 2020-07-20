import { ENTITY_ID } from "../enum/entitiy_id";
import { COLOR } from "../enum/colors";
import Trail from "../engine/trail";

export default class BasicEnemy {

    constructor(game, x, y) {
        this.id = ENTITY_ID.BASIC_ENEMY;
        this.width = 20;
        this.height = 20;
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.game = game;

        this.position = { x, y };

        //this.maxSpeed = 7;
        this.velX = 5.5;
        this.velY = 5.5;
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
        this.game.particleObjects.push(new Trail(this.position.x, this.position.y, 12, COLOR.RED, this.width, this.height, 0.7, 0.02, this.game.particleObjects));

        if (this.position.y <= 0 || this.position.y >= this.gameHeight - this.height) this.velY *= -1;
        if (this.position.x <= 0 || this.position.x >= this.gameWidth - this.width) this.velX *= -1;

    }
}