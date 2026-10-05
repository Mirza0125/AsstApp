import {all, call, put, takeLatest} from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showMessage} from 'react-native-flash-message';
import * as NavigationService from 'src/navigator/NavigationService';

// config
import {appConfig} from 'src/config/app';

// utils
import XHR from 'src/utils/XHR';

// types
import {
  GET_CUSTOMER_PHOTOS,
  GET_CUSTOMER_PROFILE,
  UPDATE_CUSTOMER_PROFILE,
  UPDATE_CUSTOMER_PROFILE_PIC,
  GET_QUESTION,
} from './types';

// actions
import {
  getCustomerProfileSuccess,
  getCustomerProfileFailure,
  updateProfileSuccess,
  updateProfileFailure,
  uploadProfilePicSuccess,
  uploadProfilePicFailure,
  getCustomerPhotosSuccess,
  getCustomerPhotosFailure,
  getQuestionSuccess,
  getQuestionFailure,
} from './actions';

async function getQuestionsDataAPI() {
  const URL = `${appConfig.backendServerURL}/api/v1/question/`;
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

function* getQuestionsData() {
  try {
    const response = yield call(getQuestionsDataAPI);
    yield put(getQuestionSuccess(response.data));
  } catch (e) {
    console.log('error', e);
    yield put(getQuestionFailure());

    showMessage({
      message: 'Unable to load data, something went wrong.',
      type: 'danger',
    });
  }
}

async function getCustomerProfileDataAPI() {
  const URL = `${appConfig.backendServerURL}/api/v1/customer-profile/`;
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

function* getCustomerProfileData() {
  try {
    const response = yield call(getCustomerProfileDataAPI);
    yield put(getCustomerProfileSuccess(response.data));
  } catch (e) {
    console.log('error', e);
    yield put(getCustomerProfileFailure());

    showMessage({
      message: 'Unable to load data, something went wrong.',
      type: 'danger',
    });
  }
}

async function updateProfileDataAPI(data, id) {
  const URL = `${appConfig.backendServerURL}/api/v1/customer-profile/${id}/`;
  const authToken = await AsyncStorage.getItem('authToken');
  console.log('URL', URL);

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

function* updateProfileData({data, user}) {
  console.log('saga profileData', user);

  try {
    yield call(updateProfileDataAPI, data, user.id);
    yield put(updateProfileSuccess(data));
    showMessage({
      message: 'Profile updated successfully.',
      type: 'success',
    });
  } catch (e) {
    console.log('error', e);
    yield put(updateProfileFailure());
    showMessage({
      message: 'Unable to load data, something went wrong.',
      type: 'danger',
    });
  }
}

async function updateProfilePicAPI(data, id) {
  const URL = `${appConfig.backendServerURL}/api/v1/customer-profile/${id}/set_profile_picture/`;
  const authToken = await AsyncStorage.getItem('authToken');
  console.log('PHOTO DATA IN SAGA', data);

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

function* updateProfilePic({data, user}) {
  try {
    const response = yield call(updateProfilePicAPI, data, user.id);
    console.log('saga updateProfilePic', user);
    console.log('RESPONSE', response);
    yield put(uploadProfilePicSuccess(data));
    showMessage({
      message: 'Uploaded successfully.',
      type: 'success',
    });
  } catch (e) {
    console.log('error', e);
    yield put(uploadProfilePicFailure());
    showMessage({
      message: 'Unable to update, something went wrong.',
      type: 'danger',
    });
  }
}

export default all([
  takeLatest(UPDATE_CUSTOMER_PROFILE, updateProfileData),
  takeLatest(UPDATE_CUSTOMER_PROFILE_PIC, updateProfilePic),
  takeLatest(GET_CUSTOMER_PROFILE, getCustomerProfileData),
  takeLatest(GET_QUESTION, getQuestionsData),
]);
