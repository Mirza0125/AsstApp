import {all, call, put, takeLatest} from 'redux-saga/effects';
import {appConfig} from 'src/config/app';
import {navigate} from 'src/navigator/NavigationService';
import {Toast} from 'native-base';

// utils
import XHR from 'src/utils/XHR';
import {errorAlert} from 'src/utils/alerts';

// types
import types from './types';

// actions
import {requestNewPasswordSuccess, requestNewPasswordFailure} from './actions';

function requestNewPasswordAPI(data) {
  const URL = `${appConfig.backendServerURL}/api/v1/forgot-password/confirm/`;

  const options = {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    data,
  };

  return XHR(URL, options);
}

function* requestNewPassword({data}) {
  try {
    const res = yield call(requestNewPasswordAPI, data);
    console.log(res.data);
    yield put(requestNewPasswordSuccess());
    navigate('Login');
  } catch (e) {
    console.log(e);
    yield put(requestNewPasswordFailure());
  }
}

export default all([
  takeLatest(types.REQUEST_NEW_PASSWORD, requestNewPassword),
]);
