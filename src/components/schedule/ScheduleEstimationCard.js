import React, {useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MainStyling from '../../assets/styles/MainStyling';
import colors from '../../assets/colors/colors';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const ScheduleEstimationCard = ({
  item,
  title,
  setSelectedEstimation,
  selectedEstimation,
}) => {
  // console.log('itemmmm', item);
  useEffect(() => {}, []);
  return (
    <View
      style={[
        styles.estimationMargin,
        {
          borderColor:
            selectedEstimation != item?.est_id ? colors.gray : colors.primary,
        },
      ]}>
      {item?.job_id === 1 ? (
        <View
          style={[
            MainStyling.heading,
            {
              color: colors.white,
              backgroundColor: colors.primary,
              borderRadius: 300,
              paddingHorizontal: wp('5%'),
              paddingVertical: wp('1%'),
            },
          ]}>
          {/* <Text style={[MainStyling.subHeading, {color: colors.white}]}>
            Selected
          </Text> */}
        </View>
      ) : (
        <View
          style={[
            MainStyling.heading,
            {
              color: colors.white,
              backgroundColor: colors.primary,
              borderRadius: 300,
              paddingHorizontal: wp('5%'),
              paddingVertical: wp('1%'),
            },
          ]}></View>
      )}

      <TouchableOpacity
        style={{
          padding: wp('3%'),
          paddingVertical: wp('6%'),
          // marginHorizontal: wp('1%'),
          alignSelf: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          // console.log(item);
          setSelectedEstimation(item?.est_id);
        }}>
        <Text style={[MainStyling.heading, {color: colors.black}]}>
          {title}
        </Text>
        <Text style={[MainStyling.subHeading, {color: colors.black}]}>
          {item?.year} {item?.year == 1 ? 'year' : 'years'}
        </Text>

        <Text style={[MainStyling.heading, {color: colors.primary}]}>
          {item?.estimation_price} ₹
        </Text>

        <Text style={[MainStyling.subHeading, {color: colors.black}]}>
          Labour Charges: {item?.labour} ₹
        </Text>
        <Text style={[MainStyling.subHeading, {color: colors.black}]}>
          Technical charges: {item?.technical_charges} ₹
        </Text>

        <Text
          style={[
            MainStyling.subHeading,
            {
              color: colors.black,
              fontWeight: '700',
              textAlign: 'center',
            },
          ]}>
          Spare Parts:
        </Text>
        <Text
          style={[
            MainStyling.label,
            {
              color: colors.black,
              textAlign: 'center',
            },
          ]}>
          {item?.parts}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  estimationMargin: {
    width: wp('75%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    borderWidth: 1,
    marginHorizontal: wp('2%'),
    padding: wp('2%'),
    paddingHorizontal: wp('7%'),
  },
});

export default ScheduleEstimationCard;
