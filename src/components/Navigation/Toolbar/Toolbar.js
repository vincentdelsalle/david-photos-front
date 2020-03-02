import React from "react";

import classes from "./Toolbar.module.css";
import NavigationItems from "../NavigationItems/NavigationItems";

const toolbar = props => {
  return (
    <div className={classes.Toolbar}>
      <nav className={classes.ColorsList}>
        <NavigationItems
          navColors={props.toolbarColors}
          colorSelected={props.navColorSelected}
        />
      </nav>
    </div>
  );
};

export default toolbar;
