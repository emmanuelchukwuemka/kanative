import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, Dimensions} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';
import MainStyling from '../../../assets/styles/MainStyling';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Headers from '../../../components/Headers';
import colors from '../../../assets/colors/colors';

import Button from '../../../components/Button';


const SignUp = () => {
  return (
    <SafeAreaView style={MainStyling.mainContainer}>
      <View style={[MainStyling.screenPadding, {marginTop: wp('7%')}]}>
        <Text style={[MainStyling.heading, styles.heading]}>
          Login to
          <Text style={styles.text}> Nukraa</Text>
        </Text>
        <Text style={[MainStyling.subHeading, styles.paragraph]}>
          We're happy to see you back again!
        </Text>
        <View style={MainStyling.dividerTwo}></View>
        <View style={MainStyling.dividerTwo}></View>
        <Input
        iconName={'home'}
          value={values?.email}
          placeholder={'Email'}
          label={'Email'}
          onChangeText={value => {
            onChange('email', value);
          }}
        />
        <View style={MainStyling.dividerTwo}></View>
        <Input
          value={values?.password}
          placeholder={'Password'}
          label={'Password'}
          secureTextEntry={secureTextEntry}
          onChangeText={value => {
            onChange('password', value);
          }}
          onIconPress={() => {
            setSecureTextEntry(!secureTextEntry);
          }}
        />
        <Text style={[MainStyling.label, {color: colors.red}]}>
          {errorMessage}
        </Text>
        <View style={[styles.flexR, styles.justifyC, {marginTop: wp('3%')}]}>
          <View style={[styles.flexR]}>
            <CheckBox
              boxType="square"
              value={isChecked}
              onTintColor={colors.primary}
              onCheckColor={colors.primary}
              onValueChange={handleCheckBoxChange}
              tintColors={{true: colors.primary, false: colors.grayLight}}
              style={{transform: [{scaleX: 0.8}, {scaleY: 0.8}]}}
            />
            <Text style={[MainStyling.mediumText, styles.forgotText]}>
              Remember me
            </Text>
          </View>

          <Text
            onPress={() => navigation.navigate('ForgotPassword')}
            style={[MainStyling.mediumText, styles.forgotText]}>
            Forgot password?
          </Text>
        </View>
        <View style={MainStyling?.dividerTwo}></View>

        {isloading ? (
          <Loader />
        ) : (
          <Button
            variant="outline"
            label={'Login'}
            labelStyle={MainStyling.buttonText}
            onPress={() => {
              Authentication();
            }}
          />
        )}

        <View style={MainStyling.divider}></View>

        <Text style={[MainStyling.subHeading, styles.subHeading]}>
          Don't have an account?
          <Text
            style={styles.subPraragph}
            onPress={() => navigation.navigate(ROUTES.REGISTER)}>
            {' '}
            Sign Up
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  heading: {
    marginTop: wp('10%'),
    textAlign: 'center',
  },
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
});

export default SignUp;
