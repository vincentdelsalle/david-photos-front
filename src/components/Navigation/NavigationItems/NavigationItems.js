import React from "react";

import classes from "./NavigationItems.module.css";
import { ALL_COLORS_LIST } from "../../../shared/constants";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = ({ currentColor }) => {
  const navColors = ALL_COLORS_LIST.filter((c) => c !== currentColor);

  return (
    <div className={classes.NavigationItems}>
      {navColors.map((color) => (
        <NavigationItem
          key={color}
          color={color}
          navType="collectionNav"
        ></NavigationItem>
      ))}
    </div>
  );
};

export default navigationItems;
