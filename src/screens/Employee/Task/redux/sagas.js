import {all, call, put, takeLatest} from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

/// config
import {appConfig} from 'src/config/app';

// utils
import XHR from 'src/utils/XHR';
// types
import types from './types';

// actions
import {
  postTaskDetailSuccess,
  postTaskDetailFailure,
  setTimeAvailabilityFailure,
  setTimeAvailabilitySuccess,
  getPendingBookingTaskDetail,
  getPendingBookingTaskDetailSuccess,
  getPendingBookingTaskDetailFailure,
  getApprovedBookingTaskDetailSuccess,
  getApprovedBookingTaskDetailFailure,
} from './actions';

async function getPendingBookingTaskDetailsAPI() {
  const URL = `${appConfig.backendServerURL}/api/v1/employee-booking-pending/`;
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

function* getPendingBookingDetails({}) {
  try {
    const res = yield call(getPendingBookingTaskDetailsAPI);
    const {data} = res;
    yield put(getPendingBookingTaskDetailSuccess(data));
  } catch (e) {
    yield put(getPendingBookingTaskDetailFailure());

    showMessage({
      message: 'Unable to load data, something went wrong.',
      type: 'danger',
    });
  }
}

async function getApprovedBookingTaskDetailsAPI() {
  const URL = `${appConfig.backendServerURL}/api/v1/employee-booking-accepted/`;
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

function* getApprovedBookingDetails() {
  try {
    const res = yield call(getApprovedBookingTaskDetailsAPI);
    const {data} = res;
    console.log('Approved Task>>>', res);
    yield put(getApprovedBookingTaskDetailSuccess(data));
  } catch (e) {
    console.log('Approved Task error>>> ', e);
    yield put(getApprovedBookingTaskDetailFailure());

    showMessage({
      message: 'Unable to load data, something went wrong.',
      type: 'danger',
    });
  }
}

async function postTaskDetailsAPI(data, id) {
  const URL = `${appConfig.backendServerURL}/api/v1/employee-booking/${id}/`;
  const authToken = await AsyncStorage.getItem('authToken');

  const options = {
    headers: {
      Authorization: 'Token ' + authToken,
      'Content-Type': 'application/json',
    },
    method: 'PATCH',
    data,
  };
  return XHR(URL, options);
}

function* postTaskDetails({data, id}) {
  try {
    yield call(postTaskDetailsAPI, data, id);
    yield put(postTaskDetailSuccess());
    yield put(getPendingBookingTaskDetail());
  } catch (e) {
    console.log('error', e);
    yield put(postTaskDetailFailure());

    showMessage({
      message: 'Unable to load data, something went wrong.',
      type: 'danger',
    });
  }
}

async function timeAvailabilityAPI(data) {
  const URL = `${appConfig.backendServerURL}/api/v1/employee-available-time/`;
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

function* timeAvailability({data}) {
  try {
    const res = yield call(timeAvailabilityAPI, data);
    console.log('From Saga', data);
    yield put(setTimeAvailabilitySuccess(res));
    Toast.show({
      text1: 'Availability added successfully!',
      type: 'success',
      position: 'bottom',
      bottomOffset: 40,
    });
  } catch (e) {
    console.log('ERROR', e);
    yield put(setTimeAvailabilityFailure());

    showMessage({
      message: 'Unable to load data, something went wrong.',
      type: 'danger',
      position: 'bo',
    });
  }
}

async function apiCreateProduct(data) {
  const URL = `${appConfig.backendServerURL}/api/v1/payment/create_product/`;
  const authToken = await AsyncStorage.getItem('authToken');
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

function* createProduct({data}) {
  try {
    console.log('dasda', data);
    const res = yield call(apiCreateProduct, data);
    console.log('resresresresres', res);

    // yield put(addToBagSuccess(data));

    // navigate.goBack();
    // Toast.show({
    //   text1: 'You’ve successfully added a service',
    //   text2: 'a service on your Task List!',
    //   type: 'success',
    //   position: 'bottom',
    //   bottomOffset: 40,
    // });
  } catch (e) {
    console.log(e);
    yield put(postTaskDetailFailure());
    showMessage({
      message: 'Oops! something went wrong, please try again.',
      type: 'danger',
    });
  }
}

export default all([
  takeLatest(types.postTaskDetail, postTaskDetails),
  takeLatest(types.setTimeAvailability, timeAvailability),
  takeLatest(types.getPendingBookingTaskDetail, getPendingBookingDetails),
  takeLatest(types.getApprovedBookingTaskDetail, getApprovedBookingDetails),
  takeLatest(types.createProduct, createProduct),
]);
