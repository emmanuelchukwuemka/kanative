import React from 'react';
import {View, Text, SafeAreaView, StatusBar, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import {StyleSheet} from 'react-native';
import colors from '../../assets/colors/colors';
import MainStyling from '../../assets/styles/MainStyling';
import Button from '../../components/Button';
import {useNavigation} from '@react-navigation/native';

const WelCome = () => {
const navigation = useNavigation();


  return (
    <LinearGradient
      colors={[colors.light_primary, colors.primary, colors.dark_primary]}
      style={[styles.linearGradient]}>
      <SafeAreaView />
      <StatusBar />
      <View style={[MainStyling.alignmentCenter, {flex: 4}]}>
        <Text style={[MainStyling.titleHeading, {color: colors.white}]}>
          Welcome To
        </Text>
        <View style={[MainStyling.divider]}></View>
        <Image
          source={require('../../assets/images/jpg/WhiteCamera.png')}
          style={styles.image}
          resizeMode="contain" // Ensures the image retains its aspect ratio
        />
        <View style={[MainStyling.divider]}></View>

        <Text
          style={[
            MainStyling.buttonText,
            {color: colors.white, width: wp('65%'), textAlign: 'center'},
          ]}>
          A Social Platform that allows you to share quality photos and videos.
          Also connect with friends and have fun
        </Text>
      </View>
      <View style={[MainStyling.screenPadding,{}]}>
        <Button
          label="Get Started"
          iconName="send"
          outerStyle={{borderRadius: 30,}}
          variant="outline"
          onPress={() => {
            navigation.navigate('GetStarted')
          }}
        />
      </View>
      <View style={[MainStyling.divider]}></View>
 
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },

  image: {
    height: wp('53%'),
    width: wp('53%'),
  },
});
export default WelCome;
