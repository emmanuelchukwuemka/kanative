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

const Linedchart = () => {
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

  state = {
    datasource: [
      {month: 'Jan', students: 30, teachers: 20, staff: 15, parents: 10},
      {month: 'Feb', students: 450, teachers: 25, staff: 20, parents: 15},
      {month: 'Mar', students: 28, teachers: 18, staff: 12, parents: 8},
      {month: 'Apr', students: 800, teachers: 50, staff: 30, parents: 25},
      {month: 'May', students: 99, teachers: 600, staff: 40, parents: 30},
      {month: 'Jun', students: 43, teachers: 35, staff: 25, parents: 20},
      {month: 'Jul', students: 43, teachers: 35, staff: 25, parents: 20},
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
              backgroundColor: colors.white,
              backgroundGradientFrom: colors.white,
              backgroundGradientTo: colors.white,
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
    <View>
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
        {this.LineChart_Dynamic()}
        {DropdownWeek()}
      </View>
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
});

export default Linedchart;
