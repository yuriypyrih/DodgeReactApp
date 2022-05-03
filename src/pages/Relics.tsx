import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Box,
  Button,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { ReactComponent as StarIcon } from "../assets/svg/diamond.svg";
import CubeRelicButton from "../components/CubeRelicButton";
import { relics } from "../game/engine/relics/relics_collection";

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
  backBtn: {
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
  relicIcon: {
    width: 34,
    height: 34,
    padding: "6px",
    background: "#2b2b2c",
    border: "1px solid #2DD5C4",
    borderRadius: 99,
    marginRight: "8px",
  },
  starsBtn: {
    position: "relative",
    padding: "4px 8px",
    background: "#00AFA3",
    border: "2px solid #2DD5C4",
    borderRadius: "4px",
    color: "white",
  },
}));

const Relics: React.FC = () => {
  const history = useHistory();
  const classes = useStyles();
  const { stars, selectedRelic } = useSelector(
    (state: RootState) => state.authSlice.user
  );

  return (
    <Box className={classes.root}>
      <Grid container style={{ height: "100%" }} alignContent={"space-between"}>
        <Grid item xs={12} container justify={"space-between"}>
          <Grid item>
            {/*<Button className={classes.relicBtn}>{getRelic()}</Button>*/}
          </Grid>
          <Grid item>
            <Typography variant={"h5"} color={"primary"}>
              Relic Selection
            </Typography>
          </Grid>
          <Grid item>
            <Box className={classes.starsBtn}>
              <Grid container wrap={"nowrap"} alignItems={"center"}>
                <Grid item>
                  <Typography>{`Stars ${stars}`}</Typography>
                </Grid>
                <StarIcon
                  style={{
                    width: 18,
                    height: 18,
                    fill: "yellow",
                    position: "absolute",
                    right: "-10px",
                    top: "-10px",
                    background: "#2b2b2c",
                    padding: "4px",
                    borderRadius: 99,
                  }}
                />
              </Grid>
            </Box>
          </Grid>
        </Grid>
        <Grid container item>
          {relics.map((item, key) => (
            <Grid
              item
              xs={3}
              container
              justify={"center"}
              style={{ marginBottom: 32 }}
              key={"level" + key}
            >
              <CubeRelicButton
                relic={item}
                selected={selectedRelic === item.id}
              />
            </Grid>
          ))}
        </Grid>

        <Grid item container xs={12} justify={"flex-end"}>
          <Button
            className={classes.backBtn}
            onClick={() => history.push("/selection")}
          >
            <Typography variant={"h6"}>BACK</Typography>
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Relics;
