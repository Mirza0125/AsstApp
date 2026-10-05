import {all, call, put, takeLatest} from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showMessage} from 'react-native-flash-message';

// navigation service
import {navigate} from 'src/navigator/NavigationService';

/// config
import {appConfig} from 'src/config/app';

// utils
import XHR from 'src/utils/XHR';
// types
import types from './types';

// actions
import {
  getHomeDataSuccess,
  getHomeDataFailure,
  searchServicesSuccess,
  resetSearchServices,
  selectServiceSuccess,
  resetSelectService,
} from './actions';

async function getDashboardDataAPI() {
  const URL = `${appConfig.backendServerURL}/api/v1/service2/`;
  const authToken = await AsyncStorage.getItem('authToken');

  console.log('authToken ', authToken);
  const options = {
    headers: {
      Authorization: 'Token ' + authToken,
      'Content-Type': 'application/json',
    },
    method: 'GET',
  };
  return XHR(URL, options);
}

function* getHomeData() {
  try {
    const res = yield call(getDashboardDataAPI);
    console.log('authToken ', authToken);

    const {data} = res;
    yield put(getHomeDataSuccess(data));
  } catch (e) {
    yield put(getHomeDataFailure());

    showMessage({
      message: 'Unable to load data, something went wrong.',
      type: 'danger',
    });
  }
}

async function searchServicesAPI(query) {
  const URL = `${appConfig.backendServerURL}/api/v1/service/?name=${query}`;
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

function* searchService({query}) {
  try {
    const res = yield call(searchServicesAPI, query);
    const {data} = res;
    yield put(searchServicesSuccess(data));
  } catch (e) {
    yield put(resetSearchServices());

    showMessage({
      message: 'Something went wrong.',
      type: 'danger',
    });
  }
}

async function selectServicesAPI(id) {
  const URL = `${appConfig.backendServerURL}/api/v1/employee-profile/?service=${id}`;
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

function* selectServices({item}) {
  try {
    const res = yield call(selectServicesAPI, item.id);
    console.log('res select service', res);
    const {data} = res;
    yield put(selectServiceSuccess(data));
    navigate('HouseCleaning', {service: item});
  } catch (e) {
    yield put(resetSelectService());

    showMessage({
      message: 'Something went wrong.',
      type: 'danger',
    });
  }
}

export default all([
  takeLatest(types.getHomeData, getHomeData),
  takeLatest(types.searchServices, searchService),
  takeLatest(types.selectService, selectServices),
]);
