import { Button, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setLevel } from "../redux/slices/gameSlice";
import { LEVEL_STATUS } from "../Models/enum/LEVEL_STATUS";
import clsx from "clsx";
import { Level } from "../Models/level";
import LockIcon from "@material-ui/icons/Lock";

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

type CubePlayButtonProps = {
  level: Level;
};

const CubePlayButton: React.FC<CubePlayButtonProps> = ({ level }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  const handleClick = () => {
    dispatch(setLevel(Number(level.level)));
    history.push(`/Game/${level.level}`);
  };

  return (
    <Button
      className={clsx(
        classes.root,
        (level.status === LEVEL_STATUS.LOCKED ||
          level.status === LEVEL_STATUS.COMING_SOON) &&
          classes.locked
      )}
      onClick={handleClick}
      disabled={level.status !== LEVEL_STATUS.UNLOCKED}
    >
      {level.status === LEVEL_STATUS.LOCKED && (
        <LockIcon className={classes.locker} />
      )}
      {level.status !== LEVEL_STATUS.COMING_SOON ? (
        <Typography variant={"h6"}>{level.level}</Typography>
      ) : (
        <Typography variant={"caption"}>{level.level} Coming Soon!</Typography>
      )}
    </Button>
  );
};

export default CubePlayButton;
