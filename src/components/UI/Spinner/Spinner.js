import React from "react";

import classes from "./Spinner.module.css";

const spinner = props => {
  let attachedClasses = [classes.Loader, classes[props.additionalClassName]];
  return <div className={attachedClasses.join(" ")}>Loading...</div>;
};

export default spinner;
