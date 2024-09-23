import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../../assets/colors/colors';
import MainStyling from '../../assets/styles/MainStyling';
import Headers from '../../components/Headers';

const ClientListDetails = () => {
  const [clinet, setClient] = useState([
    {
      title: 'Client 1',
    },
    {
      title: 'Client 2',
    },
  ]);
  const [habit, setHabit] = useState([
    {
      title: 'Client Habit 1',
      counting: '8',
    },
    {
      title: 'Client Habit 2',
      counting: '5',
    },
    {
      title: 'Client Habit 3',
      counting: '3',
    },
    {
      title: 'Client Habit 4',
      counting: '1',
    },
  ]);
  const clientCard = ({item}) => {
    return (
      <View style={[{marginVertical: wp('1%')}]}>
        <View
          style={[
            {
              flexDirection: 'row',
              alignItems: 'center',
              padding: wp('4%'),
              backgroundColor: colors.white,
              justifyContent: 'space-between',
              borderRadius: 13,
            },
          ]}>
          <Text style={[MainStyling.buttonText, {marginLeft: wp('2%')}]}>
            {item?.title}
          </Text>
          <View
            style={{
              backgroundColor: colors.white,
              padding: wp('1.5%'),
              paddingHorizontal: wp('3%'),
              borderRadius: 200,
              alignItems: 'centre',
            }}>
            <Feather
              name="settings"
              size={wp('6.4%')}
              color={colors.black}
              onPress={() => {}}
            />
          </View>
        </View>
        <View style={[MainStyling.dividerTwo]}></View>

        <View
          style={[
            {borderRadius: 15, borderColor: colors.light_grey, borderWidth: 1},
          ]}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            vertical={true}
            data={habit}
            keyExtractor={item => item.id}
            renderItem={habitCard}
          />
        </View>

        <View style={[MainStyling.divider]}></View>
      </View>
    );
  };
  const habitCard = ({item}) => {
    return (
      <View
        style={[
          {flexDirection: 'row', alignItems: 'center', padding: wp('4%')},
        ]}>
        <MaterialCommunityIcons
          name="check-circle-outline"
          size={wp('6%')}
          color={colors.secondary}
          onPress={() => navigation.toggleDrawer()}
        />
        <Text style={[MainStyling.buttonText, {marginLeft: wp('2%'), flex: 1}]}>
          {item?.title}
        </Text>
        <View
          style={[
            {
              backgroundColor: colors.white,
              padding: wp('1.5%'),
              paddingHorizontal: wp('3%'),
              borderRadius: 200,
              alignItems: 'centre',
            },
          ]}>
          <Text style={[MainStyling.buttonText, {}]}>{item.counting}</Text>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={[MainStyling.mainContainer, {}]}>
      <Headers title={''} />
      <View style={[MainStyling.dividerTwo]}></View>
      <ScrollView style={[MainStyling.screenPadding]}>
        <View style={[styles.box]}>
          <View style={[{borderRadius: 20}]}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              vertical={true}
              data={clinet}
              keyExtractor={item => item.id}
              renderItem={clientCard}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  box: {
    borderRadius: 15,
    backgroundColor: colors.off_white,
    padding: wp('4.5%'),
    borderRadious: 15,
  },
  bar: {
    marginTop: wp('1%'),
    borderRadius: 5,
    borderBlockColor: colors.light_grey,
    borderWidth: 1,
  },
  boxtwo: {
    alignItems: 'center',
    backgroundColor: colors.gray,
    borderRadius: 15,
    marginHorizontal: wp('0%'),
    paddingHorizontal: wp('4%'),
    paddingVertical: wp('5%'),
  },
});
export default ClientListDetails;
