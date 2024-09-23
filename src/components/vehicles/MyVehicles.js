import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import MainStyling from '../../assets/styles/MainStyling';
import colors from '../../assets/colors/colors';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';

const MyVehicles = ({item, dropDownRef, setSelectedVehicle}) => {
  const userDetails = useSelector(state => state.auth.user);

  const openDialer = phone => {
    const phoneNumberEncoded = encodeURIComponent(`tel:${phone}`);
    Linking.openURL(phoneNumberEncoded);
  };
  return (
    <TouchableOpacity
      onPress={() => {
        dropDownRef.current.open();
        setSelectedVehicle(item);
      }}
      style={[
        styles.scheduleV,
        {
          backgroundColor: colors.white,
          flexDirection: 'row',
          alignItems: 'center',
          marginRight: wp('4%'),
        },
      ]}>
      <Image
        style={styles.image}
        source={require('./../../assets/images/png/motor.png')}
      />
      <View style={{marginHorizontal: wp('3%'), flex: 1}}>
        <Text style={[MainStyling.paragraph, {color: colors.black}]}>
          Company number:{' '}
          <Text style={[MainStyling.header, {color: colors.black}]}>
            {item?.orginization_name}
          </Text>
        </Text>
        <Text style={[MainStyling.paragraph, {color: colors.black}]}>
          Vehicle number:{' '}
          <Text style={[MainStyling.header, {color: colors.black}]}>
            {item?.vehicle_number}
          </Text>
        </Text>

        <Text style={[MainStyling.paragraph, {color: colors.black}]}>
          Contact number:{' '}
          <Text
            onPress={() => {
              openDialer(item?.contact_number);
            }}
            style={[MainStyling.header, {color: colors.black}]}>
            {item?.contact_number}
          </Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imagePhone: {
    height: wp('10%'),
    width: wp('10%'),
  },
  scheduleV: {
    elevation: 8,
    borderRadius: 10,
    marginVertical: wp('3%'),
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp('4.5%'),
    shadowColor: colors.gray,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.9,
    shadowRadius: 3,
    marginHorizontal: 3,
  },
  image: {
    height: wp('18%'),
    width: wp('18%'),
    borderRadius: 10,
    resizeMode: 'contain',
  },
});

export default MyVehicles;
