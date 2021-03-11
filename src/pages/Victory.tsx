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

const Victory: React.FC<unknown> = ({}) => {
  const classes = useStyles();
  const history = useHistory();

  const handleNext = () => {
    //next
  };

  const handleQuit = () => {
    history.push("/Selection");
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.container}>
        <Typography variant="h1">Victory</Typography>
        <Grid
          container
          justify="center"
          direction="column"
          alignItems="center"
          spacing={1}
          style={{ marginTop: 24 }}
        >
          <Grid item>
            <Button className={classes.button} disabled onClick={handleNext}>
              <Typography variant="h4">NEXT</Typography>
            </Button>
          </Grid>

          <Grid item>
            <Button className={classes.button} onClick={handleQuit}>
              <Typography variant="h4">EXIT</Typography>
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Victory;
