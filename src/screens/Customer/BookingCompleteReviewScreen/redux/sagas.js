import {all, call, put, takeLatest} from 'redux-saga/effects';
import {showMessage} from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
// config
import {appConfig} from 'src/config/app';

// utils
import XHR from 'src/utils/XHR';

// types
import types from './types';

//navigation service
import {navigate} from '../../../../navigator/NavigationService';

// actions
import {postReviewSuccess, postReviewFailure} from './actions';

async function ReviewAPI(data) {
  const URL = `${appConfig.backendServerURL}/api/v1/employee-review/`;
  const authToken = await AsyncStorage.getItem('authToken');
  console.log(URL);
  const options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Token ' + authToken,
    },
    method: 'POST',
    data,
  };

  return XHR(URL, options);
}

function* Review({data}) {
  try {
    const res = yield call(ReviewAPI, data);
    console.log('Rew>>>>', res);
    yield put(postReviewSuccess(data));
    navigate('Home');
    Toast.show({
      text1: 'Thank you',
      text2: 'for your feedback!',
      type: 'success',
      position: 'bottom',
      bottomOffset: 40,
    });
  } catch (e) {
    console.log(e);
    yield put(postReviewFailure());
    showMessage({
      message: 'Unable to complete Review request, please try again.',
      type: 'danger',
    });
  }
}

export default all([takeLatest(types.postReview, Review)]);
