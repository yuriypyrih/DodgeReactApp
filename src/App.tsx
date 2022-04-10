import React from "react";
import VfxAnimation from "./layout/VfxAnimation";
import { makeStyles } from "@material-ui/core";
import initialize from "./utils/initialize";
import Routes from "./Routes/Routes";

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

function App() {
  const classes = useStyles();

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
