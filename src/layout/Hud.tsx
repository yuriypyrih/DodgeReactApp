import React, { useEffect } from "react";
import { LinearProgress, makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";

type HudProps = {};

const Hud: React.FC<HudProps> = ({}) => {
  const useStyles = makeStyles({
    progressBar: {
      width: "70%",
      height: "6px",
      borderRadius: "5px",
      barColorPrimary: "#fff",
      barColorSecondary: "red",
    },
    healthBar: {
      width: "28%",
      height: "6px",
      borderRadius: "5px",
      barColorPrimary: "#fff",
      barColorSecondary: "red",
    },
  });

  const classes = useStyles();
  const [progress, setProgress] = React.useState(50);

  const hp = useSelector((state) => state.healthBarValue);

  useEffect(() => {
    console.log("Hud enabled..");
  }, []);

  return (
    <div className={"hud-container"}>
      <LinearProgress
        className={classes.healthBar + " healthBar"}
        variant="determinate"
        value={progress}
      />
      <LinearProgress
        className={classes.progressBar + " progressBar"}
        variant="determinate"
        value={progress}
      />
    </div>
  );
};

export default Hud;
