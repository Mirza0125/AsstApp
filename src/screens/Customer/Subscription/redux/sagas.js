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
  getSubscriptionSuccess,
  getSubscriptionFailure,
  createSubscriptionSuccess,
  createSubscriptionFailure,
} from './actions';
import {getHomeData} from '../../Home/redux/actions';

async function getSubscriptionAPI() {
  const URL = `${appConfig.backendServerURL}/api/v1/subscription/`;
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

function* getSubscriptions() {
  try {
    const res = yield call(getSubscriptionAPI);
    const {data} = res;
    yield put(getSubscriptionSuccess(data));
  } catch (e) {
    console.log(e);
    yield put(getSubscriptionFailure());

    showMessage({
      message: 'Unable to load data, something went wrong.',
      type: 'danger',
    });
  }
}

async function createSubscriptionAPI(data) {
  const URL = `${appConfig.backendServerURL}/api/v1/payment/create_subscription/`;
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

function* createSubscriptions({data}) {
  try {
    console.log('saga data', data);
    yield call(createSubscriptionAPI, data);
    yield put(createSubscriptionSuccess(data));

    showMessage({
      message: 'Subscription purchased successfully.',
      type: 'success',
    });

    yield put(getHomeData(data));
  } catch (e) {
    console.log(e);
    yield put(createSubscriptionFailure());

    showMessage({
      message: 'Unable to load data, something went wrong.',
      type: 'danger',
    });
  }
}

export default all([
  takeLatest(types.getSubscription, getSubscriptions),
  takeLatest(types.createSubscription, createSubscriptions),
]);
