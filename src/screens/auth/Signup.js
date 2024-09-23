import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import RBSheet from 'react-native-raw-bottom-sheet';
import MainStyling from '../../assets/styles/MainStyling';
import colors from '../../assets/colors/colors';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {useNavigation} from '@react-navigation/native';

const Signup = () => {
  const dropDownDepartmentRef = useRef();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [department, setDepartment] = useState('');
  const [company, setCompany] = useState('');
  const [departmentArry, setDepartmentArry] = useState([
    {title: 'Department 1'},
    {title: 'Department 2'},
    {title: 'Department 3'},
    {title: 'Department 4'},
    {title: 'Department 5'},
    {title: 'Department 6'},
    {title: 'Department 7'},
  ]);

  const DropdownDepartment = () => {
    return (
      <View style={styles.dropDownContainer}>
        <RBSheet
          ref={dropDownDepartmentRef}
          closeOnDragDown={true}
          height={350}
          closeOnPressMask={true}
          customStyles={{
            wrapper: {
              backgroundColor: 'rgba(0,0,0,0.6)',
            },
            draggableIcon: {
              backgroundColor: colors.primary,
              width: wp('13%'),
            },
            container: [styles.sheetContainer, MainStyling.screenPadding],
          }}>
          <View style={MainStyling.divider}></View>

          <SafeAreaView style={{flex: 1}}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              vertical={true}
              data={departmentArry}
              keyExtractor={item => item.id}
              renderItem={departmentCard}
            />
          </SafeAreaView>
        </RBSheet>
      </View>
    );
  };

  const departmentCard = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.departmentbox}
        onPress={() => {
          setDepartment(item?.title);
          dropDownDepartmentRef.current.close();
        }}>
        <Text style={[MainStyling.buttonText, {marginVertical: wp('2%')}]}>
          {item?.title}
        </Text>
        <View style={[styles.bar]}></View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[MainStyling.mainContainer]}>
      <SafeAreaView style={{backgroundColor: colors.secondary}} />
      <ScrollView>
        <View
          style={{
            backgroundColor: colors.secondary,
            flex: 1,
          }}>
          <View
            style={{
              height: wp('43%'),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              style={{borderRadius: 20}}
              source={require('./../../assets/images/logo.jpg')}
            />
          </View>
          <View
            style={[
              {
                flex: 3,
                backgroundColor: colors.white,
                borderTopLeftRadius: 80,
              },
              MainStyling.screenPadding,
            ]}>
            <View style={[MainStyling.divider]}></View>

            <Text
              style={[
                MainStyling.titleHeading,
                {textAlign: 'center', fontWeight: 'bold'},
              ]}>
              Sign Up
            </Text>
            <View style={[MainStyling.dividerTwo]}></View>
            <Input
              value={email}
              placeholder={'Email'}
              label={'Email'}
              iconName={'mail'}
              onChangeText={value => setEmail(value)}
              onIconPress={() => console.log('OK')}
            />
            <View style={[MainStyling.dividerTwo]}></View>
            <Input
              value={phoneNo}
              placeholder={'Phone Number'}
              label={'Phone Number'}
              iconName={'mail'}
              onChangeText={value => setPhoneNo(value.replace(/[^0-9]/g, ''))}
              onIconPress={() => console.log('OK')}
              keyboardType={'numeric'}
            />
            <View style={[MainStyling.dividerTwo]}></View>
            <Input
              value={password}
              placeholder={'Passsword'}
              label={'Passwords'}
              iconName={'mail'}
              onChangeText={value => setPassword(value)}
              onIconPress={() => console.log('OK')}
            />
            <View style={[MainStyling.dividerTwo]}></View>
            <Input
              value={passwordConfirm}
              placeholder={'Passsword Confirmed'}
              label={'Password Confirmed'}
              iconName={'mail'}
              onChangeText={value => setPasswordConfirm(value)}
              onIconPress={() => console.log('OK')}
            />
            <View style={[MainStyling.dividerTwo]}></View>
            <Input
              value={department}
              placeholder={'Department'}
              label={'Department'}
              iconName={'mail'}
              onChangeText={value => setDepartment(value)}
              onIconPress={() => dropDownDepartmentRef.current.open()}
            />
            <View style={[MainStyling.dividerTwo]}></View>
            <Input
              value={company}
              placeholder={'Company'}
              label={'Company'}
              iconName={'mail'}
              onChangeText={value => setCompany(value)}
              onIconPress={() => console.log('OK')}
            />
            <View style={[MainStyling.divider]}></View>
            <View style={{marginHorizontal: wp('18%')}}>
              <Button
                label={'Sign Up'}
                labelStyle={[MainStyling.buttonText]}
                onPress={() => {
                  navigation.navigate('Login');
                }}
              />
              <View style={[MainStyling.dividerTwo]}></View>

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text>Already Have An Account?</Text>
                <Text
                  onPress={() => {
                    navigation.navigate('Login');
                  }}
                  style={[MainStyling.header, {color: colors.primary}]}>
                  {' '}
                  Log In
                </Text>
              </View>
            </View>
          </View>
        </View>
        {DropdownDepartment()}
      </ScrollView>
      <SafeAreaView style={{backgroundColor: colors.white}} />
    </View>
  );
};

const styles = StyleSheet.create({
  dropDownContainer: {
    borderRadius: 50,
  },
  sheetContainer: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  bar: {
    marginTop: wp('1%'),
    borderRadius: 5,
    borderBlockColor: colors.light_grey,
    borderWidth: 1,
  },
});

export default Signup;
