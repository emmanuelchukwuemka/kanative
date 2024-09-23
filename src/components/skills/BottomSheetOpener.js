import React, {useState} from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Platform,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../../constants/colors';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import MainStyling from '../../assets/styles/MainStyling';
import AddSkillTags from './AddSkillTags';

const BottomSheetOpener = ({
  label,
  inputContainerStyle,
  onIconPress,
  secureTextEntry,
  iconPosition,
  iconName,
  iconSize,
  flatlist,
  arrayData,
  data,
  ref,
  flatListRef,
  onContentSizeChange,
  setSkill,
}) => {
  const [focus, setFocus] = useState('0');

  const itemRemove = items => {
    const updatedSkill = arrayData.filter(item => item.title !== items?.title)
    setSkill(updatedSkill);
  };

  const itemCard = ({item}) => {
    return <AddSkillTags itemRemove={itemRemove} item={item} />;
  };

  return (
    <>
      <Text style={[MainStyling.label, {marginVertical: wp('1%')}]}>
        {label ? label : ''}
      </Text>
      <TouchableOpacity
        onPress={() => {
          onIconPress();
        }}
        style={[
          Styles.inputView,
          {...inputContainerStyle},
          {
            borderColor: focus == '1' ? colors.primary : colors.grayLight,
            paddingLeft: wp('5%'),
            paddingRight: wp('10%'),
          },
        ]}>
        <View style={Styles.textInput}>
          <Text style={[MainStyling.label, Styles.label]}>
            {flatlist ? (
              <FlatList
                ref={flatListRef}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={arrayData ? arrayData : []}
                keyExtractor={item => item?.id}
                renderItem={itemCard}
                onContentSizeChange={onContentSizeChange}
              />
            ) : (
              data
            )}
          </Text>

        </View>
        {label === 'Password' ||
        label === 'Confirm Password' ||
        label === 'New Password' ? (
          <View style={[Styles.icon]}>
            <Pressable
              onPress={() => {
                onIconPress();
              }}>
              <Feather
                name={secureTextEntry == true ? 'eye-off' : 'eye'}
                size={iconSize ? iconSize : wp('4%')}
                color={colors.gray}
              />
            </Pressable>
          </View>
        ) : iconPosition === 'left' ? (
          <View style={[Styles.icon, {position: 'absolute', left: 0}]}>
            <Pressable
              onPress={() => {
                onIconPress();
              }}>
              <Feather
                name={iconName}
                size={iconSize ? iconSize : wp('4%')}
                color={colors.gray}
              />
            </Pressable>
          </View>
        ) : (
          <View style={[Styles.icon, {position: 'absolute', right: 0}]}>
            <Pressable
              onPress={() => {
                onIconPress();
              }}>
              <Feather
                name={iconName}
                size={iconSize ? iconSize : wp('4%')}
                color={colors.gray}
              />
            </Pressable>
          </View>
        )}
      </TouchableOpacity>
    </>
  );
};

const Styles = StyleSheet.create({
  inputView: {
    justifyContent: 'center',
    flexDirection: 'row',
    // width: wp('86'),
    height: wp('12.5%'),
    borderRadius: 8,
    paddingTop: wp('3%'),
    paddingVertical: wp('2%'),
    borderWidth: 1,
    backgroundColor: colors.white,
    alignItems: 'center',

    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: {width: 0, height: 0.3},
        shadowOpacity: 0.1,
      },
      android: {
        elevation: 2,
        backgroundColor: colors.white,
      },
    }),
  },
  textInput: {
    flex: 1,
  },
  label: {
    color: colors.black,
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    height: wp('10'),
    width: wp('10'),
  },
});

export default BottomSheetOpener;
