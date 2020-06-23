import React from "react";
import { Link } from "react-router-dom";

import classes from "./AdminNavigationItem.module.css";

const AdminNavigationItem = (props) => {
  let assignedClasses = [classes.adminItem];
  if (props.hide) {
    assignedClasses.push(classes.hide);
  }
  return (
    <div className={assignedClasses.join(" ")}>
      <Link className={classes.adminLink} to={props.link}>
        <img
          className={classes.adminIcon}
          src={props.imgSrc}
          alt={props.itemType}
        />
      </Link>
    </div>
  );
};

export default AdminNavigationItem;
