import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Image,
} from 'react-native';
import colors from '../../constants/colors';
import MainStyling from '../../assets/styles/MainStyling';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import InvitesCard from './InvitesCard';
import Button from '../Button';
import {useSelector} from 'react-redux';

const Allinvites = () => {
  const [invites, setInvites] = useState([
    {
      title: 'Fulltime UI/UX Designer',
      company: 'Bandung',
      location: 'Indonesia',
      skills: ['Design ', 'Fulltime', 'UI/U Design ', 'Accepted'],
      status: 'Accepted',
    },
    {
      title: 'Intern Graphic Designer',
      company: 'Jakrta',
      location: 'Indonesia',
      skills: ['Design ', 'Fulltime', 'UI/UX '],
      status: 'Decline',
    },
    {
      title: 'Ux Designer',
      company: 'Samarinda',
      location: 'Indonesia',
      skills: ['Design ', 'Fulltime', 'UI/UX '],
      status: 'View',
    },
    {
      title: 'Fulltime UI/UX Designer',
      company: 'Bandung',
      location: 'Indonesia',
      skills: ['Design ', 'Fulltime', 'UI/UX '],
      status: 'View',
    },
    {
      title: 'Fulltime UI/UX Designer',
      company: 'Bandung',
      location: 'Indonesia',
      skills: ['Design ', 'Fulltime', 'UI/UX '],
      status: 'View',
    },
    {
      title: 'Fulltime UI/UX Designer',
      company: 'Bandung',
      location: 'Indonesia',
      skills: ['Design ', 'Fulltime', 'UI/UX '],
      status: 'View',
    },
  ]);

  const itemCard = ({item}) => {
    return <InvitesCard item={item} />;
  };
  //

  return (
    <SafeAreaView style={MainStyling.mainContainer}>
      {invites.length > 0 ? (
        <FlatList
          data={invites}
          style={{paddingHorizontal: wp('4%')}}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={itemCard}
        />
      ) : (
        //  </View>
        <SafeAreaView
          style={[MainStyling.mainContainer, MainStyling?.screenPadding]}>
          <View style={[styles.align, {flex: 2}, MainStyling?.screenPadding]}>
            <Image
              source={require('./../../assets/images/wellcome.png')}
              style={styles.image}
            />
          </View>
          <View style={[{flex: 2}]}>
            <View style={[MainStyling.divider, styles.align]}>
              <Text style={[MainStyling.buttonText, styles.title]}>
                No job invites yet!
              </Text>
              <Text style={[MainStyling.subHeading]}>
                Find for jobs according to the skills you have, there are
                thousands of jobs waiting for you
              </Text>
            </View>
            <View style={[, {marginVertical: wp('5%')}]}>
              <Button
                label={'Creat job'}
                labelStyle={[MainStyling.buttonText]}
                onPress={() => {
                  navigation.navigate('CreateJob');
                }}
              />
            </View>
          </View>
        </SafeAreaView>
      )}
    </SafeAreaView>
  );
};

styles = StyleSheet.create({
  image: {
    width: wp('45%'),
    height: wp('45%'),
    position: 'absolute',
    bottom: wp('1%'),
    alignItems: 'center',
  },
  align: {alignItems: 'center'},
  title: {
    marginVertical: 20,
    color: colors.black,
    fontWeight: 'bold',
  },
});

export default Allinvites;
