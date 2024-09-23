import React, {useState, useEffect} from 'react';
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
import {onResetPassword} from '../../apis/auth-apis';
import Loader from '../../components/Loader';

const EmailVerification = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState();
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onResetPasswordPress = async () => {
    setIsLoading(true);
    const details = {
      email: email,
    };
    onResetPassword(details)
      .then(response => {
        console.log('Response show there for ResetPassword: ', response?.data);
        navigation.navigate('CodeVerification', {
          email: email,
        });
        setIsLoading(false);
      })
      .catch(({response}) => {
        setErrorMessage(response?.data?.error);
        console.log(response?.data);
        setIsLoading(false);
      });
  };

  return (
    <SafeAreaView style={[MainStyling.mainContainer]}>
      <Headers title={'Email Verification'} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={MainStyling.screenPadding}>
        <View style={{flex: 1}}>
          <View style={MainStyling.divider}></View>
          <View style={MainStyling.divider}></View>

          <Text style={[MainStyling.buttonText, {fontSize: wp('4.3%')}]}>
            Enter your email to send verification code
          </Text>
          <View style={MainStyling.divider}></View>
          <Input
            icon={'Email'}
            value={email}
            placeholder={'Email'}
            label={'Email'}
            onChangeText={value => {
              setEmail(value);
              setErrorMessage('');
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
            label={'Send'}
            labelStyle={MainStyling.buttonText}
            onPress={() => {
              const mailformat = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

              if (email === '') {
                setErrorMessage('Enter email');
              } else if (!mailformat.test(email)) {
                setErrorMessage('Invalid email');
              } else {
                setErrorMessage('');
                onResetPasswordPress();
              }
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({});
export default EmailVerification;
