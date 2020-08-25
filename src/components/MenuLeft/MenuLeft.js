import React, { useState, useEffect } from "react";
import "./MenuLeft.scss";
import { Menu, Icon } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import { isUserAdmin } from "../../utils/Api";
import BasicModel from "../Model/BasicModel";
function MenuLeft(props) {
  const { user, location } = props;
  const [activeMenu, setActiveMenu] = useState(location.pathname);
  const [userAdmin, setUserAdmin] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [titleModel, setTitleModel] = useState(null);
  const [contentModel, setContentModel] = useState(null);
  const handleMenu = (e, menu) => {
    setActiveMenu(menu.to);
  };
  useEffect(() => {
    setActiveMenu(location.pathname);
  }, [location]);
  useEffect(() => {
    isUserAdmin(user.uid).then(response => {
      setUserAdmin(response);
    });
  }, [user]);
  const handlerModal = type => {
    switch (type) {
      case "artist":
        setTitleModel("New Artist");
        setContentModel(<h2>Add artist</h2>);
        setShowModel(true);
        break;
      case "album":
        setTitleModel("New album");
        setContentModel(<h2>add album</h2>);
        setShowModel(true);
        break;
      case "song":
        setTitleModel("New Song");
        setContentModel(<h2>add song </h2>);
        setShowModel(true);
        break;
      default:
        setTitleModel(null);
        setContentModel(null);
        setShowModel(false);
        break;
    }
  };
  return (
    <>
      <Menu className="menu-left" vertical>
        <div className="top">
          <Menu.Item
            as={Link}
            to="/"
            name="home"
            active={activeMenu === "/"}
            onClick={handleMenu}
          >
            <Icon name="home" />
            Home
          </Menu.Item>
          <Menu.Item
            as={Link}
            to="/artists"
            name="artists"
            active={activeMenu === "/artists"}
            onClick={handleMenu}
          >
            <Icon name="music" />
            Artists
          </Menu.Item>
        </div>
        {userAdmin && (
          <div className="footer">
            <Menu.Item onClick={() => handlerModal("artist")}>
              <Icon name="plus square outline" />
              New Artist
            </Menu.Item>
            <Menu.Item onClick={() => handlerModal("song")}>
              <Icon name="plus square outline" />
              New Song
            </Menu.Item>
          </div>
        )}
      </Menu>

      <BasicModel show={showModel} setShow={setShowModel} title={titleModel}>
        {contentModel}
      </BasicModel>
    </>
  );
}
export default withRouter(MenuLeft);