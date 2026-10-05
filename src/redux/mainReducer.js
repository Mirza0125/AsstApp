import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

// REDUCERS

//Common
import notifications from '../redux/reducer';
import login from '../screens/Common/Login/redux/reducer';
import register from '../screens/Common/Register/redux/reducer';
import onBoardData from '../screens/Common/OnBoard/redux/reducer';
import unreadCount from '../screens/Common/ChatRoom/redux/reducer';
import newPassword from '../screens/Common/NewPassword/redux/reducer';
import changePassword from '../screens/Common/ChangePassword/redux/reducer';
import forgotPassword from '../screens/Common/ForgotPassword/redux/reducer';
import notificationsData from '../screens/Common/Notifications/redux/reducer';
import calendarEvents from '../screens/Common/CalendarScreen/redux/reducer';

//Employee
import Tasks from '../screens/Employee/Task/redux/reducer';
import employeeHome from '../screens/Employee/Home/redux/reducer';
import profileData from '../screens/Employee/Profile/redux/reducer';
//Customer
import home from '../screens/Customer/Home/redux/reducer';
import bagServices from '../screens/Customer/MyBag/redux/reducer';
import bookingDetail from '../screens/Customer/Task/redux/reducer';
import location from '../screens/Customer/TaskDetail/redux/reducer';
import booking from '../screens/Customer/BookingForm/redux/reducer';
import profile from '../screens/Customer/HouseCleaning/redux/reducer';
import customerProfile from '../screens/Customer/Profile/redux/reducer';
import card from '../screens/Customer/AddCreditCardScreen/redux/reducer';
import subscription from '../screens/Customer/Subscription/redux/reducer';
import pastOrders from '../screens/Customer/PastOrdersScreen/redux/reducer';
import employeeService from '../screens/Customer/ServiceProfile/redux/reducer';
import cardDetail from '../screens/Customer/PaymentMethodScreen/redux/reducer';
import review from '../screens/Customer/BookingCompleteReviewScreen/redux/reducer';
import transactionInfo from '../screens/Customer/BookingCompleteMarkScreen/redux/reducer';
import createBooking from '../screens/Customer/CreateBooking/redux/reducer';
import getBookings from '../screens/Customer/MyBookings/redux/reducer';
import events from '../screens/Customer/EventsList/redux/reducer';

const appPersistConfig = {
  key: 'login',
  storage: AsyncStorage,
  timeout: null,
};

const popOverPersistConfig = {
  key: 'home',
  storage: AsyncStorage,
  timeout: null,
};

const bagServicesPersistConfig = {
  key: 'bagServices',
  storage: AsyncStorage,
  timeout: null,
};

const cardDataPersistConfig = {
  key: 'card',
  storage: AsyncStorage,
  timeout: null,
};

const profileDataPersistConfig = {
  key: 'profileData',
  storage: AsyncStorage,
  timeout: null,
};

export default {
  Tasks,
  review,
  booking,
  profile,
  location,
  register,
  cardDetail,
  pastOrders,
  onBoardData,
  newPassword,
  employeeHome,
  subscription,
  notifications,
  bookingDetail,
  changePassword,
  forgotPassword,
  customerProfile,
  transactionInfo,
  employeeService,
  notificationsData,
  createBooking,
  getBookings,
  calendarEvents,
  events,
  login: persistReducer(appPersistConfig, login),
  home: persistReducer(popOverPersistConfig, home),
  card: persistReducer(cardDataPersistConfig, card),
  unreadCount, //: persistReducer(messsagePersistConfig, Message),
  bagServices: persistReducer(bagServicesPersistConfig, bagServices),
  profileData: persistReducer(profileDataPersistConfig, profileData),
};
