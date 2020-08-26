import React, { useState, useCallback } from "react";
import { Form, Input, Button, Image, Icon } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import "./AddArtistForm.scss";
import NoImage from "../../../assets/png/no-image.png";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import firebase from "../../../utils/Firebase";
import "firebase/storage";
import "firebase/firestore";

const db = firebase.firestore(firebase);

export default function AddArtistForm(props) {
  const { setShowModel } = props;
  const [formData, setFormData] = useState(initialValueForm());
  const [banner, setBanner] = useState(null);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  console.log(banner);
  const onDrop = useCallback(acceptedFile => {
    const file = acceptedFile[0];
    setFile(file);
    setBanner(URL.createObjectURL(file));
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/png, image/jpeg, image/jpg",
    noKeyboard: true,
    onDrop
  });

  const uploadImage = fileName => {
    const ref = firebase
      .storage()
      .ref()
      .child(`artist/${fileName}`);
    return ref.put(file);
  };

  const onSubmit = () => {
    if (!formData.name) {
      toast.warning("enter Artist Name");
    } else if (!file) {
      toast.warning("please choose an image to upload");
    } else {
      setIsLoading(true);
      const fileName = uuidv4();
      uploadImage(fileName)
        .then(() => {
          db.collection("artists")
            .add({
              name: formData.name,
              banner: fileName
            })
            .then(() => {
              toast.success("Artist profile created successfully");
              resetForm();
              setIsLoading(false);
              setShowModel(false);
            })
            .catch(() => {
              toast.error("Error while creating artist profile");
              setIsLoading(false);
            });
        })
        .catch(() => {
          toast.error("its failed while uploading image");
          setIsLoading(false);
        });
    }
  };
  const resetForm = () => {
    setFormData(initialValueForm());
    setFile(null);
    setBanner(null);
  };

  return (
    <Form className="add-artist-form" onSubmit={onSubmit}>
      <Form.Field className="artist-banner">
        <div
          {...getRootProps()}
          className="banner"
          style={{ backgroundImage: `url('${banner}')` }}
        />
        <input {...getInputProps()} />
        {!banner && <Image src={NoImage} />}
      </Form.Field>
      <Form.Field className="artist-avatar">
        <div
          className="avatar"
          style={{ backgroundImage: `url('${banner ? banner : NoImage}')` }}
        />
      </Form.Field>
      <Form.Field>
        <Input
          placeholder="artist name"
          onChange={e => setFormData({ name: e.target.value })}
        />
      </Form.Field>
      <Button type="submit" loading={isLoading}>
        Add Artist
      </Button>
    </Form>
  );
}
function initialValueForm() {
  return {
    name: ""
  };
}
