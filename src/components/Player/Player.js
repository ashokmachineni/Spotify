import React from "react";
import { Grid, Progress, Icon, Image, Input } from "semantic-ui-react";
import "./Player.scss";
export default function Player() {
  return (
    <div className="player">
      <Grid>
        <Grid.Column width={4} className="left">
          <h2>left...</h2>
        </Grid.Column>
        <Grid.Column width={8} className="center">
          <h2>center...</h2>
        </Grid.Column>
        <Grid.Column width={4} className="right">
          <h2>Right...</h2>
        </Grid.Column>
      </Grid>
    </div>
  );
}
