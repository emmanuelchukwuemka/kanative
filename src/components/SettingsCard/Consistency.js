import React, {useRef, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {BarChart, LineChart} from 'react-native-chart-kit';
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

const ConsistencyCard = () => {
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

  state = {
    dataSource: [
      {month: 'Habit1', value: 5, color: colors.primary},
      {month: 'Goal', value: 4, color: colors.secondary},
      {month: 'Habit2', value: 8, color: colors.primary},
      {month: 'Goal', value: 6, color: colors.secondary},
      {month: 'Habit3', value: 9, color: colors.primary},
      {month: 'Goal', value: 3, color: colors.secondary},
      {month: 'Habit4', value: 8, color: colors.primary},
      {month: 'Goal', value: 6, color: colors.secondary},
    ],
  };

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
    <View style={{}}>
      <View style={[MainStyling.divider]}></View>

      <Text style={{textAlign: 'center'}}>Consistency not available...</Text>

      {DropdownWeek()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: wp('5%'),
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chartStyle: {
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    backgroundColor: 'white',
  },
  userbox: {
    paddingHorizontal: wp('2%'),
    padding: wp('1%'),
    marginVertical: wp('2%'),
    borderRadius: 20,
    paddingHorizontal: wp('5%'),
    justifyContent: 'center',
  },
});

export default ConsistencyCard;
