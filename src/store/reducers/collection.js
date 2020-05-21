import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  data: null,
  error: false,
  loading: false,
};

const fetchCollectionStart = (state, action) => {
  return updateObject(state, {
    loading: true,
  });
};

const fetchCollectionSuccess = (state, action) => {
  return updateObject(state, {
    data: {
      ...state.data,
      [action.currentColor]: action.collectionData,
    },
    error: false,
    loading: false,
  });
};

const fetchCollectionFailed = (state, action) => {
  return updateObject(state, {
    error: action.errorMsg,
    loading: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_COLLECTION_START:
      return fetchCollectionStart(state, action);
    case actionTypes.FETCH_COLLECTION_SUCCESS:
      return fetchCollectionSuccess(state, action);
    case actionTypes.FETCH_COLLECTION_FAILED:
      return fetchCollectionFailed(state, action);
    default:
      return state;
  }
};

export default reducer;
