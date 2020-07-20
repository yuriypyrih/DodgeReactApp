import React, { useEffect } from "react";
import startGame from "../game/index";

const Game: React.FC = ({}) => {
  useEffect(() => {
    startGame();
  }, []);

  return <canvas id="gameScreen-canvas" width="900" height="500"></canvas>;
};

export default Game;
