import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Hud from "../layout/Hud";
import Pause from "../layout/Pause";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { GAME_STATE } from "../game/enum/game_state";
import Engine from "../game/engine/game";
import startEngine from "../game";

const Game: React.FC = ({}) => {
  const history = useHistory();
  const [game, setGame] = useState<Engine | null>(null);
  const [resetToggle, setResetToggle] = useState<boolean>(false);
  const gameState = useSelector(
    (state: RootState) => state.gameSlice.gameState
  );
  const level = useSelector((state: RootState) => state.gameSlice.level);

  const handleResetToggle = () => {
    setResetToggle(!resetToggle);
  };

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
    <div
      style={{ cursor: gameState === GAME_STATE.PLAYING ? "none" : undefined }}
    >
      <canvas id={"gameScreen-canvas"} width="900" height="500"></canvas>
      <Hud game={game} reset={resetToggle} />
      {gameState === GAME_STATE.PAUSED ? (
        <Pause game={game} toggleReset={handleResetToggle} />
      ) : null}
    </div>
  );
};

export default Game;
