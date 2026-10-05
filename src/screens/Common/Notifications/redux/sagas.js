import {all, call, put, takeLatest} from 'redux-saga/effects';
import {showMessage} from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
// config
import {appConfig} from 'src/config/app';

// utils
import XHR from 'src/utils/XHR';

// types
import types from './types';

//navigation service
import {navigate} from '../../../../navigator/NavigationService';

// actions
import {
  isSeenSuccess,
  isSeenFailure,
  getNotificationSuccess,
  getNotificationFailure,
} from './actions';

async function isSeenAPI(data) {
  const URL = `${appConfig.backendServerURL}/api/v1/user-notification/`;
  const authToken = await AsyncStorage.getItem('authToken');
  console.log(URL);
  const options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Token ' + authToken,
    },
    method: 'POST',
    data,
  };

  return XHR(URL, options);
}

function* isSeen({data}) {
  try {
    const res = yield call(isSeenAPI, data);
    yield put(isSeenSuccess(data));
    //navigate('Home');
  } catch (e) {
    console.log(e);
    yield put(isSeenFailure());
    showMessage({
      message: 'Unable to complete isSeen request, please try again.',
      type: 'danger',
    });
  }
}

async function notificationsAPI() {
  const URL = `${appConfig.backendServerURL}/api/v1/notification/`;
  const authToken = await AsyncStorage.getItem('authToken');

  const options = {
    headers: {
      Authorization: 'Token ' + authToken,
      'Content-Type': 'application/json',
    },
    method: 'GET',
  };
  return XHR(URL, options);
}

function* notifications() {
  try {
    const res = yield call(notificationsAPI);
    const {data} = res;
    console.log('noti ger Res', data);
    yield put(getNotificationSuccess(data));
  } catch (e) {
    yield put(getNotificationFailure());

    showMessage({
      message: 'Unable to load data, something went wrong.',
      type: 'danger',
    });
  }
}

export default all([
  takeLatest(types.isSeen, isSeen),
  takeLatest(types.getNotification, notifications),
]);
