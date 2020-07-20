import { ENTITY_ID } from "../enum/entitiy_id";
import { COLOR } from "../enum/colors";
import Trail from "../engine/trail";

export default class BouncerEnemy {

    constructor(game, x, y) {
        this.id = ENTITY_ID.BASIC_ENEMY;
        this.width = 30;
        this.height = 30;
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.game = game;

        this.position = { x, y };

        //this.maxSpeed = 7;
        this.velX = 1.8;
        this.velY = 1.2;
    }

    draw(context) {
        context.fillStyle = COLOR.GREEN;
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update(deltaTime) {
        // Updating the entity's position based on its velocity (if it has one)
        this.position.x += this.velX;
        this.position.y += this.velY;

        this.velY += 0.14;

        // Creating a Trail particle and add it to the list
        this.game.particleObjects.push(new Trail(this.position.x, this.position.y, this.width - 10, COLOR.GREEN, this.width, this.height, 0.2, 0.002, this.game.particleObjects));

        if (this.position.y <= 0 || this.position.y >= this.gameHeight - this.height) this.velY = -10;
        if (this.position.x <= 0 || this.position.x >= this.gameWidth - this.width) this.velX *= -1;
        //console.log(`x: ${this.}`)
    }
}