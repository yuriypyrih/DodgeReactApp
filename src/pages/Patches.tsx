import { Box, Button, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    height: "100%",
    background: "#2b2b2c",
  },
  container: {
    // marginTop: theme.spacing(4),
  },
  journalBtn: {
    padding: theme.spacing(1, 4),
    background: "#00AFA3",
    border: "2px solid #2DD5C4",
    borderRadius: 4,
    color: "white",
  },
  relicBtn: {
    padding: theme.spacing(1),
    background: "#00AFA3",
    border: "2px solid #2DD5C4",
    borderRadius: "99px 4px 4px 99px",
    color: "white",
  },
  disabledBtn: {
    background: "#808080",
    border: "4px solid #5A5A5A",
  },
  starsBtn: {
    position: "relative",
    padding: "4px 8px",
    background: "#00AFA3",
    border: "2px solid #2DD5C4",
    userSelect: "none",
    borderRadius: "4px",
    color: "white",
  },
  backBtn: {
    padding: theme.spacing(1, 4),
    background: "#00AFA3",
    border: "2px solid #2DD5C4",
    borderRadius: 4,
    color: "white",
  },
  paginatorBtn: {
    width: 30,
    height: 30,
  },
  relicIcon: {
    width: 34,
    height: 34,
    padding: "6px",
    background: "#2b2b2c",
    borderRadius: 99,
    marginRight: "8px",
  },
}));

const PATCH_NOTES: Array<{ title: string; content: string[] }> = [
  {
    title: "Patch v1.2.5 : Backend - HotFixes",
    content: [
      "After the deployment of the Backend Server and Database there would be complications. It would have been weird if there weren't any." +
        " But thankfully I had some time to fix them right away.",
      "- Refresh Rate throttling capping at 60fps now",
      "- Bugfix: Winning a level should now properly unlock you the next one",
      "- Bugfix: Autocomplete no longer overrides styles",
      "- Loading spinners have been added to login/register",
    ],
  },
  {
    title: "Patch v1.2 : Backend",
    content: [
      "The backend integration is now live! You can now login and keep your progress stored in your account.",
      "- What a time to be alive!",
    ],
  },
  {
    title: "Patch v1.0 : Dodge is now LIVE",
    content: [
      "It's been a long journey but now Dodge Game is now live on Netlify!",
    ],
  },
  {
    title: "Patch v0.2 : Levels",
    content: [
      "A set of 11 playable levels. More levels are in development though. The goal is by the end of this Project scope to have at least 20 playable levels.",
    ],
  },
  {
    title: "Patch v0.1 : Foundation",
    content: [
      "In 2018 I created the first demo using Java of what it's going to be the Dodge Project." +
        " In 2020 I decided to make it into a Web Application and rewrite it with JavaScript and in 2021 to rewrite it again into TypeScript.",
      "Nowadays, it works with modern JS framework like ReactJs alongside UI libraries such as Material-UI." +
        " This project, even though ambitious, it aims to work as a Portfolio piece.  Later on, I am planning to add more levels, superpowers/relics, settings, achievement system, global leaderboards, and much more!",
    ],
  },
];

const Patches: React.FC<unknown> = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Box className={classes.root}>
      <Grid container style={{ height: "100%" }} alignContent={"space-between"}>
        <Grid item xs={12} container justify={"center"}>
          <Grid item style={{ padding: 8 }}>
            <Typography variant={"h4"} color={"primary"}>
              Patches Notes
            </Typography>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          container
          style={{ padding: "8px", maxHeight: 320, overflow: "auto" }}
        >
          {PATCH_NOTES.map((patch, index) => (
            <Grid item key={index} style={{ marginBottom: "36px" }} container>
              <Grid item xs={12}>
                <Typography
                  color={"primary"}
                  style={{ fontSize: 18, fontWeight: "bold" }}
                >
                  {patch.title}
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                style={{ marginTop: "4px", marginLeft: "8px" }}
              >
                {patch.content.map((line, index) => (
                  <Typography
                    key={index}
                    color={"primary"}
                    style={{ fontSize: 16 }}
                  >
                    {line}
                  </Typography>
                ))}
              </Grid>
            </Grid>
          ))}
        </Grid>
        <Grid item container xs={12} justify={"flex-end"}>
          <Button
            className={classes.backBtn}
            onClick={() => history.push("/home")}
          >
            <Typography variant={"h6"}>BACK</Typography>
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Patches;
