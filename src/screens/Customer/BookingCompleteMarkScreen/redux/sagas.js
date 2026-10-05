import {all, call, put, takeLatest} from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
import {addChargeSuccess, addChargeFailure} from './actions';

async function chargeCardAPI(data) {
  const URL = `${appConfig.backendServerURL}/api/v1/add-charge/`;
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

function* chargeCard({data, notification}) {
  try {
    console.log('saga data', data);
    yield call(chargeCardAPI, data);
    yield put(addChargeSuccess(data));
    showMessage({
      message: 'Transaction completed.',
      type: 'success',
    });
    navigate('BookingCompleteScreen', {
      notification: notification,
      tip: data.tip,
    });
  } catch (e) {
    console.log('addCharge', e);
    yield put(addChargeFailure());
    showMessage({
      message: 'Unable to complete transaction please try again.',
      type: 'danger',
    });
  }
}

export default all([takeLatest(types.addCharge, chargeCard)]);
