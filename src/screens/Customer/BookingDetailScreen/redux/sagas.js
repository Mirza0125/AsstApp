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
  postBookingDetailSuccess,
  postBookingDetailFailure,
  postNotificationSuccess,
  postNotificationFailure,
} from './actions';

async function bookingDetailAPI(data) {
  const URL = `${appConfig.backendServerURL}/api/v1/booking/`;
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

function* bookingDetails({data}) {
  try {
    const res = yield call(bookingDetailAPI, data);
    yield put(postBookingDetailSuccess(data));
    navigate('Home');
    Toast.show({
      text1: 'You’ve successfully added',
      text2: 'a service on your Task List!',
      type: 'success',
      position: 'bottom',
      bottomOffset: 40,
    });
  } catch (e) {
    console.log(e);
    yield put(postBookingDetailFailure());
    showMessage({
      message: 'Unable to complete booking request, please try again.',
      type: 'danger',
    });
  }
}

async function notificationAPI(data) {
  const URL = `${appConfig.backendServerURL}/api/v1/notification/`;
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

function* notifications({data}) {
  try {
    const res = yield call(notificationAPI, data);
    yield put(postNotificationSuccess(data));
    navigate('Home');
    Toast.show({
      text1: 'You’ve successfully added',
      text2: 'a service on your Task List!',
      type: 'success',
      position: 'bottom',
      bottomOffset: 40,
    });
  } catch (e) {
    console.log(e);
    yield put(postNotificationFailure());
    showMessage({
      message: 'Unable to complete notification request, please try again.',
      type: 'danger',
    });
  }
}

export default all([
  takeLatest(types.postBookingDetail, bookingDetails),
  takeLatest(types.postNotification, notifications),
]);
