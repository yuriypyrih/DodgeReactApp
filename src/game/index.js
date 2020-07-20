import Game from "./engine/game";


const startGame = () => {

    const canvas = document.getElementById("gameScreen-canvas");
    const context = canvas.getContext("2d");

    const GAME_WIDTH = canvas.offsetWidth;
    const GAME_HEIGHT = canvas.offsetHeight;

    //console.log(GAME_HEIGHT);
    //console.log(GAME_WIDTH);


    // Initiating our game engine and run it.
    let game = new Game(GAME_WIDTH, GAME_HEIGHT);
    game.start();

    let lastTime = 0;

    function gameLoop(timestamp) {
        let deltaTime = timestamp - lastTime;
        lastTime = timestamp;

        // Clear Screen
        context.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

        game.update(deltaTime);
        game.draw(context);
        requestAnimationFrame(gameLoop);
    }



    requestAnimationFrame(gameLoop);
}

export default startGame;