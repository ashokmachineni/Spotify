import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../pages/Home";

export default function Routes(props) {
  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/artists" exact>
        <h1>artists</h1>
      </Route>
      <Route path="/settings" exact>
        <h1>Settings</h1>
      </Route>
    </Switch>
  );
}
