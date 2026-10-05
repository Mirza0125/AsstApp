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
  getEmployessByServiceIdSuccess,
  getEmployessByServiceIdFailure,
  getAvailableSlotsByEmployeeSuccess,
  getAvailableSlotsByEmployeeFailure,
  getAvailableSlots,
} from './actions';

async function getEmployessByServiceIdAPI(data) {
  const URL = `${appConfig.backendServerURL}/api/v1/employee-category/${data}/service/`;
  const authToken = await AsyncStorage.getItem('authToken');
  console.log(URL);
  const options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Token ' + authToken,
    },
    method: 'GET',
    data,
  };

  return XHR(URL, options);
}

function* getEmployessByServiceId({data}) {
  try {
    const res = yield call(getEmployessByServiceIdAPI, data);
    yield put(getEmployessByServiceIdSuccess(res.data));

    const slots = yield put(getAvailableSlots(res.data[0].employee));
    yield put(getAvailableSlotsByEmployeeSuccess(slots.data));
  } catch (e) {
    console.log(e);
    yield put(getEmployessByServiceIdFailure());
    showMessage({
      message: 'Unable to complete employee service request, please try again.',
      type: 'danger',
    });
  }
}

async function getAvailableSlotsByEmployeeAPI(data) {
  const URL = `${
    appConfig.backendServerURL
  }/api/v1/available-time-slots/?service_id=${1}`;
  const authToken = await AsyncStorage.getItem('authToken');
  console.log(URL);
  const options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Token ' + authToken,
    },
    method: 'GET',
    data,
  };

  return XHR(URL, options);
}

function* getAvailableSlotsByEmployee({data}) {
  console.log(' getAvailableSlotsByEmployee', data);
  try {
    const res = yield call(getAvailableSlotsByEmployeeAPI, data);
    yield put(getAvailableSlotsByEmployeeSuccess(res.data));
  } catch (e) {
    console.log(e);
    yield put(getAvailableSlotsByEmployeeFailure());
    showMessage({
      message: 'Unable to complete employee service request, please try again.',
      type: 'danger',
    });
  }
}

export default all([
  takeLatest(types.getEmployessByServiceId, getEmployessByServiceId),
  takeLatest(types.getAvailableSlotsByEmployee, getAvailableSlotsByEmployee),
]);
