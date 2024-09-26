// import React, {useEffect} from 'react';
// import {StyleSheet, SafeAreaView, Image} from 'react-native';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import colors from '../../assets/colors/colors';
// import {useNavigation} from '@react-navigation/native';

// const GetStarted = () => {
//   const navigation = useNavigation();

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       navigation.navigate('Login');
//     }, 1000);

//     return () => clearTimeout(timer);
//   }, [navigation]);

//   return (
//     <SafeAreaView style={styles.container}>
//       <Image
//         style={styles.imageStyle}
//         source={require('./../../assets/images/logo.jpg')}
//       />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: colors.secondary,
//     alignItems: 'center',
//     justifyContent: 'center',
//     flex: 1,
//   },
//   imageStyle: {borderRadius: 20, height: wp('35%'), width: wp('35%')},
// });

// export default GetStarted;

import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  StyleSheet,
} from 'react-native';
import MainStyling from '../../assets/styles/MainStyling';
import colors from '../../assets/colors/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import Button from '../../components/Button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const GetStarted = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={[MainStyling.mainContainer, {backgroundColor: colors.off_white}]}>
      <StatusBar barStyle="light-content" />
      <View style={[MainStyling.divider]}></View>
      <View style={[MainStyling.divider]}></View>

      <View style={[MainStyling.screenPadding, {flex: 1}]}>
        <View style={[MainStyling.divider]}></View>

        <Text style={[MainStyling.buttonText, {color: colors.primary}]}>
          Get Started..
        </Text>

        <View style={[MainStyling.alignmentCenter, {flex: 1}]}>
          <Image
            source={require('../../assets/images/jpg/PrimaryCamera.png')}
            style={[styles.image]}
            resizeMode="contain"
          />
        </View>

        <Button
          label="Log In"
          iconName="send"
          outerStyle={{borderRadius: 30}}
          onPress={() => {
            navigation.navigate('Login');
          }}
        />
      </View>
      <View style={{minHeight: wp('2%')}}></View>
      <LinearGradient
        colors={[colors.light_primary, colors.primary, colors.dark_primary]}
        style={[MainStyling.screenPadding, styles.linearGradient]}>
        <View style={{minHeight: wp('2%')}}></View>
        <Button
          label="Sign Up"
          iconName="send"
          outerStyle={{borderRadius: 30}}
          variant="outline"
          onPress={() => {
            navigation.navigate('Register');
          }}
        />
        <View style={{alignItems: 'center'}}>
          <View style={[MainStyling.divider]}></View>
          <View style={[MainStyling.divider]}></View>
          <View style={[MainStyling.divider]}></View>

          <View style={[{flexDirection: 'row', alignItems: 'center'}]}>
            <View style={[styles.line]}></View>
            <Text
              style={[
                MainStyling.label,
                {color: colors.off_white, marginHorizontal: wp('3%')},
              ]}>
              Connect with
            </Text>
            <View style={[styles.line]}></View>
          </View>
          <View style={[MainStyling.divider]}></View>
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
      </LinearGradient>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  image: {
    height: wp('30%'),
    width: wp('30%'),
  },
  line: {
    borderColor: colors.off_white,
    borderWidth: 0.2,
    width: wp('27%'),
    height: wp('0.2%'),
  },
});

export default GetStarted;
