import React from "react";

import classes from "./NavigationItems.module.css";
import { COLOR_HEXACODES } from "../../../utils/constants";

const navigationItems = props => {
  return (
    <ul className={classes.NavigationItems}>
      {props.navColors.map(color => {
        return (
          <li
            className={classes.NavigationItem}
            style={{ backgroundColor: COLOR_HEXACODES[color] }}
            key={color}
            onClick={() => props.colorSelected(color)}
          ></li>
        );
      })}
    </ul>
  );
};

export default navigationItems;
