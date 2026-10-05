import {all, call, put, takeLatest} from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setUserInfo, loginFailure, reset} from '../../Login/redux/actions';

// navigation service
import {navigate} from 'src/navigator/NavigationService';

import {showMessage} from 'react-native-flash-message';

// config
import {appConfig} from 'src/config/app';

// utils
import XHR from 'src/utils/XHR';

// types
import types from './types';

// actions
import {signUpSuccess, signUpFailure} from './actions';

function registerAPI(data) {
  console.log('register api data ', data);
  const URL = `${appConfig.backendServerURL}/api/v1/signup/`;
  const options = {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    data,
  };

  return XHR(URL, options);
}

function loginAPI(data) {
  const URL = `${appConfig.backendServerURL}/api/v1/login/`;
  console.log(URL);
  const options = {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    data,
  };

  return XHR(URL, options);
}

function* register({data}) {
  try {
    const registerRes = yield call(registerAPI, data);

    console.log('registerRes ', registerRes);
    yield put(signUpSuccess(data));
    const res = yield call(loginAPI, {
      email: data.email,
      password: data.password,
    });
    AsyncStorage.setItem('authToken', res.data.token || res.data.key);
    yield put(setUserInfo(res.data));
    navigate('customerStack');
  } catch (e) {
    const {response} = e;
    console.log('response', response.data.email);
    if (e.response) {
      console.log('e.response ', e);
      yield put(signUpFailure(response.data.email));
    } else {
      showMessage({
        message: 'Unable to register, please try again.',
        type: 'danger',
      });
    }
  }
}

async function registerDeviceInfoAPI(data) {
  const URL = `${appConfig.backendServerURL}/api/v1/user_fcm_device_add/`;
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

function* registerDeviceInfo({data}) {
  try {
    const response = yield call(registerDeviceInfoAPI, data);
  } catch (e) {
    console.log('Error in registerDeviceInfoAPI', e);
  }
}

export default all([
  takeLatest(types.register, register),
  takeLatest(types.register_mobile_device, registerDeviceInfo),
]);
