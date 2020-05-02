import React, { Fragment, useState } from "react";
import { withRouter } from "react-router-dom";

import classes from "./Thumbnail.module.css";
import Spinner from "../../../UI/Spinner/Spinner";

const Thumbnail = ({ photoData, collectionData, match, history }) => {
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
      {photoData && (
        <div className={thumbnailClasses}>
          <div className={classes[photoData.orientation]}>
            <img
              className={classes.Image}
              src={`${process.env.REACT_APP_API_BASE_URL}${photoData.thumb_name}`}
              alt={photoData.file_name}
              onClick={() =>
                history.push({
                  pathname: `${match.url}/${photoData.id}`,
                  state: { collectionData, photoData },
                })
              }
              onLoad={() => onImageLoaded()}
            />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default withRouter(Thumbnail);
