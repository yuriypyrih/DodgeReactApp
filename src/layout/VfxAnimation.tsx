import React, { useEffect, useState } from "react";
import { fade, makeStyles } from "@material-ui/core";
import { COLOR } from "../game/enum/colors";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { VFX } from "../game/enum/vfx";
import clsx from "clsx";
import { RELICS_NAME } from "../game/enum/relics_name";

const createPulseKeyframes = (
  color: string,
  maxOpacity?: number,
  percent?: number
) => {
  return {
    "0%": {
      border: "1px solid #2dd5c4",
      boxShadow: `0 0 2rem ${fade("#2dd5c4", 0.2)}`,
    },
    [percent ? `${percent}%` : "30%"]: {
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
  innerContainer: {
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    overflow: "hidden",
    transition: "all",
  },
  "@keyframes pulseRed": createPulseKeyframes(COLOR.RED),
  PULSE_RED_ANIMATION: {
    animation: "$pulseRed 0.7s ease-in",
  },
  "@keyframes pulseGReen": createPulseKeyframes(COLOR.AQUA),
  PULSE_GREEN_ANIMATION: {
    animation: "$pulseGReen  0.7s ease-in",
  },
  "@keyframes pulseGold": createPulseKeyframes(COLOR.GOLD, undefined, 10),
  PULSE_GOLD_ANIMATION: {
    animation: "$pulseGold  3s ease-in",
  },
  "@keyframes pulsePurple": createPulseKeyframes(COLOR.PURPLE, 0.4),
  PULSE_PURPLE_ANIMATION: {
    animation: "$pulsePurple 3s",
  },
  "@keyframes pulsePortalOrange": {
    "0%": {
      boxShadow: `inset 50px 0px 50px -50px ${fade("#2dd5c4", 0)}`,
    },
    "30%": {
      boxShadow: `inset  50px 0px 50px -50px ${fade("#ff934d", 0.6)} `,
    },
    "100%": {
      boxShadow: ` inset 50px 0px 50px -50px ${fade("#2dd5c4", 0)}`,
    },
  },
  "@keyframes pulsePortalBlue": {
    "0%": {
      boxShadow: `inset -50px 0px 50px -50px ${fade("#2dd5c4", 0)}`,
    },
    "30%": {
      boxShadow: `inset  -50px 0px 50px -50px ${fade("#4db9ff", 0.6)} `,
    },
    "100%": {
      boxShadow: ` inset -50px 0px 50px -50px ${fade("#2dd5c4", 0)}`,
    },
  },
  PULSE_PORTAL_ORANGE: {
    animation: "$pulsePortalOrange 0.5s ease-out",
  },
  PULSE_PORTAL_BLUE: {
    animation: "$pulsePortalBlue 0.5s ease-out",
  },
  nightVisionEffect: {
    width: "100%",
    height: "100%",
    background: "radial-gradient(#2E790150 0%, #01230100 60%, #01230100  100%)",
  },
});

type VfxAnimationProps = {};

const VfxAnimation: React.FC<VfxAnimationProps> = ({ children }) => {
  const classes = useStyles();
  const vfxObject = useSelector((state: RootState) => state.vfxSlice);
  const selectedRelic = useSelector(
    (state: RootState) => state.gameSlice.selectedRelic
  );
  const [containerClass, setContainerClass] = useState<string>("");
  const [innercontainerClassA, setInnercontainerClassA] = useState<string>("");
  const [innercontainerClassB, setInnercontainerClassB] = useState<string>("");

  useEffect(() => {
    if (vfxObject.run_animation === VFX.PULSE_RED) {
      console.log("RED_PULSE", vfxObject);
      setContainerClass(classes.PULSE_RED_ANIMATION);
      setTimeout(() => {
        setContainerClass("");
      }, 700);
    }
    if (vfxObject.run_animation === VFX.PULSE_GREEN) {
      setContainerClass(classes.PULSE_GREEN_ANIMATION);
      setTimeout(() => {
        setContainerClass("");
      }, 700);
    }
    if (vfxObject.run_animation === VFX.PULSE_GOLD) {
      setContainerClass(classes.PULSE_GOLD_ANIMATION);
      setTimeout(() => {
        setContainerClass("");
      }, 3000);
    }
    if (vfxObject.run_animation === VFX.PULSE_PURPLE) {
      setContainerClass(classes.PULSE_PURPLE_ANIMATION);
      setTimeout(() => {
        setContainerClass("");
      }, 3000);
    }
    if (vfxObject.run_animation === VFX.PULSE_PORTAL) {
      setInnercontainerClassA(classes.PULSE_PORTAL_ORANGE);
      setInnercontainerClassB(classes.PULSE_PORTAL_BLUE);
      setTimeout(() => {
        setInnercontainerClassA("");
        setInnercontainerClassB("");
      }, 500);
    }
    // eslint-disable-next-line
  }, [vfxObject.animation_counter]);

  const getDarkness = () => {
    if (selectedRelic?.relic.name === RELICS_NAME.NIGHT_VISION) {
      return Math.min(0.4, vfxObject.darkness);
    } else return vfxObject.darkness;
  };

  return (
    <div
      className={clsx(classes.root, containerClass)}
      style={{ background: fade("#000", getDarkness()) }}
    >
      <div
        className={clsx(
          selectedRelic?.relic.name === RELICS_NAME.NIGHT_VISION &&
            classes.nightVisionEffect
        )}
      >
        <div className={clsx(classes.innerContainer, innercontainerClassA)}>
          <div className={clsx(classes.innerContainer, innercontainerClassB)}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VfxAnimation;
