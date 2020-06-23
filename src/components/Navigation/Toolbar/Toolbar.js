import React, { Fragment } from "react";

import classes from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import ColorNavigationItems from "../ColorNavigationItems/ColorNavigationItems";
import ColorNavigationItem from "../ColorNavigationItems/ColorNavigationItem/ColorNavigationItem";
import PhotoControls from "../PhotoControls/PhotoControls";
import AdminNavigationItem from "../AdminNavigationItem/AdminNavigationItem";
import logout from "../../../assets/images/logout.png";

const toolbar = ({
  toolbarType,
  currentColor,
  switchButtonClicked,
  isSwitchButtonDisabled,
  adminFeature,
}) => {
  const attachedClasses = [classes.Toolbar, classes[toolbarType]];
  const adminItems = ["uploadphoto", "editcollection", "edituser"];

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
              {adminItems.map((item) => (
                <AdminNavigationItem
                  key={item}
                  link={`/admin/${item}`}
                  imgSrc={`../img/${item}.png`}
                  itemType={item}
                  hide={adminFeature === item}
                ></AdminNavigationItem>
              ))}
            </div>
            <div>
              <AdminNavigationItem
                link="/logout"
                imgSrc={logout}
                itemType="logout"
              ></AdminNavigationItem>
            </div>
          </Fragment>
        )}
      </nav>
    </div>
  );
};

export default React.memo(toolbar);
