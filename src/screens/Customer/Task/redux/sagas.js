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
import {getBookingDetailSuccess, getBookingDetailFailure} from './actions';

async function getBookingDetailsAPI() {
  const URL = `${appConfig.backendServerURL}/api/v1/booking/?status=accepted`;
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

function* getBookingDetails() {
  try {
    const res = yield call(getBookingDetailsAPI);
    const {data} = res;
    console.log('booking r>>>>>>', res);
    yield put(getBookingDetailSuccess(data));
  } catch (e) {
    console.log('booking error', e);
    yield put(getBookingDetailFailure());

    showMessage({
      message: 'Unable to load data, something went wrong.',
      type: 'danger',
    });
  }
}

export default all([takeLatest(types.getBookingDetail, getBookingDetails)]);
