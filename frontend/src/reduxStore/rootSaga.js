import {all} from 'redux-saga/effects';
import login from '../pages/AuthScreens/Login/redux/saga';
import ManageServices from '../pages/ManageServices/redux/saga';
import postServices from '../pages/CreateService/redux/saga';
import postDesigner from '../pages/AddDesigner/redux/saga';
import designers from '../pages/ViewDesigner/redux/saga';
import residents from '../pages/ManageResidents/redux/saga';
import bookings from '../pages/ManageBookings/redux/saga';
import profiles from '../pages/Profile/redux/saga';
import calendar from '../pages/Bookings/redux/saga';
import notifications from '../pages/Notifications/redux/saga';
import forgotPassword from '../pages/AuthScreens/ForgotPassword/redux/saga';
import changePassword from '../pages/AuthScreens/ChangePassword/redux/saga';
import PubNubChat from '../pages/PubNubChat/redux/saga';
import conciergeData from '../pages/MyProfile/redux/saga';
import search from '../components/searchFeild/redux/saga';

export function* rootSaga() {
  yield all([
    login,
    ManageServices,
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
  ]);
}
