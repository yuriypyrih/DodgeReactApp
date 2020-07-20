import { ENTITY_ID } from "./../enum/entitiy_id";
import { COLOR } from "./../enum/colors"

export default class Trail {

    constructor(x, y, reductor, color, width, height, life, minus, particleObjects) {
        this.id = ENTITY_ID.TRAIL;
        this.color = color;
        this.width = width - reductor;
        this.height = height - reductor;
        this.life = life;
        this.minus = minus;
        this.particleObjects = particleObjects;
        this.position = { x: x + reductor / 2, y: y + reductor / 2 };





    }

    draw(context) {
        context.fillStyle = this.color;



        context.globalAlpha = this.life;
        context.fillRect(this.position.x, this.position.y, this.width, this.height);

        context.globalAlpha = 1;




    }

    update(deltaTime) {

        this.life = this.life - this.minus;
        if (this.life <= 0.1) {
            this.particleObjects.splice(this.particleObjects.indexOf(this), 1);
        }
    }
}