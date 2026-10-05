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
  addToBagSuccess,
  addToBagFailure,
  getQuestionSuccess,
  getQuestionFailure,
  postBookingFormSuccess,
  postBookingFormFailure,
  postNotificationSuccess,
  postNotificationFailure,
} from './actions';

async function getQuestionAPI(id) {
  const URL = `${appConfig.backendServerURL}/api/v1/question/?category=${id}`;
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

function* getQuestionData({id}) {
  try {
    const res = yield call(getQuestionAPI, id);
    const {data} = res;
    yield put(getQuestionSuccess(data));
  } catch (e) {
    yield put(getQuestionFailure());

    showMessage({
      message: 'Unable to load data, something went wrong.',
      type: 'danger',
    });
  }
}

async function bookingFormAPI(data) {
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

function* bookingForm({data}) {
  try {
    const res = yield call(bookingFormAPI, data);
    yield put(postBookingFormSuccess(data));
    navigate('Home');
    Toast.show({
      text1: 'You’ve successfully added',
      text2: 'a service on your Task List!',
      type: 'success',
      position: 'bottom',
      bottomOffset: 40,
    });
  } catch (e) {
    console.log('Booking Error', e);
    yield put(postBookingFormFailure());
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
    // navigate('Home');
    // Toast.show({
    //   text1: 'You’ve successfully added',
    //   text2: 'a service on your Task List!',
    //   type: 'success',
    //   position: 'bottom',
    //   bottomOffset: 40,
    // });
  } catch (e) {
    console.log('Notification Error', e);
    yield put(postNotificationFailure());
    showMessage({
      message: 'Unable to complete notification request, please try again.',
      type: 'danger',
    });
  }
}

async function addToBagAPI(data) {
  const URL = `${appConfig.backendServerURL}/api/v1/add-to-bag/`;
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

function* addToBag({data}) {
  try {
    const res = yield call(addToBagAPI, data);
    yield put(addToBagSuccess(data));
    navigate('Home');
    Toast.show({
      text1: 'You’ve successfully added a service',
      text2: 'in your Bag!',
      type: 'success',
      position: 'bottom',
      bottomOffset: 40,
    });
  } catch (e) {
    console.log(e);
    yield put(addToBagFailure());
    showMessage({
      message: 'Oops! something went wrong, please try again.',
      type: 'danger',
    });
  }
}

export default all([
  takeLatest(types.addToBag, addToBag),
  takeLatest(types.getQuestion, getQuestionData),
  takeLatest(types.postBookingForm, bookingForm),
  takeLatest(types.postNotification, notifications),
]);
