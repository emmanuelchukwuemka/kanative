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

const Input = ({
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
  iconSize,
  keyboardType,
}) => {
  const [focus, setFocus] = useState('0');
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
            borderColor: focus == '1' ? colors.primary : colors.light_gray,
            paddingLeft: iconPosition === 'left' ? wp('8%') : wp('5%'),
          },
        ]}>
        <TextInput
          keyboardType={keyboardType ? keyboardType : 'default'}
          defaultValue={defaultValue}
          value={value}
          style={Styles.textInput}
          placeholder={placeholder}
          onChangeText={onChangeText}
          onFocus={text => {
            setFocus('1');
          }}
          onEndEditing={() => {
            setFocus('0');
          }}
          secureTextEntry={secureTextEntry == true ? true : false}
          maxLength={maxLength}
        />
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
    height: wp('12.5%'),
    borderRadius: 8,
    backgroundColor: colors.white,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: colors.gray,
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.7,
      },
      android: {
        elevation: 3,
        backgroundColor: colors.white,
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

export default Input;
