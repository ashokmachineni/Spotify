import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import firebase from "../../utils/Firebase";
import { map } from "lodash";
import "firebase/firestore";
import "./Artist.scss";
import BannerArtist from "../../components/Artists/BannerArtist";

const db = firebase.firestore(firebase);
function Artist(props) {
  const { match } = props;
  const [artist, setArtist] = useState(null);
  const [albums, setAlbums] = useState([]);
  console.log(albums);
  useEffect(() => {
    db.collection("artists")
      .doc(match.params.id)
      .get()
      .then(response => {
        const data = response.data();
        data.id = response.id;
        setArtist(data);
      });
  }, [match]);
  useEffect(() => {
    if (artist) {
      db.collection("albums")
        .where("artist", "==", artist.id)
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
    }
  }, [artist]);

  return (
    <div className="artist">
      {artist && <BannerArtist artist={artist} />}
      <h2>More Info...</h2>
    </div>
  );
}
export default withRouter(Artist);
