import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "../../axios-photos";
import Spinner from "../UI/Spinner/Spinner";
import classes from "./Photo.module.css";

const Photo = () => {
  const { id: urlParamId } = useParams();

  const [loading, setLoading] = useState(true);
  const [photoData, setPhotoData] = useState(null);
  const [photo, setPhoto] = useState([classes.hidden]);
  const [invalidId, setInvalidId] = useState(false);

  useEffect(() => {
    axios
      .get(`/pictures/${urlParamId}`)
      .then(response => {
        const data = response.data.data;
        if (data) {
          setPhotoData(data);
        } else {
          setInvalidId(true);
          setLoading(false);
        }
      })
      .catch(error => {
        console.log("error: ", error);
      });
  }, [urlParamId]);

  const onImageLoaded = () => {
    setPhoto([classes.Photo]);
    setLoading(false);
  };

  const renderPhoto = data => {
    const { file_name, name, place, month, year } = data;

    return (
      <div className={photo}>
        <img
          className={classes.Image}
          src={`${process.env.REACT_APP_API_BASE_URL}${file_name}`}
          alt={name}
          onLoad={onImageLoaded}
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
