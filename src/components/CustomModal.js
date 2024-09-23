import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  Modal,
} from 'react-native';
import colors from '../assets/colors/colors';
import MainStyling from '../assets/styles/MainStyling';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Button from './Button';
import Feather from 'react-native-vector-icons/Feather';
import Input from './Input';
import InputBox from './InputBox';

const CustomModal = ({
  setShowModal,
  showModal,
  modalType,
  onCancelButtonPress,
  onSubmitButtonPress,
}) => {
  const [values, setValues] = useState('');
  return (
    <Modal visible={showModal} transparent={true} animationType="slide">
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: -10,
              top: -10,
              backgroundColor: colors.off_white,
              borderWidth: 2,
              borderColor: colors.gray,
              borderRadius: 300,
            }}
            onPress={() => setShowModal(false)}>
            <Feather
              name="x"
              size={30}
              color={colors.primary}
              style={{padding: wp('1%')}}
            />
          </TouchableOpacity>
          <Text style={MainStyling?.heading}>According to most sources</Text>
          <View style={[MainStyling.dividerTwo]} />
          {modalType === 'input' ? (
            <>
              <InputBox
                value={values}
                placeholder={'Overall'}
                label={'Overall'}
                onChangeText={value => {
                  setValues(value);
                }}
                onIconPress={() => console.log('OK')}
              />
            </>
          ) : (
            <>
              <Text style={[MainStyling?.mediumText, {color: colors.grey}]}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris{' '}
              </Text>
            </>
          )}

          <View style={[MainStyling.divider]} />

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Button
              variant={'outline'}
              outerStyle={{marginHorizontal: wp('1%'), flex: 1}}
              label={'Cancel'}
              onPress={() => {
                onCancelButtonPress();
              }}
            />
            <Button
              outerStyle={{marginHorizontal: wp('1%'), flex: 1}}
              label={'Submit'}
              onPress={() => {
                onSubmitButtonPress();
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  circleSetting: {
    backgroundColor: colors.light_grey,
    padding: wp('2%'),
    borderRadius: 200,
    alignItems: 'centre',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalHeader: {
    padding: wp('8%'),
    backgroundColor: colors.white,
    borderRadius: 10,
    // marginHorizontal: wp('2%'),
  },
  modalContent: {
    backgroundColor: 'red',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    // marginBottom: 20,
  },
});

export default CustomModal;
