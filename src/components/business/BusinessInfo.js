import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Button from '../../components/Button';
import colors from '../../assets/colors/colors';
import MainStyling from '../../assets/styles/MainStyling';
import Feather from 'react-native-vector-icons/Feather';
import Input from '../../components/Input';
// import {launchImageLibrary} from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import {onProfileView} from '../../apis/auth-apis';
import {setClientProfile, setCompanyProfile} from '../../reduxes/ProfileSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BusinessInfo = ({changeTab}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const companyProfile = useSelector(
    state => state?.ProfileSlice?.clientProfile,
  );
  const [business, setBusiness] = useState(companyProfile?.companyName);
  const [website, setWebsite] = useState(companyProfile?.url);
  const [location, setLocation] = useState(companyProfile?.address);
  const [selectImage, setSelectImage] = useState('');

  // const ImagePicker = () => {
  //   let options = {
  //     storageOptions: {
  //       path: 'image',
  //     },
  //   };

  //   launchImageLibrary(options, response => {
  //     if (response?.didCancel) {
  //     } else {
  //       setSelectImage(response?.assets[0]?.uri);
  //     }
  //   });
  // };

  const getProfile = async () => {
    const details = {
      companyID: JSON.parse(await AsyncStorage.getItem('@emailStores'))?.id,
    };
    onProfileView(details)
      .then(response => {
        console.log('Response:sa ', response?.company?.URL);
        setBusiness(response?.company?.companyName);
        setWebsite(response?.company?.URL);
        setLocation(response?.company?.address);
      })
      .catch(({response}) => {
        console.log(response);
      });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getProfile();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={[MainStyling.mainContainer]}>
      <ScrollView
        style={MainStyling.screenPadding}
        showsVerticalScrollIndicator={false}>
        <View style={[{marginVertical: wp('7%'), flex: 1.8}]}>
          <Text style={[styles.heading, {color: colors.black}]}>
            Complete your business information
          </Text>
          <Text style={[MainStyling.subHeading, styles.paragraph]}>
            We provide recommendations and choose according to your interests
          </Text>
        </View>

        {/* Commenting this out to hide profile update code in Edit Profile */}
        {/* <View style={[{flexDirection: 'row', flex: 1.1}]}>
          <Text style={[MainStyling.label]}>Business Logo</Text>
          <View style={[MainStyling.alignmentCenter, {marginLeft: wp('4.9%')}]}>
            {selectImage ? (
              <Image
                style={{
                  height: wp('24'),
                  width: wp('24%'),
                  borderRadius: 300,

                  borderWidth: 1.5,
                  borderColor: colors.white,
                }}
                source={{uri: selectImage}}
              />
            ) : (
              <Image
                style={{
                  height: wp('24'),
                  width: wp('24%'),
                  borderRadius: 300,
                  borderWidth: 1.5,
                  borderColor: colors.white,
                }}
                source={require('./../../assets/images/jpg/user.jpg')}
              />
            )}
            <TouchableOpacity
              onPress={() => {
                ImagePicker();
              }}
              style={styles.camera}>
              <Feather name={'camera'} size={wp('5%')} color={colors.white} />
            </TouchableOpacity>
          </View>
        </View> */}

        <Input
          value={business}
          placeholder={'Business name'}
          label={'Business name'}
          onChangeText={value => {
            setBusiness(value);
          }}
        />
        <View style={MainStyling.dividerTwo}></View>
        <Input
          value={website}
          placeholder={'Website'}
          label={'Website'}
          onChangeText={value => {
            setWebsite(value);
          }}
        />
        <View style={MainStyling.dividerTwo}></View>
        <Input
          value={location}
          placeholder={'Location'}
          label={'Location'}
          onChangeText={value => {
            setLocation(value);
          }}
          iconPosition={'left'}
          iconName={'map-pin'}
          onIconPress={() => {
            alert('ok');
          }}
        />
      </ScrollView>
      <Button
        label={'Next'}
        buttonStyle={{margin: 10}}
        labelStyle={[MainStyling.buttonText]}
        onPress={() => {
          console.log(
            'companyProfilecompanyProfilecompanyProfile',
            companyProfile,
          );
          dispatch(
            setClientProfile({
              companyName: business,
              companyID: '',
              address: location,
              url: website,
              description: '',
            }),
          );
          changeTab();
          // dispatch(setStringValue('company'));
          // navigation.navigate('Login');
        }}
      />
    </SafeAreaView>
  );
};
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
  camera: {
    height: wp('10%'),
    width: wp('10%'),
    borderRadius: 45,
    borderColor: colors.white,
    backgroundColor: colors.primary,
    borderWidth: 2,

    //position: 'absolute',
    right: -wp('8%'),
    bottom: wp('10%'),
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.3,
      },
      android: {
        elevation: 3,
        backgroundColor: colors.white,
      },
    }),
  },
  image: {
    borderRadius: 45,
  },
});
export default BusinessInfo;
