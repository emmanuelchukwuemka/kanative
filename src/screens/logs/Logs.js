import React, {useRef, useState} from 'react';
import {StyleSheet, Text, View, SafeAreaView, ScrollView} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../assets/colors/colors';
import Headers from '../../components/Headers';
import MainStyling from '../../assets/styles/MainStyling';
import Button from '../../components/Button';
import Slider from '@react-native-community/slider';
import {useNavigation} from '@react-navigation/native';

const Logs = () => {
  const navigation = useNavigation();

  const LogCard = ({title}) => {
    const [value, setValue] = useState(0);

    return (
      <View
        style={{
          backgroundColor: colors.off_white,
          borderRadius: 17,
          padding: wp('2%'),
          borderWidth: 1.5,
          borderColor: colors.light_grey,
          paddingHorizontal: wp('2%'),
          paddingVertical: wp('3%'),
          marginVertical: wp('1%'),
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={[MainStyling.header, {flex: 1}]}>{title}</Text>
          <View
            style={{
              backgroundColor: colors.primaryOpacity,
              padding: wp('2%'),
              borderRadius: 25,
              borderWidth: 1.5,
              borderColor: colors.primary,
              marginVertical: wp('3%'),
            }}>
            <Text
              style={[
                MainStyling.subHeading,
                {
                  color: colors.primary,
                  paddingHorizontal: wp('4%'),
                },
              ]}>
              Clarity
            </Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={[MainStyling.mainContainer, {}]}>
      <Headers iconLeft={false} title={'Hello, Jasmine'} />
      <View style={[MainStyling.dividerTwo]}></View>

      <Button
        label={'Submit'}
        labelStyle={[MainStyling.buttonText]}
        outerStyle={{marginHorizontal: wp('20%'), marginVertical: wp('2%')}}
        onPress={() => {
          navigation.navigate('Coach');
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default Logs;
