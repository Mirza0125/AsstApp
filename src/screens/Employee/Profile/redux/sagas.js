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
  GET_PROFILE,
  UPLOAD_PHOTO,
  UPDATE_PROFILE,
  UPDATE_PROFILE_PIC,
  GET_EMPLOYEE_PHOTOS,
} from './types';

// actions
import {
  getProfileSuccess,
  getProfileFailure,
  updateProfileSuccess,
  updateProfileFailure,
  uploadPhotoSuccess,
  uploadPhotoFailure,
  getEmployeePhotosSuccess,
  getEmployeePhotosFailure,
  uploadProfilePicSuccess,
  uploadProfilePicFailure,
} from './actions';

async function getProfileDataAPI() {
  const URL = `${appConfig.backendServerURL}/api/v1/profile/`;
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

function* getProfileData() {
  try {
    const response = yield call(getProfileDataAPI);
    yield put(getProfileSuccess(response.data));
  } catch (e) {
    //console.log('error', e);
    yield put(getProfileFailure());

    showMessage({
      message: 'Unable to load data, something went wrong.',
      type: 'danger',
    });
  }
}

async function updateProfileDataAPI(data, id) {
  const URL = `${appConfig.backendServerURL}/api/v1/profile/${id}/`;
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

async function uploadPhotosAPI(data) {
  const URL = `${appConfig.backendServerURL}/api/v1/employee-photo/`;
  const authToken = await AsyncStorage.getItem('authToken');
  console.log('PHOTO DATA IN SAGA', data);

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

function* uploadPhotos({data}) {
  try {
    const response = yield call(uploadPhotosAPI, data);
    console.log('RESPONSE', response);
    yield put(uploadPhotoSuccess(data));
    showMessage({
      message: 'Uploaded successfully.',
      type: 'success',
    });
  } catch (e) {
    console.log('error', e);
    yield put(uploadPhotoFailure());
    showMessage({
      message: 'Unable to upload, something went wrong.',
      type: 'danger',
    });
  }
}

async function getEmployeePhotosAPI() {
  const URL = `${appConfig.backendServerURL}/api/v1/employee-photo/`;
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

function* getEmployeePhoto() {
  try {
    const response = yield call(getEmployeePhotosAPI);
    yield put(getEmployeePhotosSuccess(response.data));
  } catch (e) {
    //console.log('error', e);
    yield put(getEmployeePhotosFailure());

    showMessage({
      message: 'Unable to load data, something went wrong.',
      type: 'danger',
    });
  }
}

async function updateProfilePicAPI(data, id) {
  const URL = `${appConfig.backendServerURL}/api/v1/profile/${id}/set_employee_profile_picture/`;
  const authToken = await AsyncStorage.getItem('authToken');
  console.log('PHOTO DATA IN SAGA', data);

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
  takeLatest(GET_PROFILE, getProfileData),
  takeLatest(UPDATE_PROFILE, updateProfileData),
  takeLatest(UPLOAD_PHOTO, uploadPhotos),
  takeLatest(GET_EMPLOYEE_PHOTOS, getEmployeePhoto),
  takeLatest(UPDATE_PROFILE_PIC, updateProfilePic),
]);
