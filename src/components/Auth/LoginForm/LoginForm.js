import React, { useState } from "react";
import { Button, Form, Icon, Input } from "semantic-ui-react";
import { toast } from "react-toastify";

import "./LoginForm.scss";
import { validateEmail } from "../../../utils/Validations";
import firebase from "../../../utils/Firebase";
import "firebase/auth";

export default function LoginForm(props) {
  const { setSelectedForm } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(defaultValues());
  const [formError, setFormError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userActive, setUserActive] = useState(true);
  const [user, setUser] = useState(null);
  const handlePassword = () => {
    setShowPassword(!showPassword);
  };
  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const onSubmit = () => {
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
    setFormError(errors);
    if (formOk) {
      setIsLoading(true);
      firebase
        .auth()
        .signInWithEmailAndPassword(formData.email, formData.password)
        .then(response => {
          setUser(response.user);
          setUserActive(response.user.emailVerified);
          if (!response.user.emailVerified) {
            toast.warning("Please verify your account before you login");
          }
        })
        .catch(err => {
          handlerErrors(err.code);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };
  return (
    <div>
      <h1>Login form</h1>
      <Form onSubmit={onSubmit} onChange={onChange}>
        <Form.Field>
          <Input
            type="text"
            Icon="mail outline"
            name="email"
            placeholder="Please enter email"
            error={formError.email}
          />
          {formError.email && (
            <span className="error-text">Please enter valid email</span>
          )}
        </Form.Field>
        <Form.Field>
          <Input
            type={showPassword ? "text" : "password"}
            icon={
              showPassword ? (
                <Icon name="eye slash outline" link onClick={handlePassword} />
              ) : (
                <Icon name="eye" link onClick={handlePassword} />
              )
            }
            name="password"
            placeholder="Please enter password"
            error={formError.password}
          />
          {formError.password && (
            <span className="error-text">Please enter min lenth</span>
          )}
        </Form.Field>
        <Button type="submit" loading={isLoading}>
          Login
        </Button>
      </Form>
      {!userActive && (
        <resetButton
          user={user}
          setIsLoading={setIsLoading}
          setUserActive={setUserActive}
        />
      )}
      <div className="login-form__options">
        <p onClick={() => setSelectedForm(null)}>return</p>
        Need To Register?
        <span onClick={() => setSelectedForm("register")}>Register</span>
      </div>
    </div>
  );
}
function resetButton(props) {
  const { user, setUserActive, setIsLoading } = props;
  const resendVerificationEmail = () => {
    user
      .sendEmailVerification()
      .then(() => {
        toast.success("verification email sent successfully");
      })
      .catch(err => {
        handlerErrors(err.code);
      })
      .finally(() => {
        setIsLoading(false);
        setUserActive(true);
      });
  };
  return (
    <div className="resend-verification-email">
      <p>
        If you have not received the verification email you can send it again
        clicking
        <span onClick={resendVerificationEmail}>HERE</span> to activate
      </p>
    </div>
  );
}
function handlerErrors(code) {
  switch (code) {
    case "auth/wrong-password":
      toast.warning("The username or password is incorrect.");
      break;
    case "auth/too-many-requests":
      toast.warning(
        "You've sent too many confirmation email forwarding requests in too short a time."
      );
      break;
    case "auth/user-not-found":
      toast.warning("The username or password is incorrect.");
      break;
    default:
      break;
  }
}

function defaultValues() {
  return {
    email: "",
    password: ""
  };
}
