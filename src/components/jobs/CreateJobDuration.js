import React, {useState} from 'react';
import {StyleSheet, Text, View, SafeAreaView, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import BottomSheetOpener from '../skills/BottomSheetOpener';
import Calendar from '../Calendar';
import colors from '../../assets/colors/colors';
import MainStyling from '../../assets/styles/MainStyling';
import Button from '../Button';
import moment from 'moment';

const CreateJobDuration = ({changeTab, valuePicker, indexValue}) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [startDate, setStartDate] = useState(
    moment(indexValue?.startDate).format('MMM D, YYYY'),
  );
  const [endDate, setEndDate] = useState(
    moment(indexValue?.startDate).format('MMM D, YYYY'),
  );
  const [startTime, setStartTime] = useState(
    moment(indexValue?.startTime).format('hh:mm a'),
  );
  const [endTime, setEndTime] = useState(
    moment(indexValue?.endTime).format('hh:mm a'),
  );
  const [isFirstDatePickerVisible, setFirstDatePickerVisible] = useState(false);
  const [isSecondDatePickerVisible, setSecondDatePickerVisible] =
    useState(false);
  const [isFirstTimePickerVisible, setFirstTimePickerVisible] = useState(false);
  const [isSecondTimePickerVisible, setSecondTimePickerVisible] =
    useState(false);

  const showFirstTimePicker = () => {
    setFirstTimePickerVisible(true);
  };

  const showSecondTimePicker = () => {
    setSecondTimePickerVisible(true);
  };

  const showFirstDatePicker = () => {
    setFirstDatePickerVisible(true);
  };
  const showSecondDatePicker = () => {
    setSecondDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setSecondDatePickerVisible(false);
    setFirstDatePickerVisible(false);
    setSecondTimePickerVisible(false);
    setFirstTimePickerVisible(false);
  };

  const onDurationHandling = () => {
    setErrorMessage('');
    console.log(startDate);
    if (startDate == undefined) {
      setErrorMessage('Job start date required');
    } else if (endDate == undefined) {
      setErrorMessage('Job end date required');
    } else if (startTime == undefined) {
      setErrorMessage('Job start time required');
    } else if (endTime == undefined) {
      setErrorMessage('Job end time required');
    } else if (startDate > endDate) {
      console.log(startDate);
      console.log(endDate);
      setErrorMessage('Invalid dates');
    } else if (startTime >= endTime) {
      setErrorMessage('Invalid time');
    } else {
      changeTab();
      valuePicker(indexValue, {
        startDate: startDate,
        endDate: endDate,
        startTime: startTime,
        endTime: endTime,
      });
    }
  };

  return (
    <SafeAreaView style={MainStyling.mainContainer}>
      <View style={[MainStyling.screenPadding, {flex: 12}]}>
        <Text style={[styles.heading, {marginVertical: wp('2%')}]}>
          Job duration
        </Text>
        <Text style={[MainStyling.subHeading, styles.paragraph]}>
          We provide recommendations and choose according to your interests
        </Text>

        <View style={styles.height2}></View>
        <BottomSheetOpener
          value={startDate}
          data={startDate}
          placeholder={'Start date'}
          label={'Start date'}
          onChangeText={value => {
            console.log(value);
            setStartDate(value);
          }}
          iconSize={wp('4.8%')}
          iconPosition={'right'}
          iconName={'calendar'}
          onIconPress={() => {
            showFirstDatePicker();
          }}
        />
        <View style={styles.height25}></View>
        <BottomSheetOpener
          value={endDate}
          data={endDate}
          placeholder={'End date'}
          label={'End date (optional)'}
          onChangeText={value => {
            setEndDate(value);
          }}
          iconSize={wp('4.8%')}
          iconPosition={'right'}
          iconName={'calendar'}
          onIconPress={() => {
            showSecondDatePicker();
          }}
        />
        <View style={styles.height25}></View>
        <BottomSheetOpener
          value={startTime}
          data={startTime}
          placeholder={'Start time'}
          label={'Start time'}
          onChangeText={value => {
            setStartTime(value);
          }}
          iconSize={wp('4.8%')}
          iconPosition={'right'}
          iconName={'calendar'}
          onIconPress={() => {
            showFirstTimePicker();
          }}
        />
        <View style={styles.height25}></View>
        <BottomSheetOpener
          value={endTime}
          data={endTime}
          placeholder={'End time'}
          label={'End time'}
          onChangeText={value => {
            setEndTime(value);
          }}
          iconSize={wp('4.8%')}
          iconPosition={'right'}
          iconName={'calendar'}
          onIconPress={() => {
            showSecondTimePicker();
          }}
        />
      </View>

      <Calendar
        mode="date"
        hideDatePicker={hideDatePicker}
        isTimePickerVisible={isFirstDatePickerVisible}
        setSelectedDate={setStartDate}
        maximumDate={new Date(2027, 0, 1)}
        minimumDate={new Date()}
      />
      <Calendar
        mode="date"
        hideDatePicker={hideDatePicker}
        isTimePickerVisible={isSecondDatePickerVisible}
        setSelectedDate={setEndDate}
        maximumDate={new Date(2027, 0, 1)}
        minimumDate={new Date()}
      />
      <Calendar
        mode="time"
        hideDatePicker={hideDatePicker}
        isTimePickerVisible={isFirstTimePickerVisible}
        setSelectedDate={setStartTime}
      />
      <Calendar
        mode="time"
        hideDatePicker={hideDatePicker}
        isTimePickerVisible={isSecondTimePickerVisible}
        setSelectedDate={setEndTime}
      />
      <View style={MainStyling.screenPaddingTwo}>
        <Text
          style={[
            MainStyling.label,
            {color: colors.red, marginVertical: wp('1%')},
          ]}>
          {errorMessage}
        </Text>
        <Button
          label={'Next'}
          labelStyle={[MainStyling.buttonText]}
          onPress={() => {
            onDurationHandling();
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: wp('5.6%'),
    textAlign: 'center',
    fontWeight: 'bold',
    color: colors.black,
  },
  paragraph: {
    textAlign: 'center',
    marginVertical: wp('5.5%'),
    color: colors.gray,
  },
  height25: {
    height: wp('6.6%'),
  },
  height2: {
    height: wp('4%'),
  },
});
export default CreateJobDuration;
