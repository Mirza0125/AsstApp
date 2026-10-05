import {all} from 'redux-saga/effects';

// SAGAS

//Common
import notifications from '../redux/sagas';
import login from '../screens/Common/Login/redux/sagas';
import register from '../screens/Common/Register/redux/sagas';
import onBoardData from '../screens/Common/OnBoard/redux/sagas';
import newPassword from '../screens/Common/NewPassword/redux/sagas';
import changePassword from '../screens/Common/ChangePassword/redux/sagas';
import forgotPassword from '../screens/Common/ForgotPassword/redux/sagas';
import notificationsData from '../screens/Common/Notifications/redux/sagas';
import calendarEvents from '../screens/Common/CalendarScreen/redux/sagas';

//Employee
import Tasks from '../screens/Employee/Task/redux/sagas';
import employeeHome from '../screens/Employee/Home/redux/sagas';
import profileData from '../screens/Employee/Profile/redux/sagas';
//Customer
import home from '../screens/Customer/Home/redux/sagas';
import bagServices from '../screens/Customer/MyBag/redux/sagas';
import bookingDetail from '../screens/Customer/Task/redux/sagas';
import location from '../screens/Customer/TaskDetail/redux/sagas';
import booking from '../screens/Customer/BookingForm/redux/sagas';
import profile from '../screens/Customer/HouseCleaning/redux/sagas';
import customerProfile from '../screens/Customer/Profile/redux/sagas';
import card from '../screens/Customer/AddCreditCardScreen/redux/sagas';
import subscription from '../screens/Customer/Subscription/redux/sagas';
import pastOrders from '../screens/Customer/PastOrdersScreen/redux/sagas';
import employeeService from '../screens/Customer/ServiceProfile/redux/sagas';
import cardDetail from '../screens/Customer/PaymentMethodScreen/redux/sagas';
import bookingData from '../screens/Customer/BookingDetailScreen/redux/sagas';
import review from '../screens/Customer/BookingCompleteReviewScreen/redux/sagas';
import transactionInfo from '../screens/Customer/BookingCompleteMarkScreen/redux/sagas';
import createBooking from '../screens/Customer/CreateBooking/redux/sagas';
import getBookings from '../screens/Customer/MyBookings/redux/sagas';
import events from '../screens/Customer/EventsList/redux/sagas';

export function* mainSaga() {
  yield all([
    home,
    card,
    login,
    Tasks,
    review,
    booking,
    profile,
    register,
    location,
    cardDetail,
    pastOrders,
    bagServices,
    profileData,
    newPassword,
    onBoardData,
    bookingData,
    employeeHome,
    subscription,
    notifications,
    bookingDetail,
    changePassword,
    forgotPassword,
    transactionInfo,
    employeeService,
    customerProfile,
    notificationsData,
    createBooking,
    getBookings,
    calendarEvents,
    events,
  ]);
}
