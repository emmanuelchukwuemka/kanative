import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {COLORS} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch} from 'react-redux';
import MainStyling from '../../assets/styles/MainStyling';
import colors from '../../assets/colors/colors';
import * as Svgs from '../../assets/images/svg';
import {onLogin} from '../../apis/auth-apis';
import {setUserDetail} from '../../reduxes/authSlice';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {ClientId, IOClientId} from '../../utils/config';
import GeneratePassword from '../../utils/Validations';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const [passwords, setPasswords] = useState();
  const [loginCard, setLoginCard] = useState([
    'Google',
    // 'Apple',
    // 'Twitter',
    // 'Facebook',
  ]);

  const onLoginPress = async (emails, pass) => {
    setIsLoading(true);
    const details = {
      email: emails,
      password: pass,
    };
    onLogin(details)
      .then(response => {
        console.log('Response shoe theress for logines:', response?.user);
        dispatch(setUserDetail(response?.user));
        storePassword(emails, pass);
        navigation.navigate('HomeNew');
        setIsLoading(false);
      })
      .catch(({response}) => {
        setErrorMessage(response?.data?.error);
        console.log(response?.data?.data);
        setIsLoading(false);
      });
  };

  const getPassword = async () => {
    console.log('......................');
    console.log('pass', await AsyncStorage.getItem('@password'));
    setPasswords(await AsyncStorage.getItem('@password'));
  };

  const storePassword = async (email, password) => {
    console.log('email', email, 'password');
    await AsyncStorage.setItem('@email', email);
    await AsyncStorage.setItem('@pass', password);
  };

  useEffect(() => {
    getPassword();
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
      onLoginPress(userInfo?.user?.email, passwords);
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

  // const itemCard = ({item}) => {
  //   return (
  //     // <GoogleSigninButton
  //     //   size={wp('30%')}
  //     //   color={'red'}
  //     //   onPress={_signIn}
  //     //   // disabled={this.state.isSigninInProgress}
  //     // />
  //     <>
  //       <GoogleSigninButton
  //         style={styles.googleButton}
  //         size={GoogleSigninButton.Size.Wide}
  //         color={GoogleSigninButton.Color.Dark}
  //         onPress={onGoogleButtonPress}
  //       />
  //     </>

  //     // <TouchableOpacity
  //     //   onPress={() => {
  //     //     onGoogleButtonPress();
  //     //   }}
  //     //   style={styles.card}>
  //     //   {item === 'Google' ? (
  //     //     <Svgs.Google width={30} />
  //     //   ) : item === 'Apple' ? (
  //     //     <Svgs.Apple width={30} height={25} />
  //     //   ) : item === 'Twitter' ? (
  //     //     <Svgs.Twitter width={30} />
  //     //   ) : (
  //     //     <Svgs.Facebook width={30} />
  //     //   )}

  //     //   <Text
  //     //     style={[
  //     //       MainStyling.subHeading,
  //     //       {color: colors.black, marginHorizontal: wp('2%')},
  //     //     ]}>
  //     //     {item}
  //     //   </Text>
  //     // </TouchableOpacity>
  //   );
  // };

  return (
    <SafeAreaView style={[MainStyling.mainContainer]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={MainStyling.screenPadding}>
        <View style={MainStyling.divider}></View>
        <View style={MainStyling.divider}></View>
        <Text style={[MainStyling.heading]}>Login in your account</Text>
        <View style={MainStyling.divider}></View>
        <InputField
          icon={'email'}
          value={email}
          placeholder={'Email'}
          label={'Email'}
          onChangeText={value => {
            setEmail(value);
            setErrorMessage('');
          }}
        />
        <View style={MainStyling.dividerTwo}></View>
        <InputField
          icon={'Password'}
          value={password}
          placeholder={'Password'}
          label={'Password'}
          secureTextEntry={secureTextEntry}
          onChangeText={value => {
            setPassword(value);
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
        <TouchableOpacity
          style={[
            styles.flexR,
            styles.justifyC,
            {marginVertical: wp('2%'), alignSelf: 'flex-end'},
          ]}
          onPress={() => {}}>
          <Text
            style={[MainStyling.mediumText, styles.forgotText]}
            onPress={() => {
              navigation.navigate('EmailVerification');
            }}>
            Forgot password?
          </Text>
        </TouchableOpacity>
        <View style={MainStyling.dividerTwo}></View>
        {isLoading ? (
          <ActivityIndicator size={'small'} color={colors.primary} />
        ) : (
          <Button
            label={'Login'}
            labelStyle={MainStyling.buttonText}
            onPress={() => {
              const mailformat = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
              if (email === '' || password === '') {
                setErrorMessage('Enter email and password');
              } else if (!mailformat.test(email)) {
                setErrorMessage('Invalid email');
              } else {
                setErrorMessage('');
                // navigation.navigate('Home');
                onLoginPress(email, password);
              }
            }}
          />
        )}
        <Text
          style={[
            MainStyling.paragraph,
            {
              textAlign: 'center',
              color: colors.light_black,
              marginHorizontal: wp('1%'),
            },
          ]}>
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
            {`  `} Privacy policy {` `}
          </Text>
        </Text>
        <View style={MainStyling.divider}></View>
        <View
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
        {/* {userInfo ? (
          <View style={{alignSelf: 'center', marginTop: wp('3%')}}>
            <Image
              source={{uri: userInfo?.user?.photo}}
              style={{
                alignSelf: 'center',
                height: wp('20%'),
                width: wp('20%'),
                borderRadius: 300,
                marginVertical: wp('3%'),
              }}
            />
            <Text style={[MainStyling.subHeading]}>
              User name:{' '}
              <Text style={[MainStyling.header]}>{userInfo?.user?.name}</Text>
            </Text>
            <Text style={[MainStyling.subHeading]}>
              Email name:{' '}
              <Text style={[MainStyling.header]}>{userInfo?.user?.email}</Text>
            </Text>
          </View>
        ) : null} */}

        {/* <View style={MainStyling.dividerTwo} /> */}
        {/* <FlatList
          data={loginCard}
          numColumns={2}
          style={{alignSelf: 'center'}}
          horizontal={false}
          keyExtractor={item => item?.id}
          renderItem={itemCard}
        /> */}
        <GoogleSigninButton
          style={styles.googleButton}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={onGoogleButtonPress}
        />
        <View style={MainStyling.divider} />
      </ScrollView>
      {/* <TouchableOpacity
        onPress={() => {
          onGoogleSignOut();
        }}
        style={[styles.card, {width: wp('40%')}]}>
        <Text
          style={[
            MainStyling.subHeading,
            {
              color: colors.black,
              marginHorizontal: wp('2%'),
            },
          ]}>
          Signout
        </Text>
      </TouchableOpacity> */}
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  text: {
    color: COLORS.primary,
  },
  paragraph: {
    textAlign: 'center',
    marginVertical: wp('1.5%'),
  },
  h25: {
    height: 35,
  },
  h18: {
    height: 18,
  },
  googleButton: {
    alignSelf: 'center',
  },
  subHeading: {
    textAlign: 'center',
  },
  subPraragph: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  forgotText: {
    textAlign: 'left',
    color: colors.gray,
  },
  flexR: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  justifyC: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  card: {
    padding: wp('4%'),
    // paddingHorizontal: wp('7%'),
    backgroundColor: colors.white,
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    margin: wp('1.5%'),
    flexDirection: 'row',
    shadowColor: colors.gray,
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
});
