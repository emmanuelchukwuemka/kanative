import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  FlatList,
  ScrollView,
} from 'react-native';
import colors from '../../constants/colors';
import MainStyling from '../../assets/styles/MainStyling';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import AvailabilityCard from './card/Availability';

const Availability = () => {
  const [selectedPreference, setSelectedPreference] = useState([]);
  const [preference, setPreference] = useState([
    {
      id: 1,
      title: 'Monday',
    },
    {
      id: 2,
      title: 'Tuesday',
    },
    {
      id: 3,
      title: 'Wednesday',
    },
    {
      id: 4,
      title: 'Thursday',
    },
    {
      id: 5,
      title: 'Friday',
    },
    {
      id: 5,
      title: 'Saturday',
    },
    {
      id: 5,
      title: 'Sunday',
    },
  ]);
  const [timeSlots, setTimeSlots] = useState([
    {
      id: 1,
      title: '6:00am - 2:00pm',
    },
    {
      id: 2,
      title: '2:00pm - 9:00pm',
    },
    {
      id: 3,
      title: '9:00pm - 06:00am',
    },
  ]);

  const itemCard = ({item, index}) => {
    return (
      <AvailabilityCard
        selectedPreference={selectedPreference}
        setSelectedPreference={setSelectedPreference}
        item={item}
        index={index}
        time={false}
      />
    );
  };

  const itemTimeCard = ({item, index}) => {
    return (
      <AvailabilityCard
        time={true}
        selectedPreference={selectedPreference}
        setSelectedPreference={setSelectedPreference}
        item={item}
        index={index}
      />
    );
  };

  return (
    <ScrollView
      style={[
        styles.container,
        MainStyling.screenPadding,
        {marginVertical: wp('7%'), flex: 1.7},
      ]}>
      <StatusBar />
      <Text style={[styles.heading, {color: colors.black}]}>
        Select your availability
      </Text>
      <Text style={[MainStyling.subHeading, styles.paragraph]}>
        We provide recommendations and choose according to your interests
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: wp('6%'),
        }}>
        <TouchableOpacity style={styles.item}>
          <Text
            style={{
              color: colors.white,
              textAlign: 'center',
            }}>
            Start date
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text
            style={{
              color: colors.white,
              textAlign: 'center',
            }}>
            End date
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.flatList}>
        <FlatList
          numColumns={2}
          showsVerticalScrollIndicator={false}
          data={preference}
          keyExtractor={item => item.id}
          renderItem={itemCard}
        />
      </View>
      <View style={styles.flatList}>
        <FlatList
          numColumns={2}
          showsVerticalScrollIndicator={false}
          data={timeSlots}
          keyExtractor={item => item.id}
          renderItem={itemTimeCard}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
  },
  item: {
    flex: 1,
    borderRadius: 8,
    padding: wp('4%'),
    margin: wp('1'),
    backgroundColor: colors.primary,
  },
  flatList: {
    marginVertical: wp('8%'),
  },
  heading: {
    fontSize: wp('5.6%'),
    textAlign: 'center',
    fontWeight: 'bold',
  },
  paragraph: {
    textAlign: 'center',
    marginVertical: wp('3%'),
  },
});

export default Availability;
