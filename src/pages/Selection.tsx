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
    marginTop: theme.spacing(4),
    padding: theme.spacing(1, 4),
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
  paginatorBtn: {
    width: 30,
    height: 30,
  },
}));

const levels: {
  title: number;
}[] = [];

for (let i = 1; i <= 20; i++) {
  levels.push({ title: i });
}

const Selection: React.FC = ({}) => {
  const MAX_PAGE_SIZE = 12;
  const classes = useStyles();
  const history = useHistory();
  const [page, setPage] = useState<number>(1);

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

  return (
    <Box className={classes.root}>
      <Grid container style={{ height: "100%" }} alignContent={"space-between"}>
        <Grid item xs={12} container justify={"center"}>
          <Button className={classes.journalBtn}>
            <Typography variant={"h5"}>JOURNAL</Typography>
          </Button>
        </Grid>
        <Grid container className={classes.container} item>
          {getPageLevels().map((i, key) => (
            <Grid
              item
              xs={2}
              container
              justify={"center"}
              style={{ marginBottom: 32 }}
              key={key}
            >
              <CubePlayButton title={i.title} />
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
    </Box>
  );
};

export default Selection;
