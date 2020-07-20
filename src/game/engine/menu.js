import { GAME_STATE } from "./../enum/game_state";

export default class Menu {
    constructor(game, spawner) {
        this.game = game;
        this.spawner = spawner;
        this.devOption();
        this.btnPlay();
        this.btnLevelsBack();
        this.btnSelectLevel();
    }

    devOption() {
        if (this.game.dev) {
            document.getElementById("menu-main").style.zIndex = "100";
            document.getElementById("menu-levels").style.zIndex = "101";
        }
    }

    btnPlay() {
        const btn_play = document.getElementById("btn-play");
        btn_play.onclick = function () {
            document.getElementById("menu-main").style.zIndex = "100";
            document.getElementById("menu-levels").style.zIndex = "101";

        }
    }

    btnSelectLevel() {
        for (let i = 1; i <= this.game.totalLevels; i++) {
            const thisGame = this.game;
            const thisSpawner = this.spawner;
            document.getElementById(`btn-select-${i}`).onclick = function () {
                const elements = document.getElementsByClassName("menu")
                for (let i = 0; i < elements.length; i++) {
                    elements[i].classList.toggle("display-none");
                }
                thisGame.gameState = GAME_STATE.PLAYING;
                thisSpawner.startLevel(i);
            }
        }
    }

    btnLevelsBack() {
        const btn_play = document.getElementById("btn-levels-back");
        btn_play.onclick = function () {
            document.getElementById("menu-main").style.zIndex = "101";;
            document.getElementById("menu-levels").style.zIndex = "100";
        }
    }


}
