import React from "react";
import { Switch, Route } from "react-router-dom";
import AuthPage from "../pages/AuthPage";

const AuthRoutes: React.FC<unknown> = () => {
  return (
    <Switch>
      <Route exact path="/Auth" component={AuthPage} />
      <Route path="/">
        <AuthPage />
      </Route>
    </Switch>
  );
};

export default AuthRoutes;
