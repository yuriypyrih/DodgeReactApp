import { Box, Button, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import { PATCH_NOTES } from "../Models/data/PatchNotes";

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

const Patches: React.FC<unknown> = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Box className={classes.root}>
      <Grid container style={{ height: "100%" }} alignContent={"space-between"}>
        <Grid item xs={12} container justify={"center"}>
          <Grid item style={{ padding: 8 }}>
            <Typography variant={"h4"} color={"primary"}>
              Patch Notes
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
