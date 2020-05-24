import { takeEvery, all } from "redux-saga/effects";

import * as actionTypes from "../actions/actionTypes";
import { fetchCollectionSaga } from "./collection";
import {
  logoutSaga,
  checkAuthTimeoutSaga,
  authUserSaga,
} from "./auth";

export function* watchAuth() {
  yield all([
    takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
    takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
    takeEvery(actionTypes.AUTH_USER, authUserSaga)
  ])
}

export function* watchCollection() {
  yield takeEvery(actionTypes.FETCH_COLLECTION, fetchCollectionSaga);
}
