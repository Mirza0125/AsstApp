import {all, call, put, takeLatest} from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showMessage} from 'react-native-flash-message';

// navigation service
import {navigate} from 'src/navigator/NavigationService';

/// config
import {appConfig} from 'src/config/app';

// utils
import XHR from 'src/utils/XHR';
// types
import types from './types';

// actions
import {
  getEmployeeHomeDataSuccess,
  getEmployeeHomeDataFailure,
  getAllServicesSuccess,
  getAllServicesFailure,
  addServiceSuccess,
  addServiceFailure,
  sendLocationSuccess,
  sendLocationFailure,
} from './actions';

async function getEmployeeHomeDataAPI() {
  const URL = `${appConfig.backendServerURL}/api/v1/employee-service/`;
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

function* getEmployeeHome() {
  try {
    const res = yield call(getEmployeeHomeDataAPI);
    const {data} = res;
    console.log('Saga Data', data);
    yield put(getEmployeeHomeDataSuccess(data));
  } catch (e) {
    console.log('Error', e);
    yield put(getEmployeeHomeDataFailure());

    showMessage({
      message: 'Unable to load data, something went wrong.',
      type: 'danger',
    });
  }
}

async function allServicesAPI() {
  const URL = `${appConfig.backendServerURL}/api/v1/service/`;
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

function* allServices() {
  try {
    const res = yield call(allServicesAPI);
    const {data} = res;
    yield put(getAllServicesSuccess(data));
  } catch (e) {
    yield put(getAllServicesFailure());

    showMessage({
      message: 'Something went wrong.',
      type: 'danger',
    });
  }
}

async function addServiceAPI(data) {
  const URL = `${appConfig.backendServerURL}/api/v1/employee-category/`;
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

function* addService({data}) {
  console.log('saga data', data);
  try {
    const res = yield call(addServiceAPI, data);
    yield put(addServiceSuccess(data));
    showMessage({
      message: 'Service added successfully.',
      type: 'success',
    });
  } catch (e) {
    console.log(e);
    yield put(addServiceFailure());
    showMessage({
      message: 'Unable to add service, please try again.',
      type: 'danger',
    });
  }
}

async function sendLocationAPI(data) {
  const URL = `${appConfig.backendServerURL}/api/v1/live-tracking/`;
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

function* sendLocation({item}) {
  try {
    const res = yield call(sendLocationAPI, item);
    console.log('res select service', res);
    const {data} = res;
    yield put(sendLocationSuccess(data));
  } catch (e) {
    yield put(sendLocationFailure());

    showMessage({
      message: 'Something went wrong.',
      type: 'danger',
    });
  }
}

export default all([
  takeLatest(types.getEmployeeHomeData, getEmployeeHome),
  takeLatest(types.getAllServices, allServices),
  takeLatest(types.addService, addService),
  takeLatest(types.sendLocation, sendLocation),
]);
