import React, { useEffect, useState } from "react";
import { CircularProgress, fade, makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { VFX } from "../game/enum/vfx";
import {
  finishedTextAnimation,
  setDarkness,
  setNightVision,
} from "../redux/slices/vfxSlice";
import { setPoisoned } from "../redux/slices/gameSlice";
import Game from "../game/engine/game";
import { GAME_STATE } from "../game/enum/game_state";
import HealIcon from "@material-ui/icons/Favorite";
import { RELIC_TYPE } from "../game/enum/relic_type";
import { COLOR } from "../game/enum/colors";
import { relics } from "../game/engine/relics/relics_collection";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    display: "inline-block",
    //backgroundColor: "grey",
    left: 0,
    top: 0,
    padding: 10,
    width: "100%",
  },
  container: {
    display: "inline-flex",
    position: "relative",
    alignItems: "center",
    "&::before": {
      content: '""',
      zIndex: 10,
      display: "inline-block",
      width: 36,
      height: 36,
      borderRadius: "50%",
      backgroundColor: "#1a1a1d",
      position: "absolute",
      left: 5,
    },
  },
  power: {
    zIndex: 20,
    position: "relative",
    width: 36,
    height: 36,
    borderRadius: "50%",
    border: "1px solid #808080",
    backgroundColor: "#1a1a1d",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
  health: {
    background: "linear-gradient(45deg,  #1a1a1d 0%, #2b2b2c 60%)",
    width: 200,
    height: 6,
    borderTopRightRadius: "15% 20px",
    marginBottom: 4,
    overflow: "hidden",
    position: "relative",
    // animation: "$poisoned 1.4s infinite linear",
  },
  healthPoisoned: {
    animation: "$poisoned 1.4s infinite linear",
  },
  healthInner: {
    zIndex: 4,
    position: "absolute",
    background: theme.palette.primary.main,
    borderTopRightRadius: "15% 20px",
    marginBottom: 4,
    width: "60%",
    height: "100%",
    transition: "0.5s all",
  },
  healthRed: {
    zIndex: 3,
    position: "absolute",
    background: "#fe585d",
    borderTopRightRadius: "15% 20px",
    marginBottom: 4,
    width: "80%",
    height: "100%",
    transition: "1s 0.5s all",
  },
  progress: {
    background: "linear-gradient(135deg,  #1a1a1d 0%, #2b2b2c 60%)",
    width: "100%",
    height: 6,
    borderBottomRightRadius: "15% 20px",
    marginBottom: 4,
    overflow: "hidden",
  },
  progressInner: {
    //#ffffcc
    //background: "#676767",
    background: "linear-gradient(135deg,#676767 0%, #ffffcc 100%)",
    borderBottomRightRadius: "15% 20px",
    marginBottom: 4,
    width: "0%",
    height: "100%",
    overflow: "hidden",
    animation: `$progress 1s forwards linear`,
    //transition: "0.2s all",
    "&:before": {
      content: '""',
      display: "block",
      position: "relative",
      transform: "skew(-20deg)",
      left: 0,
      width: "100%",
      height: "100%",
      animation: `$goldRod 1.2s infinite`,
      background:
        "linear-gradient(135deg, transparent 0%,#ffffcc 90%, #ffffcc 100%)",
    },
  },
  dotContainer: {
    display: "flex",
    position: "relative",
    marginTop: -10,
    paddingLeft: 42,
  },
  dot: {
    border: "1px solid #808080",
    display: "inline-block",
    borderRadius: "50%",
    margin: "0 2px",
    width: 6,
    height: 6,
  },
  dotStar: {
    background: "#ffffcc",
    boxShadow: `0 0 3px ${fade("#ffffcc", 0.5)}`,
  },
  "@keyframes goldRod": {
    "0%": {
      left: "-100%",
    },

    "100%": {
      left: "100%",
    },
  },
  "@keyframes progress": {
    "0%": {
      width: "1%",
    },

    "100%": {
      width: "100%",
    },
  },
  "@keyframes poisoned": {
    "0%": {
      background: "linear-gradient(135deg,  #1a1a1d 0%, #2b2b2c 60%)",
    },
    "50%": {
      background: fade("#9451EC", 0.8),
    },
    "100%": {
      background: "linear-gradient(135deg,  #1a1a1d 0%, #2b2b2c 60%)",
    },
  },
  healed: {
    animation: "$healed 0.7s ease-in",
  },
  "@keyframes healed": {
    "0%": {
      background: theme.palette.primary.main,
    },
    "30%": {
      background: "#51ECB3",
    },
    "100%": {
      background: theme.palette.primary.main,
    },
  },
  textAnimation: {
    ...theme.typography.h6,
    position: "absolute",
    width: 300,
    right: 100,
    top: 20,
    textAlign: "center",
    lineHeight: 1.2,
    opacity: 0,
    color: "#f4f5f7",
    animation: "$textMessage 4s linear forwards",
  },
  "@keyframes textMessage": {
    "0%": {
      opacity: 0,
      right: 120,
    },
    "5%": {
      opacity: 0.7,
      right: 100,
    },
    "20%": {
      opacity: 1,
    },
    "95%": {
      opacity: 0.8,
      right: 60,
    },
    "99%": {
      opacity: 0,
      right: 50,
    },
  },
}));

type HudProps = {
  game: Game | null;
  reset: boolean;
};

