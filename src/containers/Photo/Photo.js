import React, { useReducer, useEffect, Fragment } from "react";
import { useParams, Redirect } from "react-router-dom";

import {
  ALL_COLORS_LIST,
  ENGLISH_TO_FRENCH_COLOR_NAME,
} from "../../shared/constants";
import axios from "../../axios-photos";
import classes from "./Photo.module.css";
import Spinner from "../../components/UI/Spinner/Spinner";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";

const initialState = {
  data: {
    photo: null,
    index: null,
    collection: [],
  },
  photoClasses: [classes.hidden],
  isLoading: true,
  error: null,
  redirect: false,
  isSwitchButtonDisabled: {
    previous: false,
    next: false,
  },
};

const photoReducer = (state, action) => {
  switch (action.type) {
    case "SET_DATA":
      return {
        ...state,
        data: {
          ...state.data,
          photo: action.photoData,
          index: action.photoIndex,
          collection: action.collectionData,
        },
      };
    case "TOGGLE_BUTTONS_STATUS":
      return {
        ...state,
        isSwitchButtonDisabled: {
          ...state.isSwitchButtonDisabled,
          [action.btnName]: !state.isSwitchButtonDisabled[action.btnName],
        },
      };
    case "LOAD_PHOTO_SUCCEEDED":
      return {
        ...state,
        photoClasses: [classes.Photo],
        isLoading: false,
      };
    case "LOAD_PHOTO_FAILED":
      return {
        ...state,
        isLoading: false,
        error: action.errorMessage,
      };
    case "REDIRECT":
      return { ...state, redirect: action.path };
    case "RESET":
      return initialState;
    default:
      throw new Error("Should not get there!");
  }
};

const Photo = ({ history, location }) => {
  const { color: urlColorParam, id: urlIDParam } = useParams();

  const [photoState, dispatch] = useReducer(photoReducer, initialState);

  useEffect(() => {
    if (!location.state) {
      return;
    }

    const { photoData, collectionData } = location.state;

    const photoIndex = findPhotoIndexInCollection(collectionData, photoData.id);

    photoIndex === 0 && toggleButtonStatus("previous");
    photoIndex === collectionData.length - 1 && toggleButtonStatus("next");
    dispatch({
      type: "SET_DATA",
      photoData: photoData,
      photoIndex: photoIndex,
      collectionData: collectionData,
    });
  }, [location.state]);

  const toggleButtonStatus = (btnName) => {
    dispatch({ type: "TOGGLE_BUTTONS_STATUS", btnName: btnName });
  };

  useEffect(() => {
    if (location.state) {
      return;
    }

    const urlColorName = ALL_COLORS_LIST.find(
      (colorName) => colorName === urlColorParam
    );

    if (urlColorName) {
      if (!photoState.data.collection.length) {
        axios
          .get(
            `/pictures/gallery?color=${ENGLISH_TO_FRENCH_COLOR_NAME[urlColorName]}&page=1`
          )
          .then((response) => {
            const collectionData = response.data.rows;
            const photoDataInCollection = collectionData.find(
              (p) => p.id === parseInt(urlIDParam)
            );
            if (photoDataInCollection) {
              const photoIndex = findPhotoIndexInCollection(
                collectionData,
                photoDataInCollection.id
              );
              photoIndex === 0 && toggleButtonStatus("previous");
              photoIndex === collectionData.length - 1 &&
                toggleButtonStatus("next");
              dispatch({
                type: "SET_DATA",
                photoData: photoDataInCollection,
                photoIndex: photoIndex,
                collectionData: collectionData,
              });
            } else {
              dispatch({ type: "REDIRECT", path: `/gallery/${urlColorParam}` });
            }
          })
          .catch((error) => {
            dispatch({
              type: "LOAD_PHOTO_FAILED",
              errorMessage: error.message,
            });
          });
      }
    } else {
      dispatch({ type: "REDIRECT", path: "/" });
    }
  }, [location.state, photoState.data.collection, urlColorParam, urlIDParam]);

  const switchButtonClickedHandler = (btnName) => {
    dispatch({ type: "RESET" });

    const { collection: collectionData, index } = photoState.data;

    const photoData = collectionData.find((_, i) => {
      return btnName === "next"
        ? i === index + 1
        : btnName === "previous"
        ? i === index - 1
        : null;
    });

    history.push({
      pathname: `/gallery/${urlColorParam}/${photoData.id}`,
      state: { collectionData, photoData },
    });
  };

  const findPhotoIndexInCollection = (collectionData, photoId) => {
    return collectionData.findIndex((photo) => photo.id === photoId);
  };

  const onImageLoaded = () => {
    dispatch({ type: "LOAD_PHOTO_SUCCEEDED" });
  };

  const renderPhoto = ({ file_name, name, place, month, year }) => {
    return (
      <div className={photoState.photoClasses}>
        <img
          className={classes.Image}
          src={`${process.env.REACT_APP_API_BASE_URL}${file_name}`}
          alt={name}
          onLoad={() => onImageLoaded()}
        />
        <div className={classes.Caption}>
          {place}, {month} {year}
        </div>
      </div>
    );
  };

  return (
    <Fragment>
      {photoState.redirect && <Redirect to={photoState.redirect} />}
      <Toolbar
        toolbarType="photoToolbar"
        currentColor={urlColorParam}
        switchButtonClicked={switchButtonClickedHandler}
        isSwitchButtonDisabled={photoState.isSwitchButtonDisabled}
      />
      <div className={classes.Frame}>
        {photoState.isLoading && (
          <Spinner additionalClassName="PhotoSpinner"></Spinner>
        )}
        {photoState.data.photo && renderPhoto(photoState.data.photo)}
        {photoState.error && <div>{photoState.error}</div>}
      </div>
    </Fragment>
  );
};

export default React.memo(Photo);
