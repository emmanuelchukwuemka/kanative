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
import {BASE_URL} from '../../apis/apis';

const ExpertCard = ({item}) => {
  const openDialer = phone => {
    const phoneNumber = `tel:${phone}`;
    Linking.openURL(phoneNumber);
  };

  return (
    <View
      style={[
        styles.scheduleV,
        {
          backgroundColor: colors.white,
          flexDirection: 'row',
          alignItems: 'center',
        },
      ]}>
      <Image
        style={styles.image}
        source={{
          uri: `${BASE_URL}/public/Expert/${item?.image}`,
        }}
      />
      <View style={{marginHorizontal: wp('3%'), flex: 1}}>
        <Text style={[MainStyling.paragraph, {color: colors.black}]}>
          {item?.company_name}
        </Text>
        <Text style={[MainStyling.header, {color: colors.black}]}>
          {item?.service_name}
        </Text>
        <Text style={[MainStyling.paragraph, {color: colors.black}]}>
          + {item?.contact_number}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          openDialer(item?.contact_number);
        }}>
        <Image
          style={[
            styles.imagePhone,
            {marginRight: wp('2%'), resizeMode: 'contain'},
          ]}
          source={require('./../../assets/images/png/call.png')}
        />
      </TouchableOpacity>
    </View>
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
    marginVertical: wp('2%'),
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
    height: wp('17%'),
    width: wp('17%'),
    borderRadius: 10,
  },
});

export default ExpertCard;
