import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../pages/Home";
import Settings from "../pages/Settings";
import Artist from "../pages/Artist";
import Artists from "../pages/Artists";
import Albums from "../pages/Albums";
import Album from "../pages/Album";

export default function Routes(props) {
  const { user, setReloadApp, playerSong } = props;
  return (
    <Switch>
      <Route path="/" exact>
        <Home playerSong={playerSong} />
      </Route>
      <Route path="/artists" exact>
        <Artists />
      </Route>
      <Route path="/albums" exact>
        <Albums />
      </Route>
      <Route path="/artist/:id" exact>
        <Artist />
      </Route>
      <Route path="/album/:id" exact>
        <Album />
      </Route>
      <Route path="/settings" exact>
        <Settings user={user} setReloadApp={setReloadApp} />
      </Route>
    </Switch>
  );
}
