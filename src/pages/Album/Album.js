import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import firebase from "../../utils/Firebase";
import "firebase/firestore";
import "firebase/storage";
import "./Album.scss";

const db = firebase.firestore(firebase);
function Album(props) {
  const { match } = props;

  const [album, setAlbum] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [artist, setArtist] = useState(null);
  console.log(album);
  console.log(artist);
  useEffect(() => {
    db.collection("albums")
      .doc(match.params.id)
      .get()
      .then(response => {
        setAlbum(response.data());
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
  return (
    <div>
      <h2>its for single Album</h2>
    </div>
  );
}
export default withRouter(Album);
