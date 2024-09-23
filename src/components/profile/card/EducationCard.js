import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../assets/colors/colors';
import MainStyling from '../../../assets/styles/MainStyling';

const EducationCard = ({item}) => {
  return (
    <View style={styles.card}>
      <Text
        style={[
          MainStyling.subHeading,
          {color: colors.black, marginVertical: wp('1%')},
        ]}>
        {item.institution}
      </Text>
      <Text
        style={[
          MainStyling.subHeading,
          {color: colors.gray, marginVertical: wp('0.5%')},
        ]}>
        {item.degree}
      </Text>
      <Text
        style={[
          MainStyling.subHeading,
          {color: colors.gray, marginVertical: wp('0.5%')},
        ]}>
        {item.graduationDate}
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
export default EducationCard;