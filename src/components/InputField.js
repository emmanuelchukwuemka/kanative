import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Platform,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import MainStyling from '../assets/styles/MainStyling';
import colors from '../assets/colors/colors';
// import * as Svgs from '../assets/images/svg';

const InputField = ({
  defaultValue,
  label,
  placeholder,
  value,
  onChangeText,
  inputContainerStyle,
  maxLength,
  onIconPress,
  secureTextEntry,
  iconPosition,
  iconName,
  icon,
  iconSize,
  keyboardType,
}) => {
  const [focus, setFocus] = useState('0');
  // const Svg = Svgs[icon];

  return (
    <>
      <Text style={[MainStyling.label, {marginVertical: wp('1%')}]}>
        {label ? label : ''}
      </Text>

      <View
        style={[
          Styles.inputView,
          {...inputContainerStyle},
          {
            borderColor: focus == '1' ? colors.primary : colors.grayLight,
            paddingLeft: iconPosition === 'left' ? wp('8%') : wp('5%'),
          },
        ]}>
        {icon && (
          <Pressable
            onPress={() => {
              onIconPress();
            }}>
            {/* <Svg
              width={wp('4.5%')}
              height={wp('4.5%')}
              style={{marginRight: wp('2%')}}
            /> */}
          </Pressable>
        )}
        <TextInput
          maxLength={maxLength}
          defaultValue={defaultValue}
          value={value}
          placeholderTextColor={colors.gray}
          keyboardType={keyboardType ? keyboardType : 'default'}
          style={Styles.textInput}
          placeholder={placeholder}
          onChangeText={onChangeText}
          autoCapitalize="none"
          onFocus={text => {
            setFocus('1');
          }}
          onEndEditing={() => {
            setFocus('0');
          }}
          secureTextEntry={secureTextEntry == true ? true : false}
        />
        {icon === 'Password' ||
        icon === 'Confirm Password' ||
        icon === 'New Password' ? (
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
                // onIconPress();
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
      </View>
    </>
  );
};

const Styles = StyleSheet.create({
  inputView: {
    flexDirection: 'row',
    // width: wp('86'),
    height: wp('12.5%'),
    borderRadius: 8,
    marginVertical: wp('0.5%'),
    // borderWidth: 1,
    backgroundColor: colors.white,
    alignItems: 'center',

    ...Platform.select({
      ios: {
        shadowColor: colors.light_black,
        shadowOffset: {width: 2, height: 1},
        shadowOpacity: 0.5,
      },
      android: {
        elevation: 2,
        // backgroundColor: colors.light_black,
      },
    }),
  },
  textInput: {
    color: colors.black,
    flex: 1,
  },

  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    height: wp('10'),
    width: wp('10'),
  },
});

export default InputField;
