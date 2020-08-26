import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import firebase from "../../utils/Firebase";
import "firebase/firestore";
import "./Artist.scss";

const db = firebase.firestore(firebase);
function Artist(props) {
  const { match } = props;
  const [artist, setArtist] = useState(null);
  console.log(artist);
  useEffect(() => {
    db.collection("artists")
      .doc(match.params.id)
      .get()
      .then(response => {
        setArtist(response.data());
      });
  }, [match]);

  return (
    <div>
      <h1>Artistssss</h1>
    </div>
  );
}
export default withRouter(Artist);
