import React from "react";
import { useHistory } from "react-router-dom";
import { Box, Button, Grid, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    height: "100%",
    background: "#2b2b2c",
  },
  title: {
    background: `linear-gradient(
                180deg,
               ${theme.palette.primary.dark} 45%,
               ${theme.palette.primary.main} 65%
            )`,
    " -webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
    textAlign: "center",
    userSelect: "none",
    fontWeight: 500,
  },
  menuContainer: {
    width: 400,
  },
  btn: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(2, 4),
    minWidth: 350,
    background: "#00AFA3",
    border: "2px solid #2DD5C4",
    borderRadius: 4,
    color: "white",
  },
}));

const Home: React.FC = () => {
  const history = useHistory();
  const classes = useStyles();

  const handleGoSelection = () => {
    history.push("/Selection");
  };
  const handleGoAchievements = () => {
    // history.push("/Achievements")
  };
  const handleGoSettings = () => {
    // history.push("/Settings")
  };

  return (
    <Box className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <Box mt={4}>
            <Typography variant={"h1"} className={classes.title}>
              Dodger
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} container className={classes.menuContainer}>
          <Grid item xs={12} container justify={"center"}>
            <Button onClick={handleGoSelection} className={classes.btn}>
              <Typography variant={"h5"}>PLAY</Typography>
            </Button>
          </Grid>
          <Grid item xs={12} container justify={"center"}>
            <Button
              onClick={handleGoAchievements}
              className={classes.btn}
              disabled
            >
              <Typography variant={"h5"}>ACHIEVEMENTS</Typography>
            </Button>
          </Grid>
          <Grid item xs={12} container justify={"center"}>
            <Button onClick={handleGoSettings} className={classes.btn} disabled>
              <Typography variant={"h5"}>SETTINGS</Typography>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
