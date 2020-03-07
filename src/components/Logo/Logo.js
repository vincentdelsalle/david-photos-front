import React from "react";

import classes from "./Logo.module.css";
import mainLogo from "../../assets/images/main-logo.jpg";

const logo = props => (
  <div className={classes.Logo}>
    <img src={mainLogo} alt="MainLogo" onClick={props.logoClicked} />
  </div>
);

export default logo;
