import React, { useState, useEffect } from "react";
import { map } from "lodash";
import BannerHome from "../../components/BannerHome";
import firebase from "../../utils/Firebase";
import "firebase/firestore";
import "./Home.scss";
import BasicSliderItems from "../../components/Sliders/BasicSliderItems";
import SongSlider from "../../components/Sliders/SongSlider";

const db = firebase.firestore(firebase);
export default function Home(props) {
  const { playerSong } = props;
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [songs, setSongs] = useState([]);
  //console.log(songs);
  useEffect(() => {
    db.collection("artists")
      .get()
      .then(response => {
        const arrayArtists = [];
        map(response.docs, artist => {
          const data = artist.data();
          data.id = artist.id;
          arrayArtists.push(data);
        });
        setArtists(arrayArtists);
      });
  }, []);
  useEffect(() => {
    db.collection("albums")
      .get()
      .then(response => {
        const arrayAlbums = [];
        map(response.docs, album => {
          const data = album.data();
          data.id = album.id;
          arrayAlbums.push(data);
        });
        setAlbums(arrayAlbums);
      });
  }, []);
  useEffect(() => {
    db.collection("songs")
      .limit(10)
      .get()
      .then(response => {
        const arraySongs = [];
        map(response.docs, songy => {
          const data = songy.data();
          data.id = songy.id;
          arraySongs.push(data);
        });
        setSongs(arraySongs);
      });
  }, []);

  return (
    <>
      <BannerHome />
      <div className="home">
        <BasicSliderItems
          title="Latest Artists"
          data={artists}
          folderImage="artist"
          urlName="artist"
        />
        <BasicSliderItems
          title="Latest Albums"
          data={albums}
          folderImage="album"
          urlName="album"
        />
        <SongSlider title="Latest Songs" data={songs} playerSong={playerSong} />
      </div>
    </>
  );
}
