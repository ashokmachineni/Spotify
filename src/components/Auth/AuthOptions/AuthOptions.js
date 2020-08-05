import React from "react";
import {Button} from 'semantic-ui-react'
import './AuthOptions.scss'
function AuthOptions(props) {
  const {setSelectedForm } = props;
  return (
    <div className='auth-options'>
      <h1>Auth options...</h1>
      <Button className="register" onClick={() => setSelectedForm("register")}>
        Register
      </Button>
      <Button className="login" onClick={() => setSelectedForm("login")}>
        Login
      </Button>

    </div>
  );
}

export default AuthOptions;
