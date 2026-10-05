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
import {getCardDataSuccess, getCardDataFailure} from './actions';

async function getCardDataAPI() {
  // const URL = `${appConfig.backendServerURL}/api/v1/payment/get_card/`;
  const URL = `${appConfig.backendServerURL}/api/v1/payment/get_all_cards/`;
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

function* getCardsData() {
  try {
    const res = yield call(getCardDataAPI);
    const {data} = res;
    yield put(getCardDataSuccess(data));
    console.log('cardDetail Res, In PaymentMTHDSc>>', res);
  } catch (e) {
    console.log(e);
    yield put(getCardDataFailure());

    showMessage({
      message: 'Unable to load data, something went wrong.',
      type: 'danger',
    });
  }
}

export default all([takeLatest(types.getCardData, getCardsData)]);
