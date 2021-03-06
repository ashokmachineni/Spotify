import React, { useState } from "react";
import { Grid } from "semantic-ui-react";
import "./LoggedLayout.scss";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "../../routes/Routes";
import MenuLeft from "../../components/MenuLeft/MenuLeft";
import TopBar from "../../components/TopBar";
import Player from "../../components/Player";
import firebase from "../../utils/Firebase";
import "firebase/storage";

const arrrr = {
  image:
    "https://www.bollyarena.net/wp-content/uploads/2016/11/maxresdefault-7.jpg",
  name: "Haanikaarak Bapu",
  url:
    "https://irebasestorage.googleapis.com/v0/b/spotify-eb47d.appspot.com/o/song%2FHaanikaarak.mp3?alt=media&token=cc4b2020-7e06-49c6-b092-4297ee25327d"
};
export default function LoggedLayout(props) {
  const { user, setReloadApp } = props;
  const [songData, setSongData] = useState("");
  const playerSong = (albumImage, songName, songNameFile) => {
    console.log("albumImage>" + albumImage);
    console.log("songName:>" + songName);
    console.log("songUrl::" + songNameFile);
    firebase
      .storage()
      .ref(`song/${songNameFile}`)
      .getDownloadURL()
      .then(url => {
        setSongData({ url, image: albumImage, name: songName });
      });
  };

  /*const image1 =
    "https://www.bollyarena.net/wp-content/uploads/2016/11/maxresdefault-7.jpg";
  const name1 = "Haanikaarak Bapu";
  const url1 =
    "https://firebasestorage.googleapis.com/v0/b/spotify-eb47d.appspot.com/o/song%2FHaanikaarak.mp3?alt=media&token=cc4b2020-7e06-49c6-b092-4297ee25327d";*/

  return (
    <Router>
      <Grid className="logged-layouts">
        <Grid.Row>
          <Grid.Column width={3}>
            <MenuLeft user={user} />
          </Grid.Column>
          <Grid.Column className="content" width={13}>
            <TopBar user={user} />
            <Routes
              user={user}
              setReloadApp={setReloadApp}
              playerSong={playerSong}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <Player songData={songData} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Router>
  );
}
