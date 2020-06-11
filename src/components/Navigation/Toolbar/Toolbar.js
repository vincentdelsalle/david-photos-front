import React, { Fragment } from "react";

import classes from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import ColorNavigationItems from "../ColorNavigationItems/ColorNavigationItems";
import ColorNavigationItem from "../ColorNavigationItems/ColorNavigationItem/ColorNavigationItem";
import PhotoControls from "../PhotoControls/PhotoControls";
import AdminNavigationItem from "../AdminNavigationItem/AdminNavigationItem";
import camera from "../../../assets/images/camera.png";
import settings from "../../../assets/images/settings.png";
import user from "../../../assets/images/user.png";
import logout from "../../../assets/images/logout.png";

const toolbar = ({
  toolbarType,
  currentColor,
  switchButtonClicked,
  isSwitchButtonDisabled,
}) => {
  const attachedClasses = [classes.Toolbar, classes[toolbarType]];

  return (
    <div className={attachedClasses.join(" ")}>
      <div className={classes.Logo}>
        <Logo />
      </div>
      <nav className={classes.NavPanel}>
        {toolbarType === "collectionToolbar" && (
          <ColorNavigationItems currentColor={currentColor} />
        )}
        {toolbarType === "photoToolbar" && (
          <Fragment>
            <ColorNavigationItem
              color={currentColor}
              navType="photoNav"
            ></ColorNavigationItem>
            <PhotoControls
              currentColor={currentColor}
              switchButtonClicked={switchButtonClicked}
              isSwitchButtonDisabled={isSwitchButtonDisabled}
            ></PhotoControls>
          </Fragment>
        )}
        {toolbarType === "adminToolbar" && (
          <Fragment>
            <div className={classes.AdminOptions}>
              <AdminNavigationItem
                link="#"
                imgSrc={camera}
                alt="camera"
              ></AdminNavigationItem>
              <AdminNavigationItem
                link="#"
                imgSrc={settings}
                alt="settings"
              ></AdminNavigationItem>
              <AdminNavigationItem
                link="#"
                imgSrc={user}
                alt="user"
              ></AdminNavigationItem>
            </div>
            <div>
              <AdminNavigationItem
                link="/logout"
                imgSrc={logout}
                alt="logout"
              ></AdminNavigationItem>
            </div>
          </Fragment>
        )}
      </nav>
    </div>
  );
};

export default React.memo(toolbar);
