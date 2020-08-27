import React, { useState, useEffect } from "react";
import firebase from "../../utils/Firebase";
import "firebase/firestore";
import { map } from "lodash";
import "./Artists.scss";

const db = firebase.firestore(firebase);
export default function Artists() {
  const [artists, setArtists] = useState([]);
  console.log(artists);
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
  return (
    <div className="artists">
      <h3>Artists</h3>
    </div>
  );
}
