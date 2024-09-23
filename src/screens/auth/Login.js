import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MainStyling from '../../assets/styles/MainStyling';
import colors from '../../assets/colors/colors';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {useNavigation} from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLoginPress = () => {
    navigation.navigate('dashboard');
  };

  return (
    <View style={[MainStyling.mainContainer]}>
      <SafeAreaView style={{backgroundColor: colors.secondary}} />
      <ScrollView>
        <View
          style={{
            backgroundColor: colors.secondary,
            flex: 1,
          }}>
          <View
            style={{
              height: wp('55%'),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              style={{borderRadius: 20}}
              source={require('./../../assets/images/logo.jpg')}
            />
          </View>
          <View
            style={[
              {
                flex: 3,
                backgroundColor: colors.white,
                borderTopLeftRadius: 80,
              },
              MainStyling.screenPadding,
            ]}>
            <View style={[MainStyling.divider]}></View>
            <View style={[MainStyling.divider]}></View>

            <Text
              style={[
                MainStyling.titleHeading,
                {textAlign: 'center', fontWeight: 'bold'},
              ]}>
              Sign In
            </Text>
            <View style={[MainStyling.dividerTwo]}></View>
            <Input
              value={email}
              placeholder={'Email'}
              label={'Email'}
              iconName={'mail'}
              onChangeText={value => setEmail(value)}
              onIconPress={() => console.log('OK')}
            />
            <View style={[MainStyling.dividerTwo]}></View>

            <Input
              value={password}
              placeholder={'Passsword'}
              label={'Passwords'}
              iconName={'mail'}
              onChangeText={value => setPassword(value)}
              onIconPress={() => console.log('OK')}
            />
            <View style={[MainStyling.dividerTwo]}></View>

            <Text
              style={[
                MainStyling.header,
                {color: colors.secondary, textAlign: 'right'},
              ]}>
              Forgot Password?
            </Text>
            <View style={[MainStyling.divider]}></View>

            <View style={{marginHorizontal: wp('18%')}}>
              <Button
                label={'Login'}
                labelStyle={[MainStyling.buttonText]}
                onPress={() => {
                  onLoginPress();
                }}
              />

              <View style={[MainStyling.dividerTwo]}></View>

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={MainStyling.label}>Don't have an account?</Text>
                <Text
                  onPress={() => {
                    navigation.navigate('Signup');
                  }}
                  style={[MainStyling.header, {color: colors.primary}]}>
                  {' '}
                  Register
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <SafeAreaView style={{backgroundColor: colors.white}} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Login;
