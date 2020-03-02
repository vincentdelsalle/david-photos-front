import React from "react";

import classes from "./GalleryFrame.module.css";
import Thumbnails from "./Thumbnails/Thumbnails";

const galleryFrame = props => {
  const { currentHexacode, currentColor, thumbnailsData, loading } = props;

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
      />
    </div>
  );
};

export default galleryFrame;
