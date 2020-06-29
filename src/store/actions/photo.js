import * as actionTypes from "./actionTypes";

export const setPhotoData = (data, index) => {
  return {
    type: actionTypes.SET_PHOTO_DATA,
    data: data,
    index: index,
  };
};

export const uploadPhoto = (photoData, token) => {
  return {
    type: actionTypes.UPLOAD_PHOTO,
    photoData: photoData,
    token: token,
  };
};

export const uploadPhotoInit = () => {
  return { type: actionTypes.UPLOAD_PHOTO_INIT };
};

export const uploadPhotoStart = () => {
  return { type: actionTypes.UPLOAD_PHOTO_START };
};

export const uploadPhotoSuccess = (message) => {
  return {
    type: actionTypes.UPLOAD_PHOTO_SUCCESS,
    successMessage: message,
  };
};

export const uploadPhotoFail = (error) => {
  return {
    type: actionTypes.UPLOAD_PHOTO_FAIL,
    error: error,
  };
};
