import { ENTITY_ID } from "../enum/entitiy_id";
import { COLOR } from "../enum/colors";

export default class Healthpack {

    constructor(game, x, y) {
        this.id = ENTITY_ID.HEALTH_PACK;
        this.size = 8;
        this.width = 3 * this.size;
        this.height = 3 * this.size;
        this.game = game;

        this.position = { x, y };

    }

    draw(context) {
        context.fillStyle = COLOR.AQUA;
        context.strokeStyle = COLOR.WHITE;

        context.beginPath();
        this.drawCross(context);
        context.fill();
        context.beginPath();
        this.drawCross(context);
        context.stroke();
    }

    update(deltaTime) {

    }

    drawCross(context) {

        // CROSS Beggning top-left corner
        context.moveTo(this.position.x + this.size, this.position.y);
        // Line to to top-right corner
        context.lineTo(this.position.x + (2 * this.size), this.position.y);
        // Line to to center-top-right corner
        context.lineTo(this.position.x + (2 * this.size), this.position.y + this.size);
        // Line to to right-top corner
        context.lineTo(this.position.x + (3 * this.size), this.position.y + this.size);
        // Line to to right-bottom corner
        context.lineTo(this.position.x + (3 * this.size), this.position.y + (2 * this.size));
        // Line to to center-bottom-right corner
        context.lineTo(this.position.x + (2 * this.size), this.position.y + (2 * this.size));
        // Line to to bottom-right corner
        context.lineTo(this.position.x + (2 * this.size), this.position.y + (3 * this.size));
        // Line to to bottom-left corner
        context.lineTo(this.position.x + this.size, this.position.y + (3 * this.size));
        // Line to to center-bottom-left corner
        context.lineTo(this.position.x + this.size, this.position.y + (2 * this.size));
        // Line to to left-bottom corner
        context.lineTo(this.position.x, this.position.y + (2 * this.size));
        // Line to to left-top corner
        context.lineTo(this.position.x, this.position.y + this.size);
        // Line to to center-left-top corner
        context.lineTo(this.position.x + this.size, this.position.y + this.size);
        // Line to to top-left corner
        context.lineTo(this.position.x + this.size, this.position.y);
    }
}