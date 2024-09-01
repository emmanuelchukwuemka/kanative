import React, { useState, useCallback, useEffect } from 'react';
import {
  SafeAreaView,
  RefreshControl,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Alert
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import * as Camera from 'expo-camera/legacy';
import { router } from 'expo-router';

const UserProfile = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [userName, setUserName] = useState(""); 
  const [bio, setBio] = useState(''); 
  const [followers, setFollowers] = useState(0); 
  const [media, setMedia] = useState([
    { id: '1', uri: 'https://placekitten.com/200/300' },
    { id: '2', uri: 'https://placekitten.com/300/200' },
  ]);
  const [profileImage, setProfileImage] = useState(null);

  const fetchUserData = () => {
    AsyncStorage.getItem("user")
      .then(user => {
        if (user) {
          const parsedUser = JSON.parse(user);
          setUserName(parsedUser.userName || "User");
          // Optionally, you can fetch and set the profile image from storage here
        }
      })
      .catch(error => {
        console.log("Error fetching user data: ", error);
      });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      console.log('Screen refreshed!');
    }, 2000);
  }, []);

  const renderItem = ({ item }) => (
    <Image source={{ uri: item.uri }} style={styles.mediaItem} />
  );

  const handleImagePick = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'You need to grant camera roll permissions to use this feature.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.uri);
    }
  };

  const handleTakePhoto = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'You need to grant camera permissions to use this feature.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.uri);
    }
  };

  const gotocreate = () => {
    router.replace('create');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.profileContainer}>
          <View style={styles.profileImageContainer}>
            <Image
              style={styles.profileImage}
              source={profileImage ? { uri:profileImage } : require('../../assets/user-avatar.png')}
            />
            {!profileImage && (
              <TouchableOpacity style={styles.addPhotoButton} onPress={handleImagePick}>
                <Ionicons name="add" size={12} color="white" />
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.userName}>@{userName}</Text>
          <Text style={styles.bio}>
            {bio.length > 0 ? bio : 'Add a bio to tell others about yourself'}
          </Text>
          <Text style={styles.followers}>
            {followers > 0 ? `${followers} Followers` : 'No followers yet'}
          </Text>
        </View>

        <View style={styles.actionIconsContainer}>
          <TouchableOpacity style={styles.iconButton} onPress={gotocreate}>
            <Ionicons name="camera-outline" size={32} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={gotocreate}>
            <Ionicons name="image-outline" size={32} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.mediaContainer}>
          <FlatList
            data={media}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            numColumns={3}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flexGrow: 1,
    alignItems: 'center',
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  profileImageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  addPhotoButton: {
    position: 'absolute',
    bottom: 5,
    right: 2,
    borderWidth: 3,
    borderColor: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 50,
    padding: 5,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 2,
    marginBottom: 20,
  },
  bio: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  followers: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  mediaContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  mediaItem: {
    width: 100,
    height: 100,
    margin: 5,
  },
  actionIconsContainer: {
    flexDirection: 'row',
    marginTop: 20,
    paddingHorizontal: 15,
  },
  iconButton: {
    marginHorizontal: 10,
  },
});
