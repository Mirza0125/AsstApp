import {all, call, put, takeLatest} from 'redux-saga/effects';
import {showMessage} from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

// config
import {appConfig} from 'src/config/app';

// utils
import XHR from 'src/utils/XHR';

// types
import types from './types';

// actions
import {getBagServicesSuccess, getBagServicesFailure} from './actions';

async function BagServicesAPI() {
  const URL = `${appConfig.backendServerURL}/api/v1/add-to-bag/`;
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

function* BagServices() {
  try {
    const res = yield call(BagServicesAPI);
    const {data} = res;
    console.log('BagServices Res', data);
    yield put(getBagServicesSuccess(data));
  } catch (e) {
    yield put(getBagServicesFailure());

    showMessage({
      message: 'Unable to load data, something went wrong.',
      type: 'danger',
    });
  }
}

export default all([takeLatest(types.getBagServices, BagServices)]);
