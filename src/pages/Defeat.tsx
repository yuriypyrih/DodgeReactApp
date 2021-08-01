import React from "react";
import { Box, Button, Grid, makeStyles, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";

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

const Defeat: React.FC<unknown> = () => {
  const classes = useStyles();
  const history = useHistory();

  const handleRestart = () => {
    const lvl = window.location.pathname.split("/")[2];
    history.replace(`/Game/${lvl}`);
  };

  const handleQuit = () => {
    history.replace("/Selection");
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.container}>
        <Typography variant="h2" style={{ color: "white" }}>
          Defeat
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
            <Button className={classes.button} onClick={handleRestart}>
              <Typography variant="h5">RESTART</Typography>
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

export default Defeat;
