import React from 'react';
import {connect} from 'react-redux';
import {useSelector} from 'react-redux';
import {Platform, View, Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import Svg from 'react-native-svg';
// import HomeIcon from '../assets/images/icon/Home.svg';
// import Homedark from '../assets/images/icon/Homedark.svg';
// import TaskIcon from '../assets/images/icon/Task.svg';
// import Taskdark from '../assets/images/icon/Taskdark.svg';
// import Noti from '../assets/images/icon/Noti.svg';
// import Notidark from '../assets/images/icon/Notidark.svg';
// import Chat from '../assets/images/icon/Chat.svg';
// import User from '../assets/images/icon/User.svg';
// import Userdark from '../assets/images/icon/Userdark.svg';
// import Chatdark from '../assets/images/icon/Chatdark.svg';
// screens
import {
  Home,
  Task,
  MyBag,
  Profile,
  Services,
  TaskDetail,
  BookingForm,
  TaskRebook,
  Subscription,
  HouseCleaning,
  ServiceProfile,
  PastOrdersScreen,
  PendingTaskScreen,
  AddCreditCardScreen,
  BookingDetailScreen,
  PaymentMethodScreen,
  PaymentDetailScreen,
  BookingCompleteScreen,
  ServiceProfileCheckout,
  TrackOrderDetailScreen,
  SuccessfullyBookedScreen,
  BookingCompleteMarkScreen,
  BookingCompleteReviewScreen,
  BookingCompleteReviewOneScreen,
  PriceScreen,
  MyBookings,
  BookingDetails,
  EventsList,
  EventDetails,
  CreateBooking,
  AvailableBookingSlots,
  Help,
} from 'src/screens/Customer';

import {
  OnBoard,
  ChatRoom,
  Messages,
  Notifications,
  ChangePassword,
  TermsAndCondition,
  PrivacyPolicy,
  CalendarScreen,
} from 'src/screens/Common';

import {BadgeIcon} from 'src/components';

// theme
import {Images, Colors} from 'src/theme';
const Tab = createBottomTabNavigator();

const customerHomeStack = createStackNavigator();
const CustomerHomeStackScreen = () => {
  return (
    <customerHomeStack.Navigator screenOptions={{headerShown: false}}>
      <customerHomeStack.Screen name="Home" component={Home} />
      <customerHomeStack.Screen
        name="Notifications"
        component={Notifications}
      />
      <customerHomeStack.Screen name="Services" component={Services} />
      <customerHomeStack.Screen name="MyBookings" component={MyBookings} />
      <customerHomeStack.Screen
        name="BookingDetails"
        component={BookingDetails}
      />
      <customerHomeStack.Screen name="EventsList" component={EventsList} />
      <customerHomeStack.Screen name="EventDetails" component={EventDetails} />
      <customerHomeStack.Screen
        name="CreateBooking"
        component={CreateBooking}
      />
      <customerHomeStack.Screen
        name="AvailableBookingSlots"
        component={AvailableBookingSlots}
      />

      <customerHomeStack.Screen name="Subscription" component={Subscription} />
      <customerHomeStack.Screen
        name="CalendarScreen"
        component={CalendarScreen}
      />
    </customerHomeStack.Navigator>
  );
};

const BottomNavigator = () => {
  const unreadMessageCount = useSelector(
    (state) => state.unreadCount.unreadCount,
  );

  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        showLabel: false,
        activeTintColor: '#FD1B1B',
        inactiveTintColor: Colors.black,
        labelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
          // marginTop: Platform.OS === 'ios' ? -5 : -20,
        },
        style: {
          height: 80,
          elevation: 0,
          backgroundColor: Colors.white,
          // paddingBottom: Platform.OS === 'ios' ? 25 : 15,
        },
      }}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          let imageName;

          // if (route.name === 'Home') {
          //   imageName = !focused ? <HomeIcon /> : <Homedark />;
          // } else if (route.name === 'Task') {
          //   imageName = !focused ? <TaskIcon /> : <Taskdark />;
          // } else if (route.name === 'Chat Room') {
          //   imageName = !focused ? <Chat /> : <Chatdark />;
          // } else if (route.name === 'Notifications') {
          //   imageName = !focused ? <Noti /> : <Notidark />;
          // } else if (route.name === 'Profile') {
          //   imageName = !focused ? <User /> : <Userdark />;
          // }
          // You can return any component that you like here!
          if (route.name === 'Home') {
            imageName = !focused ? 'Home' : 'Homedark';
          } else if (route.name === 'Task') {
            imageName = !focused ? 'Event' : 'Eventdark';
          } else if (route.name === 'Chat Room') {
            imageName = !focused ? 'Chat' : 'Chatdark';
          } else if (route.name === 'Notifications') {
            imageName = !focused ? 'Menu' : 'Menudark';
          } else if (route.name === 'Profile') {
            imageName = !focused ? 'User' : 'Userdark';
          }

          return (
            <View>
              {unreadMessageCount && route.name === 'Chat Room' ? (
                <View style={{position: 'absolute', top: 3}}>
                  <BadgeIcon />
                </View>
              ) : null}

              <Image
                source={Images[imageName]}
                style={{height: 26, resizeMode: 'contain'}}
              />
              {/* <View
                style={{
                  width: 30,
                  height: 30,
                  // left: 4.5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Svg>{imageName}</Svg>
              </View> */}
            </View>
          );
        },
      })}>
      <Tab.Screen name="Home" component={CustomerHomeStackScreen} />
      <Tab.Screen name="Task" component={Services} />
      <Tab.Screen name="Chat Room" component={ChatRoom} />
      {/* <Tab.Screen name="Notifications" component={Notifications} /> */}
      <Tab.Screen
        name="BookingCompleteScreen"
        component={BookingCompleteScreen}
        options={{
          tabBarButton: () => null,
          //tabBarVisible: false,
        }}
      />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

