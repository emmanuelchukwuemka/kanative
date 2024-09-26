import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import ReelsComponent from '../../components/reelsCard/ReelsComponent';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../assets/colors/colors';

const Reels = () => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  return (
    <View
      style={{
        width: wp('100%'),
        height:  wp('204%'),
        // width: windowWidth,
        // height: windowHeight,
        backgroundColor: colors.white,
        position: 'relative',
      
      }}>
      
      <ReelsComponent />
    </View>
  );
};

export default Reels;
