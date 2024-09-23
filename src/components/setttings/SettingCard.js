import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../assets/colors/colors';
import MainStyling from '../../assets/styles/MainStyling';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingCard = ({item, companyDetails}) => {
  const navigation = useNavigation();
  const [storeRole, setStoreRole] = useState('');
  const stringValue = useSelector(state => state.counter.stringValue);
  const storageLoad = async () => {
    setStoreRole(JSON.parse(await AsyncStorage.getItem('@emailStores')));
  };
  // console.log('companyDetailscompanyDetailscompanyDetails', companyDetails);

  const settingFunction = () => {
    item?.title === 'Settings'
      ? navigation.navigate('Settings')
      : item?.title === 'Reset password'
      ? navigation.navigate('NewPassword', {headerTitle: 'Reset Password'})
      : storeRole.role === 'client'
      ? navigation.navigate('BusinessProfile', {companyDetail: companyDetails})
      : item?.title === 'Availability'
      ? navigation.navigate('StaffAvailability')
      : navigation.navigate('personalInformation', {
          indexValue: {
            id: companyDetails?._id,
            address: companyDetails?.address,
            birthDate: companyDetails?.birthDate,
            certifications: companyDetails?.certifications,
            education: companyDetails?.education,
            fullName: companyDetails?.fullName,
            gender: companyDetails?.gender,
            professionalSummary: companyDetails?.professionalSummary,
            references: companyDetails?.references,
            skills: companyDetails?.skills,
            experience: companyDetails?.experience,
            locationPreferences: companyDetails?.locationPreferences,
            industryPreferences: companyDetails?.industryPreferences,
            resumeCVUpload: companyDetails?.resumeCVUpload,
            certificateUpload: companyDetails?.certificateUpload,
          },
        });
  };

  useEffect(() => {
    storageLoad();
  });

  return (
    <TouchableOpacity
      onPress={() => {
        // alert(storeRole.role);
        settingFunction();
      }}
      style={[styles.flexD, MainStyling.alignmentCenter, styles.buttonV]}>
      <View
        style={[
          styles.iconV,
          {
            backgroundColor:
              item?.title === 'Logout' ? colors.light_grey : colors.light_sky,
          },
        ]}>
        <Image
          source={item.source}
          style={{height: wp('5%'), width: wp('5%')}}
        />
      </View>
      <View style={[styles.flex1, styles.mh4]}>
        <Text style={[MainStyling.subHeading, , {color: colors.black}]}>
          {item.title}
        </Text>
      </View>
      <View>
        <FontAwesome
          name={'angle-right'}
          size={wp('5%')}
          color={colors.light_black}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    height: wp('60%'),
    width: wp('100%'),
    alignItems: 'center',
    justifyContent: 'center',
    padding: wp('6%'),
    marginVertical: wp('15'),
    elevation: 5,
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.3,
      },
      android: {
        elevation: 3,
        backgroundColor: colors.white,
      },
    }),
  },

  image: {
    borderRadius: 45,
    position: 'absolute',

    top: -wp('12%'),
  },

  buttonV: {
    borderBottomColor: colors.light_grey,
    borderBottomWidth: 0.5,
    paddingVertical: wp('5%'),
  },
  iconV: {
    height: wp('8.5%'),
    width: wp('8.5%'),
    borderRadius: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexD: {
    flexDirection: 'row',
  },
  flex1: {
    flex: 1,
  },
  mh4: {
    marginHorizontal: wp('4%'),
  },
  flex: {
    flexDirection: 'row',
    flex: 1,
  },
});
export default SettingCard;
