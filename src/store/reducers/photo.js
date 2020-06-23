import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  data: null,
  index: null,
  loading: false,
  message: null,
};

const setPhotoData = (state, action) => {
  return updateObject(state, {
    data: action.data,
    index: action.index,
  });
};

const uploadPhotoInit = (state, action) => {
  return updateObject(state, {
    message: null,
  });
};

const uploadPhotoStart = (state, action) => {
  return updateObject(state, {
    loading: true,
  });
};

const uploadPhotoSuccess = (state, action) => {
  return updateObject(state, {
    message: action.message,
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
    default:
      return state;
  }
};

export default reducer;
