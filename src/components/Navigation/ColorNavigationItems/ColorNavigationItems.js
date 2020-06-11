import React from "react";

import classes from "./ColorNavigationItems.module.css";
import { ALL_COLORS_LIST } from "../../../shared/constants";
import ColorNavigationItem from "./ColorNavigationItem/ColorNavigationItem";

const colorNavigationItems = ({ currentColor }) => {
  const navColors = ALL_COLORS_LIST.filter((c) => c !== currentColor);

  return (
    <div className={classes.NavigationItems}>
      {navColors.map((color) => (
        <ColorNavigationItem
          key={color}
          color={color}
          navType="collectionNav"
        ></ColorNavigationItem>
      ))}
    </div>
  );
};

export default colorNavigationItems;
