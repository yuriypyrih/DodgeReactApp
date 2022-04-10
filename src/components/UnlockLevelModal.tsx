import { Box, Button, Grid, makeStyles, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setLevel } from "../redux/slices/gameSlice";
import { LEVEL_STATUS } from "../Models/enum/LEVEL_STATUS";
import clsx from "clsx";
import { Level } from "../Models/level";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { RootState } from "../redux/store";
import { unlockLevel } from "../redux/slices/authSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#00000070",
  },
  mainBox: {
    padding: "16px",
    borderRadius: 8,
    background: "#2b2b2c",
    textAlign: "center",
    border: "4px solid #00AFA3",
    color: "white",
    width: 260,
  },
  btn: {
    background: "#00AFA3",
    border: "2px solid #2DD5C4",
    borderRadius: 4,
    color: "white",
  },
  locked: {
    background: "#808080",
    border: "2px solid #5A5A5A",
  },
}));

type UnlockLevelModalProps = {
  level: Level;
  close: () => void;
};

const UnlockLevelModal: React.FC<UnlockLevelModalProps> = ({
  level,
  close,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { stars } = useSelector((state: RootState) => state.authSlice.user);

  const handleBuy = () => {
    dispatch(unlockLevel({ unlockLevel: level.levelId, cost: 4 }));
    close();
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.mainBox}>
        <Grid item container>
          <Grid item xs={12}>
            <Typography>{`Unlock level ${level.level}`}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>{`Cost: 4 Stars`}</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            container
            justify={"space-between"}
            style={{ marginTop: 32 }}
          >
            <Button onClick={close} className={classes.btn}>
              Cancel
            </Button>
            <Button
              disabled={stars < 4}
              onClick={handleBuy}
              className={clsx(classes.btn, stars < 4 && classes.locked)}
            >
              Sure
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default UnlockLevelModal;
