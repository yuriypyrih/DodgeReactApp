import React from "react";
import "./sass/main.scss";
import VfxAnimation from "./layout/VfxAnimation";
import { makeStyles } from "@material-ui/core";
import Routes from "./Routes/Routes";
// import startEngine from "./game";
// import { useDispatch } from "react-redux";
// import { setEngine } from "./redux/slices/engineSlice";

const useStyles = makeStyles({
  mainWindow: {
    position: "relative",
    height: 500,
    width: 900,
    borderRadius: "3px",
  },
});

function App() {
  const classes = useStyles();

  return (
    <div className="App">
      <div className={classes.mainWindow}>
        <VfxAnimation>
          <Routes />
        </VfxAnimation>
      </div>
    </div>
  );
}

export default App;
