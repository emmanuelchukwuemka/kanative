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
import { useFocusEffect } from '@react-navigation/native'; 

const { height: screenHeight } = Dimensions.get("window");

const Dashboard = () => {
  const [userName, setUserName] = useState("");
  const [posts, setPosts] = useState([]);
  const [visibleVideoIndex, setVisibleVideoIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [videoProgress, setVideoProgress] = useState(0);
  const videoRefs = useRef([]);

  useFocusEffect(
    useCallback(() => {
      // Pause all videos when this screen loses focus
      videoRefs.current.forEach((video) => {
        if (video) {
          video.pauseAsync();
        }
      });
      return () => {
        // Cleanup function to ensure videos are paused when component unmounts
        videoRefs.current.forEach((video) => {
          if (video) {
            video.pauseAsync();
          }
        });
      };
    }, [])
  );

  useEffect(() => {
    fetchUserData();
    fetchMedia();
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

  const fetchMedia = () => {
    axios
      .get("https://kap-backend.onrender.com/user/posts")
      .then((response) => {
        setPosts(response.data.mediaPosts);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching media: ", error);
        setLoading(false);
      });
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
    setLoading(true);
    fetchMedia();
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
      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <>
          {item.format === "mp4" ? (
            <TouchableOpacity
              style={styles.postMedia}
              onPress={handleVideoPress}
              activeOpacity={1}
            >
              <Video
                ref={(ref) => (videoRefs.current[index] = ref)}
                source={{ uri: item.url }}
                style={styles.postMedia}
                resizeMode="cover"
                isLooping
                shouldPlay={visibleVideoIndex === index && isPlaying}
                volume={1.0}
                isMuted={false}
                useNativeControls={false}
                onPlaybackStatusUpdate={(status) => onPlaybackStatusUpdate(status, index)}
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
              <View style={styles.progressBar}>
                <View style={[styles.progress, { width: `${videoProgress * 100}%` }]} />
              </View>
            </TouchableOpacity>
          ) : (
            <Image
              source={{ uri: item.url }}
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
                <Text style={styles.userNameText}>
                  {item.username || "Unknown"}
                </Text>
              </View>
              <Text style={styles.captionText}>
                {item.caption || ""}
              </Text>
              <View style={styles.reactionsContainer}>
                <Icon name="eye-outline" size={27} color="#fff" />
                <Icon name="heart-outline" size={27} color="#fff" />
                <Icon name="chatbubble-outline" size={27} color="#fff" />
                <Icon name="share-outline" size={27} color="#fff" />
              </View>
            </View>
          </View>
        </>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.flatListContainer}
        snapToAlignment="start"
        decelerationRate="fast"
        snapToInterval={screenHeight}
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
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
    marginBottom: 5,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: 10,
  },
  userNameText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
  captionText: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 10,
  },
  reactionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingHorizontal: 10,
    width: "100%",
  },
  playPauseButton: {
    position: "absolute",
    alignSelf: "center",
    top: "45%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 50,
    padding: 10,
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
