import React, { useEffect } from "react";
import queryString from "query-string";
import startGame from "../game/index";
import { useLocation } from "react-router-dom";

const Game: React.FC = ({}) => {
  let location = useLocation();
  const values = queryString.parse(location.search);
  const level = Number(values.level);

  useEffect(() => {
    startGame(level);
  }, []);

  return <canvas id={"gameScreen-canvas"} width="900" height="500"></canvas>;
};

export default Game;
