import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Linking,
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
import {onDeleteAccount} from '../../apis/auth-apis';
import Headers from '../../components/Headers';
import {useSelector} from 'react-redux';

const DeleteAccount = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userDetails = useSelector(state => state.auth.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailPress = email => {
    const mailtoUrl = `mailto:${email}`;
    Linking.openURL(mailtoUrl).catch(err =>
      console.error('Error opening mail app', err),
    );
  };

  const deleteAccount = async () => {
    setIsLoading(true);
    const details = {
      token: userDetails?.api_token,
    };
    onDeleteAccount(details)
      .then(response => {
        console.log('Response shoe theress for deleteAccount:');
        navigation.navigate('LoginSetup', {
          navRoute: 'login',
        });
        setIsLoading(false);
      })
      .catch(({response}) => {
        setErrorMessage(response?.data?.error);

        setIsLoading(false);
      });
  };

  return (
    <SafeAreaView style={[MainStyling.mainContainer]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={MainStyling.screenPadding}>
        <Headers />
        <View style={MainStyling.divider}></View>
        <Text style={[MainStyling.heading]}>Delete Account</Text>
        <View style={MainStyling.divider}></View>
        <Text style={[MainStyling.mediumText, {}]}>
          We understand that you may choose to leave us. This page allows you to
          permanently delete your account and all associated data. Once
          confirmed, this action cannot be undone. If you have any concerns or
          need assistance, please contact our support team.
        </Text>
        <Text
          onPress={() => {
            handleEmailPress('support@mispamotor.com');
          }}
          style={[MainStyling.paragraph, {color: colors.primary}]}>
          support@mispamotor.com
        </Text>
        <View style={MainStyling.divider}></View>
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
          onPress={() => {}}></TouchableOpacity>
        <View style={MainStyling.dividerTwo}></View>
        {isLoading ? (
          <ActivityIndicator size={'small'} color={colors.primary} />
        ) : (
          <Button
            label={'Delete Account'}
            labelStyle={MainStyling.buttonText}
            onPress={() => {
              const mailformat = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
              if (email === '' || password === '') {
                setErrorMessage('Enter email and password');
              } else if (!mailformat.test(email)) {
                setErrorMessage('Invalid email');
              } else {
                setErrorMessage('');
                userDetails.email === email
                  ? deleteAccount()
                  : setErrorMessage('Email does not belong to loggedIn user');
              }
            }}
          />
        )}

        <View style={MainStyling.divider}></View>
        <View style={MainStyling.divider}></View>
        <View style={MainStyling.divider}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

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
    paddingHorizontal: wp('7%'),
    backgroundColor: colors.white,
    flex: 1,
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
export default DeleteAccount;
