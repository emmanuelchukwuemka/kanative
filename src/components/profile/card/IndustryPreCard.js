import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import colors from '../../../assets/colors/colors';
import CheckBox from '@react-native-community/checkbox';
import MainStyling from '../../../assets/styles/MainStyling';

const IndustryPreCard = ({item, setSelectedPreference, selectedPreference}) => {
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    setIsSelected(
      selectedPreference.some(preference => preference.id === item.id),
    );
  }, []);

  const handleCheckBoxChange = () => {
    if (!isSelected) {
      setSelectedPreference(prevPreferences => {
        const uniquePreferences = new Set([...prevPreferences, item]);
        return [...uniquePreferences];
      });
    } else {
      setSelectedPreference(prevPreferences => {
        return prevPreferences.filter(preference => preference.id !== item.id);
      });
    }
    setIsSelected(!isSelected);
  };

  return (
    <TouchableOpacity
      onPress={handleCheckBoxChange}
      style={[
        styles.card,
        {
          backgroundColor: isSelected ? colors.primary : colors.white,
        },
      ]}>
      <View style={styles.imageV}>
        <Image
          style={styles.imageStyle}
          source={require('./../../../assets/images/getStarted.jpg')}
        />
      </View>
      <Text
        style={[
          MainStyling.subHeading,
          styles.title,
          {
            color: isSelected ? colors.white : colors.primary,
          },
        ]}>
        {item?.title}
      </Text>
      <View style={{position: 'absolute', right: wp('1.5%'), top: wp('1.5%')}}>
        <CheckBox
          boxType="square"
          value={isSelected}
          onTintColor={colors.white}
          onCheckColor={colors.white}
          onValueChange={handleCheckBoxChange}
          tintColors={{
            true: colors.white,
            false: colors.green,
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
