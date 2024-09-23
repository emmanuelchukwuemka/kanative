import React, {useState} from 'react';
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
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

import colors from '../../assets/colors/colors';
import MainStyling from '../../assets/styles/MainStyling';
import Headers from '../../components/Headers';

const ClientList = () => {
  const [clinet, setClient] = useState([
    {
      title: 'Client 1',
    },
    {
      title: 'Client 2',
    },
    {
      title: 'Client 2',
    },
  ]);

  const clientCard = ({item}) => {
    return (
      <View style={[{marginVertical: wp('1%')}]}>
        <View style={[styles.box2]}>
          <Text
            style={[MainStyling.buttonText, {marginLeft: wp('1%'), flex: 1}]}>
            {item?.title}
          </Text>
          <View style={[styles.circle]}>
            <Feather
              name="map"
              size={wp('5%')}
              color={colors.black}
              onPress={() => {}}
            />
          </View>
          <View style={[styles.circle]}>
            <Ionicons
              name="bag-outline"
              size={wp('5%')}
              color={colors.black}
              onPress={() => {}}
            />
          </View>
          <View style={[styles.circle]}>
            <Ionicons
              name="add"
              size={wp('5%')}
              color={colors.black}
              onPress={() => {}}
            />
          </View>
          <View style={[styles.circle]}>
            <Feather
              name="settings"
              size={wp('5%')}
              color={colors.black}
              onPress={() => {}}
            />
          </View>
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
          <FlatList
            showsHorizontalScrollIndicator={false}
            vertical={true}
            data={clinet}
            keyExtractor={item => item.id}
            renderItem={clientCard}
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
  },

  circle: {
    marginHorizontal: wp('1%'),
    backgroundColor: colors.white,
    padding: wp('2%'),
    borderRadius: 200,
    alignItems: 'centre',
  },
  box2: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp('4%'),
    backgroundColor: colors.off_white,
    borderRadius: 13,
    borderWidth: 1.5,
    borderColor: colors.white,
  },
});
export default ClientList;
