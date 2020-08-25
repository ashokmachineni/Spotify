import React, { useState } from "react";
import { Button, Form, Icon, Input } from "semantic-ui-react";
import { toast } from "react-toastify";
import { reauthenticate } from "../../utils/Api";
import alertErrors from "../../utils/AlertError";
import firebase from "../../utils/Firebase";
import "firebase/auth";

export default function UserEmail(props) {
  const { user, setShowModel, setTitleModel, setContentModel } = props;
  const onEdit = () => {
    setTitleModel("Change Email");
    setContentModel(
      <ChangeEmailForm email={user.email} setShowModel={setShowModel} />
    );
    setShowModel(true);
  };
  return (
    <div className="user-email">
      <h3>Email: {user.email}</h3>
      <Button circular onClick={onEdit}>
        Update
      </Button>
    </div>
  );
}
function ChangeEmailForm(props) {
  const { email, setShowModel } = props;
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const onSubmit = () => {
    if (!formData.email) {
      toast.warning("email is same");
    } else {
      setisLoading(true);
      reauthenticate(formData.password)
        .then(() => {
          const currentUser = firebase.auth().currentUser;
          currentUser
            .updateEmail(formData.email)
            .then(() => {
              toast.success("Email updated Successfully");
              setisLoading(false);
              setShowModel(false);
              currentUser.sendEmailVerification().then(() => {
                firebase.auth().signOut();
              });
            })
            .catch(err => {
              alertErrors(err.code);
              setisLoading(false);
            });
        })
        .catch(err => {
          console.log(err);
          alertErrors(err.code);
          setisLoading(false);
        });
    }
  };
  return (
    <Form onSubmit={onSubmit}>
      <Form.Field>
        <Input
          type="text"
          defaultValue={email}
          onChange={e => setFormData({ ...formData, email: e.target.value })}
        />
      </Form.Field>
      <Form.Field>
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="ashok"
          icon={
            <Icon
              color="black"
              name={showPassword ? "eye slash outline" : "eye"}
              link
              onClick={() => setShowPassword(!showPassword)}
            />
          }
          onChange={e => setFormData({ ...formData, password: e.target.value })}
        />
      </Form.Field>
      <Button type="submit" loading={isLoading}>
        Update
      </Button>
    </Form>
  );
}
