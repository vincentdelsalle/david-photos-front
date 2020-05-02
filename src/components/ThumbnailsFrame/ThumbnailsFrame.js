import React from "react";

import classes from "./ThumbnailsFrame.module.css";
import { COLOR_HEXACODES } from "../../utils/constants";
import Thumbnails from "./Thumbnails/Thumbnails";

const thumbnailsFrame = ({
  currentColor,
  colorCollectionData,
  loading,
  error,
}) => {
  const currentHexacode = COLOR_HEXACODES[currentColor];
  const attachedClasses = [classes.Frame, classes[currentColor]];

  return (
    <div
      className={attachedClasses.join(" ")}
      style={{ backgroundColor: currentHexacode }}
    >
      <div className={classes.PageNumber}>
        {/* eslint-disable-next-line */}
        <a href="#">1</a>
      </div>
      <Thumbnails
        currentColor={currentColor}
        colorCollectionData={colorCollectionData}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default thumbnailsFrame;
