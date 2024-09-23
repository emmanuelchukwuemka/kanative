import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../assets/colors/colors';
import CheckBox from '@react-native-community/checkbox';
import MainStyling from '../../../assets/styles/MainStyling';

const IndustryPreCard = ({
  item,
  setSelectedPreference,
  selectedPreference,
  index,
}) => {
  const [isChecked, setChecked] = useState(false);
  const [selectablePreference, setSelectablePreference] = useState(false);
  const handleCheckBoxChange = () => {
    setChecked(!isChecked);
  };
  const handlePress = newPreference => {
    setSelectablePreference(!selectablePreference);
    if (
      !selectedPreference.some(
        preference => preference.title === newPreference.title,
      )
    ) {
      setSelectedPreference([
        ...selectedPreference,
        {
          id: newPreference?.id,
          title: newPreference.title,
        },
      ]);
    }
  };

  return (
    <TouchableOpacity
      onPress={() => {
        handlePress(item);
      }}
      style={[
        styles.card,
        {
          backgroundColor: selectablePreference ? colors.primary : colors.white,
        },
      ]}>
      <View style={styles.imageV}>
        <Image style={styles.imageStyle} source={item.image} />
      </View>
      <Text
        style={[
          MainStyling.subHeading,
          styles.title,
          {
            color: selectablePreference ? colors.white : colors.black,
          },
        ]}>
        {item?.title}
      </Text>
      <View style={{position: 'absolute', right: wp('1.5%'), top: wp('1.5%')}}>
        <CheckBox
          boxType="square"
          value={selectablePreference ? true : false}
          onTintColor={colors.white}
          onCheckColor={colors.white}
          onValueChange={handleCheckBoxChange}
          tintColors={{
            true: selectablePreference ? colors.white : colors.green,
            false: colors?.gray,
          }}
          style={{
            transform: [{scaleX: 0.8}, {scaleY: 0.8}],
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    height: wp('40%'),
    width: wp('40%'),
    borderRadius: 10,
    borderColor: colors.primary,
    borderWidth: 1,

    alignItems: 'center',
    justifyContent: 'center',
    margin: wp('1.5%'),
  },
  imageV: {
    backgroundColor: colors.light_sky,
    height: wp('15%'),
    width: wp('15%'),
    borderRadius: 35,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    marginVertical: wp('4%'),
  },
  imageStyle: {
    height: wp('8%'),
    width: wp('8%'),
  },
});
export default IndustryPreCard;
