import {all, call, put, takeLatest} from 'redux-saga/effects';
import {appConfig} from 'src/config/app';
import {showMessageSuccess} from 'src/utils/alerts';
import {navigate} from 'src/navigator/NavigationService';
import AsyncStorage from '@react-native-async-storage/async-storage';

// utils
import XHR from 'src/utils/XHR';

// types
import types from './types';

// actions
import {getEventsSuccess, getEventsfailure} from './actions';

async function getEventsAPI() {
  const URL = `${appConfig.backendServerURL}/api/v1/events/?lat=29.354349&lon=71.691063`;
  const authToken = await AsyncStorage.getItem('authToken');

  console.log('URL', URL);
  const options = {
    headers: {
      Authorization: 'Token ' + authToken,
      'Content-Type': 'application/json',
    },
    method: 'GET',
  };

  return XHR(URL, options);
}

function* getEvents() {
  try {
    const res = yield call(getEventsAPI);
    yield put(getEventsSuccess(res.data));
  } catch (e) {
    yield put(getEventsfailure(e));
  }
}

export default all([takeLatest(types.GET_EVENTS, getEvents)]);
