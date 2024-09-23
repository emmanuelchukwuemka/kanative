import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import BottomTabNavigator from './BottomTabNavigator';
import CustomDrawer from '../components/CustomDrawer';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      initialRouteName={'dashboard'}
      useLegacyImplementation={false}
      screenOptions={{
        drawerStyle: {
          backgroundColor: 'white',
          zIndex: 100,
        },
        drawerPosition: 'right',
      }}>
      <Drawer.Screen
        options={{
          tabBarLabel: '',
          title: '',
          headerShown: false,
        }}
        name="dashboard"
        component={BottomTabNavigator}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
