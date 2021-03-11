import React, { useEffect, useState } from "react";
import { fade, makeStyles } from "@material-ui/core";
import { COLOR } from "../game/enum/colors";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { VFX } from "../game/enum/vfx";

const createPulseKeyframes = (color: string, maxOpacity?: number) => {
  return {
    "0%": {
      border: "1px solid #2dd5c4",
      boxShadow: `0 0 2rem ${fade("#2dd5c4", 0.2)}`,
    },
    "30%": {
      border: `1px solid ${color}`,
      boxShadow: `0 0 2.4rem ${fade(color, maxOpacity ? maxOpacity : 0.6)}`,
    },
    "100%": {
      border: "1px solid #2dd5c4",
      boxShadow: `0 0 2rem ${fade("#2dd5c4", 0.2)}`,
    },
  };
};

const useStyles = makeStyles({
  root: {
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    borderRadius: "3px",
    border: "1px solid #2dd5c4",
    boxShadow: `0 0 2rem ${fade("#2dd5c4", 0.2)}`,
    overflow: "hidden",
    transition: "all",
  },
  "@keyframes pulseRed": createPulseKeyframes(COLOR.RED),
  PULSE_RED_ANIMATION: {
    animation: "$pulseRed 0.7s ease-in",
  },
  "@keyframes pulsePurple": createPulseKeyframes(COLOR.PURPLE, 0.4),
  PULSE_PURPLE_ANIMATION: {
    animation: "$pulsePurple 3s",
  },
});

type VfxAnimationProps = {};

const VfxAnimation: React.FC<VfxAnimationProps> = ({ children }) => {
  const classes = useStyles();
  const vfxObject = useSelector((state: RootState) => state.vfxSlice);
  const [containerClass, setContainerClass] = useState<string>("");

  useEffect(() => {
    // if (containerClass.length === 0) {
    if (vfxObject.run_animation === VFX.PULSE_RED) {
      setContainerClass(classes.PULSE_RED_ANIMATION);
      setTimeout(() => {
        setContainerClass("");
      }, 1000);
    }
    if (vfxObject.run_animation === VFX.PULSE_PURPLE) {
      setContainerClass(classes.PULSE_PURPLE_ANIMATION);
      setTimeout(() => {
        setContainerClass("");
      }, 3000);
    }
    //}
  }, [vfxObject]);

  return <div className={`${classes.root} ${containerClass}`}>{children}</div>;
};

export default VfxAnimation;
