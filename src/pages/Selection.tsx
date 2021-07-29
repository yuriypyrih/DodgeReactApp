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
  level: number;
  description: string;
  locked: boolean;
}[] = [
  { level: 1, description: "Scout", locked: false },
  { level: 2, description: "Speeder", locked: false },
  { level: 3, description: "Tracer", locked: false },
  { level: 4, description: "Worm", locked: false },
  { level: 5, description: "Slime", locked: false },
  { level: 6, description: "Bomber", locked: false },
  { level: 7, description: "Venom", locked: false },
  { level: 8, description: "Marathon.v01", locked: false },
  { level: 9, description: "Titan", locked: false },
  { level: 10, description: "Ghost", locked: false },
  { level: 11, description: "Shadow", locked: false },
  { level: 12, description: "Mimic", locked: true },
  { level: 13, description: "Marathon.v02", locked: true },
  { level: 14, description: "Portal", locked: true },
  { level: 15, description: "Magnet", locked: true },
  { level: 16, description: "Hacker", locked: true },
  { level: 17, description: "Frosty", locked: true },
  { level: 18, description: "Flamy", locked: true },
  { level: 19, description: "Marathon.v03", locked: true },
  { level: 20, description: "Final BOss", locked: true },
];

// for (let i = 1; i <= 20; i++) {
//   levels.push({ title: i });
// }

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
          <Button
            className={classes.journalBtn}
            onClick={() => history.push("/Wiki")}
          >
            <ImportContactsIcon style={{ marginRight: 8 }} />
            <Typography variant={"h5"}>Wiki</Typography>
          </Button>
        </Grid>
        <Grid container className={classes.container} item>
          {getPageLevels().map((item, key) => (
            <Grid
              item
              xs={2}
              container
              justify={"center"}
              style={{ marginBottom: 32 }}
              key={key}
            >
              <CubePlayButton title={item.level} disabled={item.locked} />
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
