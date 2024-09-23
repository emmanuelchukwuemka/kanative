import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../assets/colors/colors';
import MainStyling from '../../../assets/styles/MainStyling';
import moment from 'moment';

const ExperienceCard = ({item}) => {
  return (
    <View style={styles.card}>
      <Text
        style={[
          MainStyling.subHeading,
          {color: colors.black, marginVertical: wp('1%'), fontWeight: '500'},
        ]}>
        {item?.title}
      </Text>
      <Text
        style={[
          MainStyling.subHeading,
          {color: colors.gray, marginVertical: wp('0.5%')},
        ]}>
        {item?.company}
      </Text>
      <Text
        style={[
          MainStyling.subHeading,
          {color: colors.gray, marginVertical: wp('0.5%')},
        ]}>
        {moment(item?.startDate).format('MMM D, YYYY')} to{' '}
        {moment(item?.endDate).format('MMM D, YYYY')}
      </Text>
      <Text
        style={[
          MainStyling.subHeading,
          {color: colors.gray, marginVertical: wp('2%')},
        ]}>
        {item?.duty}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    width: wp('85%'),
    backgroundColor: colors.light_sky,
    borderRadius: 15,
    padding: wp('4%'),
    marginVertical: wp('3%'),
  },
});
export default ExperienceCard;
