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
import Input from '../Input';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MainStyling from '../../assets/styles/MainStyling';
import BottomSheetOpener from '../skills/BottomSheetOpener';
import RBSheet from 'react-native-raw-bottom-sheet';
import colors from '../../assets/colors/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Button from '../Button';

const CreateJobInfo = ({changeTab, valuePicker, indexValue}) => {  
  const navigation = useNavigation();
  const dropDownRef = useRef();
  const dropDownDutiesRef = useRef();
  const flatListRef = useRef(null);
  const [isFlatListReady, setFlatListReady] = useState(false);
  const [title, setTitle] = useState(indexValue?.title);
  const [errorMessage, setErrorMessage] = useState('');
  const [location, setLocation] = useState(indexValue?.location);
  const [type, setType] = useState(indexValue?.type);
  const [salary, setSalary] = useState(indexValue?.salary);
  const [jobType, setJobType] = useState(
    indexValue?.jobType ? indexValue?.jobType : 'remote',
  );
  const [SelectedDuty, setSlectedDuty] = useState('Cleanliness');
  const [skill, setSkill] = useState(['Cleanliness', 'Teamwork']);
  const [dutiesArray, setDutiesArray] = useState([
    'Cleanliness',

    'Teamwork',

    'Desk handling',

    'Order handling',

    'Table booking',
  ]);
  const [jobTypeArray, setJobTypeArray] = useState([
    {
      id: 0,
      title: 'full time',
    },
    {
      id: 1,
      title: 'part time',
    },
    {
      id: 2,
      title: 'remote',
    },
    {
      id: 3,
      title: 'internship',
    },
    {
      id: 4,
      title: 'freelance',
    },
    {
      id: 5,
      title: 'temporary',
    },
    {
      id: 6,
      title: 'contract',
    },
  ]);

  useEffect(() => {
    if (isFlatListReady) {
      flatListRef.current.scrollToEnd({animated: true});
    }
  }, [isFlatListReady, skill]);

  const handleDutyPress = item => {
    setSlectedDuty(item);

    const isDuplicate = skill.some(existingItem => existingItem === item);
    if (!isDuplicate) {
      setSlectedDuty(item);
      setSkill([...skill, item]);
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
            data={jobTypeArray}
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
                    jobType === item?.title ? colors.primary : colors.white,
                  paddingHorizontal: wp('5%'),
                }}
                onPress={() => {
                  setJobType(item?.title);
                  dropDownRef.current.close();
                }}>
                {/* <Ionicons
                  name={
                    item?.title === 'Male'
                      ? 'male'
                      : item?.title === 'Others'
                      ? 'male-female-sharp'
                      : 'female'
                  }
                  size={wp('6%')}
                  color={jobType === item?.title ? colors.primary : colors.gray}
                /> */}
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
          height={450}
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
          <View style={MainStyling?.dividerTwo} />
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
                    SelectedDuty === item ? colors.primary : colors.white,
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
                  color={SelectedDuty === item ? colors.primary : colors.gray}
                />
                <Text
                  style={[
                    MainStyling.header,
                    {
                      backgroundColor: colors.white,
                      padding: wp('2.5%'),
                    },
                  ]}>
                  {item}
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
      <ScrollView style={[MainStyling.screenPadding]}>
        <Text style={[styles.heading, {marginVertical: wp('2%')}]}>
          Basic info
        </Text>
        <Text style={[MainStyling.subHeading, styles.paragraph]}>
          We provide recommendations and choose according to your interests
        </Text>
        <View style={MainStyling.divider}></View>
        <Input
          value={title}
          placeholder={'Job title'}
          label={'Job title'}
          onChangeText={value => {
            setTitle(value);
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
        <View style={MainStyling.divider} />

        <BottomSheetOpener
          value={type}
          data={jobType}
          placeholder={'Job type'}
          label={'Job type'}
          setType={setType}
          iconSize={wp('4.8%')}
          iconPosition={'right'}
          iconName={'chevron-down'}
          onIconPress={() => {
            dropDownRef.current.open();
          }}
        />
        <View style={MainStyling.divider}></View>
        <Input
          value={salary}
          placeholder={'Salary'}
          label={'Salary (full/part time), fixed ➔ fixed amount'}
          onChangeText={value => {
            setSalary(value);
          }}
        />

        <View style={MainStyling.divider}></View>
        <BottomSheetOpener
          value={skill}
          placeholder={'Skills'}
          label={'Skills'}
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
            setErrorMessage('');
            if (title == undefined) {
              setErrorMessage('Job title required');
            } else if (location == undefined) {
              setErrorMessage('Location required');
            } else if (salary == undefined) {
              setErrorMessage('Estimated salary required');
            } else if (skill == []) {
              setErrorMessage('Skill required');
            } else {
              changeTab();
              valuePicker(indexValue, {
                title: title,
                location: location,
                type: type,
                salary: salary,
                jobType: jobType,
                SelectedDuty: SelectedDuty,
                skill: skill,
              });
            }
          }}
        />
      </View>
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
    color: colors.black,
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
    // marginVertical: 8,
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
  paragraph: {
    textAlign: 'center',
    marginVertical: wp('5%'),
    colors: colors.gray,
  },
  height2: {
    height: wp('4%'),
  },
  main: {},
});

export default CreateJobInfo;
