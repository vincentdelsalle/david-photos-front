import * as actionTypes from "./actionTypes";

export const fetchCollection = (color) => {
  return {
    type: actionTypes.FETCH_COLLECTION,
    color: color,
  };
};

export const fetchCollectionStart = () => {
  return {
    type: actionTypes.FETCH_COLLECTION_START,
  };
};

export const fetchCollectionSuccess = (collectionData, color) => {
  return {
    type: actionTypes.FETCH_COLLECTION_SUCCESS,
    collectionData: collectionData,
    currentColor: color,
  };
};

export const fetchCollectionFailed = (errorMessage, color) => {
  return {
    type: actionTypes.FETCH_COLLECTION_FAILED,
    errorMsg: errorMessage,
  };
};

