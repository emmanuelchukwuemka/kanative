import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../assets/colors/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MainStyling from '../../../assets/styles/MainStyling';
import moment from 'moment';
import {deleteEvents} from '../../../apis/events-apis';

const UpdateAvailability = ({
  item,
  setSelectedAvailability,
  selectedAvailability,
  getEventList,
  dropDownEventRef,
  setSelectedEvent,
  icon,
  selectedDate,
}) => {
  // console.log(item?.item);
  const [isChecked, setChecked] = useState(false);
  const [selectableAvailability, setSelectableAvailability] = useState(false);
  const handleCheckBoxChange = () => {
    setChecked(!isChecked);
  };

  const handlePress = newAvailability => {
    setSelectableAvailability(!selectableAvailability);
    if (
      !selectedAvailability.some(
        Availability => Availability.title === newAvailability.title,
      )
    ) {
      setSelectedAvailability([
        ...selectedAvailability,
        {
          id: newAvailability?.id,
          title: newAvailability.title,
        },
      ]);
    }
  };

  const deleteEvent = () => {
    const details = {
      eventId: item?._id,
    };
    deleteEvents(details)
      .then(response => {
        console.log('Response: jobsss: ', response);
        getEventList();
      })
      .catch(({response}) => {
        console.log(response?.data);
        alert(response?.data);
      });
  };

  const deleteEventCheck = () => {
    Alert.alert(
      'Alert!',
      'Are you sure you want to delete this event?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            deleteEvent();
          },
        },
      ],
      {cancelable: false},
    );
  };
  // useEffect(() => {
  //   console.log(',,,,,,,,,,,,,,,,,,,,,,,,,', item?.item);
  // }, []);

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: selectableAvailability
            ? colors.primary
            : colors.white,
        },
      ]}>
      <Text
        style={[
          MainStyling.label,

          {
            color: selectableAvailability ? colors.white : colors.black,
            alignSelf: 'flex-start',
            fontWeight: '700',
          },
        ]}>
        <Text
          style={[
            MainStyling.subHeading,

            {
              color: selectableAvailability ? colors.white : colors.black,
              alignSelf: 'flex-start',
              fontWeight: '800',
            },
          ]}>
          Title:{'  '}
        </Text>
        {item?.item?.title}
      </Text>
      <Text
        style={[
          MainStyling.label,
          // styles.title,
          {
            color: selectableAvailability ? colors.white : colors.black,
            alignSelf: 'flex-start',
          },
        ]}>
        <Text
          style={[
            MainStyling.subHeading,

            {
              color: selectableAvailability ? colors.white : colors.black,
              alignSelf: 'flex-start',
              fontWeight: '800',
            },
          ]}>
          To:{'  '}
        </Text>
        {'      '}
        {item?.item?.startDate}
      </Text>
      <Text
        style={[
          MainStyling.label,
          // styles.title,
          {
            color: selectableAvailability ? colors.white : colors.black,
            alignSelf: 'flex-start',
          },
        ]}>
        <Text
          style={[
            MainStyling.subHeading,

            {
              color: selectableAvailability ? colors.white : colors.black,
              alignSelf: 'flex-start',
              fontWeight: '800',
            },
          ]}>
          From:{'  '}
        </Text>
        {item?.item?.endDate}
      </Text>
      <Text
        style={[
          MainStyling.label,
          // styles.title,
          {
            color: selectableAvailability ? colors.white : colors.black,
          },
        ]}>
        <Text
          style={[
            MainStyling.subHeading,

            {
              color: selectableAvailability ? colors.white : colors.black,
              alignSelf: 'flex-start',
              fontWeight: '800',
            },
          ]}>
          Time:{'  '}
        </Text>
        {item?.item?.startTime} {'  '}
        {item?.item?.endTime}
      </Text>
      {icon ? (
        <TouchableOpacity
          onPress={() => {
            setSelectedEvent(item);
            dropDownEventRef?.current?.open();
          }}
          style={styles.crossButton}>
          <MaterialCommunityIcons
            name={'dots-horizontal'}
            size={wp('5%')}
            color={colors.white}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: wp('80%'),
    borderRadius: 10,
    borderColor: colors.primary,
    borderWidth: 1,
    padding: wp('3.5'),
    // alignItems: 'center',
    justifyContent: 'center',
    margin: wp('2.3%'),
  },
  imageV: {
    backgroundColor: colors.light_sky,
    height: wp('15%'),
    width: wp('15%'),
    borderRadius: 35,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
  },
  imageStyle: {
    height: wp('8%'),
    width: wp('8%'),
  },
  crossButton: {
    position: 'absolute',
    borderRadius: 20,
    padding: wp('0.5%'),
    right: -10,
    top: -10,
    backgroundColor: colors.primary,
  },
});
export default UpdateAvailability;
