import React, { useEffect, useState } from "react";
import queryString from "query-string";
import { useHistory, useLocation } from "react-router-dom";
import Hud from "../layout/Hud";
import Pause from "../layout/Pause";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { GAME_STATE } from "../game/enum/game_state";
import Engine from "../game/engine/game";
import startEngine from "../game";
import { setGameState } from "../redux/slices/gameSlice";

const Game: React.FC = ({}) => {
  const history = useHistory();
  const [game, setGame] = useState<Engine | null>(null);
  const gameState = useSelector(
    (state: RootState) => state.gameSlice.gameState
  );
  const level = useSelector((state: RootState) => state.gameSlice.level);

  useEffect(() => {
    const engine = startEngine();
    engine.start(level);
    setGame(engine);
  }, []);

  useEffect(() => {
    if (gameState === GAME_STATE.PAGE_DEFEAT) {
      history.push("/Defeat");
    } else if (gameState === GAME_STATE.PAGE_VICTORY) {
      history.push("/Victory");
    }
  }, [gameState]);

  return (
    <>
      <canvas id={"gameScreen-canvas"} width="900" height="500"></canvas>
      <Hud />
      {gameState === GAME_STATE.PAUSED ? <Pause game={game} /> : null}
    </>
  );
};

export default Game;
