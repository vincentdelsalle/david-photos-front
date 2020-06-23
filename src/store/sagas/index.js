import { takeEvery, all, takeLatest } from "redux-saga/effects";

import * as actionTypes from "../actions/actionTypes";
import { fetchCollectionSaga } from "./collection";
import {
  logoutSaga,
  checkAuthTimeoutSaga,
  authUserSaga,
  authCheckStateSaga,
} from "./auth";
import { uploadPhotoSaga } from "./photo";

export function* watchAuth() {
  yield all([
    takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
    takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
    takeEvery(actionTypes.AUTH_USER, authUserSaga),
    takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga),
  ]);
}

export function* watchCollection() {
  yield takeEvery(actionTypes.FETCH_COLLECTION, fetchCollectionSaga);
}

export function* watchPhoto() {
  yield takeLatest(actionTypes.UPLOAD_PHOTO, uploadPhotoSaga);
}
