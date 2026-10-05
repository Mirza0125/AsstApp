import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
//import {createDrawerNavigator} from '@react-navigation/drawer';
import {navigationRef} from './NavigationService';

import AuthStackScreen from './AuthScreens';
import EmployeeStackScreen from './EmployeeScreen';
import CustomerStackScreen from './CustomerScreen';

const authStack = createStackNavigator();
const customerStack = createStackNavigator();
const employeeStack = createStackNavigator();

const RootNavigationStack = (props) => {
  const {isAuth, user} = props;
  return (
    <NavigationContainer ref={navigationRef}>
      {/* <customerStack.Navigator screenOptions={{ headerShown: false }}>
        <customerStack.Screen
          name="customerStack"
          component={CustomerStackScreen}
        />
      </customerStack.Navigator> */}
      {isAuth ? (
        user.role === 'resident' ? (
          <customerStack.Navigator screenOptions={{headerShown: false}}>
            <customerStack.Screen
              name="customerStack"
              component={CustomerStackScreen}
            />
          </customerStack.Navigator>
        ) : (
          <employeeStack.Navigator screenOptions={{headerShown: false}}>
            <employeeStack.Screen
              name="employeeStack"
              component={EmployeeStackScreen}
            />
          </employeeStack.Navigator>
        )
      ) : (
        <authStack.Navigator screenOptions={{headerShown: false}}>
          <authStack.Screen name="AuthStack" component={AuthStackScreen} />
        </authStack.Navigator>
      )}
    </NavigationContainer>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.login.isAuth,
  user: state.login.user,
});

export default connect(mapStateToProps, null)(RootNavigationStack);
