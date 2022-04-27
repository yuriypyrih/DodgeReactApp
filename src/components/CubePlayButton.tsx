import {
  Button,
  makeStyles,
  Tooltip,
  Typography,
  withStyles,
} from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setLevel } from "../redux/slices/gameSlice";
import { LEVEL_STATUS } from "../Models/enum/LEVEL_STATUS";
import clsx from "clsx";
import { Level } from "../Models/level";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";

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
  tooltip: {
    "&.tooltip": { backgroundColor: "#2dd5c4", color: "white" },
  },
}));

type CubePlayButtonProps = {
  level: Level;
  clickBuy: () => void;
  tooltipBot?: boolean;
};

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "#2dd5c4",
    color: "white",
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}))(Tooltip);

const CubePlayButton: React.FC<CubePlayButtonProps> = ({
  level,
  clickBuy,
  tooltipBot = false,
}) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const [hovered, setHovered] = useState<boolean>(false);

  const handleClick = () => {
    if (level.status === LEVEL_STATUS.UNLOCKED) {
      dispatch(setLevel(level));
      history.push(`/Game/${level.level}`);
    } else if (level.status === LEVEL_STATUS.LOCKED) {
      clickBuy();
    }
  };

  return (
    <LightTooltip
      title={level.description}
      // classes={{ popper: classes.tooltip }}
      placement={tooltipBot ? "bottom" : "top"}
    >
      <Button
        className={clsx(
          classes.root,
          (level.status === LEVEL_STATUS.LOCKED ||
            level.status === LEVEL_STATUS.COMING_SOON) &&
            classes.locked
        )}
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        disabled={
          level.status !== LEVEL_STATUS.UNLOCKED &&
          level.status !== LEVEL_STATUS.LOCKED
        }
      >
        {level.status === LEVEL_STATUS.LOCKED &&
          (hovered ? (
            <LockOpenIcon className={classes.locker} />
          ) : (
            <LockIcon className={classes.locker} />
          ))}
        {level.status !== LEVEL_STATUS.COMING_SOON ? (
          <Typography variant={"h6"}>{level.level}</Typography>
        ) : (
          <Typography variant={"caption"}>
            {level.level} Coming Soon!
          </Typography>
        )}
      </Button>
    </LightTooltip>
  );
};

export default CubePlayButton;
