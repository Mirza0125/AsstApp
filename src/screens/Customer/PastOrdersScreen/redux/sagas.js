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
import {getPastOrdersSuccess, getPastOrdersFailure} from './actions';

async function getPastOrderAPI() {
  const URL = `${appConfig.backendServerURL}/api/v1/booking/?status=completed`;
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

function* getPastOrder() {
  try {
    const res = yield call(getPastOrderAPI);
    const {data} = res;
    yield put(getPastOrdersSuccess(data));
  } catch (e) {
    yield put(getPastOrdersFailure());

    showMessage({
      message: 'Unable to load data, something went wrong.',
      type: 'danger',
    });
  }
}

export default all([takeLatest(types.getPastOrders, getPastOrder)]);
