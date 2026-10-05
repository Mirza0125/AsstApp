import {all, call, put, takeLatest} from 'redux-saga/effects';
import {appConfig} from 'src/config/app';
import {showMessageSuccess} from 'src/utils/alerts';
import {navigate} from 'src/navigator/NavigationService';
import AsyncStorage from '@react-native-async-storage/async-storage';

// utils
import XHR from 'src/utils/XHR';

// types
import types from './types';

// actions
import {
  requestChangePasswordSuccess,
  requestChangePasswordFailure,
} from './actions';

async function requestChangePasswordAPI(data) {
  const URL = `${appConfig.backendServerURL}/api/v1/password/change/`;
  const authToken = await AsyncStorage.getItem('authToken');

  const options = {
    headers: {
      Authorization: 'Token ' + authToken,
      'Content-Type': 'application/json',
    },
    method: 'POST',
    data,
  };

  return XHR(URL, options);
}

function* requestChangePassword({data}) {
  try {
    const res = yield call(requestChangePasswordAPI, data);
    yield put(requestChangePasswordSuccess());
    showMessageSuccess('Password changed successfully!');
    navigate('Profile');
  } catch (e) {
    yield put(requestChangePasswordFailure());
  }
}

export default all([
  takeLatest(types.REQUEST_CHANGE_PASSWORD, requestChangePassword),
]);
