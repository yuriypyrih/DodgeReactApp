import React from "react";
import {
  Box,
  Button,
  fade,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import Game from "../game/engine/game";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: 1000,
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: `linear-gradient(-45deg,  #98989825 0% , #98989825 19%,
         #c6c6c632 20%, #c6c6c632 35%,  #98989825 36% , #98989825 59%,
          #c6c6c632 60%, #c6c6c632 75%,  #98989825 76% , #98989825 100%)`,
  },
  container: {
    background: "#1a1a1d",
    border: "1px solid #2dd5c4",
    boxShadow: `0 0 2rem ${fade("#2dd5c4", 0.2)}`,
    padding: theme.spacing(6),
    textAlign: "center",
    minWidth: 400,
  },
  button: {
    padding: theme.spacing(1),
    color: "white",
    minWidth: "200px",
    border: "2px solid " + theme.palette.primary.main,
  },
}));

type PauseProps = {
  game: Game | null;
  toggleReset: () => void;
};

const Pause: React.FC<PauseProps> = ({ game, toggleReset }) => {
  const classes = useStyles();
  const history = useHistory();

  const handleResume = () => {
    if (game) game.togglePause();
  };

  const handleReset = () => {
    if (game) game.reset();
    toggleReset();
  };

  const handleQuit = () => {
    if (game) game.close();
    history.push("/Selection");
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.container}>
        <Typography variant="h1">Paused</Typography>
        <Grid
          container
          justify="center"
          direction="column"
          alignItems="center"
          spacing={1}
          style={{ marginTop: 24 }}
        >
          <Grid item>
            <Button className={classes.button} onClick={handleResume}>
              <Typography variant="h4">RESUME</Typography>
            </Button>
          </Grid>

          <Grid item>
            <Button className={classes.button} onClick={handleReset}>
              <Typography variant="h4">RESET</Typography>
            </Button>
          </Grid>

          <Grid item>
            <Button className={classes.button} onClick={handleQuit}>
              <Typography variant="h4">QUIT</Typography>
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Pause;
