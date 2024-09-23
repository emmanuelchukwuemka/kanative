import React, {useState, useRef} from 'react';
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
import Button from '../../components/Button';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from './../../assets/colors/colors';
import RBSheet from 'react-native-raw-bottom-sheet';
import BottomSheetOpener from '../skills/BottomSheetOpener';
import Calendar from '../Calendar';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MainStyling from '../../assets/styles/MainStyling';
import EducationCard from './card/EducationCard';

const Education = () => {
  const navigation = useNavigation();
  const dropDownRef = useRef(null);
  const [school, setSchool] = useState('');
  const [degree, setDegree] = useState('');
  const [feild, setFeild] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  [selectedEndDate, setSelectedEndDate] = useState('');
  [selectedStartTime, setSelectedStartTime] = useState('');

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };
  const [study, setStudy] = useState([
    {
      title: 'BS,Software Engineer',
      subtitle: 'Punjab, University',
      session: '28 March 2017 - Present',
    },
  ]);
  const Dropdown = () => {
    return (
      <View style={styles.dropDownContainer}>
        <RBSheet
          ref={dropDownRef}
          closeOnDragDown={true}
          height={720}
          closeOnPressMask={true}
          customStyles={{
            wrapper: {
              backgroundColor: 'rgba(0,0,0,0.6)',
            },
            draggableIcon: {
              backgroundColor: '#8898AA',
            },
            container: styles.sheetContainer,
          }}>
          <ScrollView
            style={[
              styles.main,
              {
                marginHorizontal: wp('3%'),
                marginTop: wp('3%'),
              },
            ]}>
            <Input
              value={school}
              placeholder={'Punjab,University'}
              label={'School'}
              onChangeText={value => {
                setSchool(value);
              }}
            />
            <View style={styles.height25}></View>
            <Input
              value={degree}
              placeholder={'BS,Software Engineer'}
              label={'Degree'}
              onChangeText={value => {
                setDegree(value);
              }}
            />
            <View style={styles.height25}></View>
            <Input
              value={feild}
              placeholder={'Computer Science'}
              label={'Field of study'}
              onChangeText={value => {
                setFeild(value);
              }}
            />
            <View style={styles.height25}></View>
            <BottomSheetOpener
              value={start}
              data={selectedEndDate}
              placeholder={'End date'}
              label={'End date (optional)'}
              onChangeText={value => {
                setStart(value);
              }}
              iconSize={wp('4.8%')}
              iconPosition={'right'}
              iconName={'calendar'}
              onIconPress={() => {
                showTimePicker();
              }}
            />
            <View style={styles.height25}></View>
            <BottomSheetOpener
              value={end}
              data={selectedStartTime}
              placeholder={'End time'}
              label={'End time'}
              onChangeText={value => {
                setEnd(value);
              }}
              iconSize={wp('4.8%')}
              iconPosition={'right'}
              iconName={'calendar'}
              onIconPress={() => {
                showTimePicker();
              }}
            />
            <View style={styles.height25}></View>
            <Button
              label={'Next'}
              labelStyle={[MainStyling.buttonText]}
              onPress={() => {
                dropDownRef.current.close();
              }}
            />
          </ScrollView>
        </RBSheet>
        <Calendar
          hideTimePicker={hideTimePicker}
          isTimePickerVisible={isTimePickerVisible}
          setSelectedDate={setSelectedEndDate}
        />
        <Calendar
          hideTimePicker={hideTimePicker}
          isTimePickerVisible={isTimePickerVisible}
          setSelectedDate={setSelectedStartTime}
        />
      </View>
    );
  };
  const itemCard = ({item}) => {
    return <EducationCard item={item} />;
  };

  return (
    <SafeAreaView style={MainStyling.mainContainer}>
      <View style={[MainStyling.screenPadding, {marginVertical: wp('7%')}]}>
        <Text style={[styles.heading, {color: colors.black}]}>Education</Text>
        <Text style={[MainStyling.subHeading, styles.paragraph]}>
          We provide recommendations and choose according to your interests
        </Text>
        <View style={{marginBottom: 20}}>
          <View>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              data={study}
              keyExtractor={item => item.id}
              renderItem={itemCard}
            />
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          dropDownRef.current.open();
        }}
        style={styles.smallButton}>
        <MaterialCommunityIcons
          name={'plus'}
          size={wp('6%')}
          color={colors.white}
        />
      </TouchableOpacity>

      {Dropdown()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: wp('5.6%'),
    textAlign: 'center',
    fontWeight: 'bold',
  },
  paragraph: {
    textAlign: 'center',
    marginVertical: wp('3%'),
    color: colors.gray,
  },

  title: {
    fontSize: wp('4.5%'),
    color: colors.black,
  },
  subtitle: {
    color: colors.grey,
  },
  session: {
    marginVertical: wp('2.3%'),
    color: colors.grey,
  },
  smallButton: {
    height: wp('11%'),
    width: wp('11%'),
    borderRadius: 25,
    backgroundColor: colors.primary,
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: wp('5%'),
    right: wp('3.5%'),
  },
  height25: {
    height: wp('6.6%'),
  },
  sheetContainer: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 25,
    alignItems: 'center',
  },
});
export default Education;
