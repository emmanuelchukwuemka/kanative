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
import { useFocusEffect } from "@react-navigation/native";

const { height: screenHeight } = Dimensions.get("window");

const Dashboard = () => {
  const [userName, setUserName] = useState("");
  const [posts, setPosts] = useState([]);
  const [visibleVideoIndex, setVisibleVideoIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [videoProgress, setVideoProgress] = useState(0); // Initialize videoProgress
  const videoRefs = useRef([]);

  useFocusEffect(
    useCallback(() => {
      videoRefs.current.forEach((video) => {
        if (video) {
          video.pauseAsync();
        }
      });
      return () => {
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

  const fetchMedia = (pageNumber) => {
    setLoading(pageNumber === 1);
    setLoadingMore(pageNumber > 1);

    axios
      .get(
        `https://kap-backend.onrender.com/user/posts?page=${pageNumber}&limit=7`
      )
      .then((response) => {
        if (response.data.mediaPosts.length < 7) {
          setHasMore(false);
        }
        setPosts((prevPosts) =>
          pageNumber === 1
            ? response.data.mediaPosts
            : [...prevPosts, ...response.data.mediaPosts]
        );
        setLoading(false);
        setLoadingMore(false);
      })
      .catch((error) => {
        console.log("Error fetching media: ", error);
        setLoading(false);
        setLoadingMore(false);
      });
  };

  const loadMorePosts = () => {
    if (hasMore && !loadingMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchMedia(nextPage);
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
    setPage(1);
    setHasMore(true);
    fetchMedia(1);
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
                onPlaybackStatusUpdate={(status) =>
                  onPlaybackStatusUpdate(status, index)
                }
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
                <View
                  style={[
                    styles.progress,
                    { width: `${videoProgress * 100}%` },
                  ]}
                />
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
                  source={require("../../assets/fb.png")}
                  style={styles.profilePic}
                />
                <Text style={styles.userNameText}>
                  {item.username || "Unknown"}
                </Text>
              </View>
              <Text style={styles.captionText}>{item.caption || ""}</Text>
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
        keyExtractor={(item, index) => `${item._id}-${index}`} // Use a combination of _id and index
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
});
