
import React from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MainStyling from '../../assets/styles/MainStyling';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../../assets/colors/colors';

const AddSkillTags = ({item, itemRemove}) => {
  const navigation = useNavigation();

  return (
    <View style={[styles.card]}>
      <Text style={[MainStyling.label, {color: colors.white}]}>{item}</Text>
      <View style={styles.crossButton}>
        <Pressable
          onPress={() => {
            itemRemove(item);
          }}>
          <Feather name={'x'} size={wp('4%')} color={colors.primary} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp('3%'),
    paddingRight: wp('7%'),
    height: wp('7%'),
    marginHorizontal: wp('0.7%'),
    borderRadius: 300,
  },
  crossButton: {
    height: wp('5%'),
    width: wp('5%'),
    backgroundColor: colors.sky_background,
    position: 'absolute',
    right: 4,
    borderRadius: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default AddSkillTags;
