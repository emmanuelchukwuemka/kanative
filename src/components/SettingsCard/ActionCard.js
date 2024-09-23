import React, {useRef, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Feather from 'react-native-vector-icons/Feather';
import RBSheet from 'react-native-raw-bottom-sheet';
import {TouchableOpacity} from 'react-native';
import MainStyling from '../../assets/styles/MainStyling';
import colors from '../../assets/colors/colors';
import {PieChart} from 'react-native-chart-kit';

const ActionCard = () => {
  const dropDownWeekRef = useRef();
  const [selectedWeek, setSelectedWeek] = useState('');
  const [week, setWeek] = useState([
    {
      title: 'Daily',
    },
    {
      title: 'Weekly',
    },
    {
      title: 'Wednesday',
    },
    {
      title: 'Monthly',
    },
    {
      title: 'Yearly',
    },
  ]);

  const data = [
    {
      name: 'Complete',
      population: 40,
      color: colors.green,
      legendFontColor: colors.green,
      legendFontSize: wp('4%'),
    },
    {
      name: 'Incomplete',
      population: 30,
      color: colors.primary,
      legendFontColor: colors.primary,
      legendFontSize: wp('4%'),
    },
    {
      name: 'Inp rogress',
      population: 30,
      color: colors.secondary,
      legendFontColor: colors.secondary,
      legendFontSize: wp('4%'),
    },
  ];

  const weekCard = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.userbox}
        onPress={() => {
          setSelectedWeek(item?.title);
          dropDownWeekRef.current.close();
        }}>
        <Text style={MainStyling.buttonText}>{item?.title}</Text>
        <View style={[styles.bar]}></View>
      </TouchableOpacity>
    );
  };

  const DropdownWeek = () => {
    return (
      <View style={styles.dropDownContainer}>
        <RBSheet
          ref={dropDownWeekRef}
          closeOnDragDown={true}
          height={350}
          closeOnPressMask={true}
          customStyles={{
            wrapper: {
              backgroundColor: 'rgba(0,0,0,0.6)',
            },
            draggableIcon: {
              backgroundColor: colors.primary,
              width: wp('13%'),
            },
            container: [styles.sheetContainer, MainStyling.screenPadding],
          }}>
          <View style={MainStyling.divider}></View>

          <SafeAreaView style={{flex: 1}}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              vertical={true}
              data={week}
              keyExtractor={item => item.id}
              renderItem={weekCard}
            />
          </SafeAreaView>
        </RBSheet>
      </View>
    );
  };

  return (
    <View style={[MainStyling?.screenPadding]}>
      <View style={[MainStyling.divider]}></View>
      <Text style={{textAlign: 'center'}}>Actions not available...</Text>
      <View style={[MainStyling.dividerTwo]}></View>

      {DropdownWeek()}
    </View>
  );
};

const styles = StyleSheet.create({
  userbox: {
    paddingHorizontal: wp('2%'),
    padding: wp('1%'),
    marginVertical: wp('2%'),
    borderRadius: 20,
    paddingHorizontal: wp('5%'),
    justifyContent: 'center',
  },
  dropDownContainer: {
    borderRadius: 50,
  },
  sheetContainer: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  bar: {
    marginTop: wp('1%'),
    borderRadius: 5,
    borderBlockColor: colors.light_grey,
    borderWidth: 1,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
  },
});

export default ActionCard;
