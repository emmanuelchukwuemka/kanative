import React, {useState} from 'react';
import {StyleSheet, Text, View, SafeAreaView, TextInput} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../assets/colors/colors';
import MainStyling from '../../assets/styles/MainStyling';
import FonStyling from '../../assets/styles/FontStyling';
import Button from '../Button';
import {useDispatch, useSelector} from 'react-redux';
import {setStaffProfile} from '../../reduxes/ProfileSlice';

const About = ({changeTab, indexValue}) => {
  const dispatch = useDispatch();
  const staffProfile = useSelector(state => state?.ProfileSlice?.staffProfile);
  const [text, setText] = useState(indexValue?.praofessionalSummary);
  console.log(staffProfile, 'staffProfileprofileSliceprofileSliceprofileSlice');
  return (
    <SafeAreaView style={MainStyling.mainContainer}>
      <View
        style={[
          MainStyling.screenPadding,
          {marginVertical: wp('7%'), flex: 1.7},
        ]}>
        <Text style={[styles.heading, {color: colors.black}]}>Summary</Text>
        <Text style={[MainStyling.subHeading, styles.paragraph]}>
          We provide recommendations and choose according to your interests
        </Text>
        <Text style={{marginVertical: wp('1%')}}>Bio</Text>
        <TextInput
          style={styles.input}
          value={text}
          multiline={true}
          numberOfLines={4}
          placeholder={'text'}
          label={'Degree'}
          onChangeText={value => {
            setText(value);
          }}
        />
    <Text style={[MainStyling.label, styles.align, {color: colors.gray}]}>
          {text?.length}/500
        </Text>
        {/* <FlatList
          showsVerticalScrollIndicator={false}
          vertical={true} // showsHorizontalScrollIndicator={false}
          // horizontal={true}
          data={introduce}
          keyExtractor={item => item.id}
          renderItem={itemCard}
        /> */}
       <View style={{flex:0.3,backgroundColor:"red,"}}>
        <Button
          label={'Next'}
          labelStyle={[MainStyling.buttonText]}
          onPress={() => {
            navigation.navigate('Education');
          }}
        />
        </View>

    
      </View>
      <Button
        label={'Next'}
        buttonStyle={{margin: 10}}
        labelStyle={[MainStyling.buttonText]}
        onPress={() => {
          dispatch(
            setStaffProfile({
              ...staffProfile,
              summary: text,
            }),
          );

          changeTab();
        }}
      />
    </SafeAreaView>
  );
};

export default About;
const styles = StyleSheet.create({
  heading: {
    fontSize: wp('5.6%'),
    textAlign: 'center',
    fontWeight: 'bold',
  },
  paragraph: {
    textAlign: 'center',
    marginVertical: wp('3%'),
    color: colors.gray,
  },
  card: {
    flex: 1,
    marginVertical: wp('5%'),
  },
  cardBox: {
    height: wp('85%'),
    width: wp('85%'),
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.primary,
    padding: wp('3%'),
    marginVertical: wp('2%'),
  },

  subtitle: {
    fontSize: wp('4.5%'),
    color: colors.black,
  },
  align: {
    textAlign: 'right',
  },
  title: {
    fontSize: wp('4%'),
    fontWeight: 'bold',
  },
  input: {
    height: wp('80%'),
    width: wp('87%'),
    borderColor: colors.light_sky,
    borderWidth: 2,
    borderRadius: 7,
    textAlignVertical: 'top',
    padding: wp('4%'),
    marginVertical: wp('2%'),
    fontFamily: FonStyling.regular,
  },
});
