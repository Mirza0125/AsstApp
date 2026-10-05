import AddDesigner from './pages/AddDesigner';
import Login from './pages/AuthScreens/Login';
import Dashboard from './pages/Dashboard';

//icons
import homeDrawer from './assets/images/homeDrawer.svg';
import messagesDrawer from './assets/images/messagesDrawer.svg';
import settingDrawer from './assets/images/settingDrawer.svg';
import ChangePassword from './pages/AuthScreens/ChangePassword';
import ForgotPassword from './pages/AuthScreens/ForgotPassword';
import Calendar from './pages/Bookings';
import CreateService from './pages/CreateService';
import GroupChat from './pages/GroupChat';
import ManageBookings from './pages/ManageBookings';
import ManageResidents from './pages/ManageResidents';
import ManageServices from './pages/ManageServices';
import Messages from './pages/Messages';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';
import ViewDesigner from './pages/ViewDesigner';
import MyProfile from './pages/MyProfile';


export const routes = [
  // Auth Screen
  {
    component: Login,
    path: '/login',
    layout: '/auth',
    isShow: false,

  },
  {
    component: ForgotPassword,
    path: '/forgot-password',
    layout: '/auth',
    isShow: false,
  },
  {
    component: ChangePassword,
    path: '/change-password',
    layout: '/auth',
    isShow: false,
  },
  {
    component: Dashboard,
    path: '/home',
    layout: '/admin',
    isShow: "admin",
    name: "Home",
    icon: homeDrawer
  },
  {
    component: Messages,
    path: '/messages',
    layout: '/admin',
    isShow: "admin",
    name: "Messages",
    icon: messagesDrawer
  },
  {
    component: Messages,
    path: '/group_chat',
    layout: '/admin',
    isShow: "admin",
    name: "Group Chat",
    icon: messagesDrawer
  },
  {
    component: MyProfile,
    path: '/settings',
    layout: '/admin',
    isShow: "admin",
    name: "Settings",
    icon: settingDrawer
  },
  {
    component: AddDesigner,
    path: '/home-add-designer',
    layout: '/admin',
    isShow: "leftDashboard",
  },
  {
    component: ManageServices,
    path: '/home-manage-services',
    layout: '/admin',
    isShow: "leftDashboard",
  },
  {
    component: CreateService,
    path: '/home-create-service',
    layout: '/admin',
    isShow: "leftDashboard",
  },
  {
    component: Calendar,
    path: '/home-calendar',
    layout: '/admin',
    isShow: "leftDashboard",
  },
  {
    component: ViewDesigner,
    path: '/home-designers-list',
    layout: '/admin',
    isShow: "rightDashboard",
  },
  {
    component: ManageBookings,
    path: '/home-manage-bookings',
    layout: '/admin',
    isShow: "rightDashboard",
  },
  {
    component: ManageResidents,
    path: '/home-manage-residents',
    layout: '/admin',
    isShow: "rightDashboard",
  },
  {
    component: Profile,
    path: '/home-profile',
    layout: '/admin',
    isShow: false,
  },
  {
    component: Notifications,
    path: '/notifications',
    layout: '/admin',
    isShow: false,
  },
];