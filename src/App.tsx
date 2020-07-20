import React from "react";
import "./sass/main.scss";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Canvas from "./pages/Canvas";
import Home from "./pages/Home";
import Selection from "./pages/Selection";

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
              <Canvas />
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
