import React from "react";
import { withRouter } from "react-router-dom";

import classes from "./Logo.module.css";
import mainLogo from "../../assets/images/main-logo.jpg";

const logo = ({ history }) => {
  return (
    <div className={classes.Logo}>
      <img src={mainLogo} alt="MainLogo" onClick={() => history.push("/")} />
    </div>
  );
};

export default withRouter(logo);
