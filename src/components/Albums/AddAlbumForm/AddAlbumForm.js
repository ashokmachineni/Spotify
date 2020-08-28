import React, { useCallback, useEffect, useState } from "react";
import { Form, Button, Input, Icon, Dropdown, Image } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { map } from "lodash";
import NoImage from "../../../assets/png/no-image.png";
import firebase from "../../../utils/Firebase";
import { toast } from "react-toastify";
import "firebase/firestore";
import "./AddAlbumForm.scss";

const db = firebase.firestore(firebase);
export default function AddAlbumForm(props) {
  const { setShowModel } = props;
  const [artists, setArtists] = useState([]);
  const [formData, setFormData] = useState(initialValueForm());
  const [albumImage, setAlbumImage] = useState(null);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    db.collection("artists")
      .get()
      .then(response => {
        const arrayArtists = [];
        map(response.docs, artist => {
          const data = artist.data();
          arrayArtists.push({
            key: artist.id,
            value: artist.id,
            text: data.name
          });
        });
        setArtists(arrayArtists);
      });
  }, []);
  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    setFile(file);
    setAlbumImage(URL.createObjectURL(file));
  });
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg,image/png, image/jpg",
    noKeyboard: true,
    onDrop
  });

  const onSubmit = () => {
    if (!formData.name || !formData.artist) {
      toast.warning("please fill all details");
    } else if (!file) {
      toast.warning("please upload image");
    } else {
      setIsLoading(true);
    }
  };
  return (
    <Form onSubmit={onSubmit} className="add-album-form">
      <Form.Group>
        <Form.Field className="album-avatar" width={5}>
          <div
            {...getRootProps()}
            className="avatar"
            style={{
              backgroundImage: `url('${albumImage}')`
            }}
          />
          <input {...getInputProps()} />
          {!albumImage && <Image src={NoImage} />}
        </Form.Field>
        <Form.Field className="album-inputs" width={11}>
          <Input
            placeholder="name of the album"
            onChange={e => setFormData({ ...formData, name: e.target.value })}
          />
          <Dropdown
            placeholder="Belongs to ..."
            fluid
            search
            selection
            options={artists}
            lazyLoad
            onChange={(e, data) =>
              setFormData({ ...formData, artist: data.value })
            }
          />
        </Form.Field>
      </Form.Group>
      <Button type="submit" loading={isLoading}>
        Create Album
      </Button>
    </Form>
  );
}
function initialValueForm() {
  return {
    name: "",
    artist: ""
  };
}
