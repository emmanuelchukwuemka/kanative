import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import colors from '../../assets/colors/colors';
import {launchImageLibrary} from 'react-native-image-picker';
import MainStyling from '../../assets/styles/MainStyling';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const data = [
    {id: '1', title: 'Password', icon: 'lock-outline', iconLibrary: ''},
    {id: '2', title: 'Resources', icon: 'source-branch', iconLibrary: ''},
    {
      id: '3',
      title: 'Notebook',
      icon: 'calendar-text-outline',
      iconLibrary: '',
    },
    {
      id: '4',
      title: 'Company',
      icon: 'office-building-outline',
      iconLibrary: '',
    },
    {id: '5', title: 'Department', icon: 'account-group', iconLibrary: ''},
  ];

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

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.listItem}
      onPress={
        () => {
          console.log('ok');
        }
        // navigation.navigate(item.title)
      }>
      <MaterialCommunityIcons
        name={item?.icon}
        size={24}
        color={colors.gray}
        style={styles.listIcon}
      />
      <Text style={[MainStyling.subHeading, {flex: 1, fontWeight: '400'}]}>
        {item.title}
      </Text>
      <Feather name="chevron-right" size={wp('7%')} color="grey" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.profileImageBorder}>
          {selectedImage ? (
            <Image
              source={{
                uri: `${selectedImage}`,
              }}
              style={styles.profileImage}
            />
          ) : (
            <Image
              source={{
                uri: 'https://as2.ftcdn.net/v2/jpg/01/86/29/31/1000_F_186293166_P4yk3uXQBDapbDFlR17ivpM6B1ux0fHG.jpg',
              }}
              style={styles.profileImage}
            />
          )}

          <TouchableOpacity
            onPress={() => {
              ImagePicker();
            }}
            style={styles.position}>
            <Feather name={'edit'} size={wp('7%')} color="grey" />
          </TouchableOpacity>
        </View>

        <Text style={[MainStyling?.heading, {marginTop: wp('4%')}]}>
          Saman Rana
        </Text>
        <Text style={[MainStyling?.subHeading, {color: colors.grey}]}>
          samanranaw2@gmail.com
        </Text>
      </View>
      <View style={[MainStyling.dividerTwo]} />

      <View
        style={{
          flex: 1,
          backgroundColor: colors.off_white,
          borderTopLeftRadius: 60,
          borderTopRightRadius: 60,
        }}>
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          style={styles.listContainer}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary_opacity,
  },
  position: {
    position: 'absolute',
    right: -5,
    bottom: wp('1%'),
    backgroundColor: colors.white,
    padding: wp('2%'),
    borderRadius: 300,
  },
  profileContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  profileImageBorder: {
    borderWidth: 2,
    borderColor: colors.red,
    borderRadius: 300,
  },
  profileImage: {
    width: wp('30%'),
    height: wp('30%'),
    borderRadius: 300,
    borderColor: colors.off_white,
    borderWidth: 3,
  },

  listContainer: {
    marginVertical: 20,
  },
  listItem: {
    paddingHorizontal: wp('5%'),
    paddingVertical: wp('6%'),
    borderRadius: 10,
    marginHorizontal: wp('3%'),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: colors.light_grey,
  },
  listIcon: {
    marginRight: 15,
  },
});

export default ProfileScreen;
