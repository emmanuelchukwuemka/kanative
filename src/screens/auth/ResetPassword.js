import React, {useState} from 'react';
import {StyleSheet, Text, View, SafeAreaView, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Input from '../../components/InputField';
import Button from '../../components/Button';
import Headers from '../../components/Headers';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MainStyling from '../../assets/styles/MainStyling';
import colors from '../../assets/colors/colors';
import {onUpdate_passwordApi} from '../../apis/auth-apis';
import Loader from '../../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ResetPassword = ({route}) => {
  const navigation = useNavigation();
  const {email, code} = route.params;
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

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
  const storePassword = async pass => {
    await AsyncStorage.setItem('@password', pass);
  };

  const onUpdate_passwordApiPress = async () => {
    setIsLoading(true);

    const details = {
      email: email,
      password: password,
      code: code,
    };
    onUpdate_passwordApi(details)
      .then(response => {
        console.log('Response show there for UpdatePassword: ', response?.data);
        navigation.navigate('LoginSetup', {navRoute: 'login'});
        setIsLoading(false);
        storePassword(password);
        // JSON.parse(await AsyncStorage.getItem('@password'))
      })
      .catch(({response}) => {
        setErrorMessage(response?.data?.error);
        console.log(response?.data);
        setIsLoading(false);
      });
  };

  return (
    <SafeAreaView style={[MainStyling.mainContainer]}>
      <Headers title={'Email Varification'} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={MainStyling.screenPadding}>
        <View style={{flex: 1}}>
          <View style={MainStyling.divider}></View>
          <View style={MainStyling.divider}></View>

          <Text style={[MainStyling.buttonText, {fontSize: wp('4.3%')}]}>
            Reset your password with{' '}
            <Text style={{fontWeight: 'bold'}}>{email}</Text>
          </Text>
          <View style={MainStyling.divider}></View>
          <Input
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
          <View style={MainStyling.divider}></View>

          <Input
            icon={'Password'}
            value={confirmPassword}
            placeholder={'Confirm Password'}
            label={'Confirm Password'}
            secureTextEntry={secureTextEntry}
            onChangeText={value => {
              setConfirmPassword(value);
              setErrorMessage('');
            }}
            onIconPress={() => {
              setSecureTextEntry(!secureTextEntry);
            }}
          />
          <Text
            style={[
              MainStyling.label,
              {color: colors.primary, marginVertical: wp('1.5%')},
            ]}>
            {errorMessage}
          </Text>
        </View>
      </ScrollView>
      <View style={[MainStyling.screenPadding]}>
        {isLoading ? (
          <Loader />
        ) : (
          <Button
            label={'Reset Password'}
            labelStyle={MainStyling.buttonText}
            onPress={() => {
              if (password === '' && password === '') {
                setErrorMessage('Enter correct password');
              } else if (password != confirmPassword) {
                setErrorMessage('Password not match with Confirm Password');
              } else if (!isPasswordValid(password)) {
                setErrorMessage(
                  'Password must contain one capital letter, one special letter, and minimum 8 digits',
                );
              } else {
                setErrorMessage('');
                onUpdate_passwordApiPress();
              }
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({});
export default ResetPassword;
