import { takeEvery } from "redux-saga/effects";

import * as actionTypes from "../actions/actionTypes";
import { fetchCollectionSaga } from "./collection";

export function* watchCollection() {
  yield takeEvery(actionTypes.FETCH_COLLECTION, fetchCollectionSaga);
}
