import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../assets/colors/colors';
import MainStyling from '../../assets/styles/MainStyling';
import Button from '../Button';
import {useDispatch, useSelector} from 'react-redux';
import {onProfileView, updateProfile} from '../../apis/auth-apis';
import {setClientProfile} from '../../reduxes/ProfileSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CompanyIntro = ({changeTab, companyDetail}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const companyProfile = useSelector(
    state => state?.ProfileSlice?.clientProfile,
  );
  console.log(companyDetail, 'BusinessProfileBusinessProfileBusinessProfile');
  const [text, setText] = useState(companyDetail?.companyDescription);

  const onUpdateProfile = async () => {
    const details = {
      companyID: JSON.parse(await AsyncStorage.getItem('@emailStores'))?.id,
      companyName: companyProfile?.companyName,
      address: companyProfile?.address,
      bio: text,
      url: companyProfile?.url,
    };
    updateProfile(details)
      .then(response => {
        console.log('Response: ', response);
        dispatch(
          setClientProfile({
            companyName: companyProfile?.companyName,
            companyID: '',
            address: companyProfile?.address,
            url: companyProfile?.url,
            description: text,
          }),
        );

        navigation.navigate('ProfileCompletedSucess');
      })
      .catch(({response}) => {
        console.log(response);
      });
  };

  const getProfile = async () => {
    const details = {
      companyID: JSON.parse(await AsyncStorage.getItem('@emailStores'))?.id,
    };
    onProfileView(details)
      .then(response => {
        console.log('Response:sa ', response?.company?.URL);
        setText(response?.company?.description);
      })
      .catch(({response}) => {
        console.log(response);
      });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getProfile();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={MainStyling.mainContainer}>
        <View
          style={[
            MainStyling.screenPadding,
            {marginVertical: wp('7%'), flex: 1.7},
          ]}>
          <Text style={[styles.heading, {color: colors.black}]}>
            Company intro
          </Text>
          <Text style={[MainStyling.subHeading, styles.paragraph]}>
            We provide recommendations and choose according to your interests
          </Text>
          <Text style={{marginVertical: wp('1%')}}>Company intro</Text>
          <TextInput
            style={styles.input}
            value={text}
            multiline={true}
            numberOfLines={4}
            placeholder={'text'}
            label={'Degree'}
            onChangeText={value => {
              setText(value);
            }}
          />
          <Text style={[MainStyling.label, styles.align, {color: colors.gray}]}>
            {text?.length}/500
          </Text>
        </View>
        <Button
          label={'Update'}
          buttonStyle={{margin: 10}}
          labelStyle={[MainStyling.buttonText]}
          onPress={() => {
            onUpdateProfile();
            // dispatch(setStringValue('company'));
            // navigation.navigate('Login');
          }}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
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
  card: {
    flex: 1,
    marginVertical: wp('5%'),
  },
  cardBox: {
    height: wp('85%'),
    width: wp('85%'),
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.primary,
    padding: wp('3%'),
    marginVertical: wp('2%'),
  },

  subtitle: {
    fontSize: wp('4.5%'),
    color: colors.black,
  },
  align: {
    textAlign: 'right',
  },
  title: {
    fontSize: wp('4%'),
    fontWeight: 'bold',
  },
  input: {
    height: wp('40%'), // Adjusted height
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

export default CompanyIntro;
