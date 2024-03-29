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
import { ReactComponent as StarIcon } from "../assets/svg/diamond.svg";
import clsx from "clsx";
import { Level } from "../Models/level";
import UnlockLevelModal from "../components/UnlockLevelModal";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),

    height: "100%",
    background: "#2b2b2c",
    position: "relative",
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

// for (let i = 1; i <= 20; i++) {
//   levels.push({ title: i });
// }

const Selection: React.FC<unknown> = () => {
  const MAX_PAGE_SIZE = 12;
  const classes = useStyles();
  const history = useHistory();
  const [page, setPage] = useState<number>(1);
  const [buyLevel, setBuyLevel] = useState<null | Level>(null);

  const levels = useSelector((state: RootState) => state.gameSlice.levels);
  const { stars, selectedRelic } = useSelector(
    (state: RootState) => state.authSlice.user
  );

  const getPageLevels = () => {
    return levels.slice((page - 1) * MAX_PAGE_SIZE, page * MAX_PAGE_SIZE);
  };

  const isFirstPage = () => {
    return page === 1;
  };

  const isLastPage = () => {
    return levels.length <= page * MAX_PAGE_SIZE;
  };

  const nextPage = () => {
    if (!isLastPage()) setPage(page + 1);
  };

  const previousPage = () => {
    if (!isFirstPage()) setPage(page - 1);
  };

  const getRelic = () => {
    let Icon = DefaultIcon;
    // LocalRelics.forEach((r) => {
    //   if (r.name === selectedRelic) Icon = r.Icon;
    // });
    return <Icon className={classes.relicIcon} />;
  };

  return (
    <Box className={classes.root}>
      <Grid container style={{ height: "100%" }} alignContent={"space-between"}>
        <Grid item xs={12} container justify={"space-between"}>
          <Grid item>
            <Button
              className={clsx(classes.relicBtn, classes.disabledBtn)}
              disabled
            >
              {getRelic()}
              <Typography variant={"h6"}>Relic</Typography>
            </Button>
          </Grid>
          <Grid item>
            <Button
              className={classes.journalBtn}
              onClick={() => history.push("/Wiki")}
            >
              <ImportContactsIcon style={{ marginRight: 8 }} />
              <Typography variant={"h5"}>Wiki</Typography>
            </Button>
          </Grid>
          <Grid item>
            <Box className={classes.starsBtn}>
              <Grid container wrap={"nowrap"} alignItems={"center"}>
                <Grid item>
                  <Typography>{`Stars: ${stars}`}</Typography>
                </Grid>
                <StarIcon
                  style={{
                    width: 18,
                    height: 18,
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
        <Grid container className={classes.container} item>
          {getPageLevels().map((item, key) => (
            <Grid
              item
              xs={2}
              container
              justify={"center"}
              style={{ marginBottom: 32 }}
              key={"level" + key + item.level}
            >
              <CubePlayButton level={item} clickBuy={() => setBuyLevel(item)} />
            </Grid>
          ))}
        </Grid>
        <Grid item container xs={12} justify={"flex-end"}>
          <Box mr={2}>
            <IconButton
              color={"primary"}
              onClick={previousPage}
              disabled={isFirstPage()}
            >
              <ArrowBackIosIcon className={classes.paginatorBtn} />
            </IconButton>
            <IconButton
              color={"primary"}
              onClick={nextPage}
              disabled={isLastPage()}
            >
              <ArrowForwardIosIcon className={classes.paginatorBtn} />
            </IconButton>
          </Box>

          <Button
            className={classes.backBtn}
            onClick={() => history.push("/home")}
          >
            <Typography variant={"h6"}>BACK</Typography>
          </Button>
        </Grid>
      </Grid>
      {buyLevel !== null && (
        <UnlockLevelModal level={buyLevel} close={() => setBuyLevel(null)} />
      )}
    </Box>
  );
};

export default Selection;
