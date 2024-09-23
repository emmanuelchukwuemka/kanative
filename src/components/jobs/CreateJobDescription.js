import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import colors from '../../assets/colors/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MainStyling from '../../assets/styles/MainStyling';
import Button from '../Button';
import {useDispatch} from 'react-redux';

const CreateJobDescription = ({valuePicker, indexValue}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState('');
  const [duties, setDuties] = useState(indexValue?.duties);
  const [requirements, setRequirements] = useState(indexValue?.requirements);

  const onAdded = () => {
    console.log('indexValue', indexValue);
    setErrorMessage('');
    if (duties == undefined) {
      setErrorMessage('Job duties required');
    } else if (requirements == undefined) {
      setErrorMessage('Job requirements date required');
    } else {
      valuePicker(indexValue, {
        duties: duties,
        requirements: requirements,
      });
      navigation.navigate('PreviewJob', {
        jobDetails: indexValue,
        description: {
          duties: duties,
          requirements: requirements,
        },
      });
    }
  };
  return (
    <SafeAreaView style={MainStyling.mainContainer}>
      <ScrollView style={[MainStyling.screenPadding]}>
        <Text style={[styles.heading, {marginVertical: wp('2%')}]}>
          Job description
        </Text>
        <Text style={[MainStyling.subHeading, styles.paragraph]}>
          We provide recommendations and choose according to your interests
        </Text>
        <View style={{marginVertical: wp('1%')}}>
          <Text style={MainStyling.header}>Job duties</Text>
        </View>
        <TextInput
          style={styles.input}
          value={duties}
          multiline={true}
          numberOfLines={4}
          placeholder={'text'}
          label={'Degree'}
          onChangeText={value => {
            setDuties(value);
          }}
        />
        <View style={{marginVertical: wp('1%')}}>
          <View style={MainStyling.divider}></View>
          <Text style={MainStyling.header}>Job requirements</Text>
        </View>
        <TextInput
          style={styles.input}
          value={requirements}
          multiline={true}
          numberOfLines={4}
          placeholder={'text'}
          label={'Degree'}
          onChangeText={value => {
            setRequirements(value);
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
          label={'Done'}
          labelStyle={[MainStyling.buttonText]}
          onPress={() => {
            onAdded();
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  heading: {
    color: colors.black,
    fontSize: wp('5.6%'),
    textAlign: 'center',
    fontWeight: 'bold',
  },
  paragraph: {
    textAlign: 'center',
    marginVertical: wp('5%'),
    color: colors.gray,
  },
  card: {
    flex: 1,
    height: wp('3%'),
    width: wp('83%'),
    borderColor: colors.light_sky,
    borderWidth: 1,
    borderRadius: 10,
    padding: wp('4.5%'),
    marginVertical: wp('1%'),
    ...Platform.select({
      ios: {
        shadowColor: colors.primary,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.3,
      },
      android: {
        elevation: 3,
        backgroundColor: colors.white,
      },
    }),
  },

  title: {
    marginVertical: wp('3.1%'),
    color: colors.black,
  },
  input: {
    color: colors.black,
    height: wp('45%'),
    width: wp('87%'),
    borderColor: colors.light_sky,
    borderWidth: 2,
    borderRadius: 7,
    textAlignVertical: 'top',
    padding: wp('4%'),
    marginVertical: wp('2%'),
    fontSize: wp('4.6%'),
  },
});
export default CreateJobDescription;
