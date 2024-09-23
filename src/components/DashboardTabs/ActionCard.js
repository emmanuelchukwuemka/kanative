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

  LineChart_Dynamic = () => {
    if (this.state.datasource && this.state.datasource.length) {
      return (
        <View>
          <LineChart
            data={{
              labels: this.state.datasource.map(item => item.month),
              datasets: [
                {
                  data: this.state.datasource.map(item => item.students),
                  color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`,
                },
                {
                  data: this.state.datasource.map(item => item.teachers),
                  color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
                },
                {
                  data: this.state.datasource.map(item => item.staff),
                  color: (opacity = 1) => `rgba(255, 165, 0, ${opacity})`,
                },
                {
                  data: this.state.datasource.map(item => item.parents),
                  color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
                },
              ],
            }}
            width={Dimensions.get('window').width}
            height={220}
            yAxisLabel=""
            yAxisSuffix="k"
            yAxisInterval={1}
            chartConfig={{
              backgroundColor: 'white',
              backgroundGradientFrom: 'white',
              backgroundGradientTo: 'white',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `black`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726',
              },
            }}
            bezier
            style={{
              marginVertical: wp('6%'),
              borderRadius: 16,
            }}
          />
        </View>
      );
    } else {
      return (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <Text>No data found</Text>
        </View>
      );
    }
  };

  return (
    <View style={[MainStyling?.screenPadding]}>
      <View style={[MainStyling.divider]}></View>
      <Text>Custom Date</Text>
      <View style={[MainStyling.dividerTwo]}></View>
      <View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          },
        ]}>
        <View
          style={[
            {
              height: wp('10%'),
              width: wp('42%'),
              alignItems: 'center',
              borderColor: colors.gray,
              borderWidth: 1,
              borderRadius: 10,
              paddingHorizontal: wp('4%'),
              paddingVertical: wp('1%'),
              flexDirection: 'row',
            },
          ]}>
          <Text style={[MainStyling.buttonText, {color: colors.black}]}>
            01 : 20
          </Text>
        </View>
        <View
          style={[
            {
              height: wp('10%'),
              width: wp('42%'),
              alignItems: 'center',
              borderColor: colors.gray,
              borderWidth: 1,
              borderRadius: 10,

              paddingHorizontal: wp('4%'),
              paddingVertical: wp('1%'),
              flexDirection: 'row',
              justifyContent: 'space-between',
            },
          ]}>
          {selectedWeek ? (
            <Text style={[MainStyling.buttonText, {color: colors.black}]}>
              {selectedWeek}
            </Text>
          ) : (
            <Text style={[MainStyling.buttonText, {color: colors.black}]}>
              Weekly
            </Text>
          )}

          <TouchableOpacity
            onPress={() => {
              dropDownWeekRef.current.open();
            }}>
            <Feather
              name={'chevron-down'}
              size={wp('5%')}
              color={colors.black}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={[MainStyling.dividerTwo]}></View>
      <View style={styles.container}>
        <PieChart
          data={data}
          width={Dimensions.get('window').width - 40}
          height={250}
          chartConfig={{
            backgroundColor: 'transparent',
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
          hasLegend={true}
        />
      </View>
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
