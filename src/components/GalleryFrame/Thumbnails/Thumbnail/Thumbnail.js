import React from "react";

import classes from "./Thumbnail.module.css";

const thumbnail = props => {
  const { orientation, thumb_name, file_name } = props.data;

  return (
    <div className={classes.Spot}>
      <div className={classes[orientation]}>
        <img
          className={classes.Image}
          src={`${process.env.REACT_APP_API_BASE_URL}${thumb_name}`}
          alt={file_name}
        />
      </div>
    </div>
  );
};

export default thumbnail;
