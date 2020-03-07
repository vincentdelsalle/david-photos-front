import React from "react";

import classes from "./Collection.module.css";
import Thumbnails from "./Thumbnails/Thumbnails";

const collection = props => {
  const {
    currentHexacode,
    currentColor,
    thumbnailsData,
    loading,
    openPhoto
  } = props;

  const attachedClasses = [classes.Frame, classes[props.currentColor]];

  return (
    <div
      className={attachedClasses.join(" ")}
      style={{ backgroundColor: currentHexacode }}
    >
      <div className={classes.PageNumber}>
        <a href="#">1</a>
      </div>
      <Thumbnails
        currentColor={currentColor}
        thumbnailsData={thumbnailsData}
        loading={loading}
        openPhoto={openPhoto}
      />
    </div>
  );
};

export default collection;
