import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Loader } from "semantic-ui-react";
import { map } from "lodash";
import firebase from "../../utils/Firebase";
import "firebase/firestore";
import "firebase/storage";
import "./Album.scss";
import ListSongs from "../../components/Songs/ListSongs";

const db = firebase.firestore(firebase);
function Album(props) {
  const { match, playerSong } = props;

  const [album, setAlbum] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [artist, setArtist] = useState(null);
  const [songs, setSongs] = useState([]);
  //console.log(album);
  //console.log(artist);
  useEffect(() => {
    db.collection("albums")
      .doc(match.params.id)
      .get()
      .then(response => {
        const data = response.data();
        data.id = response.id;
        setAlbum(data);
      });
  }, [match]);
  useEffect(() => {
    if (album) {
      firebase
        .storage()
        .ref(`album/${album.banner}`)
        .getDownloadURL()
        .then(url => {
          setImageUrl(url);
        });
    }
  }, [album]);
  useEffect(() => {
    if (album) {
      db.collection("artists")
        .doc(album.artist)
        .get()
        .then(response => {
          setArtist(response.data());
        });
    }
  }, [album]);
  useEffect(() => {
    if (album) {
      db.collection("songs")
        .where("album", "==", album.id)
        .get()
        .then(response => {
          const arraySongs = [];
          map(response.docs, song => {
            const data = song.data();
            data.id = song.id;
            arraySongs.push(data);
          });
          setSongs(arraySongs);
        });
    }
  }, [album]);

  if (!artist || !album) {
    return <Loader active>Loading...</Loader>;
  }
  return (
    <div className="album">
      <div className="album__header">
        <HeaderAlbum album={album} imageUrl={imageUrl} artist={artist} />
      </div>
      <div className="album__songs">
        <ListSongs songs={songs} imageUrl={imageUrl} playerSong={playerSong} />
      </div>
    </div>
  );
}
export default withRouter(Album);

function HeaderAlbum(props) {
  const { album, artist, imageUrl } = props;
  return (
    <>
      <div
        className="image"
        style={{ backgroundImage: `url('${imageUrl}')` }}
      />
      <div className="info">
        <h1>{album.name}</h1>
        <p>
          By: <span>{artist.name}</span>
        </p>
      </div>
    </>
  );
}
