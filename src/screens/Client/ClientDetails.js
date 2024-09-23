import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  FlatList,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../assets/colors/colors';
import MainStyling from '../../assets/styles/MainStyling';
import Button from '../../components/Button';
import Headers from '../../components/Headers';

const ClientDetails = () => {
  const [clinet, setClient] = useState([
    {
      title: 'Client Habit 1',
    },
    {
      title: 'Client Habit 2',
    },
    {
      title: 'Client Habit 3',
    },
    {
      title: 'Client Habit 4',
    },
  ]);

  const clientCard = ({item}) => {
    return (
      <View>
        <View
          style={[
            {flexDirection: 'row', alignItems: 'center', padding: wp('4%')},
          ]}>
          <MaterialCommunityIcons
            name="check-circle-outline"
            size={wp('6%')}
            color={colors.secondary}
            onPress={() => {}}
          />
          <Text style={[MainStyling.buttonText, {marginLeft: wp('2%')}]}>
            {item?.title}
          </Text>
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
          <View
            style={[
              {
                borderRadius: 15,
                borderColor: colors.light_grey,
                borderWidth: 1,
              },
            ]}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              vertical={true}
              data={clinet}
              keyExtractor={item => item.id}
              renderItem={clientCard}
            />
          </View>

          <View style={[MainStyling.divider]}></View>
          <View style={[styles.boxtwo]}>
            <Text style={[MainStyling.subHeading, {color: colors.black}]}>
              Lorem ipsum amet, consectetur adipiscing elite, sed do eiusmod
              Lorem ipsum amet, consectetur adipiscing elite, sed do eiusmod
            </Text>
          </View>
        </View>
        <View style={[MainStyling.divider]}></View>
        <View style={[{marginHorizontal: wp('18%')}]}>
          <Button
            label={'Client Details'}
            labelStyle={[MainStyling.buttonText]}
            onPress={() => {}}
          />
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
    backgroundColor: colors.white,
    borderRadius: 15,
    marginHorizontal: wp('0%'),
    paddingHorizontal: wp('4%'),
    paddingVertical: wp('5%'),
  },
});
export default ClientDetails;
