import React from 'react';
import {StyleSheet, SafeAreaView, View, Image, StatusBar} from 'react-native';
import colors from '../assets/colors/colors';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import MainStyling from '../assets/styles/MainStyling';

const DrawerHeader = ({title, iconLeft}) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={MainStyling?.container}>
      <StatusBar backgroundColor={colors.white} barStyle="dark-content" />

      <View
        style={[
          (styles.firstContainer,
          styles.margins,
          {
            flexDirection: 'row',
            paddingHorizontal: wp('5%'),
            marginBottom: 10,
            alignItems: 'center',
            backgroundColor: colors.white,
            justifyContent: 'space-between',
          }),
        ]}>
        <Image
          style={[
            styles.imageStyles,
            {marginRight: wp('2%'), resizeMode: 'contain'},
          ]}
          source={require('./../assets/images/png/motor.png')}
        />
        <Image
          style={[
            styles.imageStyles,
            {marginRight: wp('2%'), resizeMode: 'contain'},
          ]}
          source={require('./../assets/images/png/mispa.png')}
        />

        <Feather
          onPress={() => {
            navigation.openDrawer();
          }}
          name={'menu'}
          size={wp('10%')}
          color={colors.black}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  firstContainer: {
    flex: 1,
  },

  margins: {
    marginHorizontal: wp('4'),
  },

  align: {
    justifyContent: 'center',
  },
  image: {
    height: wp('17%'),
    width: wp('17%'),
    borderRadius: 10,
  },
  imageStyles: {
    height: wp('28%'),
    width: wp('28%'),
  },
  imageStyle: {
    height: wp('47%'),
    width: wp('85%'),
    marginRight: wp('4%'),
    padding: 20,
  },
});

export default DrawerHeader;
