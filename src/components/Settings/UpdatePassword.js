import React, { useState } from "react";
import { Button, Form, Input, Icon } from "semantic-ui-react";
import { toast } from "react-toastify";
import { reauthenticate } from "../../utils/Api";
import alertErrors from "../../utils/AlertError";
import firebase from "../../utils/Firebase";
import "firebase/auth";

export default function UpdatePassword(props) {
  const { setShowModel, setTitleModel, setContentModel } = props;
  const onEdit = () => {
    setTitleModel("Change Password");
    setContentModel(<ChangePasswordForm setShowModel={setShowModel} />);
    setShowModel(true);
  };
  return (
    <div className="user-password">
      <h3>password : *** *** ***</h3>
      <Button circular onClick={onEdit}>
        Edit
      </Button>
    </div>
  );
}
function ChangePasswordForm(props) {
  const { setShowModel } = props;
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    repeatNewPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = () => {
    if (
      !formData.currentPassword ||
      !formData.newPassword ||
      !formData.repeatNewPassword
    ) {
      toast.warning("Passwords cannot be empty.");
    } else if (formData.currentPassword === formData.newPassword) {
      toast.warning("The new password cannot be the same as the current one.");
    } else if (formData.newPassword !== formData.repeatNewPassword) {
      toast.warning("new password and repeat passwords are not same");
    } else if (formData.newPassword.length < 6) {
      toast.warning("password length min 6 caracters");
    } else {
      setIsLoading(true);
      reauthenticate(formData.currentPassword)
        .then(() => {
          const currentUser = firebase.auth().currentUser;
          currentUser
            .updatePassword(formData.newPassword)
            .then(() => {
              toast.success(
                "Password updated successfully so please Login Again"
              );
              setIsLoading(false);
              setShowModel(false);
              firebase.auth().signOut();
            })
            .catch(err => {
              alertErrors(err.code);
              setIsLoading(false);
            });
        })
        .catch(err => {
          console.log(err);
          alertErrors(err.code);
          setIsLoading(false);
        });
    }
  };
  return (
    <Form onSubmit={onSubmit}>
      <Form.Field>
        <Input
          placeholder="Current Password"
          type={showPassword ? "text" : "password"}
          onChange={e =>
            setFormData({ ...formData, currentPassword: e.target.value })
          }
          icon={
            <Icon
              name={showPassword ? "eye slash outline" : "eye"}
              link
              onClick={() => setShowPassword(!showPassword)}
            />
          }
        />
      </Form.Field>
      <Form.Field>
        <Input
          placeholder="New Password"
          type={showPassword ? "text" : "password"}
          onChange={e =>
            setFormData({ ...formData, newPassword: e.target.value })
          }
          icon={
            <Icon
              name={showPassword ? "eye slash outline" : "eye"}
              link
              onClick={() => setShowPassword(!showPassword)}
            />
          }
        />
      </Form.Field>
      <Form.Field>
        <Input
          placeholder="Repeat New Password"
          type={showPassword ? "text" : "password"}
          onChange={e =>
            setFormData({ ...formData, repeatNewPassword: e.target.value })
          }
          icon={
            <Icon
              name={showPassword ? "eye slash outline" : "eye"}
              link
              onClick={() => setShowPassword(!showPassword)}
            />
          }
        />
      </Form.Field>
      <Button type="submit" loading={isLoading}>
        Update Password
      </Button>
    </Form>
  );
}
