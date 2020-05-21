import { put } from "redux-saga/effects";

import axios from "../../axios-photos";
import * as actions from "../actions";
import { ENGLISH_TO_FRENCH_COLOR_NAME } from "../../shared/constants";

export function* fetchCollectionSaga(action) {
  yield put(actions.fetchCollectionStart());
  try {
    const frenchCurColor = yield ENGLISH_TO_FRENCH_COLOR_NAME[action.color];
    const response = yield axios.get(
      `/pictures/gallery?color=${frenchCurColor}&page=1`
    );
    yield put(
      actions.fetchCollectionSuccess(response.data.rows, action.color)
    )
  } catch (error) {
    yield put(actions.fetchCollectionFailed(error.message));
  }
}
