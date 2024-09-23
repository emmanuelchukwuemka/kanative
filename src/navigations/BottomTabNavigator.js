import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Platform, View, Pressable} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import colors from '../assets/colors/colors';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Text} from 'react-native';
import MainStyling from '../assets/styles/MainStyling';
import GetStarted from '../screens/getStarted/GetStarted';
import Dashboard from '../screens/Dashboard/Dashboard';
import Support from '../screens/support/Support';
import ClientDetails from '../screens/Client/ClientDetails';
import ClientListDetails from '../screens/Client/ClientListDetails';
import ClientList from '../screens/Client/ClientList';
import Coach from '../screens/coach/Coach';
import Logs from '../screens/logs/Logs';
import Settings from '../screens/settings/Settings';
import Tools from '../screens/tools/Tools';
import ProfileScreen from '../screens/auth/Profile';
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
      <Stack.Screen
        name="Coach"
        component={Coach}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ClientList"
        component={ClientList}
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
      initialRouteName={'Dashboard'}
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
      <Tab.Screen name={'Home'} component={Dashboard} />
      <Tab.Screen
        options={{
          tabBarLabel: 'Tools',
          title: '',
          headerShown: false,
        }}
        name="Tools"
        component={Tools}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Logs',
          title: '',
          headerShown: false,
        }}
        name="Logs"
        component={LogsStackNavigator}
        // component={Coach}
        // component={ClientList}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Settings',
          title: '',
          headerShown: false,
        }}
        name="Settings"
        component={ProfileScreen}
      />
      {/* <Tab.Screen
        options={{
          tabBarLabel: 'Settings',
          title: '',
          headerShown: false,
        }}
        name="Settings"
        component={Settings}
      /> */}
      <Tab.Screen
        name={'messages'}
        component={Support}
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
