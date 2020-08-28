import React, { useState, useEffect } from "react";
import { map } from "lodash";
import { Grid } from "semantic-ui-react";
import firebase from "../../utils/Firebase";
import { Link } from "react-router-dom";
import "firebase/firestore";
import "firebase/storage";
import "./Albums.scss";

const db = firebase.firestore(firebase);
export default function Albums(props) {
  const [albums, setAlbums] = useState([]);
  //console.log(albums);
  useEffect(() => {
    db.collection("albums")
      .get()
      .then(response => {
        const arrayAlbuns = [];
        map(response.docs, album => {
          const data = album.data();

          data.id = album.id;
          arrayAlbuns.push(data);
        });

        setAlbums(arrayAlbuns);
      });
  }, []);
  return (
    <div className="albums">
      <h1>Albums</h1>
      <Grid>
        {map(albums, album => (
          <Grid.Column key={album.id} mobile={8} tablet={4} computer={3}>
            <Album album={album} />
          </Grid.Column>
        ))}
      </Grid>
    </div>
  );
}
function Album(props) {
  const { album } = props;
  const [imageUrl, setImageUrl] = useState(null);
  console.log(album);
  useEffect(() => {
    firebase
      .storage()
      .ref(`album/${album.banner}`)
      .getDownloadURL()
      .then(url => {
        setImageUrl(url);
      });
  }, []);
  return (
    <Link to={`/album/${album.id}`}>
      <div className="albums__item">
        <div
          className="avatar"
          style={{ backgroundImage: `url('${imageUrl}')` }}
        />
        <h3>{album.name}</h3>
      </div>
    </Link>
  );
}
