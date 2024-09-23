import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import MainStyling from '../../assets/styles/MainStyling';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../assets/colors/colors';
import {useNavigation} from '@react-navigation/native';

const InvitesCard = ({item}) => {
  const navigation = useNavigation();

  const itemCard = ({item}) => {
    return (
      <View style={styles.itemSmallCard}>
        <Text style={[MainStyling.miniText, {color: colors.black}]}>
          {item}
        </Text>
      </View>
    );
  };

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('InviteDetail');
      }}
      style={styles.card}>
      <View style={styles.flexR}>
        <View style={styles.iconV}>
          <Image
            source={{uri: 'https://img.icons8.com/ios/452/instagram-new.png'}}
            style={styles.imageStyle}
          />
        </View>
        <View style={[styles.text]}>
          <Text style={[MainStyling.buttonText, styles.title]}>
            {item.title}
          </Text>
          <View style={styles.flexR}>
            <Text style={[MainStyling.subHeading]}>
              {item.company}
              {'  '}
            </Text>
            <Text style={[MainStyling.subHeading]}>{item.location}</Text>
          </View>
        </View>
      </View>
      <View style={MainStyling.divider}></View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View style={{flex: 0.7}}>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={item?.skills}
            keyExtractor={item => item.id}
            renderItem={itemCard}
            contentContainerStyle={styles.list}
          />
        </View>
        <View style={{flex: 0.3}}>
          <Text
            style={[
              MainStyling.subHeading,
              {
                textAlign: 'right',
                color:
                  item?.status === 'Accepted'
                    ? colors.gray
                    : item?.status === 'Decline'
                    ? colors.red
                    : colors.primary,
                fontWeight: '700',
              },
            ]}>
            {item?.status}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 20,
    backgroundColor: colors?.white,
    elevation: 4,
    shadowColor: colors.gray,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 7,
    padding: wp('5%'),
    marginVertical: wp('3.1%'),
  },
  imageStyle: {
    height: wp('6%'),
    width: wp('6 %'),
    borderRadius: 300,
  },
  flexR: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconV: {
    height: wp('12%'),
    width: wp('12%'),
    borderRadius: wp('10%'),
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',

    color: colors.black,
  },
  text: {
    marginHorizontal: wp('3%'),
    marginVertical: wp('1%'),
  },
  itemSmallCard: {
    backgroundColor: colors.light_grey,
    marginHorizontal: wp('1%'),
    borderRadius: 30,
    paddingHorizontal: wp('3%'),
    paddingVertical: wp('1.5%'),
  },

  button: {
    textAlign: 'right',
    marginLeft: 5,
  },
});
export default InvitesCard;
