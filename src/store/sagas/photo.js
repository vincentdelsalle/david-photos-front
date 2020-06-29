import { put } from "redux-saga/effects";

import axios from "../../axios-photos";
import * as actions from "../actions";

export function* uploadPhotoSaga(action) {
  yield put(actions.uploadPhotoStart());
  try {
    const response = yield axios.post(
      `/pictures?token=${action.token}`,
      action.photoData
    );
    if (response.data.status === "success") {
      yield put(actions.uploadPhotoSuccess(response.data.message));
    } else {
      yield put(actions.uploadPhotoFail(response.data.message));
    }
  } catch (error) {
    yield put(actions.uploadPhotoFail(error.message));
  }
}
