import React from "react";

import classes from "./Thumbnails.module.css";
import Thumbnail from "./Thumbnail/Thumbnail";

const thumbnails = ({
  currentColor,
  colorCollectionData,
  loading,
  error,
  openPhoto,
}) => {
  const attachedClasses = [classes.Frame, classes[currentColor]];

  let thumbnails = [...Array(16)].map((u, i) => (
    <Thumbnail key={i}></Thumbnail>
  ));

  if (error) {
    thumbnails = <span>{error}</span>;
  }

  if (!colorCollectionData.length && !loading && !error) {
    thumbnails = <p>No photo into DB for that collection yet</p>;
  }

  if (colorCollectionData.length && !loading && !error) {
    thumbnails = colorCollectionData.map((data) => (
      <Thumbnail key={data.id} data={data} openPhoto={openPhoto} />
    ));
  }

  return <div className={attachedClasses.join(" ")}>{thumbnails}</div>;
};

export default thumbnails;
