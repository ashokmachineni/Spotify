import React, { useEffect, useState } from "react";
import { Button, Icon, Form, Input } from "semantic-ui-react";
import firebase from "../../../utils/Firebase";
import { validateEmail } from "../../../utils/Validations";
import { toast } from "react-toastify";
import "firebase/auth";
import "./RegisterForm.scss";

export default function RegisterForm(props) {
  const { setSelectedForm } = props;
  const [formData, setFormData] = useState(defaultValueForm());
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handlerShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const onSubmit = () => {
    toast.success("Registration Success");
    setFormError({});
    let errors = {};
    let formOk = true;
    if (!validateEmail(formData.email)) {
      errors.email = true;
      formOk = false;
    }
    if (formData.password.length < 6) {
      errors.password = true;
      formOk = false;
    }
    if (!formData.username) {
      errors.username = true;
      formOk = false;
    }
    setFormError(errors);
    if (formOk) {
      setIsLoading(true);
      firebase
        .auth()
        .createUserWithEmailAndPassword(formData.email, formData.password)
        .then(() => {
          console.log("Registration Success");
          changeUsername();
          sendVerificationEmail();
        })
        .catch(() => {
          toast.error("Registration failed");
        })
        .finally(() => {
          setIsLoading(false);
          setSelectedForm(null);
        });
    }
  };
  const changeUsername = () => {
    firebase
      .auth()
      .currentUser.updateProfile({
        displayName: formData.username
      })
      .catch(() => {
        toast.error("Username update failed");
      });
  };
  const sendVerificationEmail = () => {
    firebase
      .auth()
      .currentUser.sendEmailVerification()
      .then(() => {
        toast.success("Verification email sent successfully");
      })
      .catch(() => {
        toast.error("please enter correct email address");
      });
  };
  return (
    <div className="register-form">
      <h1>Sign up for free to start listening.</h1>
      <Form onSubmit={onSubmit} onChange={onChange}>
        <Form.Field>
          <Input
            type="text"
            name="email"
            placeholder="enter email"
            icon="mail outline"
            error={formError.email}
          />
          {formError.email && (
            <span className="error-text"> Please enter valid email</span>
          )}
        </Form.Field>
        <Form.Field>
          <Input
            type="text"
            name="username"
            placeholder="enter name"
            icon="user circle outline"
            error={formError.username}
          />
          {formError.username && (
            <span className="error-text"> Please enter unique username</span>
          )}
        </Form.Field>
        <Form.Field>
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="enter password"
            error={formError.password}
            icon={
              showPassword ? (
                <Icon
                  name="eye slash outline"
                  link
                  onClick={handlerShowPassword}
                />
              ) : (
                <Icon name="eye " link onClick={handlerShowPassword} />
              )
            }
          />
          {formError.password && (
            <span className="error-text">
              {" "}
              Please enter valid password min 5 char
            </span>
          )}
        </Form.Field>
        <Button type="submit" loading={isLoading}>
          Register
        </Button>
      </Form>
      <div className="register-form__options">
        <p onClick={() => setSelectedForm(null)}>Have an account?</p>
        <p>
          already registered?{" "}
          <span onClick={() => setSelectedForm("login")}>Login</span>
        </p>
      </div>
    </div>
  );
}

function defaultValueForm() {
  return {
    email: "",
    username: "",
    password: ""
  };
}
