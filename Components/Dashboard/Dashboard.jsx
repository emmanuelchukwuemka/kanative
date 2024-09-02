import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  FlatList,
  Image,
  View,
  TouchableOpacity,
  Dimensions,
  RefreshControl,
  ActivityIndicator,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Ionicons";
import { Video } from "expo-av";
import axios from "axios";
import { Buffer } from 'buffer'; // Add this line

const { height: screenHeight } = Dimensions.get("window");

const Dashboard = () => {
  const [userName, setUserName] = useState("");
  const [posts, setPosts] = useState([]);
  const [visibleVideoIndex, setVisibleVideoIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const videoRefs = useRef([]);

  useEffect(() => {
    fetchUserData();
    fetchMedia(1);
  }, []);

  const fetchUserData = () => {
    AsyncStorage.getItem("user")
      .then((user) => {
        if (user) {
          const parsedUser = JSON.parse(user);
          setUserName(parsedUser.userName);
        }
      })
      .catch((error) => {
        console.log("Error fetching user data: ", error);
      });
  };

  const fetchMedia = async () => {
    try {
      // Use Buffer to create base64 encoded credentials
      const auth = Buffer.from(`${CLOUDINARY_API_KEY}:${CLOUDINARY_API_SECRET}`).toString('base64');
      
      const response = await axios.get("https://api.cloudinary.com/v1_1/dubaep0qz/kap_media/Media_post", {
        headers: {
          'Authorization': `Basic ${auth}`,
        },
      });

      // Check the response structure to ensure you are accessing the correct fields
      const media = response.data.resources.map((item) => ({
        id: item.public_id,
        image: item.secure_url, // Adjust based on your response data
        caption: item.context ? item.context.custom.caption : "", // Adjust based on your response data
        video: item.resource_type === 'video' ? item.secure_url : null, // Check if it's a video
      }));

      setPosts(media);
    } catch (error) {
      console.error("Error fetching media from Cloudinary:", error);
    }
  };

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const visibleItem = viewableItems[0];
      if (visibleItem?.item?.url && visibleItem.item.format === "mp4") {
        setVisibleVideoIndex(visibleItem.index);
        setIsPlaying(true);
        videoRefs.current[visibleItem.index]?.playAsync();
      } else {
        setVisibleVideoIndex(null);
        setIsPlaying(false);
      }
    }
  });

  const handlePlayPause = (index) => {
    if (isPlaying) {
      videoRefs.current[index]?.pauseAsync();
    } else {
      videoRefs.current[index]?.playAsync();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVideoPress = () => {
    setShowControls(!showControls);
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchMedia(); // Fetch new data on refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const onPlaybackStatusUpdate = (status, index) => {
    if (status.isLoaded) {
      setVideoProgress(status.positionMillis / status.durationMillis);
    }
  };

  const renderPost = ({ item, index }) => (
    <View style={styles.postCard}>
      {item.video ? (
        <TouchableOpacity
          style={styles.postMedia}
          onPress={handleVideoPress}
          activeOpacity={1}
        >
          <Video
            ref={(ref) => (videoRefs.current[index] = ref)}
            source={{ uri: item.video }}
            style={styles.postMedia}
            resizeMode="cover"
            isLooping
            shouldPlay={visibleVideoIndex === index && isPlaying}
            volume={1.0}
            isMuted={false}
            useNativeControls={false}
          />
          {showControls && visibleVideoIndex === index && (
            <TouchableOpacity
              style={styles.playPauseButton}
              onPress={() => handlePlayPause(index)}
            >
              <Icon
                name={isPlaying ? "pause" : "play"}
                size={50}
                color="#fff"
              />
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      ) : (
        <Image
          source={{ uri: item.image }}
          style={styles.postMedia}
          resizeMode="cover"
        />
      )}
      <View style={styles.overlay}>
        <View style={styles.bottomContainer}>
          <View style={styles.userInfo}>
            <Image
              source={require("../../assets/profile.jpeg")}
              style={styles.profilePic}
            />
            <Text style={styles.userNameText}>{userName}</Text>
          </View>
          <Text style={styles.captionText}>{item.caption}</Text>
          <View style={styles.reactionsContainer}>
            <Icon name="eye-outline" size={27} color="#fff" />
            <Icon name="heart-outline" size={27} color="#fff" />
            <Icon name="chatbubble-outline" size={27} color="#fff" />
            <Icon name="share-outline" size={27} color="#fff" />
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatListContainer}
        snapToAlignment="start"
        decelerationRate="fast"
        snapToInterval={screenHeight}
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
        onEndReached={loadMorePosts}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListFooterComponent={
          loadingMore && <ActivityIndicator size="large" color="#fff" />
        }
      />
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  flatListContainer: {
    flexGrow: 1,
  },
  postCard: {
    height: screenHeight,
    justifyContent: "center",
  },
  postMedia: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "flex-end",
    padding: 10,
  },
  bottomContainer: {
    justifyContent: "flex-end",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  userNameText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  captionText: {
    color: "#fff",
    fontSize: 16,
    marginVertical: 5,
  },
  reactionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 150,
    marginTop: 10,
  },
  playPauseButton: {
    position: "absolute",
    top: "45%",
    left: "45%",
  },
  progressBar: {
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
    height: 4,
    backgroundColor: "#555",
  },
  progress: {
    height: "100%",
    backgroundColor: "#fff",
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  progressBar: {
    position: "absolute",
    bottom: 15,
    left: 10,
    right: 10,
    height: 5,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 5,

  },
  progress: {
    height: "100%",
    padding:5,
    backgroundColor: "lightgreen",
    borderRadius: 5,
  },
});
