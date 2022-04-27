import { Box, Button, Grid, makeStyles, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setLevel } from "../redux/slices/gameSlice";
import { LEVEL_STATUS } from "../Models/enum/LEVEL_STATUS";
import clsx from "clsx";
import { Level } from "../Models/level";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import Skull from "../assets/img/skull.png";

const useStyles = makeStyles((theme) => ({
  root: {
    // padding: theme.spacing(2),
    width: 250,
    height: 300,
    background: "#00AFA3",
    border: "4px solid #2DD5C4",
    borderRadius: 4,
    position: "relative",
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

type ChaosPlayButtonProps = {
  level: Level;
  clickBuy: () => void;
};

const ChaosPlayButton: React.FC<ChaosPlayButtonProps> = ({
  level,
  clickBuy,
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
      <img
        alt={"skull"}
        src={Skull}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          opacity: 0.1,
        }}
      />
      {level.status === LEVEL_STATUS.LOCKED &&
        (hovered ? (
          <LockOpenIcon className={classes.locker} />
        ) : (
          <LockIcon className={classes.locker} />
        ))}
      {level.status !== LEVEL_STATUS.COMING_SOON ? (
        <Grid
          container
          direction={"column"}
          style={{ textShadow: "0 0 5px #00000050" }}
        >
          <Box>
            <Typography variant={"h6"}>{level.level}</Typography>
          </Box>
          <Box>
            <Typography variant={"h6"}>{"Chaos Dungeon "}</Typography>
          </Box>
          <Box>
            <Typography variant={"h6"}>{level.description}</Typography>
          </Box>
        </Grid>
      ) : (
        <Typography variant={"h5"}>{level.level} Coming Soon!</Typography>
      )}
    </Button>
  );
};

export default ChaosPlayButton;
