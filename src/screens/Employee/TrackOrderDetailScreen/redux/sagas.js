import {all, call, put, takeLatest} from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showMessage} from 'react-native-flash-message';

/// config
import {appConfig} from 'src/config/app';

// utils
import XHR from 'src/utils/XHR';
// types
import types from './types';

// actions
import {postTaskDetailSuccess, postTaskDetailFailure} from './actions';

async function postTaskDetailsAPI(data, id) {
  const URL = `${appConfig.backendServerURL}/api/v1/employee-booking/${id}/`;
  const authToken = await AsyncStorage.getItem('authToken');
  console.log('URL', URL);
  const options = {
    headers: {
      Authorization: 'Token ' + authToken,
      'Content-Type': 'application/json',
    },
    method: 'PATCH',
    data,
  };
  return XHR(URL, options);
}

function* postTaskDetails({data, id}) {
  try {
    yield call(postTaskDetailsAPI, data, id);
    yield put(postTaskDetailSuccess());
    yield put(getPendingBookingTaskDetail());
  } catch (e) {
    console.log('error', e);
    yield put(postTaskDetailFailure());

    showMessage({
      message: 'Unable to load data, something went wrong.',
      type: 'danger',
    });
  }
}

export default all([takeLatest(types.postTaskDetail, postTaskDetails)]);
