import React from 'react';
import {useSelector} from 'react-redux';
import {Image, Platform, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Svg from 'react-native-svg';
import HomeIcon from '../assets/images/icon/Home.svg';
import Homedark from '../assets/images/icon/Homedark.svg';
import TaskIcon from '../assets/images/icon/Task.svg';
import Taskdark from '../assets/images/icon/Taskdark.svg';
import Noti from '../assets/images/icon/Noti.svg';
import Notidark from '../assets/images/icon/Notidark.svg';
import Chat from '../assets/images/icon/Chat.svg';
import User from '../assets/images/icon/User.svg';
import Userdark from '../assets/images/icon/Userdark.svg';
import Chatdark from '../assets/images/icon/Chatdark.svg';
// screens
import {
  Home,
  Task,
  HomeV2,
  Profile,
  AddServiceScreen,
  TrackOrderDetailScreen,
} from 'src/screens/Employee';

import {
  ChatRoom,
  Messages,
  Notifications,
  ChangePassword,
} from 'src/screens/Common';

// theme
import {Images, Colors} from 'src/theme';

const Tab = createBottomTabNavigator();

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

          if (route.name === 'Home') {
            imageName = !focused ? <HomeIcon /> : <Homedark />;
          } else if (route.name === 'Task') {
            imageName = !focused ? <TaskIcon /> : <Taskdark />;
          } else if (route.name === 'Chat Room') {
            imageName = !focused ? <Chat /> : <Chatdark />;
          } else if (route.name === 'Notifications') {
            imageName = !focused ? <Noti /> : <Notidark />;
          } else if (route.name === 'Profile') {
            imageName = !focused ? <User /> : <Userdark />;
          }
          // You can return any component that you like here!
          // if (route.name === 'Home') {
          //   imageName = !focused ? 'home' : 'home';
          // } else if (route.name === 'Task') {
          //   imageName = !focused ? 'task' : 'task';
          // } else if (route.name === 'Chat Room') {
          //   imageName = !focused ? 'chat' : 'chat';
          // } else if (route.name === 'Notifications') {
          //   imageName = !focused ? 'noti' : 'noti';
          // } else if (route.name === 'Profile') {
          //   imageName = !focused ? 'user' : 'user';
          // }

          return (
            <View>
              {unreadMessageCount && route.name === 'Chat Room' ? (
                <View style={{position: 'absolute', top: 6}}>
                  <BadgeIcon />
                </View>
              ) : null}

              {/* <Image
                source={Images[imageName]}
                style={{width: 18, height: 18}}
              /> */}
              <View
                style={{
                  width: 30,
                  height: 30,
                  // left: 4.5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Svg>{imageName}</Svg>
              </View>
            </View>
          );
        },
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Task" component={Task} />
      <Tab.Screen name="Chat Room" component={ChatRoom} />
      <Tab.Screen name="Notifications" component={Notifications} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

const employeeStack = createStackNavigator();

const EmployeeStackScreen = () => (
  <employeeStack.Navigator
    screenOptions={{headerShown: false}}
    initialRouteName="BottomStack">
    <employeeStack.Screen name="BottomStack" component={BottomNavigator} />
    <employeeStack.Screen name="ChangePassword" component={ChangePassword} />
    <employeeStack.Screen name="Messages" component={Messages} />
    <employeeStack.Screen name="HomeV2" component={HomeV2} />
    <employeeStack.Screen
      name="AddServiceScreen"
      component={AddServiceScreen}
    />
    <employeeStack.Screen
      name="TrackOrderDetailScreen"
      component={TrackOrderDetailScreen}
    />
  </employeeStack.Navigator>
);

export default EmployeeStackScreen;
