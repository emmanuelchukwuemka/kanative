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
import {onVerify_code} from '../../apis/auth-apis';
import Loader from '../../components/Loader';

const CodeVerification = ({route}) => {
  const {email} = route.params;
  const navigation = useNavigation();
  const [code, setCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onVerify_codePress = async () => {
    setIsLoading(true);
    const details = {
      email: email,
      code: code,
    };
    onVerify_code(details)
      .then(response => {
        console.log('Response show there for VerifyCode: ', response?.data);
        navigation.navigate('ResetPassword', {
          email: email,
          code: code,
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
      <Headers title={'Code Verification'} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={MainStyling.screenPadding}>
        <View style={{flex: 1}}>
          <View style={MainStyling.divider}></View>
          <View style={MainStyling.divider}></View>
          <Text style={[MainStyling.buttonText, {fontSize: wp('4.3%')}]}>
            Verification code send to{' '}
            <Text style={{fontWeight: 'bold'}}>{email}</Text>
          </Text>
          <View style={MainStyling.divider}></View>
          <Input
            icon={'Email'}
            value={code}
            placeholder={'Verification Code'}
            label={'Verification Code'}
            keyboardType={'numeric'}
            onChangeText={value => {
              setCode(value);
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
            label={'Verify'}
            labelStyle={MainStyling.buttonText}
            onPress={() => {
              if (email === '') {
                setErrorMessage('Enter email');
              } else {
                setErrorMessage('');
                // navigation.navigate('Home');
                onVerify_codePress();
              }
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({});
export default CodeVerification;
