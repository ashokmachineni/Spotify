import React, { useState } from "react";
import { Form, Button, Input } from "semantic-ui-react";
import { toast } from "react-toastify";
import firebase from "../../utils/Firebase";
import "firebase/auth";
export default function UserName(props) {
  const {
    user,
    setShowModel,
    setTitleModel,
    setContentModel,
    setReloadApp
  } = props;
  const onEdit = () => {
    setTitleModel("Update Name");
    setContentModel(
      <ChangeDisplayNameForm
        displayName={user.displayName}
        setShowModel={setShowModel}
        setReloadApp={setReloadApp}
      />
    );
    setShowModel(true);
  };
  return (
    <div className="user-name">
      <h2>{user.displayName}</h2>
      <Button circular onClick={onEdit}>
        Update
      </Button>
    </div>
  );
}
function ChangeDisplayNameForm(props) {
  const { displayName, setShowModel, setReloadApp } = props;
  const [formData, setFormData] = useState({ displayName: displayName });
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = () => {
    if (!formData.displayName || formData.displayName === displayName) {
      setShowModel(false);
    } else {
      setIsLoading(true);
      firebase
        .auth()
        .currentUser.updateProfile({ displayName: formData.displayName })
        .then(() => {
          setReloadApp(prevState => !prevState);
          toast.success("username updated successfully");
          setIsLoading(false);
          setShowModel(false);
        })
        .catch(() => {
          toast.error("update name is failed");
        });
    }
  };
  return (
    <Form onSubmit={onSubmit}>
      <Form.Field>
        <Input
          defaultValue={displayName}
          onChange={e => setFormData({ displayName: e.target.value })}
        />
      </Form.Field>
      <Button type="submit" loading={isLoading}>
        Update
      </Button>
    </Form>
  );
}
