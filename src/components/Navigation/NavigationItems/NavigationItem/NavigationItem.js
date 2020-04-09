import React from "react";

import classes from "./NavigationItem.module.css";
import { COLOR_HEXACODES } from "../../../../utils/constants";

const navigationItem = ({ color, colorSelected, navType }) => {
  const attachedClasses = [
    classes.NavigationItem,
    classes[navType],
    classes[color],
  ];
  return (
    <div
      className={attachedClasses.join(" ")}
      style={{ backgroundColor: COLOR_HEXACODES[color] }}
      onClick={() => colorSelected(color, navType)}
    ></div>
  );
};

export default navigationItem;
