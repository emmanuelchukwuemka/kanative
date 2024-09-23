import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MainStyling from '../../assets/styles/MainStyling';
import colors from '../../assets/colors/colors';
import * as Svgs from '../../assets/images/svg';
import {onRegister} from '../../apis/auth-apis';
import {useNavigation} from '@react-navigation/native';
import {ClientId, IOClientId} from '../../utils/config';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setUserDetail} from '../../reduxes/authSlice';
import {useDispatch} from 'react-redux';

const Register = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [errorMessage, setErrorMessage] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const [loginCard, setLoginCard] = useState([
    'Google',
    // 'Apple',
    // 'Twitter',
    'Facebook',
  ]);
  const [values, setValues] = useState({
    email: '',
    password: '',
    confirm_password: '',
  });

  const onChange = (name, value) => {
    setValues({
      ...values,
      [name]: value,
    });
  };

  const isPasswordValid = password => {
    const hasCapitalLetter = /[A-Z]/.test(password);
    const hasSpecialCharacter = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(
      password,
    );
    const hasNumericValue = /\d/.test(password);
    const hasMinimumLength = password.length >= 8;

    return (
      hasCapitalLetter &&
      hasSpecialCharacter &&
      hasNumericValue &&
      hasMinimumLength
    );
  };

  const storePassword = async (pass, email, password) => {
    await AsyncStorage.setItem('@password', pass);
    await AsyncStorage.setItem('@pass', email);
    await AsyncStorage.setItem('@email', password);
  };

  const onRegisterPress = async (emails, pass) => {
    // setIsLoading(false);
    // setIsLoading(true);
    setIsLoading(false);
    const details = {
      email: emails,
      password: pass,
    };
    onRegister(details)
      .then(response => {
        console.log('Response show there for Register:', response);
        if (response?.message === 'succes!') {
          setIsLoading(false);
          dispatch(setUserDetail(response?.user));
          navigation.navigate('HomeNew');
        }
        storePassword('Mispa@123', emails, pass);
        setIsLoading(false);
      })
      .catch(({response}) => {
        setErrorMessage(response?.data?.errors?.email[0]);
        console.log('Error show there for Register:', response?.data);
        setIsLoading(false);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    GoogleSignin.configure({
      androidClientId: ClientId,
      iosClientId: IOClientId,
    });
  }, []);

  const onGoogleButtonPress = async () => {
    if (userInfo) {
      onGoogleSignOut();
    }
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('User signin successful', userInfo);
      setUserInfo(userInfo);
      onRegisterPress(userInfo?.user?.email, 'Mispa@123');
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled the sign-in flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Sign-in operation is already in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play Services not available or outdated');
      } else {
        console.error('Signin Error:', error.message);
      }
    }
  };

  const onGoogleSignOut = async () => {
    try {
      await GoogleSignin.signOut();
      console.log('User signout successful');
      setUserInfo(null);
    } catch (error) {
      console.error('Signout Error:', error.message);
    }
  };

  const itemCard = ({item}) => {
    return (
      <TouchableOpacity onPress={() => {}} style={styles.card}>
        {item === 'Google' ? (
          <Svgs.Google width={30} />
        ) : item === 'Apple' ? (
          <Svgs.Apple width={30} height={25} />
        ) : item === 'Twitter' ? (
          <Svgs.Twitter width={30} />
        ) : (
          <Svgs.Facebook width={30} />
        )}

        <Text
          style={[
            MainStyling.subHeading,
            {color: colors.black, marginHorizontal: wp('2%')},
          ]}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[MainStyling.mainContainer]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={MainStyling.screenPadding}>
        <View style={MainStyling.divider}></View>
        <View style={MainStyling.divider}></View>

        <Text style={[MainStyling.heading, styles.heading]}>
          Become part of the future
        </Text>
        <View style={MainStyling.divider}></View>

        <InputField
          icon={'email'}
          value={values.email}
          placeholder={'Email'}
          label={'Email'}
          onChangeText={value => {
            onChange('email', value);
            setErrorMessage('');
          }}
        />
        <View style={MainStyling.dividerTwo}></View>
        <InputField
          icon={'Password'}
          value={values.password}
          placeholder={'Create Password'}
          label={'Create Password'}
          secureTextEntry={secureTextEntry}
          onChangeText={value => {
            onChange('password', value);
            setErrorMessage('');
          }}
          onIconPress={() => {
            setSecureTextEntry(!secureTextEntry);
          }}
        />
        <View style={MainStyling.dividerTwo}></View>

        <InputField
          icon={'Password'}
          value={values.confirm_password}
          placeholder={'Repeat Password'}
          label={'Repeat Password'}
          secureTextEntry={secureTextEntry}
          onChangeText={value => {
            onChange('confirm_password', value);
            setErrorMessage('');
          }}
          onIconPress={() => {
            setSecureTextEntry(!secureTextEntry);
          }}
        />
        {errorMessage ? (
          <Text
            style={[
              MainStyling.label,
              {color: colors.primary, marginVertical: wp('1.5%')},
            ]}>
            {errorMessage}
          </Text>
        ) : null}

        <View style={MainStyling.dividerTwo}></View>
        {isLoading ? (
          <ActivityIndicator size={'small'} color={colors.primary} />
        ) : (
          <Button
            label={'Join in community'}
            labelStyle={MainStyling.buttonText}
            onPress={() => {
              const mailformat = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
              if (values.email === '' || values.password === '') {
                setErrorMessage('Enter email and password');
              } else if (!mailformat.test(values.email)) {
                setErrorMessage('Invalid email');
              } else if (!isPasswordValid(values.password)) {
                setErrorMessage(
                  'Password must contain one capital letter, one special letter, and minimum 8 digits',
                );
              } else if (values.password != values.confirm_password) {
                setErrorMessage('Password does not match');
              } else {
                setErrorMessage('');
                //console.log(!isPasswordValid(values.password));
                // navigation.navigate('Home');
                onRegisterPress(values?.email, values?.password);
              }
            }}
          />
        )}

        <Text
          style={[
            MainStyling.paragraph,
            {
              textAlign: 'center',
              marginVertical: wp('2%'),
              color: colors.light_black,
              marginHorizontal: wp('1%'),
            },
          ]}>
          By creating an account, you agree to MISPA MOTORS
          <Text
            onPress={() => {
              navigation.navigate('TermCondition');
            }}
            style={[
              MainStyling.mediumText,
              {
                textAlign: 'center',
                marginVertical: wp('2%'),
                color: colors.primary,
                fontWeight: 'bold',
              },
            ]}>
            {`  `} Term of use {` `}
          </Text>
          and
          <Text
            onPress={() => {
              navigation.navigate('Privacy');
            }}
            style={[
              MainStyling.mediumText,
              {
                textAlign: 'center',
                marginVertical: wp('2%'),
                color: colors.primary,
                fontWeight: 'bold',
              },
            ]}>
            {`  `}Privacy policy {` `}
          </Text>
        </Text>

        <View style={MainStyling.divider}></View>

        {/* <View
          style={[
            {flexDirection: 'row', alignItems: 'center'},
            MainStyling.screenPadding,
          ]}>
          <View style={[styles.blackLine]} />
          <Text
            style={[
              MainStyling.mediumText,
              styles.subHeading,
              {flex: 1.5, color: colors.black},
            ]}>
            or connect with
          </Text>
          <View style={[styles.blackLine]} />
        </View>
        <View style={MainStyling.divider}></View>

        <FlatList
          data={loginCard}
          numColumns={2}
          horizontal={false}
          keyExtractor={item => item?.id}
          renderItem={itemCard}
        />
        <View style={MainStyling.divider}></View> */}
        <GoogleSigninButton
          style={styles.googleButton}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={onGoogleButtonPress}
        />
        <View style={MainStyling.divider} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    color: colors.primary,
  },
  paragraph: {
    textAlign: 'center',
    marginVertical: wp('1.5%'),
  },
  subHeading: {
    textAlign: 'center',
  },
  justifyC: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  card: {
    padding: wp('4%'),
    backgroundColor: colors.white,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: wp('2%'),
    shadowColor: colors.gray,
    flexDirection: 'row',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.6,
    shadowRadius: 5,
  },
  blackLine: {
    flex: 1,
    height: wp('0.5%'),
    backgroundColor: colors.light_black,
  },
  googleButton: {
    alignSelf: 'center',
  },
});
export default Register;
