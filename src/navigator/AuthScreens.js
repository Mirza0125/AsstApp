import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// screens
import {
  Login,
  OnBoard,
  Register,
  NewPassword,
  Verification,
  ForgotPassword,
  TermsAndCondition,
  AuthMain,
  LoginUserType,
} from 'src/screens/Common';

const authStack = createStackNavigator();

const AuthStackScreen = () => (
  <authStack.Navigator
    screenOptions={{headerShown: false}}
    initialRouteName="AuthMain">
    <authStack.Screen name="AuthMain" component={AuthMain} />
    <authStack.Screen name="Login" component={Login} />
    <authStack.Screen name="LoginUserType" component={LoginUserType} />
    <authStack.Screen name="OnBoard" component={OnBoard} />
    <authStack.Screen name="Register" component={Register} />
    <authStack.Screen name="NewPassword" component={NewPassword} />
    <authStack.Screen name="Verification" component={Verification} />
    <authStack.Screen name="ForgotPassword" component={ForgotPassword} />
    <authStack.Screen name="TermsAndCondition" component={TermsAndCondition} />
  </authStack.Navigator>
);

export default AuthStackScreen;
