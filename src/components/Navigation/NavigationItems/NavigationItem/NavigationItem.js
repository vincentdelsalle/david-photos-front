import React from "react";

import classes from "./NavigationItem.module.css";
import { COLOR_HEXACODES } from "../../../../utils/constants";

const navigationItem = props => {
  const { color, colorSelected, navType } = props;
  const attachedClasses = [
    classes.NavigationItem,
    classes[navType],
    classes[color]
  ];
  return (
    <div
      className={attachedClasses.join(" ")}
      style={{ backgroundColor: COLOR_HEXACODES[color] }}
      onClick={() => colorSelected(color)}
    ></div>
  );
};

export default navigationItem;
