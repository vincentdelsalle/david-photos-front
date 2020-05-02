import React from "react";
import { withRouter } from "react-router-dom";

import classes from "./NavigationItem.module.css";
import { COLOR_HEXACODES } from "../../../../utils/constants";

const navigationItem = ({ color, navType, history }) => {
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

export default withRouter(navigationItem);
