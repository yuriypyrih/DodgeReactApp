import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Game from "../pages/Game";
import Codex from "../pages/Codex";
import Victory from "../pages/Victory";
import Selection from "../pages/Selection";
import Home from "../pages/Home";
import Defeat from "../pages/Defeat";

const Routes: React.FC<unknown> = ({}) => {
  return (
    <Router>
      <Switch>
        <Route exact path="/Home" component={Home} />
        <Route exact path="/Selection" component={Selection} />
        <Route exact path="/Game/:level" component={Game} />
        <Route exact path="/Victory" component={Victory} />
        <Route exact path="/Defeat" component={Defeat} />
        <Route exact path="/Codex" component={Codex} />
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
