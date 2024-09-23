import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MainStyling from '../../assets/styles/MainStyling';
import Headers from '../../components/Headers';
import colors from '../../assets/colors/colors';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const Tools = () => {
  const [categoryValue, setCategoryValue] = useState('');
  const [scroreValue, setScroreValue] = useState('');
  const [timeValue, setTimeValue] = useState('');

  const CategoryCard = ({title, changedvalue, onValueChange}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          onValueChange(title);
        }}
        style={{
          backgroundColor: colors.off_white,
          padding: wp('5%'),
          borderRadius: 15,
          marginVertical: wp('4%'),
          marginHorizontal: wp('1%'),
        }}>
        <Text
          style={[
            MainStyling.mediumText,
            {
              fontWeight: changedvalue === title ? 'bold' : 0,
              color: changedvalue === title ? colors.primary : colors.black,
            },
          ]}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  };
  const AnalyticsCard = ({title, onValueChange}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          onValueChange(title);
        }}
        style={{
          backgroundColor: colors.off_white,
          padding: wp('5%'),
          borderRadius: 15,
          marginVertical: wp('2%'),
          marginHorizontal: wp('1%'),
          flex: 1,
          alignItems: 'center',
        }}>
        <Text style={[MainStyling.mediumText, {fontWeight: '400'}]}>
          {title}
        </Text>
        <View style={MainStyling.flxDirection}>
          <View
            style={{
              borderRadius: 300,
              borderWidth: 2,
              borderColor: colors.lightRed,
              padding: wp('2%'),
              marginVertical: wp('2%'),
              marginHorizontal: wp('1%'),
            }}>
            <Text
              style={[
                MainStyling.header,
                {color: colors.primary, fontWeight: 'bold'},
              ]}>
              0
            </Text>
          </View>
          <View
            style={{
              borderRadius: 300,
              borderWidth: 2,
              borderColor: colors.primaryOpacity,
              padding: wp('2%'),
              marginVertical: wp('2%'),
              marginHorizontal: wp('1%'),
            }}>
            <Text
              style={[
                MainStyling.header,
                {color: colors.orange, fontWeight: 'bold'},
              ]}>
              0
            </Text>
          </View>
          <View
            style={{
              borderRadius: 300,
              borderWidth: 2,
              borderColor: colors.greenOpacity,
              padding: wp('2%'),
              marginVertical: wp('2%'),
              marginHorizontal: wp('1%'),
            }}>
            <Text
              style={[
                MainStyling.header,
                {color: colors.green, fontWeight: 'bold'},
              ]}>
              0
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView
      style={[MainStyling?.mainContainer, {backgroundColor: colors.white}]}>
      <Headers iconLeft={false} title={'Hello, Jasmine'} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={MainStyling.screenPadding}>
        <View style={[MainStyling.divider]} />

        <Text style={MainStyling?.Navbar}>Category</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <CategoryCard
            changedvalue={categoryValue}
            onValueChange={setCategoryValue}
            title={'Personal'}
          />
          <CategoryCard
            changedvalue={categoryValue}
            onValueChange={setCategoryValue}
            title={'Relationship'}
          />
          <CategoryCard
            changedvalue={categoryValue}
            onValueChange={setCategoryValue}
            title={'Overall'}
          />
        </View>
        <View style={[MainStyling.dividerTwo]}></View>

        <Text style={MainStyling?.Navbar}>Score</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <CategoryCard
            changedvalue={scroreValue}
            onValueChange={setScroreValue}
            title={'0 - 3'}
          />
          <CategoryCard
            changedvalue={scroreValue}
            onValueChange={setScroreValue}
            title={'4 - 7'}
          />
          <CategoryCard
            changedvalue={scroreValue}
            onValueChange={setScroreValue}
            title={'8 - 10'}
          />
        </View>
        <View style={[MainStyling.dividerTwo]}></View>

        <Text style={MainStyling?.Navbar}>Time</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <CategoryCard
            changedvalue={timeValue}
            onValueChange={setTimeValue}
            title={'All Time'}
          />
          <CategoryCard
            changedvalue={timeValue}
            onValueChange={setTimeValue}
            setTimeValue={setTimeValue}
            title={'YTD'}
          />
          <CategoryCard
            changedvalue={timeValue}
            onValueChange={setTimeValue}
            setTimeValue={setTimeValue}
            title={'Last 7 days'}
          />
        </View>
        <View style={MainStyling.flxDirection}>
          <AnalyticsCard title={'Personal'} />
          <AnalyticsCard title={'Relationship'} />
        </View>
        <View style={MainStyling.flxDirection}>
          <AnalyticsCard title={'Work'} />
          <AnalyticsCard title={'Overall'} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default Tools;
