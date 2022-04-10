import { Button, makeStyles, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { LEVEL_STATUS } from "../Models/enum/LEVEL_STATUS";
import clsx from "clsx";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { Relic } from "../Models/relic";

const useStyles = makeStyles((theme) => ({
  root: {
    // padding: theme.spacing(2),
    width: 72,
    height: 72,
    background: "#00AFA3",
    border: "4px solid #2DD5C4",
    borderRadius: 4,
    color: "white",
  },
  locked: {
    background: "#808080",
    border: "4px solid #5A5A5A",
  },
  locker: {
    position: "absolute",
    width: 30,
    height: 30,
    color: "#BFBFBF",
    right: -12,
    top: -12,
  },
}));

type CubeRelicButtonProps = {
  relic: Relic;
};

const CubeRelicButton: React.FC<CubeRelicButtonProps> = ({ relic }) => {
  const classes = useStyles();

  const [hovered, setHovered] = useState<boolean>(false);

  const handleClick = () => {
    if (relic.status === LEVEL_STATUS.UNLOCKED) {
      // Try to select it
    } else if (relic.status === LEVEL_STATUS.LOCKED) {
      // Try to buy it
    }
  };

  return (
    <Button
      className={clsx(
        classes.root,
        (relic.status === LEVEL_STATUS.LOCKED ||
          relic.status === LEVEL_STATUS.COMING_SOON) &&
          classes.locked
      )}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      disabled={
        relic.status !== LEVEL_STATUS.UNLOCKED &&
        relic.status !== LEVEL_STATUS.LOCKED
      }
    >
      {relic.status === LEVEL_STATUS.LOCKED &&
        (hovered ? (
          <LockOpenIcon className={classes.locker} />
        ) : (
          <LockIcon className={classes.locker} />
        ))}
      {relic.status !== LEVEL_STATUS.COMING_SOON ? (
        <Typography variant={"h6"}>{relic.name}</Typography>
      ) : (
        <Typography variant={"caption"}>{relic.name} Coming Soon!</Typography>
      )}
    </Button>
  );
};

export default CubeRelicButton;
