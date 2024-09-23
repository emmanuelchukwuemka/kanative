import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import colors from '../assets/colors/colors';
import MainStyling from '../assets/styles/MainStyling';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const QuotesCard = ({}) => {
  return (
    <View style={Styles.container}>
      <Text style={[MainStyling.buttonText, {color: colors.white}]}>
        Lorem ipsum amet, elite, sed do eiusmod adipiscing elite, sed do eiusmod
      </Text>
      <Text style={[MainStyling.buttonText, Styles.mainHeading]}>
        ~ Lorem ipsum
      </Text>
    </View>
  );
};
const Styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.secondary,
    borderRadius: 15,
    marginHorizontal: wp('5%'),
    paddingHorizontal: wp('4%'),
    paddingVertical: wp('4%'),
    marginVertical: wp('3%'),
    shadowColor: colors.gray,
    shadowOffset: {
      width: 1,
      height: 5,
    },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 4,
  },

  mainHeading: {
    color: colors.white,
    alignSelf: 'flex-end',
    marginVertical: wp('2%'),
    fontWeight: '700',
  },
});

export default QuotesCard;
