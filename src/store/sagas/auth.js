import { put, delay, call } from "redux-saga/effects";

import axios from "../../axios-photos";
import * as actions from "../actions/index";

export function* logoutSaga(action) {
  yield call([localStorage, "removeItem"], "token");
  yield call([localStorage, "removeItem"], "expirationDate");
  yield call([localStorage, "removeItem"], "userId");
  yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime);
  yield put(actions.logout());
}

export function* authUserSaga(action) {
  yield put(actions.authStart());
  const authData = {
    login: action.username,
    pwd: action.password,
  };
  try {
    const response = yield axios.post('/user/login', authData)
    if (response.data.status === 'success') {
      const expirationDate = yield new Date(new Date().getTime() + 3600000)
      yield localStorage.setItem("token", response.data.token);
      yield localStorage.setItem("expirationDate", expirationDate);
      yield localStorage.setItem("userId", response.data.id);
      yield put(
        actions.authSuccess(response.data.token, response.data.id)
      );
      yield put(actions.checkAuthTimeout(3600000));
    } else {
      yield put(actions.authFail(response.data.message));
    }
  } catch (error) {
    yield put(actions.authFail(error.message));
  }
}

export function* authCheckStateSaga(action) {
  const token = yield localStorage.getItem("token");
  if (!token) {
    yield put(actions.logout());
  } else {
    const expirationDate = yield new Date(
      localStorage.getItem("expirationDate")
    );
    if (expirationDate <= new Date()) {
      yield put(actions.logout());
    } else {
      const userId = yield localStorage.getItem("userId");
      yield put(actions.authSuccess(token, userId));
      yield put(
        actions.checkAuthTimeout(
          expirationDate.getTime() - new Date().getTime()
        )
      );
    }
  }
}