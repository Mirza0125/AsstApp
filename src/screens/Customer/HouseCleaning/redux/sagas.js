import {all, call, put, takeLatest} from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showMessage} from 'react-native-flash-message';

/// config
import {appConfig} from 'src/config/app';

// navigation service
import {navigate} from 'src/navigator/NavigationService';

// utils
import XHR from 'src/utils/XHR';
// types
import types from './types';

// actions
import {
  selectProfileSuccess,
  selectProfileFailure,
  filterServicesSuccess,
  filterServicesFailure,
} from './actions';

async function selectProfileAPI(id) {
  const URL = `${appConfig.backendServerURL}/api/v1/employee-profile/${id}/`;
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

function* selectProfiles({id}) {
  try {
    const res = yield call(selectProfileAPI, id);
    const {data} = res;
    yield put(selectProfileSuccess(data));
    navigate('ServiceProfile');
  } catch (e) {
    yield put(selectProfileFailure());

    showMessage({
      message: 'Unable to load data, something went wrong.',
      type: 'danger',
    });
  }
}

async function filterAPI(id, alphabetical, rating, repeated) {
  const URL = `${appConfig.backendServerURL}/api/v1/employee-profile/?service=${id}&alphabetical_sort=${alphabetical}&rating_sort=${rating}&repeated_customer=${repeated}`;
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

function* filter({id, alphabetical, rating, repeated}) {
  try {
    const res = yield call(filterAPI, id, alphabetical, rating, repeated);
    const {data} = res;
    yield put(filterServicesSuccess(data));
  } catch (e) {
    yield put(filterServicesFailure());

    showMessage({
      message: 'Oops! Something went wrong please try again.',
      type: 'danger',
    });
  }
}

export default all([
  takeLatest(types.selectProfile, selectProfiles),
  takeLatest(types.filterServices, filter),
]);
