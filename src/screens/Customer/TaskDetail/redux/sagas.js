import {all, call, put, takeLatest} from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showMessage} from 'react-native-flash-message';

/// config
import {appConfig} from 'src/config/app';

// utils
import XHR from 'src/utils/XHR';
// types
import types from './types';

// actions
import {
  getEmployeeLocationSuccess,
  getEmployeeLocationFailure,
  getCategoryDetailSuccess,
  getCategoryDetailFailure,
} from './actions';

async function getLocationAPI(id) {
  const URL = `${appConfig.backendServerURL}/api/v1/employee-profile/${id}/emp_tracking/`;
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

function* getLocation({id}) {
  try {
    const res = yield call(getLocationAPI, id);
    const {data} = res;
    yield put(getEmployeeLocationSuccess(data));
  } catch (e) {
    yield put(getEmployeeLocationFailure());
    console.log('Error>>', e);

    showMessage({
      message: 'Something went wrong.',
      type: 'danger',
    });
  }
}

async function getCategoryDetailAPI(id) {
  const URL = `${appConfig.backendServerURL}/api/v1/booking/${id}/cate_detail/`;
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

function* getCategoryDetails({id}) {
  try {
    const res = yield call(getCategoryDetailAPI, id);
    const {data} = res;
    yield put(getCategoryDetailSuccess(data));
  } catch (e) {
    yield put(getCategoryDetailFailure());
    console.log('Error>>', e);

    showMessage({
      message: 'Something went wrong.',
      type: 'danger',
    });
  }
}

export default all([
  takeLatest(types.getEmployeeLocation, getLocation),
  takeLatest(types.getCategoryDetail, getCategoryDetails),
]);
