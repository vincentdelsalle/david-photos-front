import React, { Fragment, useState } from "react";

import classes from "./Thumbnail.module.css";
import Spinner from "../../../UI/Spinner/Spinner";

const Thumbnail = ({ openPhoto, data }) => {
  const [thumbnailClasses, setThumbnailClasses] = useState([classes.hidden]);
  const [spinnerClasses, setSpinnerClasses] = useState([classes.SpinnerSpot]);
  const [loading, setLoading] = useState(true);

  const onImageLoaded = () => {
    setThumbnailClasses([classes.Spot]);
    setSpinnerClasses([classes.hidden]);
    setLoading(false);
  };

  return (
    <Fragment>
      {loading && (
        <div className={spinnerClasses}>
          <Spinner additionalClassName="ThumbnailSpinner"></Spinner>
        </div>
      )}
      {data && (
        <div className={thumbnailClasses}>
          <div className={classes[data.orientation]}>
            <img
              className={classes.Image}
              src={`${process.env.REACT_APP_API_BASE_URL}${data.thumb_name}`}
              alt={data.file_name}
              onClick={() => openPhoto(data.id)}
              onLoad={() => onImageLoaded()}
            />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Thumbnail;
