export default class Hud {
    constructor(game, spawner) {
        this.game = game;
        this.spawner = spawner
        this.healthBar_x = 10;
        this.healthBar_y = 10;
        this.healthBar_width = 200;
        this.healthBar_height = 15;
        this.healthBar_player = 0;
        this.deltaTime = 0;
        this.fps = 0;

    }


    update(deltaTime) {
        if (this.game.dev) {
            let HP = (this.game.player.health >= 1) ? this.game.player.health : 5;
            this.healthBar_player = Math.ceil((this.healthBar_width / 100) * HP);
            this.deltaTime = Math.round(deltaTime * 100) / 100;
            this.fps = Math.round((1000 / this.deltaTime) * 10) / 10;
        }


    }
    draw(context) {


        // Developer Option
        if (this.game.dev) {
            context.fillStyle = "white";
            context.font = "12px Arial";
            context.fillText(`Timer: ${this.spawner.roundTimer}`, 10, 40);
            context.fillText(`gameObjects: ${this.game.gameObjects.length}`, 10, 55);
            context.fillText(`Particles: ${this.game.particleObjects.length}`, 10, 70);
            context.fillText(`deltaTime: ${this.deltaTime}`, 10, 85);
            context.fillText(`fps: ${this.fps}`, 10, 100);
            context.fillText(`HP: ${this.game.player.health}`, 10, 115);
            context.fillText(`Stars: ${this.game.player.stars}`, 10, 130);
        }

        // context.fillStyle = "#51ECB3";
        // context.beginPath();
        // this.roundedRectangle(context, this.healthBar_x, this.healthBar_y, this.healthBar_player, this.healthBar_height, 8);
        // context.fill();
        // context.strokeStyle = "#F4F5F7";
        // context.beginPath();
        // this.roundedRectangle(context, this.healthBar_x, this.healthBar_y, this.healthBar_width, this.healthBar_height, 8);
        // context.stroke();



    }

    roundedRectangle(context, x, y, width, height, rounded) {
        const radiansInCircle = 2 * Math.PI;
        const halfRadians = (2 * Math.PI) / 2;
        const quarterRadians = (2 * Math.PI) / 4;



        // top left arc
        context.arc(rounded + x, rounded + y, rounded, -quarterRadians, halfRadians, true);

        // line from top left to bottom left
        context.lineTo(x, y + height - rounded);

        // bottom left arc  
        context.arc(rounded + x, height - rounded + y, rounded, halfRadians, quarterRadians, true);

        // line from bottom left to bottom right
        context.lineTo(x + width - rounded, y + height);

        // bottom right arc
        context.arc(x + width - rounded, y + height - rounded, rounded, quarterRadians, 0, true);

        // line from bottom right to top right
        context.lineTo(x + width, y + rounded);

        // top right arc
        context.arc(x + width - rounded, y + rounded, rounded, 0, -quarterRadians, true);

        // line from top right to top left
        context.lineTo(x + rounded, y);
    }




}



