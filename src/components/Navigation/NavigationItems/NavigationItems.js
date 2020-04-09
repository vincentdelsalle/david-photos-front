import React from "react";

import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = ({ navColors, colorSelected }) => {
  return (
    <div className={classes.NavigationItems}>
      {navColors.map((color) => (
        <NavigationItem
          key={color}
          color={color}
          colorSelected={colorSelected}
          navType="collectionNav"
        ></NavigationItem>
      ))}
    </div>
  );
};

export default navigationItems;
