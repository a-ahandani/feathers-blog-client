import { delay } from 'redux-saga';
import { put } from 'redux-saga/effects';
import { appService } from '../../../../feathers';

import * as actions from '../actions/index';

export function* logoutSaga(action) {
  yield localStorage.removeItem('token');
  yield localStorage.removeItem('expirationDate');
  yield localStorage.removeItem('userId');
  yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.logout());
}

export function* authUserSaga(action) {
  yield put(actions.authStart());
  const authData = {
    strategy: 'local',
    email: action.email,
    password: action.password
  };
  let url =
    'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyB5cHT6x62tTe-g27vBDIqWcwQWBSj3uiY';
  if (!action.isSignup) {
    url =
      'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyB5cHT6x62tTe-g27vBDIqWcwQWBSj3uiY';
  }
  try {
    const response = yield appService.authenticate(authData);

    const tokenArray = response.accessToken.split('.');
    const decodedToken = JSON.parse(atob(tokenArray[1]));
    const expirationDate = yield new Date(
      new Date(decodedToken.exp * 1000).getTime()
    );
    const userId = decodedToken.userId;

    yield localStorage.setItem('token', response.accessToken);
    yield localStorage.setItem('expirationDate', expirationDate);
    yield localStorage.setItem('userId', userId);
    yield put(actions.authSuccess(response.accessToken, userId));
    // yield put(actions.checkAuthTimeout(response.data.expiresIn));
  } catch (error) {
    yield put(actions.authFail(error.data.message));
  }
}

export function* authCheckStateSaga(action) {
  const token = yield localStorage.getItem('token');
  if (!token) {
    yield put(actions.logout());
  } else {
    const expirationDate = yield new Date(
      localStorage.getItem('expirationDate')
    );
    if (expirationDate <= new Date()) {
      console.log('expirationDate');
      yield put(actions.logout());
    } else {
      const userId = yield localStorage.getItem('userId');
      const authData = {
        strategy: 'jwt',
        accessToken: token
      };
      yield appService.authenticate(authData);
      yield put(actions.authSuccess(token, userId));
      yield put(
        actions.checkAuthTimeout(
          (expirationDate.getTime() - new Date().getTime()) / 1000
        )
      );
    }
  }
}