const customerStack = createStackNavigator();

const CustomerStackScreen = () => (
  <customerStack.Navigator
    screenOptions={{headerShown: false}}
    initialRouteName="BottomStack">
    <customerStack.Screen name="OnBoard" component={OnBoard} />
    <customerStack.Screen name="Services" component={Services} />
    <customerStack.Screen name="ChatRoom" component={ChatRoom} />
    <customerStack.Screen name="Messages" component={Messages} />
    {/* <customerStack.Screen name="Notifications" component={Notifications} /> */}
    <customerStack.Screen name="BottomStack" component={BottomNavigator} />
    <customerStack.Screen name="Subscription" component={Subscription} />
    <customerStack.Screen name="HouseCleaning" component={HouseCleaning} />
    <customerStack.Screen name="ServiceProfile" component={ServiceProfile} />
    <customerStack.Screen name="ChangePassword" component={ChangePassword} />
    <customerStack.Screen name="BookingForm" component={BookingForm} />
    <customerStack.Screen
      name="PastOrdersScreen"
      component={PastOrdersScreen}
    />

    <customerStack.Screen
      name="BookingDetailScreen"
      component={BookingDetailScreen}
    />
    <customerStack.Screen
      name="PaymentDetailScreen"
      component={PaymentDetailScreen}
    />
    <customerStack.Screen
      name="PaymentMethodScreen"
      component={PaymentMethodScreen}
    />
    <customerStack.Screen
      name="AddCreditCardScreen"
      component={AddCreditCardScreen}
    />
    <customerStack.Screen name="Profile" component={Profile} />
    <customerStack.Screen name="Help" component={Help} />
    <customerStack.Screen
      name="TermsAndCondition"
      component={TermsAndCondition}
    />
    <customerStack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />

    <customerStack.Screen
      name="TrackOrderDetailScreen"
      component={TrackOrderDetailScreen}
    />
    <customerStack.Screen
      name="SuccessfullyBookedScreen"
      component={SuccessfullyBookedScreen}
    />
    <customerStack.Screen
      name="BookingCompleteMarkScreen"
      component={BookingCompleteMarkScreen}
    />
    <customerStack.Screen
      name="BookingCompleteReviewScreen"
      component={BookingCompleteReviewScreen}
    />
    <customerStack.Screen
      name="BookingCompleteReviewOneScreen"
      component={BookingCompleteReviewOneScreen}
    />
    <customerStack.Screen name="PriceScreen" component={PriceScreen} />

    <customerStack.Screen
      name="PendingTaskScreen"
      component={PendingTaskScreen}
    />
    <customerStack.Screen name="TaskDetail" component={TaskDetail} />
    <customerStack.Screen name="TaskRebook" component={TaskRebook} />
    <customerStack.Screen
      name="ServiceProfileCheckout"
      component={ServiceProfileCheckout}
    />
    <customerStack.Screen name="MyBag" component={MyBag} />
  </customerStack.Navigator>
);

const mapStateToProps = (state) => ({
  user: state.login.user,
  unreadCount: state.unreadCount.unreadCount,
});

const mapDispatchToProps = (dispatch) => ({
  //getMessage: (newMessage) => dispatch(getMessage(newMessage)),
});

export default connect(mapStateToProps, null)(CustomerStackScreen);
