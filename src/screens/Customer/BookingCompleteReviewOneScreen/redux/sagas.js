import {all, call, put, takeLatest} from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showMessage} from 'react-native-flash-message';
import * as NavigationService from 'src/navigator/NavigationService';

// config
import {appConfig} from 'src/config/app';

// utils
import XHR from 'src/utils/XHR';

// types
import {POST_REVIEW} from './types';

// actions
import {postReviewSuccess, postReviewFailure} from './actions';

async function postReviewAPI(data) {
  const URL = `${appConfig.backendServerURL}/api/v1/profile/`;
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

function* postReviews({data}) {
  try {
    const response = yield call(postReviewAPI, data);
    yield put(postReviewSuccess(response.data));
  } catch (e) {
    console.log('error', e);
    yield put(postReviewFailure());

    showMessage({
      message: 'Oops!, something went wrong.',
      type: 'danger',
    });
  }
}

export default all([takeLatest(POST_REVIEW, postReviews)]);
