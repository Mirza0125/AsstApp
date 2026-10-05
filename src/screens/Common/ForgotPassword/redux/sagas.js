import {all, call, put, takeLatest} from 'redux-saga/effects';
import {appConfig} from 'src/config/app';
import {navigate} from 'src/navigator/NavigationService';

// utils
import XHR from 'src/utils/XHR';

// types
import types from './types';

// actions
import {
  reset,
  requestPasswordResetSuccess,
  requestPasswordResetFailure,
} from './actions';

function requestPasswordResetAPI(data) {
  const URL = `${appConfig.backendServerURL}/api/v1/forgot-password/`;

  const options = {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    data,
  };

  return XHR(URL, options);
}

function verifyPasswordResetAPI(data) {
  const URL = `${appConfig.backendServerURL}/api/v1/forgot-password/validate_token/`;

  const options = {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    data,
  };

  return XHR(URL, options);
}

function* requestPasswordReset({email}) {
  try {
    yield call(requestPasswordResetAPI, email);
    yield put(requestPasswordResetSuccess());
    navigate('Verification', {email});
  } catch (e) {
    yield put(requestPasswordResetFailure(e.response));
  }
}

function* verifyPasswordReset({data}) {
  try {
    const res = yield call(verifyPasswordResetAPI, data);
    yield put(reset());
    navigate('NewPassword', {data});
  } catch (e) {
    console.log(e);
    yield put(reset());
  }
}

export default all([
  takeLatest(types.REQUEST_PASSWORD_RESET, requestPasswordReset),
  takeLatest(types.VERIFY_PASSWORD_RESET, verifyPasswordReset),
]);
