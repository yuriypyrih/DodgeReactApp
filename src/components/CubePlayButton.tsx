import { Button, makeStyles } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Link, useHistory } from "react-router-dom";
import { setLevel } from "../redux/slices/gameSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    // padding: theme.spacing(2),
    width: 72,
    height: 72,
    background: "#00AFA3",
    border: "4px solid #2DD5C4",
    borderRadius: 4,
    fontSize: 20,
    color: "white",
  },
}));

type CubePlayButtonProps = {
  title: number;
};

const CubePlayButton: React.FC<CubePlayButtonProps> = ({ title }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  const handleClick = () => {
    dispatch(setLevel(Number(title)));
    history.push(`/Game/${title}`);
  };

  return (
    <Button className={classes.root} onClick={handleClick}>
      {title}
    </Button>
  );
};

export default CubePlayButton;
