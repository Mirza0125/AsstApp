import {combineReducers} from 'redux';

import login from '../pages/AuthScreens/Login/redux/reducer';
import services from '../pages/ManageServices/redux/reducer';
import postServices from '../pages/CreateService/redux/reducer';
import postDesigner from '../pages/AddDesigner/redux/reducer';
import designers from '../pages/ViewDesigner/redux/reducer';
import residents from '../pages/ManageResidents/redux/reducer';
import bookings from '../pages/ManageBookings/redux/reducer';
import profiles from '../pages/Profile/redux/reducer';
import calendar from '../pages/Bookings/redux/reducer';
import notifications from '../pages/Notifications/redux/reducer';
import forgotPassword from '../pages/AuthScreens/ForgotPassword/redux/reducer';
import changePassword from '../pages/AuthScreens/ChangePassword/redux/reducer';
import PubNubChat from '../pages/PubNubChat/redux/reducer';
import conciergeData from '../pages/MyProfile/redux/reducer';
import search from '../components/searchFeild/redux/reducer';

import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
const presistConfig = {
  key: 'login',
  storage,
};

export const combinedReducers = combineReducers({
  login: persistReducer(presistConfig, login),
  services,
  postServices,
  postDesigner,
  designers,
  residents,
  bookings,
  profiles,
  calendar,
  notifications,
  forgotPassword,
  changePassword,
  PubNubChat,
  conciergeData,
  search,
});
