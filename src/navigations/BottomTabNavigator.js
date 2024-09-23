import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Platform, View, Pressable} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../assets/colors/colors';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Text} from 'react-native';
import MainStyling from '../assets/styles/MainStyling';
import Logs from '../screens/logs/Logs';
import {createStackNavigator} from '@react-navigation/stack';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function LogsStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LogsMain"
        component={Logs}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
function BottomTabNavigator({route}) {
  const getIcons = (route, focused) => {
    if (route.name === 'Home') {
      return (
        <Feather
          name="home"
          size={wp('7%')}
          color={focused ? colors.primary : colors.gray}
        />
      );
    } else if (route.name === 'Tools') {
      return (
        <Ionicons
          name="briefcase-outline"
          size={wp('8%')}
          color={focused ? colors.primary : colors.gray}
        />
      );
    } else if (route.name === 'Logs') {
      return (
        <Feather
          name="file-text"
          size={wp('7.7%')}
          color={focused ? colors.primary : colors.gray}
        />
      );
    } else if (route.name === 'Settings') {
      return (
        <Feather
          name="settings"
          size={wp('7.7%')}
          color={focused ? colors.primary : colors.gray}
        />
      );
    } else if (route.name === 'messages') {
      return (
        <MaterialCommunityIcons
          name="message-alert-outline"
          size={wp('8%')}
          color={focused ? colors.primary : colors.gray}
        />
      );
    }
  };

  return (
    <Tab.Navigator
      initialRouteName={'Home'}
      screenOptions={{headerShown: false, tabBarHideOnKeyboard: true}}
      safeAreaInsets={{
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      }}
      tabBar={({state, navigation}) => {
        return (
          <View
            style={{
              backgroundColor: colors.white,
              flexDirection: 'row',
              paddingHorizontal: Platform.OS === 'android' ? 17 : 15,
              paddingVertical: Platform.OS === 'android' ? 10 : 18,
              justifyContent: 'space-between',
            }}>
            {state?.routes?.map((route, index) => {
              const isFocused = state.index === index;
              const onPress = () => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });

                if (!isFocused && !event.defaultPrevented) {
                  navigation.navigate({
                    name: route.name,
                    merge: true,
                    ...route.params,
                  });
                }
              };

              return (
                <Pressable
                  key={index}
                  onPress={onPress}
                  style={{
                    width: wp('16%'),
                    height: wp('15%'),
                    borderRadius: 300,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {getIcons(route, isFocused)}
                  <Text
                    style={[
                      MainStyling.miniText,
                      {
                        color: isFocused ? colors.primary : colors.gray,
                        marginBottom: wp('2%'),
                      },
                    ]}>
                    {route.name}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        );
      }}>
      <Tab.Screen name={'Home'} component={LogsStackNavigator} />
      <Tab.Screen
        options={{
          tabBarLabel: 'Tools',
          title: '',
          headerShown: false,
        }}
        name="Tools"
        component={LogsStackNavigator}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Logs',
          title: '',
          headerShown: false,
        }}
        name="Logs"
        component={LogsStackNavigator}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Settings',
          title: '',
          headerShown: false,
        }}
        name="Settings"
        component={LogsStackNavigator}
      />
      <Tab.Screen
        name={'messages'}
        component={LogsStackNavigator}
        options={{
          tabBarLabel: 'messages',
          title: '',
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
