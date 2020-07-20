import { ENTITY_ID } from "../enum/entitiy_id";
import { COLOR } from "../enum/colors";

export default class Star {

    constructor(game, x, y) {
        this.id = ENTITY_ID.STAR;
        this.size_max = 16;
        this.size_min = 10;
        this.width = (2 * this.size_max) + this.size_min;
        this.height = this.width;
        this.game = game;

        this.position = { x, y };

    }

    draw(context) {
        context.fillStyle = COLOR.GOLD;
        context.strokeStyle = COLOR.WHITE;

        context.beginPath();
        this.drawStar(context);
        context.fill();
        context.beginPath();
        this.drawStar(context);
        context.stroke();
    }

    update(deltaTime) {

    }

    drawStar(context) {

        // CROSS Beggning top corner
        context.moveTo(this.position.x + this.size_max + this.size_min / 2, this.position.y);
        // Move to center-top-right corner;
        context.lineTo(this.position.x + this.size_max + this.size_min, this.position.y + this.size_max);
        // Move to right croner;
        context.lineTo(this.position.x + this.width, this.position.y + this.size_max + this.size_min / 2);
        // Move to center-bottom-right croner;
        context.lineTo(this.position.x + this.size_max + this.size_min, this.position.y + this.size_max + this.size_min);
        // Move to bottom croner;
        context.lineTo(this.position.x + this.size_max + this.size_min / 2, this.position.y + this.height);
        // Move to center-bottom-left croner;
        context.lineTo(this.position.x + this.size_max, this.position.y + this.size_max + this.size_min);
        // Move to left croner;
        context.lineTo(this.position.x, this.position.y + this.size_max + this.size_min / 2);
        // Move to center-top-left croner;
        context.lineTo(this.position.x + this.size_max, this.position.y + this.size_max);
        // Move to top corner;
        context.moveTo(this.position.x + this.size_max + this.size_min / 2, this.position.y);

    }
}