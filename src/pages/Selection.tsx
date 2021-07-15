import {Box, Button, Grid, makeStyles, Typography} from "@material-ui/core";
import React from "react";
import {BrowserRouter as Router, Link, useHistory} from "react-router-dom";
import CubePlayButton from "../components/CubePlayButton";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  container: {
    marginTop: theme.spacing(4),
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
    marginTop: theme.spacing(4),
    padding: theme.spacing(1, 4),
    background: "#00AFA3",
    border: "2px solid #2DD5C4",
    borderRadius: 4,
    color: "white",
  }
  ,
}));

let levels: {
  title: number;
}[] = [
  { title: 1 },
  { title: 2 },
  { title: 3 },
  { title: 4 },
  { title: 5 },
  { title: 6 },
  { title: 7 },
  { title: 8 },
  { title: 9 },
];

const Selection: React.FC = ({}) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Box className={classes.root}>
      <Grid item xs={12} container justify={'center'}>
        <Button className={classes.journalBtn}>
          <Typography variant={'h4'}>
            Journal
          </Typography>
        </Button>
      </Grid>

      <Grid container className={classes.container}>
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
      <Grid item container xs={12} justify={'flex-end'}>
        <Button
            className={classes.backBtn}
            onClick={()=>history.goBack()}
        >
          <Typography variant={'h4'}>
            Back
          </Typography>
        </Button>
      </Grid>

    </Box>
  );
};

export default Selection;
