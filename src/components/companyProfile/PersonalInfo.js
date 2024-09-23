import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Input from '../../components/Input';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MainStyling from '../../assets/styles/MainStyling';
import BottomSheetOpener from '../skills/BottomSheetOpener';
import RBSheet from 'react-native-raw-bottom-sheet';
import colors from '../../assets/colors/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Calendar from '../Calendar';

const PersonalInfo = ({}) => {
  const navigation = useNavigation();
  const dropDownRef = useRef();
  const dropDownDutiesRef = useRef();
  const flatListRef = useRef(null);
  const [isFlatListReady, setFlatListReady] = useState(false);
  const [fullName, setFullName] = useState('');
  const [location, setLocation] = useState('');
  const [gender, setGender] = useState('Male');
  const [birthday, setBirthday] = useState('');
  const [SelectedDuty, setSlectedDuty] = useState('Cleanliness');
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  const [skill, setSkill] = useState([
    {
      title: 'Cleanliness',
    },
    {
      title: 'Teamwork',
    },
  ]);
  const [genderArray, setGenderArray] = useState([
    {
      id: 0,
      title: 'Male',
    },
    {
      id: 1,
      title: 'Female',
    },
    {
      id: 2,
      title: 'Others',
    },
  ]);
  const [dutiesArray, setDutiesArray] = useState([
    {
      id: 0,
      title: 'Cleanliness',
    },
    {
      id: 1,
      title: 'Teamwork',
    },
    {
      id: 2,
      title: 'Desk handling',
    },
    {
      id: 3,
      title: 'Order handling',
    },
    {
      id: 4,
      title: 'Table booking',
    },
  ]);
  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };
  useEffect(() => {
    if (isFlatListReady) {
      flatListRef.current.scrollToEnd({animated: true});
    }
  }, [isFlatListReady, skill]);

  const handleDutyPress = item => {
    setSlectedDuty(item?.title);

    const isDuplicate = skill.some(
      existingItem => existingItem.title === item?.title,
    );
    if (!isDuplicate) {
      setSlectedDuty(item?.title);
      setSkill([...skill, {title: item?.title}]);
    } else {
      console.log('Duplicate item!');
    }
    dropDownDutiesRef.current.close();
  };

  const onContentSizeChange = () => {
    setFlatListReady(true);
  };
  const onLastItemLayout = () => {
    if (flatListRef.current) {
      setTimeout(() => {
        flatListRef.current.scrollToEnd({animated: true});
      }, 100);
    }
  };

  const Dropdown = () => {
    return (
      <View style={styles.dropDownContainer}>
        <RBSheet
          ref={dropDownRef}
          closeOnDragDown={true}
          height={300}
          closeOnPressMask={true}
          customStyles={{
            wrapper: {
              backgroundColor: 'rgba(0,0,0,0.6)',
            },
            draggableIcon: {
              backgroundColor: colors.primary,
              width: wp('13%'),
            },
            container: [styles.sheetContainer, MainStyling?.screenPadding],
          }}>
          <View style={MainStyling?.dividerTwo}></View>
          <FlatList
            data={genderArray}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={{
                  marginVertical: wp('2%'),
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: 1.5,
                  borderRadius: 15,
                  margin: wp('0.2%'),
                  borderColor:
                    gender === item?.title ? colors.primary : colors.white,
                  paddingHorizontal: wp('5%'),
                }}
                onPress={() => {
                  setGender(item?.title);
                  dropDownRef.current.close();
                }}>
                <Ionicons
                  name={
                    item?.title === 'Male'
                      ? 'male'
                      : item?.title === 'Others'
                      ? 'male-female-sharp'
                      : 'female'
                  }
                  size={wp('6%')}
                  color={gender === item?.title ? colors.primary : colors.gray}
                />
                <Text
                  style={[
                    MainStyling.header,
                    {
                      backgroundColor: colors.white,

                      padding: wp('2.5%'),
                    },
                  ]}>
                  {item?.title}
                </Text>
              </TouchableOpacity>
            )}
          />
        </RBSheet>
      </View>
    );
  };
  const DropdownDuties = () => {
    return (
      <View style={styles.dropDownContainer}>
        <RBSheet
          ref={dropDownDutiesRef}
          closeOnDragDown={true}
          height={500}
          closeOnPressMask={true}
          customStyles={{
            wrapper: {
              backgroundColor: 'rgba(0,0,0,0.6)',
            },
            draggableIcon: {
              backgroundColor: colors.primary,
              width: wp('13%'),
            },
            container: [styles.sheetContainer, MainStyling?.screenPadding],
          }}>
          <View style={MainStyling?.dividerTwo}></View>
          <FlatList
            data={dutiesArray}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={{
                  marginVertical: wp('2%'),
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: 1.5,
                  borderRadius: 15,
                  margin: wp('0.2%'),
                  borderColor:
                    SelectedDuty === item?.title
                      ? colors.primary
                      : colors.white,
                  paddingHorizontal: wp('5%'),
                }}
                onPress={() => {
                  handleDutyPress(item);
                }}
                onLayout={
                  index === dutiesArray.length - 1
                    ? onLastItemLayout
                    : undefined
                }>
                <FontAwesome
                  name={'dot-circle-o'}
                  size={wp('6%')}
                  color={
                    SelectedDuty === item?.title ? colors.primary : colors.gray
                  }
                />
                <Text
                  style={[
                    MainStyling.header,
                    {
                      backgroundColor: colors.white,

                      padding: wp('2.5%'),
                    },
                  ]}>
                  {item?.title}
                </Text>
              </TouchableOpacity>
            )}
          />
        </RBSheet>
      </View>
    );
  };

  return (
    <SafeAreaView style={MainStyling.mainContainer}>
      <View
        style={[
          {flex: 2, marginVertical: wp('7%')},
          MainStyling.screenPadding,
        ]}>
        <Text style={[styles.heading, {color: colors.black}]}>
          Personal information
        </Text>
        <Text style={[MainStyling.subHeading, styles.paragraph]}>
          We provide recommendations and choose according to your interests
        </Text>
        <View style={MainStyling.divider}></View>
        <ScrollView showsVerticalScrollIndicator={false} style={[{flex: 1.8}]}>
          <Input
            value={fullName}
            placeholder={'Full name'}
            label={'Full name'}
            onChangeText={value => {
              setFullName(value);
            }}
          />
          <View style={MainStyling.divider}></View>
          <Input
            value={location}
            placeholder={'Location'}
            label={'Location'}
            onChangeText={value => {
              setLocation(value);
            }}
            iconPosition={'left'}
            iconName={'map-pin'}
            onIconPress={() => {
              alert('ok');
            }}
          />
          <View style={MainStyling.divider}></View>

          <BottomSheetOpener
            data={gender}
            placeholder={'Gender'}
            label={'Gender'}
            setSkill={setSkill}
            iconSize={wp('6%')}
            iconPosition={'right'}
            iconName={'chevron-down'}
            onIconPress={() => {
              dropDownRef.current.open();
            }}
          />
          <View style={MainStyling.divider}></View>
          <BottomSheetOpener
            value={birthday}
            data={selectedDate}
            placeholder={'Birthday'}
            label={'Birthday'}
            onChangeText={value => {
              setBirthday(value);
            }}
            iconSize={wp('4.8%')}
            iconPosition={'right'}
            iconName={'calendar'}
            onIconPress={() => {
              showTimePicker();
            }}
          />
          <View style={MainStyling.divider}></View>
          <BottomSheetOpener
            placeholder={'Duties'}
            label={'Duties'}
            flatlist="true"
            flatListRef={flatListRef}
            onContentSizeChange={onContentSizeChange}
            arrayData={skill}
            setSkill={setSkill}
            iconSize={wp('4.8%')}
            iconPosition={'right'}
            iconName={'chevron-down'}
            onIconPress={() => {
              dropDownDutiesRef.current.open();
            }}
          />
        </ScrollView>
      </View>
      <Calendar
        hideTimePicker={hideTimePicker}
        isTimePickerVisible={isTimePickerVisible}
        setSelectedDate={setSelectedDate}
      />
      {Dropdown()}
      {DropdownDuties()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputView: {
    width: '100%',
    borderRadius: 8,
    paddingVertical: wp('2%'),
    borderWidth: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    marginTop: wp('3%'),
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: {width: 0, height: 0.3},
        shadowOpacity: 0.1,
      },
      android: {
        elevation: 2,
        backgroundColor: colors.white,
      },
    }),
  },
  sheetContainer: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 25,
  },
  dropDownContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  heading: {
    fontSize: wp('5.6%'),
    textAlign: 'center',
    fontWeight: '600',
  },
  marginV: {
    marginVertical: wp('2.5%'),
  },
  h20: {
    height: wp('5.6%'),
  },

  card: {
    backgroundColor: colors.primary,
    height: 25,
    width: '30%',
    borderRadius: 15,
    flexDirection: 'column',
    textAlign: 'center',
    justifyContent: 'center',
  },
  buttonV: {
    flex: 0.3,
  },
  main: {},
  paragraph: {
    textAlign: 'center',
    marginVertical: wp('3%'),
    color: colors.gray,
  },
});

export default PersonalInfo;
