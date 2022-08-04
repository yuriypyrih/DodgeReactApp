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
import { GAME_STATE } from "../game/enum/game_state";

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
    background: "#2b2b2c",
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
    background: "#00AFA3",

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
    if (game) game.togglePause(GAME_STATE.PLAYING);
  };

  const handleReset = () => {
    if (game) game.reset();
    toggleReset();
  };

  const handleQuit = () => {
    if (game) game.close();
    history.replace("/Selection");
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.container}>
        <Typography variant="h2" style={{ color: "white" }}>
          Paused
        </Typography>
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
              <Typography variant="h5">RESUME</Typography>
            </Button>
          </Grid>

          <Grid item>
            <Button className={classes.button} onClick={handleReset}>
              <Typography variant="h5">RESET</Typography>
            </Button>
          </Grid>

          <Grid item>
            <Button className={classes.button} onClick={handleQuit}>
              <Typography variant="h5">QUIT</Typography>
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Pause;
