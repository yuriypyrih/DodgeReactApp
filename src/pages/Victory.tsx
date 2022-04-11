import React, { useEffect, useState } from "react";
import { Box, Button, Grid, makeStyles, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { LEVEL_STATUS } from "../Models/enum/LEVEL_STATUS";
import { Level } from "../Models/level";
import { setLevel } from "../redux/slices/gameSlice";
import { dispatch } from "../index";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#2b2b2c",
    height: "100%",
  },
  container: {
    padding: theme.spacing(6),
    minWidth: 400,
    textAlign: "center",
  },
  button: {
    padding: theme.spacing(1),
    color: "white",
    minWidth: "200px",
    background: "#00AFA3",
    border: "2px solid " + theme.palette.primary.main,
  },
}));

const Victory: React.FC<unknown> = () => {
  const classes = useStyles();
  const history = useHistory();
  const levels = useSelector((state: RootState) => state.gameSlice.levels);
  const [nextLevel, setNextLevel] = useState<Level | null>(null);

  useEffect(() => {
    const lvl = window.location.pathname.split("/")[2];
    const tempNextLevel = Number(lvl) + 1;
    const foundLevel = levels.find((level) => level.level === tempNextLevel);
    if (
      foundLevel &&
      foundLevel.status !== LEVEL_STATUS.DISABLED &&
      foundLevel.status !== LEVEL_STATUS.COMING_SOON
    ) {
      setNextLevel(foundLevel);
    }
  }, [levels]);

  const handleNext = () => {
    if (nextLevel) {
      dispatch(setLevel(nextLevel));
      history.replace(`/Game/${nextLevel.level}`);
    }
  };

  const handleQuit = () => {
    history.replace("/Selection");
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.container}>
        <Typography variant="h2" style={{ color: "white" }}>
          Victory
        </Typography>
        <Grid
          container
          justify="center"
          direction="column"
          alignItems="center"
          spacing={1}
          style={{ marginTop: 24 }}
        >
          {nextLevel && (
            <Grid item>
              <Button className={classes.button} onClick={handleNext}>
                <Typography variant="h5">NEXT</Typography>
              </Button>
            </Grid>
          )}

          <Grid item>
            <Button className={classes.button} onClick={handleQuit}>
              <Typography variant="h5">EXIT</Typography>
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Victory;
