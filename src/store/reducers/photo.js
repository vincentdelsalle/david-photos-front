import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  data: null,
  index: null,
};

const setPhotoData = (state, action) => {
  return updateObject(state, {
    data: action.data,
    index: action.index
  })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_PHOTO_DATA:
      return setPhotoData(state, action)
    default:
      return state
  }
}

export default reducer