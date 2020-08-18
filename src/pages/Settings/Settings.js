import React, { useState } from "react";
import UploadAvatar from "../../components/Settings/UploadAvatar";
import UserName from "../../components/Settings/UserName";
import BasicModel from "../../components/Model/BasicModel";
import "./Settings.scss";

export default function Settings(props) {
  const { user, setReloadApp } = props;
  const [showModel, setShowModel] = useState(false);
  const [titleModel, setTitleModel] = useState("");
  const [contentModel, setContentModel] = useState(null);

  return (
    <div className="settings">
      <h1>Configuration</h1>
      <div className="avatar-name">
        <UploadAvatar user={user} setReloadApp={setReloadApp} />
        <UserName
          user={user}
          setShowModel={setShowModel}
          setTitleModel={setTitleModel}
          setContentModel={setContentModel}
          setReloadApp={setReloadApp}
        />
      </div>
      <BasicModel show={showModel} setShow={setShowModel} title={titleModel}>
        {contentModel}
      </BasicModel>
    </div>
  );
}
