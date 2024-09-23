import React from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import colors from '../../assets/colors/colors';
import MainStyling from '../../assets/styles/MainStyling';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import * as Svgs from './../../assets/images/svg/index';

const NotificationCard = ({item}) => {
  return (
    <View style={[styles.card, {flexDirection: 'row'}]}>
      <View
        style={{
          height: wp('10%'),
          width: wp('10%'),
          borderRadius: 300,
          backgroundColor: colors.primary,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={require('./../../assets/images/png/facebook.png')}
          style={styles.imageStyle}
        />
        {/* <Svgs.File /> */}
        <View style={styles.camera}>{/* <Svgs.Avatar /> */}</View>
      </View>
      <View style={styles.text}>
        <Text style={[MainStyling.buttonText, {color: colors.black}]}>
          New job on March!
        </Text>
        <Text
          style={[
            MainStyling.mediumText,
            {color: colors.gray, marginVertical: wp('2%')},
          ]}>
          Find for jobs according to the skills you have, there are thousands of
          jobs waiting for you
        </Text>
        <View style={{flexDirection: 'row'}}>
          <MaterialCommunityIcons
            name="clock-time-three-outline"
            size={wp('3.7%')}
            color={colors.gray}
          />
          <Text
            style={[
              MainStyling.mediumText,
              {color: colors.gray, marginHorizontal: wp('0.5%')},
            ]}>
            {item.timer}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderBottomColor: colors.light_black,
    borderBottomWidth: 0.2,
    paddingVertical: wp('5%'),
  },

  text: {
    marginHorizontal: wp('4%'),
    paddingRight: wp('1%'),
  },
  header: {
    marginHorizontal: wp('5%'),
  },
  camera: {
    backgroundColor: colors.primary,
    position: 'absolute',
    right: -wp('1.5%'),
    bottom: wp('0%'),
    borderRadius: 300,
  },
  imageStyle: {
    height: wp('5%'),
    width: wp('5%'),
  },
});

export default NotificationCard;