const Hud: React.FC<HudProps> = ({ game, reset }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [localReset, setLocalReset] = useState<boolean>(reset);
  const { max_stars, total_stars_collected, star_timers } = useSelector(
    (state: RootState) => state.gameSlice.progress
  );
  const [reloadProgress, setReloadProgress] = useState<boolean>(true);
  const [prevCollectedStars, setPrevCollectedStars] = useState<number>(0);
  //const [virginCheck, setVirginCheck] = useState<boolean>(false);
  const [localDuration, setLocalDuration] = useState<number>(0);
  const hp = useSelector((state: RootState) => state.gameSlice.hp);
  const [hpClass, setHpClass] = useState<string>("");
  const vfxObject = useSelector((state: RootState) => state.vfxSlice);
  const poisoned = useSelector((state: RootState) => state.gameSlice.poisoned);
  const selectedRelic = useSelector(
    (state: RootState) => state.gameSlice.selectedRelic
  );
  const [paused, setPaused] = useState<boolean>(false);
  const { text_message, play_text } = useSelector(
    (state: RootState) => state.vfxSlice
  );

  const getHPMeter = () => {
    if (hp <= 4) return 4;
    else if (hp > 100) return 100;
    else return hp;
  };

  useEffect(() => {
    if (game && game.gameState === GAME_STATE.PAUSED) {
      setPaused(true);
    } else {
      setPaused(false);
    }
    console.log("HUD: GAME_STATE", game?.gameState);
  }, [game, game?.gameState]);

  useEffect(() => {
    //RESET VARIOUS VFX
    if (vfxObject.darkness !== 0) {
      dispatch(setDarkness(0));
      dispatch(setNightVision(false));
      console.log("HUD: DARKNESS/VISION RESET");
    }
    // eslint-disable-next-line
  }, [reset]);

  // useEffect(()=>{
  //
  // },[reset])

  useEffect(() => {
    if (total_stars_collected !== prevCollectedStars || localReset !== reset) {
      setLocalReset(reset);
      setPrevCollectedStars(total_stars_collected);
      setReloadProgress(!reloadProgress);
    }
    if (total_stars_collected === 0) {
      setLocalDuration(star_timers[total_stars_collected]);
    } else {
      setLocalDuration(
        star_timers[total_stars_collected] -
          star_timers[total_stars_collected - 1]
      );
    }
    // eslint-disable-next-line
  }, [total_stars_collected, max_stars, star_timers, reset]);

  useEffect(() => {
    dispatch(setPoisoned(false));
    console.log("HUD: POISONED");
  }, [dispatch, reset]);

  useEffect(() => {
    if (vfxObject.run_animation === VFX.PULSE_GREEN) {
      setHpClass(classes.healed);
      setTimeout(() => {
        setHpClass("");
      }, 700);
    }
    console.log("HUD: VFX");
  }, [classes.healed, vfxObject]);

  useEffect(() => {
    if (play_text) {
      setTimeout(() => {
        dispatch(finishedTextAnimation());
      }, 4000);
    }
    console.log("HUD: TEXT");
  }, [dispatch, play_text]);

  const getRelic = () => {
    let Icon = HealIcon;
    let wasted = true;
    let variant: "indeterminate" | "static" | "determinate" = "indeterminate";
    let value = 100;
    if (selectedRelic) {
      wasted = selectedRelic.relic_available_uses <= 0;
      const foundRelic = relics.find((r) => r.id === selectedRelic.relic);
      if (foundRelic) {
        Icon = foundRelic.Icon;
        if (foundRelic.type === RELIC_TYPE.ACTIVE) {
          variant = "determinate";
          if (selectedRelic.relic_available_uses !== Infinity) {
            value = Math.min(
              100,
              (selectedRelic.relic_available_uses / foundRelic.max_uses) * 100
            );
          }
        } else {
          // IT's PASSIVE and it' already perfect
        }
      } else {
        variant = "determinate";
        value = 100;
      }
    }

    return (
      <>
        {!wasted && (
          <CircularProgress
            variant={variant}
            disableShrink={variant === "indeterminate"}
            size={38}
            thickness={2}
            value={value}
            style={{ position: "absolute" }}
          />
        )}
        <Icon style={{ opacity: wasted ? 0.2 : 1, width: 25, height: 25 }} />
      </>
    );
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.power}>{getRelic()}</div>
        <div>
          <div
            className={`${classes.health} ${
              poisoned ? classes.healthPoisoned : null
            }`}
          >
            <div
              className={classes.healthRed}
              style={{ width: `${getHPMeter()}%` }}
            />
            <div
              className={`${classes.healthInner} ${hpClass}`}
              style={{
                width: `${getHPMeter()}%`,
                backgroundColor:
                  game && game.player.relic_berserk ? COLOR.ORANGE : undefined,
              }}
            />
          </div>
          {reloadProgress ? (
            <div className={classes.progress} key="progress-default">
              <div
                className={classes.progressInner}
                style={{
                  animationDuration: `${localDuration}s`,
                  animationPlayState: paused ? "paused" : "running",
                }}
              />
            </div>
          ) : (
            <div className={classes.progress} key="progress-reload">
              <div
                className={classes.progressInner}
                style={{
                  animationDuration: `${localDuration}s`,
                  animationPlayState: paused ? "paused" : "running",
                }}
              />
            </div>
          )}
        </div>
      </div>
      <div className={classes.dotContainer}>
        {[...Array(max_stars)].map((dummy, index) => (
          <div
            key={index}
            className={`${classes.dot} ${
              total_stars_collected > index ? " " + classes.dotStar : ""
            }`}
          />
        ))}
      </div>
      {play_text && (
        <div className={classes.textAnimation}>
          {text_message.map((text, index) => (
            <div key={index}>
              {text}
              <br />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Hud;
