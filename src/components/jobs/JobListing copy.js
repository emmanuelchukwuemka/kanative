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

const JobListing = () => {
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
      {invites.length > 0 ? (
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
          <View style={[styles.align, {flex: 2}, MainStyling?.screenPadding]}>
            <Image
              source={require('./../../assets/images/wellcome.png')}
              style={styles.image}
            />
          </View>
          <View style={[{flex: 2}]}>
            <View style={MainStyling.divider} />
            <View style={[styles.align]}>
              <Text style={[MainStyling.buttonText, styles.title]}>
                No job yet!
              </Text>
              <Text style={[MainStyling.label, {color: colors.gray}]}>
                Find for jobs according to the skills you have, there are
                thousands of jobs waiting for you
              </Text>
            </View>
            <View style={[, {marginVertical: wp('5%')}]}>
              <Button
                label={'Create job'}
                labelStyle={[MainStyling.buttonText]}
                onPress={() => {
                  navigation.navigate('CreateJob', {preItem: {}});
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
  card: {
    flex: 1,
    height: wp('6%'),
    backgroundColor: colors.grayLight,
    borderRadius: 20,
    marginVertical: wp('3.1%'),
    marginHorizontal: wp('1.4%'),
    paddingHorizontal: wp('3%'),
  },
  flexR: {
    flexDirection: 'row',
  },
  title: {
    color: colors.black,
  },
});

export default JobListing;