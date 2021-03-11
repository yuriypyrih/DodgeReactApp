import React from "react";
import { Box, Button, Grid, makeStyles, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {},
  container: {
    padding: theme.spacing(6),
    minWidth: 400,
    textAlign: "center",
  },
  button: {
    padding: theme.spacing(1),
    color: "white",
    minWidth: "200px",
    border: "2px solid " + theme.palette.primary.main,
  },
}));

const Defeat: React.FC<unknown> = ({}) => {
  const classes = useStyles();
  const history = useHistory();

  const handleRestart = () => {
    history.push("/Game");
  };

  const handleQuit = () => {
    history.push("/Selection");
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.container}>
        <Typography variant="h1">Defeat</Typography>
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
              <Typography variant="h4">RESTART</Typography>
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

export default Defeat;
