import React, { useReducer, useEffect } from "react";
import { useParams } from "react-router-dom";

import Spinner from "../UI/Spinner/Spinner";
import classes from "./Photo.module.css";

const initialState = {
  loading: true,
  photoData: null,
  photoClasses: [classes.hidden],
  invalidId: false,
};

const photoReducer = (state, action) => {
  switch (action.type) {
    case "SET_PHOTO_DATA":
      return { ...state, photoData: action.data };
    case "SET_PHOTO_DATA_FAILED":
      return {
        ...state,
        invalidId: true,
        loading: false,
      };
    case "LOAD_PHOTO_SUCCEEDED":
      return {
        ...state,
        photoClasses: [classes.Photo],
        loading: false,
      };
    case "RESET":
      return initialState;
    default:
      throw new Error("Should not get there!");
  }
};

const Photo = ({ colorCollectionData, onPhotoLoaded }) => {
  const { id: urlParamId } = useParams();
  const [state, dispatch] = useReducer(photoReducer, initialState);
  const { loading, photoData, photoClasses, invalidId } = state;

  useEffect(() => {
    onPhotoLoaded("isLoading", false);
    if (colorCollectionData && colorCollectionData.length) {
      const selectedPhotoData = colorCollectionData.find(
        (photo) => photo.id === parseInt(urlParamId)
      );
      if (selectedPhotoData) {
        dispatch({ type: "SET_PHOTO_DATA", data: selectedPhotoData });
      } else {
        onPhotoLoaded("failed", false);
        dispatch({ type: "SET_PHOTO_DATA_FAILED" });
      }
    }
    return () => {
      dispatch({ type: "RESET" });
    };
  }, [urlParamId, colorCollectionData, onPhotoLoaded]);

  const onImageLoaded = (id) => {
    onPhotoLoaded("isLoaded", id);
    dispatch({ type: "LOAD_PHOTO_SUCCEEDED" });
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
