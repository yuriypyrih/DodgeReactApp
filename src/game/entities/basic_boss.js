import { ENTITY_ID } from "../enum/entitiy_id";
import { COLOR } from "../enum/colors";
import Trail from "../engine/trail";
import BasicBullet from "./basic_bullet";

export default class BasicBoss {

    constructor(game, x, y) {
        this.id = ENTITY_ID.BASIC_ENEMY;
        this.width = 50;
        this.height = 50;
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.game = game;

        this.position = { x, y };

        //this.maxSpeed = 7;
        this.velX = 0;
        this.velY = 0.3;

        this.awakening_timer = 0;
        this.awaken = false;
        this.bullet_timer = 0;
    }

    draw(context) {
        context.fillStyle = COLOR.RED;
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update(deltaTime) {

        this.awakening_timer += deltaTime;
        this.bullet_timer++;

        if (!this.awaken && this.awakening_timer > 4000) {
            this.awaken = true;
            this.velY = 0;
            this.velX = 5;
        }

        if (this.awaken && this.bullet_timer % 40 === 0) {
            let origin_x = this.position.x + this.width / 2;
            let origin_y = this.position.y + this.height;
            this.game.gameObjects.push(new BasicBullet(this.game, origin_x, origin_y, -3, 4));
            this.game.gameObjects.push(new BasicBullet(this.game, origin_x, origin_y, 0, 5));
            this.game.gameObjects.push(new BasicBullet(this.game, origin_x, origin_y, 3, 4));
        }

        // Updating the entity's position based on its velocity (if it has one)
        this.position.x += this.velX;
        this.position.y += this.velY;

        // Creating a Trail particle and add it to the list
        //this.game.particleObjects.push(new Trail(this.position.x, this.position.y, 12, COLOR.RED, this.width, this.height, 0.7, 0.02, this.game.particleObjects));

        //if (this.position.y <= 0 || this.position.y >= this.gameHeight - this.height) this.velY *= -1;
        if (this.position.x <= 0 || this.position.x >= this.gameWidth - this.width) this.velX *= -1;

    }
}