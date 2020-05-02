import React from "react";

import classes from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import NavigationItem from "../NavigationItems/NavigationItem/NavigationItem";
import PhotoControls from "../PhotoControls/PhotoControls";

const toolbar = ({
  toolbarType,
  currentColor,
  switchButtonClicked,
  isSwitchButtonDisabled,
}) => {
  return (
    <div className={classes.Toolbar}>
      <div className={classes.Logo}>
        <Logo />
      </div>
      <nav className={classes.NavPanel}>
        {toolbarType === "collectionToolbar" && (
          <NavigationItems currentColor={currentColor} />
        )}
        {toolbarType === "photoToolbar" && (
          <React.Fragment>
            <NavigationItem
              color={currentColor}
              navType="photoNav"
            ></NavigationItem>
            <PhotoControls
              currentColor={currentColor}
              switchButtonClicked={switchButtonClicked}
              isSwitchButtonDisabled={isSwitchButtonDisabled}
            ></PhotoControls>
          </React.Fragment>
        )}
      </nav>
    </div>
  );
};

export default React.memo(toolbar);
