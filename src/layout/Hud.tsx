import React, { useEffect, useState } from "react";
import { fade, makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setgid } from "process";
import { VFX } from "../game/enum/vfx";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    display: "inline-block",
    //backgroundColor: "grey",
    top: 10,
    left: 10,
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
    width: "100%",
    height: "100%",
    overflow: "hidden",
    animation: `$progress 8s forwards linear`,
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
    marginTop: -18,
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
}));

type HudProps = {};

const Hud: React.FC<HudProps> = ({}) => {
  const classes = useStyles();
  const maxStars = useSelector(
    (state: RootState) => state.gameSlice.progress.max_stars
  );
  const totalStarsCollected = useSelector(
    (state: RootState) => state.gameSlice.progress.total_stars_collected
  );
  const hp = useSelector((state: RootState) => state.gameSlice.hp);
  const [hpClass, setHpClass] = useState<string>("");
  const vfxObject = useSelector((state: RootState) => state.vfxSlice);
  const poisoned = useSelector((state: RootState) => state.gameSlice.poisoned);

  const getHPMeter = () => {
    if (hp <= 4) return 4;
    else if (hp > 100) return 100;
    else return hp;
  };

  useEffect(() => {
    if (vfxObject.run_animation === VFX.PULSE_GREEN) {
      setHpClass(classes.healed);
      setTimeout(() => {
        setHpClass("");
      }, 700);
    }
  }, [vfxObject]);

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.power}></div>
        <div>
          <div
            className={`${classes.health} ${
              poisoned ? classes.healthPoisoned : null
            }`}
          >
            <div
              className={classes.healthRed}
              style={{ width: `${getHPMeter()}%` }}
            ></div>
            <div
              className={`${classes.healthInner} ${hpClass}`}
              style={{ width: `${getHPMeter()}%` }}
            ></div>
          </div>
          <div className={classes.progress}>
            <div className={classes.progressInner}></div>
          </div>
        </div>
      </div>
      <div className={classes.dotContainer}>
        {[...Array(maxStars)].map((dummy, index) => (
          <div
            key={index}
            className={`${classes.dot} ${
              totalStarsCollected > index ? " " + classes.dotStar : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hud;
