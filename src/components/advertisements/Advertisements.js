import React from 'react';
import {View, Text, Pressable, StyleSheet, ImageBackground} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MainStyling from '../../assets/styles/MainStyling';
import colors from '../../assets/colors/colors';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Add_IMAGE} from '../../apis/apis';

const Advertisements = ({item}) => {
  return (
    <Pressable onPress={() => {}}>
      <ImageBackground
        style={[styles.imageStyle, {marginRight: wp('4%')}]}
        source={{uri: `${Add_IMAGE}${item?.image}`}}
        imageStyle={{borderRadius: 25}}></ImageBackground>
      <View
        style={[
          styles.imageStyle,
          {position: 'absolute', backgroundColor: 'rgba(0, 0, 0, 0.6)'},
        ]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text
            style={[
              MainStyling.subHeading,
              {color: colors.white, fontWeight: '700'},
            ]}>
            {item?.company_name?.substring(0, 30)}
          </Text>
          <View style={styles.hours}>
            <Feather name={'clock'} size={wp('4%')} color={colors.white} />
            <Text
              style={[
                MainStyling.mediumText,
                {color: colors.white, marginLeft: 5},
              ]}>
              {item?.time}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            bottom: 0,
            justifyContent: 'space-between',
            right: 0,
            left: 0,
            padding: 20,
          }}>
          <View>
            <View style={styles.buttonContainer}>
              <Text style={[MainStyling.mediumText]}>
                {item?.tag?.substring(0, 30)}
              </Text>
            </View>
            <Text
              style={[
                MainStyling.paragraph,
                {color: colors.white, width: wp('65%')},
              ]}>
              {item?.description?.substring(0, 60)}
            </Text>
          </View>
          <View style={styles.containerEye}>
            <Feather name={'eye'} size={wp('5%')} color={colors.white} />
            <Text style={[MainStyling.heading, {color: colors.white}]}>
              {item?.views}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    height: wp('47%'),
    width: wp('85%'),
    padding: 20,
    borderRadius: 25,
  },
  hours: {
    height: wp('7%'),
    borderRadius: 5,
    flexDirection: 'row',
    backgroundColor: colors.black,
    paddingHorizontal: wp('3%'),
    alignItems: 'center',
  },
  buttonContainer: {
    backgroundColor: colors.grey_white,
    padding: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginVertical: wp('1%'),
  },
  containerEye: {
    padding: 5,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
});

export default Advertisements;
