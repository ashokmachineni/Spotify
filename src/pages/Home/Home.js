import React, { useState, useEffect } from "react";
import BannerHome from "../../components/BannerHome";
import firebase from "../../utils/Firebase";
import "firebase/firestore";
import "./Home.scss";

const db = firebase.firestore(firebase);
export default function Home(props) {
  const [artists, setArtists] = useState([]);
  useEffect(() => {
    db.collection("artists")
      .get()
      .then(response => {
        response.docs.map(artist => {
          console.log(artist.data());
        });
      });
  }, []);

  return (
    <>
      <BannerHome />
      <div className="home">
        <h1>homess</h1>
      </div>
    </>
  );
}
