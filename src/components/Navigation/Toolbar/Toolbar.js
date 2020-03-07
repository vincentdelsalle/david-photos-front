import React from "react";

import classes from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import NavigationItem from "../NavigationItems/NavigationItem/NavigationItem";
import PhotoControls from "../../Photo/PhotoControls/PhotoControls";

const toolbar = props => {
  const { logoClicked, currentColor, toolbarColors, navColorSelected } = props;

  return (
    <div className={classes.Toolbar}>
      <div className={classes.Logo}>
        <Logo logoClicked={logoClicked} />
      </div>
      <nav className={classes.NavPanel}>
        {currentColor ? (
          <React.Fragment>
            <NavigationItem
              color={currentColor}
              colorSelected={navColorSelected}
              navType="photoNav"
            ></NavigationItem>
            <PhotoControls currentColor={currentColor}></PhotoControls>
          </React.Fragment>
        ) : (
          <NavigationItems
            navColors={toolbarColors}
            colorSelected={navColorSelected}
          />
        )}
      </nav>
    </div>
  );
};

export default toolbar;
