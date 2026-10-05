import {all, call, put, takeLatest} from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showMessage} from 'react-native-flash-message';
import {Alert} from 'react-native';

import {navigate} from 'src/navigator/NavigationService';
// config
import {appConfig} from 'src/config/app';

// utils
import XHR from 'src/utils/XHR';

// types
import types from './types';

// actions
import {setUserInfo, loginFailure, reset} from './actions';

function loginAPI(data) {
  const URL = `${appConfig.backendServerURL}/api/v1/login/`;
  console.log(URL);
  const options = {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    data,
  };

  return XHR(URL, options);
}

function* login({data}) {
  try {
    const res = yield call(loginAPI, data);
    console.log('response', res);
    AsyncStorage.setItem('authToken', res.data.token);
    yield put(setUserInfo(res.data));
  } catch (e) {
    // yield put(loginFailure());
    console.log('e ', e);
    yield put(reset());
    showMessage({
      message: e.response.data.non_field_errors,
      type: 'danger',
    });
  }
}

export default all([takeLatest(types.login, login)]);
