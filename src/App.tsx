import React from "react";
import "./sass/main.scss";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Game from "./layout/Game";
import Home from "./layout/Home";
import Selection from "./layout/Selection";

function App() {
  return (
    <div className="App">
      <div className="main-window">
        <Router>
          <Switch>
            <Route path="/Home">
              <Home />
            </Route>
            <Route path="/Selection">
              <Selection />
            </Route>
            <Route path="/Game">
              <Game />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
