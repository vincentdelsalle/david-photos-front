import React from "react";

import classes from "./ColorGate.module.css";

const colorGate = props => (
  <div
    className={classes[props.assignedClass]}
    onClick={props.galleryReached}
  ></div>
);

export default colorGate;
