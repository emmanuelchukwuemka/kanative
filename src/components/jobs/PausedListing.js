import React, {useState, useEffect} from 'react';
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
import Button from '../Button';
import JobListingCard from './card/JobListing';
import {useNavigation} from '@react-navigation/native';
import {jobLists} from '../../apis/job-apis';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PausedListing = () => {
  const navigation = useNavigation();
  const [invites, setInvites] = useState([]);

  const getAllJobs = async () => {
    const details = {
      companyID: JSON.parse(await AsyncStorage.getItem('@emailStores'))?.id,
    };
    jobLists(details)
      .then(response => {
        console.log('Response: jobsss: ', response);
        setInvites(response?.jobs);
      })
      .catch(({response}) => {
        console.log(response);
      });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getAllJobs();
      //   alert('ok');
    });
    return unsubscribe;
  }, []);

  const itemCard = ({item}) => {
    return <JobListingCard item={item} />;
  };

  return (
    <SafeAreaView style={MainStyling.mainContainer}>
      {invites.length < 0 ? (
        <View style={{flex: 1}}>
          <FlatList
            data={invites}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={itemCard}
          />
        </View>
      ) : (
        <SafeAreaView
          style={[MainStyling.mainContainer, MainStyling?.screenPadding]}>
          <View style={[MainStyling.alignmentCenter, {flex: 1}]}>
            <Text style={[MainStyling.buttonText, styles.title]}>
              No paused job!
            </Text>
            <Text
              style={[
                MainStyling.label,
                {
                  color: colors.grayLight,
                  textAlign: 'center',
                  marginHorizontal: wp('10%'),
                },
              ]}>
              Jobs according to the skills you have, there are thousands of jobs
              listed
            </Text>
          </View>
        </SafeAreaView>
      )}
    </SafeAreaView>
  );
};

styles = StyleSheet.create({
  title: {
    color: colors.black,
    fontWeight: 'bold',
    marginVertical: wp('2%'),
  },
});

export default PausedListing;
