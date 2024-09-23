import React from 'react';
import {
  Text,
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import colors from '../assets/colors/colors';
import MainStyling from '../assets/styles/MainStyling';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const Headers = ({title, iconLeft}) => {
  const navigation = useNavigation();

  return (
    <>
      <StatusBar backgroundColor={colors.white} barStyle="dark-content" />

      <SafeAreaView style={[Styles.main, Styles.view]}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {iconLeft === false ? null : (
            <TouchableOpacity
              style={{marginRight: wp('2%')}}
              onPress={() => {
                navigation.goBack();
              }}>
              <MaterialCommunityIcons
                name={'keyboard-backspace'}
                size={wp('8%')}
                color={colors.black}
              />
            </TouchableOpacity>
          )}
          {title ? (
            <Text style={[MainStyling.Navbar, {flex: 1}]}>{title}</Text>
          ) : null}

          <Image
            source={{
              uri: 'https://plus.unsplash.com/premium_photo-1665663927708-e3287b105c44?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            }}
            style={{
              height: wp('10%'),
              width: wp('10%'),
              borderRadius: 300,
              backgroundColor: colors.light_grey,
            }}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

const Styles = StyleSheet.create({
  view: {
    paddingHorizontal: wp('5%'),
    paddingVertical: wp('3%'),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
});

export default Headers;
