import { ENTITY_ID } from "../enum/entitiy_id";
import { COLOR } from "../enum/colors";
import Trail from "../engine/trail";

export default class VenomEnemy {

    constructor(game, x, y) {
        this.id = ENTITY_ID.BASIC_ENEMY;
        this.width = 20;
        this.height = 20;
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.game = game;

        this.position = { x, y };



        this.zigTimer = 0;
        this.swapTimer = 0;


        this.velX_max = 6;
        this.velX_min = 2;

        this.velY_max = 6;
        this.velY_min = 2;

        this.velX = 5;
        this.velY = 7;
    }

    draw(context) {
        context.fillStyle = COLOR.PURPLE;
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update(deltaTime) {
        this.swapTimer++;

        this.zigTimer += deltaTime;
        if (this.zigTimer < 120) {
            this.velX = this.velX_min;
            this.velY = this.velY_max;
        } else if (this.zigTimer < 240) {
            this.velX = this.velX_max;
            this.velY = this.velY_min;
        } else {
            this.zigTimer = 0;
        }


        // Updating the entity's position based on its velocity (if it has one)
        this.position.x += this.velX;
        this.position.y += this.velY;

        // Creating a Trail particle and add it to the list
        let trailColor = (this.swapTimer % 2 === 0) ? COLOR.VENOM : COLOR.PURPLE;
        this.game.particleObjects.push(new Trail(this.position.x, this.position.y, 12, trailColor, this.width, this.height, 0.95, 0.01, this.game.particleObjects));

        if (this.position.y <= 0) {
            this.position.y = 0;
            this.velY_max *= -1;
            this.velY_min *= -1;
        }

        if (this.position.y >= this.gameHeight - this.height) {
            this.position.y = this.gameHeight - this.height;
            this.velY_max *= -1;
            this.velY_min *= -1;
        }


        if (this.position.x >= this.gameWidth - this.width) {
            this.position.x = this.gameWidth - this.width;
            this.velX_max *= -1;
            this.velX_min *= -1;
        }
        if (this.position.x <= 0) {
            this.position.x = 0;
            this.velX_max *= -1;
            this.velX_min *= -1;
        }
    }

}
