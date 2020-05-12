import React from "react";

import classes from "./Thumbnails.module.css";
import Thumbnail from "./Thumbnail/Thumbnail";

const thumbnails = ({ currentColor, colorCollectionData, loading, error }) => {
  const attachedClasses = [classes.Frame, classes[currentColor]];

  let thumbnails = [...Array(16)].map((u, i) => (
    <Thumbnail key={i}></Thumbnail>
  ));

  if (colorCollectionData && !loading && !error) {
    !colorCollectionData.length
      ? (thumbnails = <p>No photo into DB for that collection yet</p>)
      : (thumbnails = colorCollectionData.map((photoData) => (
          <Thumbnail
            key={photoData.id}
            photoData={photoData}
            collectionData={colorCollectionData}
          />
        )));
  }

  if (error) {
    thumbnails = <span>{error}</span>;
  }
  return <div className={attachedClasses.join(" ")}>{thumbnails}</div>;
};

export default thumbnails;
