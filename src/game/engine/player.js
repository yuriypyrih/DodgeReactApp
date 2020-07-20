import { ENTITY_ID } from "./../enum/entitiy_id";
import { COLOR } from "./../enum/colors";
import Trail from "./trail";
import Animation from "./animation";
export default class Player {

    constructor(game) {
        this.id = ENTITY_ID.PLAYER;
        this.width = 32;
        this.height = 32;
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.game = game;
        this.health = 80;
        this.death_thresholder = -110;
        this.IMMUNITY_IN_MILISEC = 1000;
        this.recently_damaged = 0;
        this.stars = 0;
        this.milestone = false;
        this.poisoned = false;


        this.position = {
            x: game.gameWidth / 2 - this.width / 2,
            y: game.gameHeight / 2 - this.height / 2,
        }

        this.maxSpeed = 8;
        this.maxDiagonialSpeed = Math.ceil((this.maxSpeed / Math.sqrt(2)));

        this.velX = 0;
        this.velY = 0;

        console.log(this);
    }

    moveLeft() {
        this.velX = -this.maxSpeed;
    }

    moveRight() {
        this.velX = this.maxSpeed;
    }

    moveUp() {
        this.velY = -this.maxSpeed;
    }

    moveDown() {
        this.velY = this.maxSpeed;
    }

    stopX() {
        this.velX = 0;
    }

    stopY() {
        this.velY = 0;
    }

    collision(rectangle) {
        // collision detected!
        if (this.position.x < rectangle.position.x + rectangle.width &&
            this.position.x + this.width > rectangle.position.x &&
            this.position.y < rectangle.position.y + rectangle.height &&
            this.position.y + this.height > rectangle.position.y) {
            return true;
        } else {

            return false;
        }
    }

    draw(context) {
        context.fillStyle = COLOR.WHITE;
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update(deltaTime) {

        if ((this.velX !== 0) && (this.velY !== 0)) {
            (this.velX > 0) ? this.velX = this.maxDiagonialSpeed : this.velX = (this.maxDiagonialSpeed * -1);
            (this.velY > 0) ? this.velY = this.maxDiagonialSpeed : this.velY = (this.maxDiagonialSpeed * -1);
        }

        // Updating the Player's position based on its velocity
        this.position.x += this.velX;
        this.position.y += this.velY;

        // Creating a Trail particle and add it to the list
        this.game.particleObjects.push(new Trail(this.position.x, this.position.y, 0, COLOR.WHITE, this.width, this.height, 0.2, 0.03, this.game.particleObjects));

        // Keeping track of when it was last time damaged, by default it start with 0 when the game start
        this.recently_damaged += deltaTime;


        this.game.gameObjects.forEach(object => {
            if (this.collision(object)) {


                // You're immune to dmg when healed
                if (object.id === ENTITY_ID.HEALTH_PACK) {
                    Animation.pulseAqua();
                    this.game.gameObjects.splice(this.game.gameObjects.indexOf(object), 1);
                    this.health += 30;
                    this.recently_damaged = 0;
                }

                if (object.id === ENTITY_ID.STAR) {
                    Animation.pulseGold();
                    this.game.gameObjects.splice(this.game.gameObjects.indexOf(object), 1);
                    this.stars++;
                    this.milestone = true;
                    this.recently_damaged = 0;
                }

                if (object.id === ENTITY_ID.BASIC_ENEMY) {

                    // Take the damage only after the end of Immunity has expired
                    // And reset the recently_damaged
                    if (this.recently_damaged > this.IMMUNITY_IN_MILISEC) {
                        Animation.pulseRed();
                        this.health -= 25;
                        this.recently_damaged = 0;
                    }


                }

                //this.game.gameObjects.splice(this.game.gameObjects.indexOf(object), 1);

                //console.log("Yes collision");
            } else {
                //console.log(object);
                //console.log("No collision");
            }
        }); //End of checking for collision with the gameObjects

        // Reseting health if above 100
        if (this.health > 100) this.health = 100;


        // Player Collision with left wall
        if (this.position.x < 0) this.position.x = 0;

        // Player Collision with right wall
        if (this.position.x + this.width > this.gameWidth) {
            this.position.x = this.gameWidth - this.width;
        }

        // Player Collision with top wall
        if (this.position.y < 0) this.position.y = 0;

        // Player Collision with bottom wall
        if (this.position.y + this.height > this.gameHeight) {
            this.position.y = this.gameHeight - this.height;
        }
    }
}