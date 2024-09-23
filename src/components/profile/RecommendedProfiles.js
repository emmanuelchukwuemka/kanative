import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../assets/colors/colors';
import MainStyling from '../../assets/styles/MainStyling';
import Button from '../Button';

const RecommendedProfiles = ({item}) => {
  item = item.jobSeeker;
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('ViewProfile');
      }}
      style={styles.card}>
      <View style={styles.flexR}>
        <View style={styles.iconV}>
          <Image
            source={{
              uri: `${item?.profilePicture}`,
            }}
            style={styles.imageStyle}
          />
        </View>
        <View style={[styles.text]}>
          <Text style={[MainStyling.header, styles.title]}>
            {item?.fullName}
          </Text>
          <View style={styles.flexR}>
            <Text style={[MainStyling.subHeading]}>{item?.company}</Text>
            <Text style={[MainStyling.subHeading]}>
              {'\u2B20 '}
              {item?.address}
            </Text>
          </View>
        </View>
      </View>
      <View style={MainStyling?.dividerTwo} />
      <View
        style={[MainStyling.alignmentCenter, {flexDirection: 'row', flex: 1}]}>
        <View style={{flex: 1}}>
          <Button
            buttonStyle={{height: wp('10%')}}
            label={'Decline'}
            labelStyle={[MainStyling.buttonText, {color: colors.white}]}
            onPress={() => {
              navigation.goBack();
            }}
          />
        </View>
        <View style={{flex: 1, marginLeft: wp('1.5%')}}>
          <Button
            buttonStyle={{height: wp('10%')}}
            variant="outline"
            label={'Invite'}
            labelStyle={[MainStyling.buttonText, {color: colors.primary}]}
            onPress={() => {
              navigation.navigate('SendInvites');
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    width: wp('45%'),
    height: wp('45%'),
    position: 'absolute',
    bottom: wp('1%'),
    alignItems: 'center',
  },
  align: {alignItems: 'center'},

  card: {
    flex: 1,
    borderRadius: 20,
    backgroundColor: colors?.white,
    elevation: 4,
    shadowColor: colors.gray,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 7,
    padding: wp('3%'),
    marginVertical: wp('3%'),
  },
  imageStyle: {
    height: wp('13%'),
    width: wp('13%'),
    borderRadius: wp('10%'),
  },
  flexR: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconV: {
    height: wp('12%'),
    width: wp('12%'),
    borderRadius: wp('10%'),
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginHorizontal: wp('3%'),
    marginVertical: wp('1%'),
  },
  title: {
    marginVertical: wp('1%'),
    fontWeight: '700',
  },
});
export default RecommendedProfiles;
