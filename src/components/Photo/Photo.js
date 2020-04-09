import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Spinner from "../UI/Spinner/Spinner";
import classes from "./Photo.module.css";

const Photo = ({ colorCollectionData, onPhotoLoaded }) => {
  const { id: urlParamId } = useParams();

  const [loading, setLoading] = useState(true);
  const [photoData, setPhotoData] = useState(null);
  const [photoClasses, setPhotoClasses] = useState([classes.hidden]);
  const [invalidId, setInvalidId] = useState(false);

  useEffect(() => {
    if (colorCollectionData && colorCollectionData.length) {
      const selectedPhotoData = colorCollectionData.find(
        (photo) => photo.id === parseInt(urlParamId)
      );
      if (selectedPhotoData) {
        setPhotoData(selectedPhotoData);
      } else {
        setInvalidId(true);
        onPhotoLoaded(false);
        setLoading(false);
      }
    }
  }, [urlParamId, colorCollectionData, onPhotoLoaded]);

  const onImageLoaded = (id) => {
    onPhotoLoaded(id);
    setPhotoClasses([classes.Photo]);
    setLoading(false);
  };

  const renderPhoto = (data) => {
    const { id, file_name, name, place, month, year } = data;

    return (
      <div className={photoClasses}>
        <img
          className={classes.Image}
          src={`${process.env.REACT_APP_API_BASE_URL}${file_name}`}
          alt={name}
          onLoad={() => onImageLoaded(id)}
        />
        <div className={classes.Caption}>
          {place}, {month} {year}
        </div>
      </div>
    );
  };

  return (
    <div className={classes.Frame}>
      {loading && <Spinner additionalClassName="PhotoSpinner"></Spinner>}
      {photoData && renderPhoto(photoData)}
      {invalidId && <div>Invalid ID</div>}
    </div>
  );
};

export default Photo;
