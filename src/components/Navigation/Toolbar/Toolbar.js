import React from "react";
import { Link } from 'react-router-dom'

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
  const attachedClasses = [
    classes.Toolbar,
    classes[toolbarType],
  ];

  return (
    <div className={attachedClasses.join(" ")} >
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
        {toolbarType === "adminToolbar" && (
          <Link to="/logout">Logout</Link>
        )}
      </nav>
    </div>
  );
};

export default React.memo(toolbar);
