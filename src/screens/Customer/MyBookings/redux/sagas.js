import {all, call, put, takeLatest} from 'redux-saga/effects';
import {showMessage} from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

// config
import {appConfig} from 'src/config/app';

// utils
import XHR from 'src/utils/XHR';

// types
import types from './types';
import {getBookingsFailure, getBookingsSuccess} from './actions';

async function getBookingAPI(data) {
  const URL = `${appConfig.backendServerURL}/api/v1/booking/`;
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

function* getBookings({data}) {
  try {
    const res = yield call(getBookingAPI, data);
    yield put(getBookingsSuccess(res.data));
  } catch (e) {
    console.log(e);
    yield put(getBookingsFailure());
    showMessage({
      message: 'Unable to complete getBookings request, please try again.',
      type: 'danger',
    });
  }
}

export default all([takeLatest(types.getBookings, getBookings)]);
