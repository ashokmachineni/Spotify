import React, { useState, useEffect, useCallback } from "react";
import { Form, Button, Input, Icon, Dropdown } from "semantic-ui-react";
import { map } from "lodash";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import firebase from "../../../utils/Firebase";
import "firebase/firestore";
import "./AddSongForm.scss";

const db = firebase.firestore(firebase);
export default function AddSongForm(props) {
  const { setShowModel } = props;
  const [formData, setFormData] = useState(initialValueForm());
  const [albums, setAlbums] = useState([]);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    db.collection("albums")
      .get()
      .then(response => {
        const arrayAlbums = [];
        map(response.docs, album => {
          const data = album.data();
          data.id = album.id;
          arrayAlbums.push({
            key: album.id,
            value: album.id,
            text: data.name
          });
        });
        setAlbums(arrayAlbums);
      });
  }, []);
  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];

    setFile(file);
  });
  const { getRootProps, getInputProps } = useDropzone({
    accept: ".mp3",
    noKeyboard: true,
    onDrop
  });

  const onSubmit = () => {
    if (!formData.name || !formData.album) {
      toast.warning("please fill all fields");
    } else if (!file) {
      toast.warning("please choose mp3 file to upload");
    } else {
      setIsLoading(true);
    }
  };

  return (
    <Form className="add-song-form" onSubmit={onSubmit}>
      <Form.Field>
        <Input
          placeholder="song name"
          onChange={e => setFormData({ ...formData, name: e.target.value })}
        />
      </Form.Field>
      <Form.Field>
        <Dropdown
          placeholder="Select Artist"
          fluid
          search
          selection
          options={albums}
          onChange={(e, data) =>
            setFormData({ ...formData, album: data.value })
          }
        />
      </Form.Field>
      <Form.Field>
        <div className="song-upload" {...getRootProps()}>
          <input {...getInputProps()} />
          <Icon name="cloud upload" className={file && "load"} />
          <div>
            <p>
              upload your <span>song</span> here
            </p>
            {file && (
              <p>
                file uploaded: <span>sp.mp3</span>
              </p>
            )}
          </div>
        </div>
      </Form.Field>
      <Button type="submit" loading={isLoading}>
        Submit
      </Button>
    </Form>
  );
}
function initialValueForm() {
  return {
    name: "",
    album: ""
  };
}
