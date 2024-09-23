import React, {useRef, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import colors from './../constants/colors';
import {COLORS} from './../constants';

const Boxes = () => {
  const [boxes, setBoxes] = useState(['', '', '', '']);

  const [focusedIndex, setFocusedIndex] = useState(0);
  const inputRefs = useRef([null, null, null, null]);

  const handleTextChange = (index, value) => {
    const updatedBoxes = [...boxes];
    updatedBoxes[index] = value;
    setBoxes(updatedBoxes);

    if (value && index < boxes.length - 1) {
      inputRefs.current[index + 1].focus();
      setFocusedIndex(index + 1);
    }
  };

  const handleFocus = index => {
    setFocusedIndex(index);
  };

  return (
    <View style={styles.boxContainer}>
      {boxes.map((box, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => inputRefs.current[index].focus()}>
          <TextInput
            ref={ref => (inputRefs.current[index] = ref)}
            keyboardType="numeric"
            value={box}

            maxLength={1}
            placeholder={''}
            onChangeText={value => handleTextChange(index, value)}
            onFocus={() => handleFocus(index)}
            style={[
              styles.TextInput,

              {
                borderColor:
                  index === focusedIndex ? COLORS.primary : COLORS.grayLight,
              },
            ]}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Boxes;

const styles = StyleSheet.create({
  boxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: wp('8.3%'),
  },
  TextInput: {
    fontSize: wp('10%'),
    textAlign: 'center',
    width: wp('17%'),
    height: wp('17%'),
    borderRadius: wp('2%'),
    borderWidth: 2,
    borderColor: colors.grayLight,
  },
  numeric: {
    fontWeight: 'bold',
    color: colors.black,
    marginVertical: wp('1.9%'),
  },
});
