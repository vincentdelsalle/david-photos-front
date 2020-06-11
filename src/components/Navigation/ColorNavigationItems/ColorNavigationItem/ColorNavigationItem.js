import React from "react";
import { withRouter } from "react-router-dom";

import classes from "./ColorNavigationItem.module.css";
import { COLOR_HEXACODES } from "../../../../shared/constants";

const colorNavigationItem = ({ color, navType, history }) => {
  const attachedClasses = [
    classes.NavigationItem,
    classes[navType],
    classes[color],
  ];
  return (
    <div
      className={attachedClasses.join(" ")}
      style={{ backgroundColor: COLOR_HEXACODES[color] }}
      onClick={() => history.push(`/gallery/${color}`)}
    ></div>
  );
};

export default withRouter(colorNavigationItem);
