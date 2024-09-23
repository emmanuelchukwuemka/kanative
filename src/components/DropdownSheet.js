import React from 'react';
import {Text, StyleSheet, View, TouchableOpacity, FlatList} from 'react-native';
import colors from '../assets/colors/colors';
import MainStyling from '../assets/styles/MainStyling';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import RBSheet from 'react-native-raw-bottom-sheet';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const DropdownSheet = ({
  dropDownRef,
  size,
  itemStyle,
  dropDownArray,
  containerStyle,
  onPress,
}) => {
  return (
    <View style={styles.dropDownContainer}>
      <RBSheet
        ref={dropDownRef}
        closeOnDragDown={true}
        height={size}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0,0,0,0.6)',
          },
          draggableIcon: {
            backgroundColor: colors.primary,
            width: wp('13%'),
          },
          container: [styles.sheetContainer, MainStyling?.screenPadding],
        }}>
        <View style={MainStyling?.divider} />
        <FlatList
          data={dropDownArray}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={[containerStyle, styles.touchContainer]}
              onPress={() => {
                onPress(item);
                dropDownRef.current.close();
              }}>
              <MaterialCommunityIcons
                style={{marginHorizontal: wp('2%')}}
                name={item.title === 'Delete' ? 'delete' : 'pencil'}
                size={wp('7%')}
                color={item.title === 'Delete' ? colors.red : colors.black}
              />
              <Text
                style={[
                  MainStyling.header,
                  {color: item.title === 'Delete' ? colors.red : colors.black},
                ]}>
                {item?.title}
              </Text>
            </TouchableOpacity>
          )}
        />
      </RBSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  sheetContainer: {
    backgroundColor: colors.white,
    borderTopWidth: 2,
    borderColor: colors.primary,
    borderRadius: 25,
  },
  dropDownContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  touchContainer: {
    marginVertical: wp('2%'),
    flexDirection: 'row',
    alignItems: 'center',
    // borderWidth: 1,
    borderRadius: 8,
    marginVertical: wp('0.2%'),
    paddingHorizontal: wp('5%'),
    padding: wp('3%'),
    borderRadius: 20,
  },
});

export default DropdownSheet;
