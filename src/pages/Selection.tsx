import { Box, Button, Grid, makeStyles, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { BrowserRouter as Router, Link, useHistory } from "react-router-dom";
import CubePlayButton from "../components/CubePlayButton";

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
    // marginTop: theme.spacing(4),
    padding: theme.spacing(1, 4),
    background: "#00AFA3",
    border: "2px solid #2DD5C4",
    borderRadius: 4,
    color: "white",
  },
}));

const levels: {
  title: number;
}[] = [];

for (let i = 1; i <= 12; i++) {
  levels.push({ title: i });
}

const Selection: React.FC = ({}) => {
  const MAX_PAGE_SIZE = 1;
  const classes = useStyles();
  const history = useHistory();
  const [page, setPage] = useState<number>(1);

  return (
    <Box className={classes.root}>
      <Grid container style={{ height: "100%" }} alignContent={"space-between"}>
        <Grid item xs={12} container justify={"center"}>
          <Button className={classes.journalBtn}>
            <Typography variant={"h4"}>Journal</Typography>
          </Button>
        </Grid>
        <Grid container className={classes.container} item>
          {levels.map((i, key) => (
            <Grid
              item
              xs={2}
              container
              justify={"center"}
              style={{ marginBottom: 32 }}
            >
              <CubePlayButton key={key} title={i.title} />
            </Grid>
          ))}
        </Grid>
        <Grid item container xs={12} justify={"flex-end"}>
          <Button className={classes.backBtn} onClick={() => history.goBack()}>
            <Typography variant={"h4"}>Back</Typography>
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Selection;
