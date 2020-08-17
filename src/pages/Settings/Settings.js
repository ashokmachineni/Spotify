import React from "react";
import UploadAvatar from "../../components/Settings/UploadAvatar";
import UserName from "../../components/Settings/UserName";
import BasicModel from "../../components/Model/BasicModel";
import "./Settings.scss";

export default function Settings(props) {
  const { user, setReloadApp } = props;

  return (
    <div className="settings">
      <h1>Configuration</h1>
      <div className="avatar-name">
        <UploadAvatar user={user} setReloadApp={setReloadApp} />
        <UserName user={user} />
      </div>
      <BasicModel show={true} setShow={false} title={"HOLA"}>
        <h3>FORM</h3>
      </BasicModel>
    </div>
  );
}
