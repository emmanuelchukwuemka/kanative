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
                  color: (opacity = 1) => 'red',
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
              color: (opacity = 1) => colors.white,
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
    <View style={{}}>
      <View style={[MainStyling.divider]}></View>

      <View
        style={[
          MainStyling?.screenPadding,
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
        <BarChart
          data={{
            labels: this.state.dataSource.map(item => item.month),
            datasets: [
              {
                data: this.state.dataSource.map(item => item.value),
              },
            ],
          }}
          width={Dimensions.get('window').width - 30}
          height={300}
          yAxisLabel=""
          yAxisSuffix="k"
          yAxisInterval={1}
          chartConfig={{
            backgroundColor: colors.white,
            backgroundGradientFrom: colors.white,
            backgroundGradientTo: colors.white,
            fillShadowGradient: colors.primary,
            fillShadowGradientOpacity: 1,
            decimalPlaces: 0,
            barPercentage: 0.6,
            color: (opacity = 1, index) =>
              index % 2 === 0 ? colors.primary : colors.primary,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          style={styles.chartStyle}
        />
      </View>
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

export default ActionCard;

// import React, {useRef, useState} from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   Dimensions,
//   TouchableOpacity,
//   SafeAreaView,
//   FlatList,
// } from 'react-native';
// import {BarChart} from 'react-native-chart-kit';
// import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
// import colors from '../../assets/colors/colors';
// import MainStyling from '../../assets/styles/MainStyling';
// import Feather from 'react-native-vector-icons/Feather';
// import RBSheet from 'react-native-raw-bottom-sheet';

// const BeautifulBarChart = () => {
//   const dropDownWeekRef = useRef();
//   const [selectedWeek, setSelectedWeek] = useState('');
//   const [week, setWeek] = useState([
//     {
//       title: 'Daily',
//     },
//     {
//       title: 'Weekly',
//     },
//     {
//       title: 'Wednesday',
//     },
//     {
//       title: 'Monthly',
//     },
//     {
//       title: 'Yearly',
//     },
//   ]);

// state = {
//   dataSource: [
//     {month: 'Habit 1', value: 5, color: colors.primary},
//     {month: 'Goal', value: 4, color: colors.secondary},
//     {month: 'Habit 1', value: 8, color: colors.primary},
//     {month: 'Goal', value: 6, color: colors.secondary},
//     {month: 'Habit 1', value: 9, color: colors.primary},
//     {month: 'Goal', value: 3, color: colors.secondary},
//     {month: 'Habit 1', value: 8, color: colors.primary},
//     {month: 'Goal', value: 6, color: colors.secondary},
//   ],
// };

//   const weekCard = ({item}) => {
//     return (
//       <TouchableOpacity
//         style={styles.userbox}
//         onPress={() => {
//           setSelectedWeek(item?.title);
//           dropDownWeekRef.current.close();
//         }}>
//         <Text style={MainStyling.buttonText}>{item?.title}</Text>
//         <View style={[styles.bar]}></View>
//       </TouchableOpacity>
//     );
//   };

//   const DropdownWeek = () => {
//     return (
//       <View style={styles.dropDownContainer}>
//         <RBSheet
//           ref={dropDownWeekRef}
//           closeOnDragDown={true}
//           height={350}
//           closeOnPressMask={true}
//           customStyles={{
//             wrapper: {
//               backgroundColor: 'rgba(0,0,0,0.6)',
//             },
//             draggableIcon: {
//               backgroundColor: colors.primary,
//               width: wp('13%'),
//             },
//             container: [styles.sheetContainer, MainStyling.screenPadding],
//           }}>
//           <View style={MainStyling.divider}></View>

//           <SafeAreaView style={{flex: 1}}>
//             <FlatList
//               showsHorizontalScrollIndicator={false}
//               vertical={true}
//               data={week}
//               keyExtractor={item => item.id}
//               renderItem={weekCard}
//             />
//           </SafeAreaView>
//         </RBSheet>
//       </View>
//     );
//   };

//   renderBarChart = () => {
//     return (
//       <View style={styles.container}>
//         <View style={[MainStyling.dividerTwo]}></View>
//         <View
//           style={[
//             {
//               flexDirection: 'row',
//               alignItems: 'center',
//               justifyContent: 'space-between',
//             },
//             MainStyling?.screenPadding,
//           ]}>
//           <View
//             style={[
//               {
//                 height: wp('10%'),
//                 width: wp('42%'),
//                 alignItems: 'center',
//                 borderColor: colors.gray,
//                 borderWidth: 1,
//                 borderRadius: 10,
//                 paddingHorizontal: wp('4%'),
//                 paddingVertical: wp('1%'),
//                 flexDirection: 'row',
//               },
//             ]}>
//             <Text style={[MainStyling.buttonText, {color: colors.black}]}>
//               01 : 20
//             </Text>
//           </View>
//           <View
//             style={[
//               {
//                 height: wp('10%'),
//                 width: wp('42%'),
//                 alignItems: 'center',
//                 borderColor: colors.gray,
//                 borderWidth: 1,
//                 borderRadius: 10,

//                 paddingHorizontal: wp('4%'),
//                 paddingVertical: wp('1%'),
//                 flexDirection: 'row',
//                 justifyContent: 'space-between',
//               },
//             ]}>
//             {selectedWeek ? (
//               <Text style={[MainStyling.buttonText, {color: colors.black}]}>
//                 {selectedWeek}
//               </Text>
//             ) : (
//               <Text style={[MainStyling.buttonText, {color: colors.black}]}>
//                 Weekly
//               </Text>
//             )}

//             <TouchableOpacity
//               onPress={() => {
//                 dropDownWeekRef.current.open();
//               }}>
//               <Feather
//                 name={'chevron-down'}
//                 size={wp('5%')}
//                 color={colors.black}
//               />
//             </TouchableOpacity>
//           </View>
//         </View>
//         <View style={[MainStyling.dividerTwo]}></View>
// <BarChart
//   data={{
//     labels: this.state.dataSource.map(item => item.month),
//     datasets: [
//       {
//         data: this.state.dataSource.map(item => item.value),
//       },
//     ],
//   }}
//   width={Dimensions.get('window').width - 30}
//   height={300}
//   yAxisLabel=""
//   yAxisSuffix="k"
//   yAxisInterval={1}
//   chartConfig={{
//     backgroundColor: 'white',
//     backgroundGradientFrom: '#f7f7f7',
//     backgroundGradientTo: '#f7f7f7',
//     fillShadowGradient: colors.primary,
//     fillShadowGradientOpacity: 1,
//     decimalPlaces: 0,
//     barPercentage: 0.6,
//     color: (opacity = 1, index) =>
//       index % 2 === 0 ? colors.primary : colors.primary,
//     labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//     style: {
//       borderRadius: 16,
//     },
//     propsForDots: {
//       r: '6',
//       strokeWidth: '2',
//       stroke: '#ffa726',
//     },
//   }}
//   style={styles.chartStyle}
// />
//       </View>
//     );
//   };
//   {
//     DropdownWeek();
//   }

//   return <View>{this.renderBarChart()}</View>;
// };

// const styles = StyleSheet.create({
// container: {
//   // alignItems: 'center',
//   justifyContent: 'center',
//   marginTop: wp('5%'),
// },
// title: {
//   fontSize: 20,
//   fontWeight: 'bold',
//   marginBottom: 10,
// },
// chartStyle: {
//   borderRadius: 16,
//   shadowColor: '#000',
//   shadowOffset: {width: 0, height: 4},
//   shadowOpacity: 0.3,
//   shadowRadius: 5,
//   elevation: 8,
//   backgroundColor: 'white',
// },
// userbox: {
//   paddingHorizontal: wp('2%'),
//   padding: wp('1%'),
//   marginVertical: wp('2%'),
//   borderRadius: 20,
//   paddingHorizontal: wp('5%'),
//   justifyContent: 'center',
// },
// });

// export default BeautifulBarChart;
