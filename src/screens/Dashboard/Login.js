import {View, StyleSheet, Image, SafeAreaView, StatusBar} from 'react-native';
import React from 'react';
import Button from '../../components/Button';
import {useNavigation} from '@react-navigation/core';
import MainStyling from '../../assets/styles/MainStyling';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import colors from '../../assets/colors/colors';

const Login = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView
      style={[MainStyling.mainContainer, {backgroundColor: colors.grey_white}]}>
      <StatusBar backgroundColor={colors.grey_white} barStyle="dark-content" />
      <View style={styles.container}>
        <Image
          source={require('./../../assets/images/png/MispaMotorsCompany.png')}
          style={styles.imageStyle}
        />
      </View>
      <View style={[styles.subContainer, MainStyling.screenPadding]}>
        <View style={styles.buttonView}>
          <Button
            variant="outline"
            label={'Login'}
            labelStyle={[MainStyling.buttonText, styles.button]}
            onPress={() => {
              navigation.navigate('dashboard', {
                navRoute: 'login',
              });
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.grey_white,
  },
  subContainer: {
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    backgroundColor: colors.grey_white,
    flex: 0.45,
  },

  paragraph: {
    marginTop: wp('4.2%'),
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  textView: {
    flex: 0.7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.primary,
  },

  buttonView: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: wp('10%'),
  },

  image: {
    width: wp('75%'),
    height: wp('75%'),
    resizeMode: 'contain',
  },
  imageStyle: {
    // width: wp('30%'),
    height: wp('30%'),
    resizeMode: 'contain',
    // backgroundColor: 'red',
  },
});
export default Login;
