import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  Text,
  FlatList,
} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import MainStyling from '../assets/styles/MainStyling';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../assets/colors/colors';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {DrawerActions} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const CustomDrawer = props => {
  const navigation = useNavigation();
  const userDetails = useSelector(state => state.auth.user);

  const drawerFunctionality = [
    {
      image: '',
      title: 'Add Vehicle',
    },
    {
      image: '',
      title: 'Profile',
    },
    {
      image: '',
      title: 'My Vehicles',
    },
    {
      image: '',
      title: 'Notifications',
    },
    {
      image: '',
      title: 'Dashboard',
    },
  ];
  const drawerTitleList = [
    {
      image: '',
      title: 'About us',
    },
    {
      image: '',
      title: 'Privacy',
    },
    {
      image: '',
      title: 'Term of use',
    },
    {
      image: '',
      title: 'FAQ',
    },
    {
      image: '',
      title: 'Delete Account',
    },
    {
      image: '',
      title: 'Logout',
    },
  ];

  const itemCard = ({item}) => {
    return (
      <View
        style={[
          styles.functionalityBoxStyle,
          {
            backgroundColor: colors.white,
          },
        ]}>
        <TouchableOpacity
          onPress={() => {
            item?.title === 'Add Vehicle'
              ? navigation.navigate('AddVehicle')
              : item?.title === 'Support Center'
              ? navigation.navigate('Massages')
              : item?.title === 'Profile'
              ? navigation.navigate('MyProfile')
              : item?.title === 'My Vehicles'
              ? navigation.navigate('MyVehicle')
              : item?.title == 'Notifications'
              ? navigation.navigate('Notifications')
              : navigation.navigate('Dashboard');
          }}
          style={{flex: 1, alignItems: 'center', flexDirection: 'row'}}>
          {/* {item?.title === 'Add Vehicle' || item?.title === 'My Vehicles' ? (
            <Image
              source={require('./../assets/images/png/car.png')}
              style={{
                width: wp('6%'),
                height: wp('6%'),
              }}
            />
          ) : item?.title === 'Dashboard' ? (
            <Image
              source={require('./../assets/images/png/dashboard.png')}
              style={{
                width: wp('5%'),
                height: wp('5%'),
              }}
            />
          ) : item?.title === 'Profile' ? (
            <Image
              source={require('./../assets/images/png/user.png')}
              style={{
                width: wp('6%'),
                height: wp('6%'),
              }}
            />
          ) : (
            <Image
              source={require('./../assets/images/png/user.png')}
              style={{
                width: wp('7%'),
                height: wp('7%'),
              }}
            />
          )} */}

          <Text
            style={[
              MainStyling.subHeading,
              {
                fontWeight: '600',
                color: colors.black,
                marginHorizontal: wp('3%'),
              },
            ]}>
            {item?.title}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const itemTitleCard = ({item}) => {
    return (
      <View
        style={[
          styles.functionalityBoxStyle,
          {
            backgroundColor: colors.white,
          },
        ]}>
        <TouchableOpacity
          onPress={() => {
            item?.title === 'Logout'
              ? navigation.navigate('GetStarted')
              : item?.title === 'Term of use'
              ? navigation.navigate('TermCondition')
              : item?.title === 'Privacy'
              ? navigation.navigate('Privacy')
              : item?.title === 'FAQ'
              ? navigation.navigate('FAQ')
              : item?.title === 'Delete Account'
              ? navigation.navigate('DeleteAccount')
              : navigation.navigate('AboutUs');
          }}
          style={{flex: 1, alignItems: 'center', flexDirection: 'row'}}>
          {item?.title === 'Logout' ? (
            <Feather
              onPress={() => {
                navigation.openDrawer();
              }}
              style={{marginRight: wp('1%')}}
              name={'log-out'}
              size={wp('5%')}
              color={colors.primary}
            />
          ) : null}

          <Text
            style={[
              MainStyling.subHeading,
              {
                fontWeight: '600',
                color: item?.title === 'Logout' ? colors.primary : colors.black,
                // ,
              },
            ]}>
            {item?.title}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <DrawerContentScrollView {...props}>
      <View
        style={[
          styles.scheduleV,
          {
            backgroundColor: colors.primary,
          },
        ]}>
        <View style={{flex: 1}}>
          <Text
            style={[
              MainStyling.header,
              {fontWeight: 'bold', color: colors.white},
            ]}>
            {userDetails?.name}
          </Text>
          <Text style={[MainStyling.subHeading, {color: colors.white}]}>
            {userDetails?.email}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.dispatch(DrawerActions.closeDrawer());
          }}>
          <MaterialCommunityIcons
            name={'close'}
            size={wp('7%')}
            color={colors.white}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={drawerFunctionality}
        keyExtractor={item => item?.id}
        renderItem={itemCard}
      />
      <View style={MainStyling.divider} />
      <View style={MainStyling.divider} />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={drawerTitleList}
        keyExtractor={item => item?.id}
        renderItem={itemTitleCard}
      />
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  scheduleV: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp('6%'),
    shadowColor: colors.gray,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.9,
    shadowRadius: 3,
  },

  functionalityBoxStyle: {
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('4%'),
    paddingVertical: wp('4.7%'),
    borderBottomColor: colors.light_grey,
    borderBottomWidth: 1.5,
    marginHorizontal: wp('3%'),
  },
});
