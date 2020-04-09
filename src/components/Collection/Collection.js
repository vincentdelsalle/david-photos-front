import React from "react";

import classes from "./Collection.module.css";
import Thumbnails from "./Thumbnails/Thumbnails";

const collection = React.memo(
  ({
    currentHexacode,
    currentColor,
    colorCollectionData,
    loading,
    error,
    openPhoto,
  }) => {
    const attachedClasses = [classes.Frame, classes[currentColor]];

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
          colorCollectionData={colorCollectionData}
          loading={loading}
          error={error}
          openPhoto={openPhoto}
        />
      </div>
    );
  }
);

export default collection;
