import React from "react";
import { LinearProgress } from "@material-ui/core";

type HudProps = {};

const Hud: React.FC<HudProps> = ({}) => {
  const progress = 50;

  return (
    <div className={"hud-container"}>
      <LinearProgress variant="determinate" value={progress} />
    </div>
  );
};

export default Hud;
