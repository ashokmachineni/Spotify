import React from "react";
import { Icon, Menu, Image } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import firebase from "../../utils/Firebase";
import "firebase/auth";
import userImage from "../../assets/png/user.png";
import "./TopBar.scss";

function TopBar(props) {
  const { user, history } = props;

  const goBack = () => {
    history.goBack();
  };
  const logOutIcon = () => {
    firebase.auth().signOut();
  };
  return (
    <div className="top-bar">
      <div className="top-bar__left">
        <Icon name="angle left" onClick={goBack} />
      </div>
      <div className="top-bar__right">
        <Link to="/settings">
          <Image src={userImage} />
          {user.displayName}
          <Icon name="power off" onClick={logOutIcon} />
        </Link>
      </div>
    </div>
  );
}
export default withRouter(TopBar);
