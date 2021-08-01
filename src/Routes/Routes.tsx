import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Game from "../pages/Game";
import Victory from "../pages/Victory";
import Selection from "../pages/Selection";
import Home from "../pages/Home";
import Defeat from "../pages/Defeat";
import Wiki from "../pages/Wiki";

const Routes: React.FC<unknown> = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/Home" component={Home} />
        <Route exact path="/Selection" component={Selection} />
        <Route exact path="/Game/:level" component={Game} />
        <Route exact path="/Victory/:level" component={Victory} />
        <Route exact path="/Defeat/:level" component={Defeat} />
        <Route exact path="/Wiki" component={Wiki} />
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
