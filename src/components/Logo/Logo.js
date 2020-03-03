import React from "react";

import mainLogo from "../../assets/images/main-logo.jpg";
import classes from "./Logo.module.css";

const logo = props => (
  <div className={classes.Logo}>
    <img src={mainLogo} alt="MainLogo" />
  </div>
);

export default logo;
