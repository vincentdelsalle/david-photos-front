import React, { useReducer, useEffect, Fragment } from "react";
import { useParams, Redirect } from "react-router-dom";
import { connect } from 'react-redux'

import {
  ALL_COLORS_LIST,
} from "../../shared/constants";
import classes from "./Photo.module.css";
import Spinner from "../../components/UI/Spinner/Spinner";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import * as actions from "../../store/actions";

const initialState = {
  photoClassName: [classes.hidden],
  loading: true,
  isSwitchButtonDisabled: {
    previous: true,
    next: true,
  },
  redirect: false,
};

const photoReducer = (state, action) => {
  switch (action.type) {
    case "ENABLE_SWITCH_BUTTONS":
      return {
        ...state,
        isSwitchButtonDisabled: {
          previous: false,
          next: false,
        },
      };
    case "TOGGLE_SWITCH_BUTTON_STATUS":
      return {
        ...state,
        isSwitchButtonDisabled: {
          ...state.isSwitchButtonDisabled,
          [action.btnType]: !state.isSwitchButtonDisabled[action.btnType],
        },
      };
    case "LOAD_PHOTO_SUCCEEDED":
      return {
        ...state,
        photoClassName: [classes.Photo],
        loading: false,
      };
    case "FETCH_COLLECTION_FAILED":
      return {
        ...state,
        loading: false,
      };
    case "REDIRECT":
      return { ...state, redirect: action.path };
    case "RESET":
      return initialState;
    default:
      throw new Error("Should not get there!");
  }
}

const Photo = ({
  history,
  onFetchCollection,
  onSetPhotoData,
  photoData,
  photoIndex,
  collectionData,
  error,
}) => {
  const { color: urlColorParam, id: urlIDParam } = useParams();

  const validUrlColor = ALL_COLORS_LIST.find(
    (colorName) => colorName === urlColorParam
  );

  const collectionInStore = collectionData && collectionData[validUrlColor]

  const [photoState, dispatch] = useReducer(photoReducer, initialState);

  useEffect(() => {
    if (!validUrlColor || collectionInStore) {
      return
    }
    onFetchCollection(validUrlColor);
  }, [validUrlColor, collectionInStore, onFetchCollection]);

  useEffect(() => {
    if (!collectionData || !collectionData[validUrlColor]) {
      dispatch({ type: "FETCH_COLLECTION_FAILED" });
      return
    }
    dispatch({ type: "ENABLE_SWITCH_BUTTONS" });

    const photoDataInCollection = collectionData[validUrlColor].find(
      (p) => p.id === parseInt(urlIDParam)
    );

    if (photoDataInCollection) {
      const photoIndex = findPhotoIndexInCollection(
        collectionData[validUrlColor],
        photoDataInCollection.id
      );
      photoIndex === 0 && disableButton("previous");
      photoIndex === collectionData[validUrlColor].length - 1 &&
        disableButton("next");
      onSetPhotoData(photoDataInCollection, photoIndex)
    } else {
      dispatch({ type: "REDIRECT", path: `/gallery/${validUrlColor}` });
    }
  }, [collectionData, validUrlColor, urlIDParam, onSetPhotoData])

  const disableButton = (btnType) => {
    dispatch({ type: "TOGGLE_SWITCH_BUTTON_STATUS", btnType: btnType });
  };

  const findPhotoIndexInCollection = (collectionData, photoId) => {
    return collectionData.findIndex((photo) => photo.id === photoId);
  };

  const switchButtonClickedHandler = (btnType) => {
    dispatch({ type: "RESET" });

    const photoData = collectionData[validUrlColor].find((_, i) => {
      return btnType === "next"
        ? i === photoIndex + 1
        : btnType === "previous"
          ? i === photoIndex - 1
          : null;
    });

    history.push(`/gallery/${validUrlColor}/${photoData.id}`)
  };

  const onImageLoaded = () => {
    dispatch({ type: "LOAD_PHOTO_SUCCEEDED" });
  };

  const renderPhoto = ({ file_name, name, place, month, year }) => {
    return (
      <div className={photoState.photoClassName}>
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
      {(!validUrlColor || photoState.redirect) && <Redirect to={!validUrlColor ? `/` : photoState.redirect} />}
      <Toolbar
        toolbarType="photoToolbar"
        currentColor={validUrlColor}
        switchButtonClicked={switchButtonClickedHandler}
        isSwitchButtonDisabled={photoState.isSwitchButtonDisabled}
      />
      <div className={classes.Frame}>
        {photoState.loading && (
          <Spinner additionalClassName="PhotoSpinner"></Spinner>
        )}
        {photoData && renderPhoto(photoData)}
        {error && <div>{error}</div>}
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    photoData: state.photo.data,
    photoIndex: state.photo.index,
    collectionData: state.collection.data,
    error: state.collection.error,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchCollection: (color) => dispatch(actions.fetchCollection(color)),
    onSetPhotoData: (data, index) => dispatch(actions.setPhotoData(data, index)),
  };
};

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(Photo));
