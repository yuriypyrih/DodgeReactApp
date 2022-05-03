import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Hud from "../layout/Hud";
import Pause from "../layout/Pause";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { GAME_STATE } from "../game/enum/game_state";
import Engine from "../game/engine/game";
import startEngine from "../game";
import { beatLevel } from "../redux/slices/authSlice";
import { dispatch } from "../index";
import { relics } from "../game/engine/relics/relics_collection";

const Game: React.FC = () => {
  const history = useHistory();
  const [game, setGame] = useState<Engine | null>(null);
  const [resetToggle, setResetToggle] = useState<boolean>(false);
  const { total_stars_collected } = useSelector(
    (state: RootState) => state.gameSlice.progress
  );

  const gameState = useSelector(
    (state: RootState) => state.gameSlice.gameState
  );

  const level = useSelector((state: RootState) => state.gameSlice.level);
  const selectedRelic = useSelector(
    (state: RootState) => state.gameSlice.selectedRelic
  );

  useEffect(() => {
    if (game === null && selectedRelic !== null) {
      console.log("RUN");
      const lvl = window.location.pathname.split("/")[2];
      const foundRelic = relics.find((r) => r.id === selectedRelic.relic);
      const engine = startEngine();
      engine.start(Number(lvl), foundRelic || null);
      setGame(engine);
      handleResetToggle();
    }
    // eslint-disable-next-line
  }, [game, selectedRelic]);

  useEffect(() => {
    // Component will unmount
    if (game) {
      return () => {
        game.terminate();
      };
    }
  }, [game]);

  useEffect(() => {
    const lvl = window.location.pathname.split("/")[2];
    if (gameState === GAME_STATE.PAGE_DEFEAT) {
      dispatch(
        beatLevel({ level: level.levelId, stars: total_stars_collected })
      );
      history.push(`/Defeat/${lvl}`);
    } else if (gameState === GAME_STATE.PAGE_VICTORY) {
      dispatch(
        beatLevel({
          level: level.levelId,
          stars: total_stars_collected,
          unlockNext: true,
        })
      );
      history.push(`/Victory/${lvl}`);
    }
  }, [gameState, history, level, total_stars_collected]);

  const handleResetToggle = () => {
    setResetToggle(!resetToggle);
  };

  return (
    <div
      style={{
        cursor: gameState === GAME_STATE.PLAYING ? "none" : undefined,
      }}
    >
      <canvas id={"gameScreen-canvas"} width="900" height="500" />
      <Hud game={game} reset={resetToggle} />
      {gameState === GAME_STATE.PAUSED ? (
        <Pause game={game} toggleReset={handleResetToggle} />
      ) : null}
    </div>
  );
};

export default Game;
