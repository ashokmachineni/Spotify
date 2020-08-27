import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import firebase from "../../utils/Firebase";
import "firebase/firestore";
import "./Artist.scss";
import BannerArtist from "../../components/Artists/BannerArtist";

const db = firebase.firestore(firebase);
function Artist(props) {
  const { match } = props;
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    db.collection("artists")
      .doc(match.params.id)
      .get()
      .then(response => {
        setArtist(response.data());
      });
  }, [match]);

  return (
    <div className="artist">
      {artist && <BannerArtist artist={artist} />}
      <h2>More Info...</h2>
    </div>
  );
}
export default withRouter(Artist);
