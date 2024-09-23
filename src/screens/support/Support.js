import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {launchImageLibrary} from 'react-native-image-picker';
import Button from '../../components/Button';
import MainStyling from '../../assets/styles/MainStyling';
import colors from '../../assets/colors/colors';
import Input from '../../components/Input';
import Headers from '../../components/Headers';
import InputBox from '../../components/InputBox';

const Support = () => {
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [message, setMessage] = useState();
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const ImagePicker = () => {
    setIsImageLoading(true);

    let options = {
      storageOptions: {
        path: 'image',
      },
    };

    launchImageLibrary(options, response => {
      setIsImageLoading(false);

      if (response.assets) {
        const selectedImageUri = response.assets[0].uri;
        setSelectedImage(selectedImageUri);
        console.log(selectedImageUri);
      } else {
        console.log('Image selection was canceled or failed.');
      }
    });
  };

  return (
    <SafeAreaView style={[MainStyling.mainContainer]}>
      <Headers iconLeft={false} title={'Hello, Jasmine'} />
      <ScrollView style={[MainStyling.screenPadding]}>
        <View style={[MainStyling.dividerTwo]}></View>
        <Text style={[MainStyling.subHeading, {fontWeight: 'bold'}]}>
          Report a Problem or Ask for Help.
        </Text>

        <View style={[MainStyling.divider]}></View>
        <Input
          value={email}
          placeholder={'Email'}
          label={'Email *'}
          onChangeText={value => {
            setEmail(value);
          }}
        />
        <View style={[MainStyling.divider]}></View>

        <Input
          value={name}
          placeholder={'Name'}
          label={'Name *'}
          onChangeText={value => {
            setName(value);
          }}
        />
        <View style={[MainStyling.divider]}></View>
        <InputBox
          value={message}
          placeholder={'Enter your message...'}
          label={'Message *'}
          onChangeText={value => {
            setMessage(value);
          }}
        />

        <View style={[MainStyling.divider]}></View>
        <Text
          style={[
            MainStyling.subHeading,
            {color: colors.gray, width: wp('60%')},
          ]}>
          Please add screenshot to help us understand the issue better.
        </Text>
        <View style={[MainStyling.divider]}></View>
        <View style={[{flexDirection: 'row', alignItems: 'center'}]}>
          <TouchableOpacity
            onPress={() => {
              ImagePicker();
            }}
            style={{
              borderColor: colors.grey,
              borderWidth: 1,
              backgroundColor: colors.light_grey,
              width: wp('30%'),
              paddingHorizontal: wp('1%'),
              padding: wp('1.7%'),
              borderRadius: 8,
            }}>
            <Text
              style={[
                MainStyling.subHeading,
                {color: colors.black, textAlign: 'center'},
              ]}>
              Choose Image
            </Text>
          </TouchableOpacity>
          {selectedImage ? null : (
            <Text
              style={[
                MainStyling.subHeading,
                {color: colors.black, marginLeft: wp('1%')},
              ]}>
              no image selected
            </Text>
          )}
        </View>

        {isImageLoading ? (
          <ActivityIndicator size="small" color={colors.primary} />
        ) : selectedImage ? (
          <Image source={{uri: selectedImage}} style={styles.pickerImage} />
        ) : null}

        <View style={[MainStyling.divider]}></View>
        <View style={[{marginHorizontal: wp('18%')}]}>
          <Button
            label={'Send Request'}
            labelStyle={[MainStyling.buttonText]}
            onPress={() => {}}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  heading: {
    marginTop: wp('10%'),
    textAlign: 'center',
  },
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
  userbox: {
    paddingHorizontal: wp('2%'),
    padding: wp('0.5%'),
    marginVertical: wp('3%'),
    marginBottom: wp('1%'),

    borderRadius: 20,
    paddingHorizontal: wp('5%'),
    flex: 1,
  },
  pickerImage: {
    width: wp('20%'),
    height: wp('20%'),
    marginTop: wp('2%'),
    borderRadius: 10,
  },
});
export default Support;
