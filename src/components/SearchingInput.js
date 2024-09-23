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
import colors from '../assets/colors/colors';
import * as Svgs from './../assets/images/svg';

const SearchingInput = ({
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
  icon,
  keyboardType,
}) => {
  const [focus, setFocus] = useState('0');
  const Svg = Svgs[icon];

  return (
    <>
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
            <Feather name={'search'} size={wp('5%')} color={colors.gray} />
          </Pressable>
        )}
        <TextInput
          defaultValue={defaultValue}
          value={value}
          placeholderTextColor={colors.gray}
          keyboardType={'default'}
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
      </View>
    </>
  );
};

const Styles = StyleSheet.create({
  inputView: {
    flexDirection: 'row',
    height: wp('12.5%'),
    borderRadius: 8,
    marginVertical: wp('2%'),
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
      },
    }),
  },
  textInput: {
    color: colors.black,
    flex: 1,
    marginHorizontal: wp('1%'),
  },

  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    height: wp('10'),
    width: wp('10'),
  },
});

export default SearchingInput;
