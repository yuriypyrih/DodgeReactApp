import {
  Box,
  Button,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import CubePlayButton from "../components/CubePlayButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import DefaultIcon from "@material-ui/icons/Description";
import { LocalRelics } from "../Models/data/LocalRelics";
import { ReactComponent as StarIcon } from "../../public/diamond.svg";
import clsx from "clsx";

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
    // border: "1px solid #2DD5C4",
    borderRadius: 99,
    marginRight: "8px",
  },
}));

const PATCH_NOTES: Array<{ title: string; content: string }> = [
  {
    title: "Patch v1.0 : Backend",
    content: "Login and level progression is now stored in a server.",
  },
  {
    title: "Patch v0.2 : Levels",
    content: "A set of 11 playable levels.",
  },
  {
    title: "Patch v0.1 : Foundation",
    content:
      "And old Java project completely converted into Typescript Web Application." +
      " The vision of this project is to work as a portfolio but also a work of passion." +
      " Later on, I am planning to add more levels, superpowers called relics, settings, achievement system, global leaderboards, and much more!",
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
                <Typography color={"primary"} style={{ fontSize: 16 }}>
                  {patch.content}
                </Typography>
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
