import {all, call, put, takeLatest} from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
// navigation service
import {navigate, goBack} from 'src/navigator/NavigationService';

import {showMessage} from 'react-native-flash-message';

// config
import {appConfig} from 'src/config/app';

// utils
import XHR from 'src/utils/XHR';

// types
import types from './types';

// actions
import {
  postCardDataSuccess,
  postCardDataFailure,
  deleteCardDataSuccess,
  deleteCardDataFailure,
  setDefaultCardDataSuccess,
  setDefaultCardDataFailure,
} from './actions';

async function cardDataAPI(data) {
  const URL = `${appConfig.backendServerURL}/api/v1/add-payment-method/`;
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

function* cardData({data, manageCard}) {
  try {
    console.log('cardAddAPI', data);
    yield call(cardDataAPI, data);
    yield put(postCardDataSuccess(data));
    showMessage({
      message: 'Card added successfully.',
      type: 'success',
    });
    if (manageCard) {
      goBack();
    } else {
      navigate('PaymentDetailScreen');
    }
  } catch (e) {
    console.log('cardAddAPI', e);
    yield put(postCardDataFailure());
    showMessage({
      message: 'Unable to register, please try again.',
      type: 'danger',
    });
  }
}

async function deleteCardDataAPI(data) {
  const URL = `${appConfig.backendServerURL}/api/v1/payment/delete_card/`;
  const authToken = await AsyncStorage.getItem('authToken');
  const options = {
    headers: {
      Authorization: 'Token ' + authToken,
      'Content-Type': 'application/json',
    },
    method: 'DELETE',
    data,
  };

  return XHR(URL, options);
}

function* deleteCardData({data}) {
  try {
    console.log('deleteCardDataAPI', data);
    yield call(deleteCardDataAPI, data);
    yield put(deleteCardDataSuccess(data));
    showMessage({
      message: 'Card deleted!.',
      type: 'success',
    });
  } catch (e) {
    console.log('deleteCardDataAPI', e);
    yield put(deleteCardDataFailure());
    showMessage({
      message: 'Oops something went wrong, please try again.',
      type: 'danger',
    });
  }
}

async function defaultCardDataAPI(data) {
  const URL = `${appConfig.backendServerURL}/api/v1/payment/set_card_default/`;
  console.log('URL', URL);
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

function* defaultCardData({data}) {
  try {
    console.log('defaultCardDataAPI', data);
    yield call(defaultCardDataAPI, data);
    yield put(setDefaultCardDataSuccess(data));
    showMessage({
      message: 'Success!',
      type: 'success',
    });
  } catch (e) {
    console.log('defaultCardDataAPI', e);
    yield put(setDefaultCardDataFailure());
    showMessage({
      message: 'Oops something went wrong, please try again.',
      type: 'danger',
    });
  }
}

export default all([
  takeLatest(types.postCardData, cardData),
  takeLatest(types.deleteCardData, deleteCardData),
  takeLatest(types.setDefaultCardData, defaultCardData),
]);
