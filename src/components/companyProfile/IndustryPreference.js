import React, {useState, useRef} from 'react';
import {StyleSheet, Text, View, SafeAreaView, FlatList} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MainStyling from '../../assets/styles/MainStyling';
import colors from '../../assets/colors/colors';
import IndustryPreCard from './card/IndustryPreCard';

const IndustryPreference = () => {
  const [selectedPreference, setSelectedPreference] = useState([]);
  const [preference, setPreference] = useState([
    {
      id: 1,
      title: 'Business',
      image: require('./../../assets/images/getStarted.jpg'),
    },
    {
      id: 2,
      title: 'Accouting',
      image: require('./../../assets/images/getStarted.jpg'),
    },
    {
      id: 3,
      title: 'Graphic Designer',
      image: require('./../../assets/images/getStarted.jpg'),
    },
    {
      id: 4,
      title: 'Marketing',
      image: require('./../../assets/images/getStarted.jpg'),
    },
    {
      id: 5,
      title: 'Education',
      image: require('./../../assets/images/getStarted.jpg'),
    },
    {
      id: 5,
      title: 'Programmer',
      image: require('./../../assets/images/getStarted.jpg'),
    },
  ]);

  const itemCard = ({item, index}) => {
    return (
      <IndustryPreCard
        selectedPreference={selectedPreference}
        setSelectedPreference={setSelectedPreference}
        item={item}
        index={index}
      />
    );
  };

  return (
    <SafeAreaView style={MainStyling.mainContainer}>
      <View
        style={[
          MainStyling.screenPadding,
          {marginVertical: wp('7%'), flex: 1.7},
        ]}>
        <Text style={[styles.heading, {color: colors.black}]}>
          Choose the industry
        </Text>
        <Text style={[styles.heading, {color: colors.black}]}>preference</Text>
        <Text style={[MainStyling.subHeading, styles.paragraph]}>
          We provide recommendations and choose according to your interests
        </Text>
        <View style={styles.flatList}>
          <FlatList
            numColumns={2}
            showsVerticalScrollIndicator={false}
            data={preference}
            keyExtractor={item => item.id}
            renderItem={itemCard}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputView: {
    // flexDirection: 'row',
    width: '100%',
    // height: wp('10%'),
    borderRadius: 8,
    paddingVertical: wp('2%'),
    borderWidth: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    marginTop: wp('3%'),
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: {width: 0, height: 0.3},
        shadowOpacity: 0.1,
      },
      android: {
        elevation: 2,
        backgroundColor: colors.white, // Use a red background for the shadow on Android
      },
    }),
    // activeTintColor: '#3761C5',
  },

  heading: {
    fontSize: wp('5.6%'),
    textAlign: 'center',
    fontWeight: '600',
  },
  paragraph: {
    textAlign: 'center',
    marginVertical: wp('2%'),
  },
  marginV: {
    marginVertical: wp('2.5%'),
  },
  h20: {
    height: wp('5.6%'),
  },

  card: {
    height: wp('40%'),
    width: wp('40%'),
    borderRadius: 10,
    borderColor: colors.primary,
    borderWidth: 1,
    backgroundColor: colors.white,
  },
  buttonV: {
    flex: 0.3,
  },
  flatList: {
    marginVertical: wp('4%'),
    marginBottom: wp('25%'),
    alignItems: 'center',
  },
});

export default IndustryPreference;
