import {all, call, put, takeLatest} from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showMessage} from 'react-native-flash-message';

/// config
import {appConfig} from 'src/config/app';

// navigation service
import {navigate} from 'src/navigator/NavigationService';

// utils
import XHR from 'src/utils/XHR';
// types
import types from './types';

// actions
import {
  getEmployeeReviewSuccess,
  getEmployeeReviewFailure,
  getEmployeePhotosSuccess,
  getEmployeePhotosFailure,
} from './actions';

async function getEmployeeReviewAPI(id) {
  const URL = `${appConfig.backendServerURL}/api/v1/employee-profile/${id}/review/`;
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

function* getEmployeeReviewData({id}) {
  try {
    const res = yield call(getEmployeeReviewAPI, id);
    const {data} = res;
    console.log('reviewData', data);
    yield put(getEmployeeReviewSuccess(data));
  } catch (e) {
    console.log('reviewError', e);
    yield put(getEmployeeReviewFailure());

    showMessage({
      message: 'Unable to load data, something went wrong.',
      type: 'danger',
    });
  }
}

async function getEmployeePhotosAPI(id) {
  const URL = `${appConfig.backendServerURL}/api/v1/employee-profile/${id}/photo/`;
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

function* getEmployeePhoto({profile}) {
  try {
    const res = yield call(getEmployeePhotosAPI, profile.id);
    const {data} = res;
    console.log('photoData', data);
    yield put(getEmployeePhotosSuccess(data));
  } catch (e) {
    console.log('photoError', e);
    yield put(getEmployeePhotosFailure());

    showMessage({
      message: 'Unable to load data, something went wrong.',
      type: 'danger',
    });
  }
}

export default all([
  takeLatest(types.getEmployeeReview, getEmployeeReviewData),
  takeLatest(types.getEmployeePhotos, getEmployeePhoto),
]);
