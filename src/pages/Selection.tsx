import { Box, Button, Grid, makeStyles } from "@material-ui/core";
import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import CubePlayButton from "../components/CubePlayButton";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  container: {
    marginTop: theme.spacing(4),
  },
  journalBtn: {
    padding: theme.spacing(1, 4),
    background: "#00AFA3",
    border: "2px solid #2DD5C4",
    borderRadius: 4,
    color: "white",
  },
  backBtn: {},
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

  return (
    <Box className={classes.root}>
      <Button className={classes.journalBtn}>Journal</Button>
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
      <Link
        to="/Home"
        className="menu-levels_back button-style"
        id="btn-levels-back"
      >
        Back
      </Link>
    </Box>
  );
};

export default Selection;
