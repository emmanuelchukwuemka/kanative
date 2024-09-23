import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import GetStarted from './../screens/getStarted/GetStarted';
import DrawerNavigator from './DrawerNavigator';
import Login from '../screens/auth/Login';
import Signup from '../screens/auth/Signup';

const Stack = createStackNavigator();

function AuthNavigator() {
  console.log(Stack);
  return (
    <Stack.Navigator screenOptions={{}} initialRouteName={'GetStarted'}>
      <Stack.Screen
        options={{headerShown: false}}
        name={'GetStarted'}
        component={GetStarted}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={'Login'}
        component={Login}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={'Signup'}
        component={Signup}
      />

      <Stack.Screen
        options={{headerShown: false}}
        name={'dashboard'}
        component={DrawerNavigator}
      />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
