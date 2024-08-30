import React, { useState, useCallback, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  RefreshControl,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserProfile = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [userName, setUserName] = useState(""); 
  const [bio, setBio] = useState(''); // Empty bio
  const [followers, setFollowers] = useState(0); 
  const [media, setMedia] = useState([
  
    { id: '1', uri: 'https://placekitten.com/200/300' },
    { id: '2', uri: 'https://placekitten.com/300/200' },
  ]);


  const fetchUserData = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      if (user) {
        const parsedUser = JSON.parse(user);
        setUserName(parsedUser.userName || "User");
      }
    } catch (error) {
      console.log("Error fetching user data: ", error);
    }
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

  return (
    <SafeAreaView style={styles.container}>
      <View
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >

        <View style={styles.profileContainer}>
          <Image
            style={styles.profileImage}
            source={{
              uri: 'https://placekitten.com/200/200', // Placeholder image
            }}
          />
          <Text style={styles.userName}>@{userName}</Text>
          <Text style={styles.bio}>
            {bio.length > 0 ? bio : 'Add a bio to tell others about yourself'}
          </Text>
          <Text style={styles.followers}>
            {followers > 0 ? `${followers} Followers` : 'No followers yet'}
          </Text>
        </View>

        <View style={styles.actionIconsContainer}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="camera-outline" size={32} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop:2,
    marginBottom:20,
  },
  iconsContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
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
    paddingHorizontal:15,
  },
  iconButton: {
    marginHorizontal: 10,
  },
});
