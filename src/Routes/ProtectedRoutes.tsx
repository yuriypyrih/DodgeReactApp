import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Game from "../pages/Game";
import Victory from "../pages/Victory";
import Selection from "../pages/Selection";
import Home from "../pages/Home";
import Defeat from "../pages/Defeat";
import Wiki from "../pages/Wiki";
import Patches from "../pages/Patches";
import { getMe } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";

const ProtectedRoutes: React.FC<unknown> = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  return (
    <Switch>
      <Route exact path="/Home" component={Home} />
      <Route exact path="/Selection" component={Selection} />
      <Route exact path="/Game/:level" component={Game} />
      <Route exact path="/Victory/:level" component={Victory} />
      <Route exact path="/Defeat/:level" component={Defeat} />
      <Route exact path="/Patches" component={Patches} />
      <Route exact path="/Wiki" component={Wiki} />
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  );
};

export default ProtectedRoutes;
