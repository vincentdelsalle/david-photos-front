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
    yield put(actions.uploadPhotoSuccess(response.data.message));
  } catch (error) {
    console.log("error :>> ", error);
    // yield put(actions.uploadPhotoFail(error));
  }
}
