import React from "react";

import classes from "./Thumbnails.module.css";
import Thumbnail from "./Thumbnail/Thumbnail";
import Spinner from "../../UI/Spinner/Spinner";

const thumbnails = props => {
  const { currentColor, thumbnailsData, loading } = props;

  const attachedClasses = [classes.Frame, classes[currentColor]];

  let thumbnails = thumbnailsData.map(data => (
    <Thumbnail key={data.id} data={data} />
  ));

  if (loading) {
    thumbnails = <Spinner additionalClassName="ThumbnailSpinner"></Spinner>;
  }

  if (!thumbnails.length && !loading) {
    thumbnails = (
      <p style={{ color: "white" }}>
        No photo yet in DB in {currentColor} gallery
      </p>
    );
  }

  return <div className={attachedClasses.join(" ")}>{thumbnails}</div>;
};

export default thumbnails;
