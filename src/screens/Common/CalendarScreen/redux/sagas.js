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
import {
  getCalendarEventsSuccess,
  getCalendarEventsfailure,
  addCalendarEventsSuccess,
  addCalendarEventsfailure,
} from './actions';

async function getCalendarEventsAPI(data) {
  const URL = `${appConfig.backendServerURL}/api/v1/calendar_events/?${data}`;
  const authToken = await AsyncStorage.getItem('authToken');

  const options = {
    headers: {
      Authorization: 'Token ' + authToken,
      'Content-Type': 'application/json',
    },
    method: 'GET',
    data,
  };

  return XHR(URL, options);
}

function* getCalendarEvents({data}) {
  try {
    const res = yield call(getCalendarEventsAPI, data);
    yield put(getCalendarEventsSuccess(res.data));
  } catch (e) {
    yield put(getCalendarEventsfailure(e));
  }
}

async function addCalendarEventsAPI(data) {
  const URL = `${appConfig.backendServerURL}/api/v1/calendar_events/`;
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

function* addCalendarEvents({data}) {
  try {
    const res = yield call(addCalendarEventsAPI, data);
    yield put(addCalendarEventsSuccess(res.data));
  } catch (e) {
    yield put(addCalendarEventsfailure(e));
  }
}

export default all([
  takeLatest(types.GET_CALENDAR_EVENTS, getCalendarEvents),
  takeLatest(types.ADD_CALENDAR_EVENTS, addCalendarEvents),
]);
