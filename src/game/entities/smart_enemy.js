import { ENTITY_ID } from "../enum/entitiy_id";
import { COLOR } from "../enum/colors";
import Trail from "../engine/trail";

export default class SmartEnemy {

    constructor(game, x, y) {
        this.id = ENTITY_ID.BASIC_ENEMY;
        this.width = 20;
        this.height = 20;
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.game = game;
        this.player = game.player;

        this.position = { x, y };

        this.maxSpeed = 1.5;
        this.velX = 0;
        this.velY = 0;
    }

    draw(context) {
        context.fillStyle = COLOR.YELLOW;
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update(deltaTime) {
        // Updating the entity's position based on its velocity (if it has one)
        this.position.x += this.velX;
        this.position.y += this.velY;

        // Creating a Trail particle and add it to the list
        this.game.particleObjects.push(new Trail(this.position.x, this.position.y, 12, COLOR.YELLOW, this.width, this.height, 0.6, 0.008, this.game.particleObjects));

        let diffY = Math.ceil(this.position.y - (this.player.position.y + 5));
        let diffX = Math.ceil(this.position.x - (this.player.position.x + 5));
        let distance = Math.ceil(Math.sqrt((this.position.x - this.player.position.x) *
            (this.position.x - this.player.position.x) +
            (this.position.y - this.player.position.y) *
            (this.position.y - this.player.position.y)));

        if (distance < 1) distance = 1;

        this.velX = ((-this.maxSpeed / distance) * diffX);
        this.velY = ((-this.maxSpeed / distance) * diffY);

    }
}