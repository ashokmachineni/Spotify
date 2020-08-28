import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Loader } from "semantic-ui-react";
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
  //console.log(album);
  //console.log(artist);
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

  if (!artist || !album) {
    return <Loader active>Loading...</Loader>;
  }
  return (
    <div className="album">
      <div className="album__header">
        <HeaderAlbum album={album} imageUrl={imageUrl} artist={artist} />
      </div>
      <div className="album__songs">
        <p>here songs</p>
      </div>
    </div>
  );
}
export default withRouter(Album);

function HeaderAlbum(props) {
  const { album, artist, imageUrl } = props;
  return (
    <div>
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
    </div>
  );
}
