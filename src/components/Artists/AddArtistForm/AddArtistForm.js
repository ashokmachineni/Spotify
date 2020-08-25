import React, { useState, useCallback } from "react";
import { Form, Input, Button, Image, Icon } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import "./AddArtistForm.scss";
import NoImage from "../../../assets/png/no-image.png";
import { toast } from "react-toastify";
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
  const onSubmit = () => {
    if (!formData.name) {
      toast.warning("enter Artist Name");
    } else if (!file) {
      toast.warning("please choose an image to upload");
    } else {
      setIsLoading(true);
    }
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
