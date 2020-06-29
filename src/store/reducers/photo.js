import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  data: null,
  index: null,
  loading: false,
  successMessage: null,
  error: null,
};

const setPhotoData = (state, action) => {
  return updateObject(state, {
    data: action.data,
    index: action.index,
  });
};

const uploadPhotoInit = (state, action) => {
  return updateObject(state, {
    successMessage: null,
    error: null,
  });
};

const uploadPhotoStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    error: null,
  });
};

const uploadPhotoSuccess = (state, action) => {
  return updateObject(state, {
    successMessage: action.successMessage,
    loading: false,
  });
};

const uploadPhotoFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_PHOTO_DATA:
      return setPhotoData(state, action);
    case actionTypes.UPLOAD_PHOTO_INIT:
      return uploadPhotoInit(state, action);
    case actionTypes.UPLOAD_PHOTO_START:
      return uploadPhotoStart(state, action);
    case actionTypes.UPLOAD_PHOTO_SUCCESS:
      return uploadPhotoSuccess(state, action);
    case actionTypes.UPLOAD_PHOTO_FAIL:
      return uploadPhotoFail(state, action);
    default:
      return state;
  }
};

export default reducer;
