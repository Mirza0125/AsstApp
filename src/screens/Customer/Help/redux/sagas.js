import {all, call, put, takeLatest} from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showMessage} from 'react-native-flash-message';
import * as NavigationService from 'src/navigator/NavigationService';

// config
import {appConfig} from 'src/config/app';

// utils
import XHR from 'src/utils/XHR';

// types
import {
  GET_CUSTOMER_PHOTOS,
  GET_CUSTOMER_PROFILE,
  UPDATE_CUSTOMER_PROFILE,
  UPDATE_CUSTOMER_PROFILE_PIC,
  GET_QUESTION,
} from './types';

// actions
import //   updateProfileSuccess,
//   updateProfileFailure,
//   uploadProfilePicSuccess,
//   uploadProfilePicFailure,
'./actions';

// async function updateProfileDataAPI(data, id) {
//   const URL = `${appConfig.backendServerURL}/api/v1/customer-profile/${id}/`;
//   const authToken = await AsyncStorage.getItem('authToken');
//   console.log('URL', URL);

//   const options = {
//     headers: {
//       Authorization: 'Token ' + authToken,
//       'Content-Type': 'application/json',
//     },
//     method: 'PATCH',
//     data,
//   };

//   return XHR(URL, options);

// function* updateProfileData({data, user}) {
//   console.log('saga profileData', user);

//   try {
//     yield call(updateProfileDataAPI, data, user.id);
//     yield put(updateProfileSuccess(data));
//     showMessage({
//       message: 'Profile updated successfully.',
//       type: 'success',
//     });
//   } catch (e) {
//     console.log('error', e);
//     yield put(updateProfileFailure());
//     showMessage({
//       message: 'Unable to load data, something went wrong.',
//       type: 'danger',
//     });
//   }
// }

export default all([
  //   takeLatest(UPDATE_CUSTOMER_PROFILE, updateProfileData),
]);
