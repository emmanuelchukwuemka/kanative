import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
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
import Headers from '../../components/Headers';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';


const Login = () => {
  const navigation = useNavigation();
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const onLoginPress = () => {
    navigation.navigate('dashboard');
  };

  return (
    <View
      style={[MainStyling.mainContainer, {backgroundColor: colors.off_white}]}>
      <SafeAreaView style={{backgroundColor: colors.off_white}} />
      <StatusBar barStyle="light-content" />

      <Headers />
      <View style={[MainStyling.divider]}></View>
      <View style={[MainStyling.divider]}></View>

      <Text
        style={[
          MainStyling.titleHeading,
          {textAlign: 'center', },
        ]}>
        Welcome Back !
      </Text>
      <Text
        style={[MainStyling.label, {textAlign: 'center', }]}>
        Please log in your account
      </Text>

      <View style={[MainStyling.screenPadding, {flex: 1.3}]}>
        <View style={[MainStyling.divider]}></View>
        <View style={[MainStyling.divider]}></View>
        <Input
          value={number}
          placeholder={'Phone Number'}
          iconPosition={'left'}
          iconName={'phone'}
          onChangeText={value => setNumber(value)}
          onIconPress={() => console.log('OK')}
        />
        <Input
          value={password}
          secureTextEntry={secureTextEntry}
          placeholder="Enter Password"
          iconName={secureTextEntry == true ? 'eye-off' : 'eye'}
          onChangeText={value => setPassword(value)}
          onIconPress={() => setSecureTextEntry(!secureTextEntry)}
        />
        <View style={[MainStyling.dividerTwo]}></View>

        <View style={[MainStyling.divider]}></View>
      </View>
      <View style={[MainStyling.screenPadding, {flex: 1}]}>
        <Button
          label={'Log In'}
          labelStyle={[MainStyling.buttonText]}
          onPress={() => {
            onLoginPress();
          }}
        />
        <View style={{minHeight: wp('1%')}}></View>
        <Text
          style={[
            MainStyling.label,
            {textAlign: 'right', color: colors.black},
          ]}>
          Forget Password
        </Text>

        <View style={[MainStyling.dividerTwo]}></View>
        <View style={[MainStyling.divider]}></View>

        <View style={{alignItems: 'center'}}>
          <View style={[{flexDirection: 'row', alignItems: 'center'}]}>
            <View style={[styles.line]}></View>
            <Text
              style={[
                MainStyling.label,
                {color: colors.black, marginHorizontal: wp('3%')},
              ]}>
              Connect with
            </Text>
            <View style={[styles.line]}></View>
          </View>
          <View style={[MainStyling.dividerTwo]}></View>
          <View style={{flexDirection: 'row'}}>
            <Ionicons name={'logo-google'} size={wp('9%')} color={colors.red} />
            <View style={{marginHorizontal: wp('1.5%')}}></View>
            <Ionicons
              name={'logo-facebook'}
              size={wp('9%')}
              color={colors.blue}
            />
          </View>
        </View>

       
      </View>
      <LinearGradient
      colors={[colors.light_primary, colors.primary, colors.dark_primary]}
      style={[MainStyling.screenPadding,styles.linearGradient,]}>

      </LinearGradient>
      
    </View>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex:0.5,
    // height: wp('20%'),
    // width: wp('80%'),
    borderTopLeftRadius: 300,
    borderTopRightRadius: 300,
  },
  line: {
    borderColor: colors.black,
    borderWidth: 0.2,
    width: wp('27%'),
    height: wp('0.2%'),
  },
});

export default Login;
