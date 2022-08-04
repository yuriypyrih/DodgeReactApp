import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Hud from "../layout/Hud";
import Pause from "../layout/Pause";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { GAME_STATE } from "../game/enum/game_state";
import { beatLevel } from "../redux/slices/authSlice";
import { dispatch } from "../index";
import { relics } from "../game/engine/relics/relics_collection";
import { game } from "../App";
import { setContext } from "../game";
import { RELICS_NAME } from "../game/enum/relics_name";
import { setGameState } from "../redux/slices/gameSlice";

const Game: React.FC = () => {
  const history = useHistory();
  // const [game, setGame] = useState<Engine | null>(null);
  const [localRelic, setLocalRelic] = useState<RELICS_NAME | null>(null);
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
    const canvas = document.getElementById("gameScreen-canvas");
    // @ts-ignore
    if (canvas) setContext(canvas.getContext("2d"));
    return () => {
      // @ts-ignore
      setContext(null);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (game) {
        game.gameState = GAME_STATE.CLOSED;
        dispatch(setGameState(GAME_STATE.CLOSED));
      }
    };
  }, []);

  useEffect(() => {
    if (game !== null && selectedRelic?.relic !== localRelic) {
      console.log("RUN");
      const lvl = window.location.pathname.split("/")[2];
      const foundRelic = relics.find((r) => r.id === selectedRelic?.relic);
      game.start(Number(lvl), foundRelic || null);
      setLocalRelic(foundRelic?.id || null);
      handleResetToggle();
    }
    //eslint-disable-next-line
  }, [game, selectedRelic]);

  // console.log("Hello");

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
    setResetToggle((prev) => !prev);
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
