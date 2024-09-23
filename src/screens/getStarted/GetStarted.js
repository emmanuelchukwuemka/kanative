import React, {useEffect} from 'react';
import {StyleSheet, SafeAreaView, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../assets/colors/colors';
import {useNavigation} from '@react-navigation/native';

const GetStarted = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Login');
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.imageStyle}
        source={require('./../../assets/images/logo.jpg')}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  imageStyle: {borderRadius: 20, height: wp('35%'), width: wp('35%')},
});

export default GetStarted;
