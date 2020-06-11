import React from 'react'
import { Link } from 'react-router-dom'

import classes from "./AdminNavigationItem.module.css";

const AdminNavigationItem = (props) => (
  <div className={classes.adminItem}>
    <Link
      className={classes.adminLink}
      to={props.link}>
      <img
        className={classes.adminIcon}
        src={props.imgSrc}
        alt={props.alt} />
    </Link>
  </div>
)

export default AdminNavigationItem