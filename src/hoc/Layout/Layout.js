import React from "react";

import classes from "./Layout.module.css";

const layout = props => {
  return (
    <div>
      <div>{/* Sidedrawer, Backdrop will be there */}</div>
      <main className={classes.Content}>{props.children}</main>
    </div>
  );
};

export default layout;
