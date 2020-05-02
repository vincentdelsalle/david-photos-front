import React, { Fragment, useReducer, useEffect } from "react";
import { useParams, Redirect } from "react-router-dom";

import {
  ALL_COLORS_LIST,
  ENGLISH_TO_FRENCH_COLOR_NAME,
} from "../../utils/constants";
import axios from "../../axios-photos";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import ThumbnailsFrame from "../../components/ThumbnailsFrame/ThumbnailsFrame";

const initialState = {
  currentColor: null,
  redirect: false,
  collectionData: [],
  isLoading: true,
  error: null,
};

const collectionReducer = (state, action) => {
  switch (action.type) {
    case "SET_DATA":
      return {
        ...state,
        currentColor: action.currentColor,
        collectionData: action.collectionData,
        isLoading: false,
      };
    case "INIT_CHANGE_GALLERY":
      return { ...state, isLoading: true };
    case "REDIRECT":
      return { ...state, redirect: true };
    case "ERROR":
      return { isLoading: false, error: action.errorMessage };
    case "RESET":
      return initialState;
    default:
      throw new Error("Should not get there!");
  }
};

const Collection = () => {
  const { color: urlColorParam } = useParams();

  const [collectionState, dispatch] = useReducer(
    collectionReducer,
    initialState
  );

  useEffect(() => {
    const isUrlColorValid = ALL_COLORS_LIST.find(
      (colorName) => colorName === urlColorParam
    );
    if (isUrlColorValid) {
      getCollectionData(urlColorParam);
    } else {
      dispatch({ type: "REDIRECT" });
    }
    return () => {
      dispatch({ type: "INIT_CHANGE_GALLERY" });
    };
  }, [urlColorParam]);

  const getCollectionData = (curColor) => {
    axios
      .get(
        `/pictures/gallery?color=${ENGLISH_TO_FRENCH_COLOR_NAME[curColor]}&page=1`
      )
      .then((response) => {
        dispatch({
          type: "SET_DATA",
          currentColor: curColor,
          collectionData: response.data.rows,
        });
      })
      .catch((error) => {
        dispatch({ type: "ERROR", errorMessage: error.message });
      });
  };

  return (
    <Fragment>
      {collectionState.redirect && <Redirect to="/" />}
      {collectionState.currentColor && (
        <Fragment>
          <Toolbar
            toolbarType="collectionToolbar"
            currentColor={collectionState.currentColor}
          />
          <ThumbnailsFrame
            currentColor={collectionState.currentColor}
            colorCollectionData={collectionState.collectionData}
            loading={collectionState.isLoading}
            error={collectionState.error}
          />
        </Fragment>
      )}
    </Fragment>
  );
};

export default Collection;
