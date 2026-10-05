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
import {getOnBoardDataSuccess, getOnBoardDataFailure} from './actions';

async function getOnBoardDataAPI() {
  const URL = `${appConfig.backendServerURL}/api/v1/on-board/`;
  const authToken = await AsyncStorage.getItem('authToken');

  const options = {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  };
  return XHR(URL, options);
}

function* getOnBoardData() {
  try {
    const res = yield call(getOnBoardDataAPI);
    const {data} = res;
    yield put(getOnBoardDataSuccess(data));
  } catch (e) {
    console.log('Error', e);
    yield put(getOnBoardDataFailure());

    showMessage({
      message: 'Unable to load data, something went wrong.',
      type: 'danger',
    });
  }
}

export default all([takeLatest(types.getOnBoardData, getOnBoardData)]);
