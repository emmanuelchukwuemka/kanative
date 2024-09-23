import React from 'react';
import CheckBox from '@react-native-community/checkbox';
import {colors} from '../utils';

const CheckBoxes = ({disabled, value, setValue, boxType, borderWidth}) => {
  return (
    <>
      <CheckBox
        disabled={disabled}
        value={value}
        onValueChange={newValue => console.log(newValue)}
        boxType={boxType}
        borderWidth={borderWidth}
        borderColor={colors.dark_blue}
        onFillColor={colors.primary_blue}
        onTintColor={colors.dark_blue}
        onCheckColor={colors.dark_blue}
      />
    </>
  );
};
export default CheckBoxes;
