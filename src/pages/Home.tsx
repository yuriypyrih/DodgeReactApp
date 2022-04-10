import React from "react";
import { useHistory } from "react-router-dom";
import { Box, Button, Grid, makeStyles, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { RootState } from "../redux/store";
import PersonIcon from "@material-ui/icons/Person";

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
  logoutBtn: {
    padding: "4px 8px",
    background: "#00AFA3",
    border: "2px solid #2DD5C4",
    borderRadius: 4,
    color: "white",
    display: "none",
    right: "calc(-100% - 8px)",
    top: -28,
  },
  profile: {
    cursor: "pointer",
    position: "absolute",
    "&:hover #logoutBtn": {
      display: "unset",
    },
  },
}));

const Home: React.FC = () => {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.authSlice);

  const handleGoPatches = () => {
    history.push("/Patches");
  };
  const handleGoSelection = () => {
    history.push("/Selection");
  };

  const handleGoAchievements = () => {
    // history.push("/Achievements")
  };
  const handleGoSettings = () => {
    // history.push("/Settings")
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Box className={classes.root}>
      <Grid container>
        <Grid item xs={12} style={{ position: "relative" }}>
          <Box className={classes.profile}>
            <Grid container wrap={"nowrap"} alignItems={"center"}>
              <PersonIcon color={"primary"} style={{ width: 20, height: 20 }} />
              <Typography color={"primary"}>{user.name}</Typography>
            </Grid>
            <Button
              className={classes.logoutBtn}
              id={"logoutBtn"}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
          <Box mt={4}>
            <Typography variant={"h1"} className={classes.title}>
              Dodger
            </Typography>
          </Box>
          <Box style={{ position: "absolute", right: 0, top: 0 }}>
            <Grid container wrap={"nowrap"} alignItems={"center"}>
              <Typography
                style={{
                  fontSize: 14,
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
                color={"primary"}
                onClick={handleGoPatches}
              >
                Patch Notes v1
              </Typography>
            </Grid>
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
