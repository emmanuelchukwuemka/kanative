import React from 'react';
import {StyleSheet} from 'react-native';
import colors from '../assets/colors/colors';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

const Calendar = ({isTimePickerVisible, hideTimePicker, setSelectedDate}) => {
  const navigation = useNavigation();
  const currentDate = new Date();
  const minDate = new Date();
  const maxDate = new Date();

  const handleTimeConfirm = date => {
    setSelectedDate(moment(date).format('MMM DD, YYYY'));
    console.log(date);
    hideTimePicker();

  };

  return (
    <DateTimePickerModal
      isVisible={isTimePickerVisible}
      mode="date"
      onConfirm={handleTimeConfirm}
      onCancel={hideTimePicker}
      minimumDate={minDate}
    />
  );
};

const Styles = StyleSheet.create({
  main: {
    backgroundColor: colors.grey_white,
  },
  view: {
    paddingHorizontal: wp('7%'),
    paddingVertical: wp('3%'),
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Calendar;
