import React, { useEffect, useState } from "react";
import VfxAnimation from "./layout/VfxAnimation";
import { makeStyles } from "@material-ui/core";
import initialize from "./utils/initialize";
import Routes from "./Routes/Routes";
import { relics } from "./game/engine/relics/relics_collection";
import startEngine from "./game";
import Engine from "./game/engine/game";
import Game from "./game/engine/game";

const useStyles = makeStyles({
  app: {
    display: "flex",
    width: "100vw",
    height: "100vh",
    alignItems: "center",
    justifyContent: "center",
  },
  mainWindow: {
    position: "relative",
    height: 500,
    width: 900,
    borderRadius: "3px",
  },
});

initialize();
// init
let game: Game | null = null;
export { game };

function App() {
  const classes = useStyles();

  useEffect(() => {
    console.log("INITIALIZE ENGINE");
    game = startEngine();
  }, []);

  return (
    <div className={classes.app}>
      <div className={classes.mainWindow}>
        <VfxAnimation>
          <Routes />
        </VfxAnimation>
      </div>
    </div>
  );
}

export default App;
