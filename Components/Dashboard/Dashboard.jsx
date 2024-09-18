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
  Modal,
  TextInput,
  Button,
  Share,
  TouchableWithoutFeedback,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Ionicons";
import { Video } from "expo-av";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

const { height: screenHeight } = Dimensions.get("window");

const Dashboard = () => {
  const [userName, setUserName] = useState("");
  const [id, setID] = useState("");
  const [posts, setPosts] = useState([]);
  const [visibleVideoIndex, setVisibleVideoIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingFetch, setLoadingFetch] = useState(true);
  const [videoProgress, setVideoProgress] = useState(0);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [selectedPostId, setSelectedPostId] = useState(null);
  

  const videoRefs = useRef([]);
  let comments = [
    { username: "Anonymous", comment: "this is very nicee :)" },
    { username: "Mrs Karen", comment: "Oh myyyyyy!! :)" },
  ];

  useFocusEffect(
    useCallback(() => {
      // Pause all videos when this screen loses focus
      videoRefs.current.forEach((video) => {
        if (video) {
          video.pauseAsync();
        }
      });
      return () => {
        videoRefs.current.forEach((video) => {
          if (video) {
            video.unloadAsync();
          }
        });
      };
    }, [])
  );

  useEffect(() => {
    setLoading(true);
    fetchUserData();

    // Fetch media posts every 3 seconds.
    const intervalId = setInterval(() => {
      fetchMedia();
    }, 3000);

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  const fetchMedia = async () => {
    try {
      const response = await axios.get(
        "https://kap-backend.onrender.com/user/posts"
      );
      setPosts(response.data.mediaPosts);

      // After fetching media, check the first post
      if (response.data.mediaPosts.length > 0) {
        const firstPost = response.data.mediaPosts[0];

        if (firstPost.format === "mp4") {
          setVisibleVideoIndex(0);
          setIsPlaying(true);
          videoRefs.current[0]?.playAsync();
        } else {
          setVisibleVideoIndex(null);
          setIsPlaying(false);
        }
      }
    } catch (error) {
      console.error("Error fetching media: ", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserData = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      if (user) {
        const parsedUser = JSON.parse(user);
        setID(parsedUser._id);
        setUserName(parsedUser.userName);
      }
    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
  };

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const visibleItem = viewableItems[0];
      const visibleIndex = visibleItem.index;

      // Pause and unload all videos except the visible one
      videoRefs.current.forEach((video, index) => {
        if (index === visibleIndex && visibleItem.item.format === "mp4") {
          video?.playAsync();
          setVisibleVideoIndex(visibleIndex);
          setIsPlaying(true);
        } else {
          video?.pauseAsync();
          video?.unloadAsync();
        }
      });
    }
  });

  const handlePlayPause = (index) => {
    const currentVideo = videoRefs.current[index];

    currentVideo?.getStatusAsync().then((status) => {
      if (status.isPlaying) {
        currentVideo.pauseAsync();
        setIsPlaying(false);
      } else {
        currentVideo.playAsync();
        setIsPlaying(true);
      }
    });
  };

  const handleVideoPress = () => {
    setShowControls(!showControls);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchMedia();
    setRefreshing(false);
  };

  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setVideoProgress(status.positionMillis / status.durationMillis);
    }
  };

  const handleLike = (postId, index) => {
    const userId = id; // User ID from state or context
    const updatedPosts = [...posts];
    const post = updatedPosts[index];

    // Ensure post.likes is initialized as a number
    post.likes = Number(post.likes) || 0;

    post.userLiked = post.userLiked || [];

    const alreadyLiked = post.userLiked.includes(userId);

    // Update the like count locally
    post.likes += alreadyLiked ? -1 : 1;

    if (alreadyLiked) {
      post.userLiked = post.userLiked.filter((userId) => userId !== id);
    } else {
      post.userLiked.push(userId);
    }

    setPosts(updatedPosts);

    // Send the like/unlike request to the server
    axios
      .post("https://kap-backend.onrender.com/user/like", {
        postId,
        userId,
        action: alreadyLiked ? "unlike" : "like",
      })
      .then((response) => {
        console.log("Post liked/unliked successfully");
      })
      .catch((error) => {
        console.error("Error liking post: ", error);
      });
  };

  const handleCommentIconPress = (postId) => {
    setSelectedPostId(postId);
    setShowCommentModal(true);
  };

  const handleCommentSubmit = () => {
    if (!commentText.trim()) return;

    axios
      .post("https://kap-backend.onrender.com/user/comment", {
        postId: selectedPostId,
        userId: id,
        comment: commentText,
      })
      .then((response) => {
        console.log("Comment added successfully");
        setCommentText("");
        setShowCommentModal(false);
      })
      .catch((error) => {
        console.error("Error submitting comment: ", error);
      });
  };

  const addWatermarkToMedia = async (mediaUrl) => {
    // Here you should implement or use a library that adds watermark to the media.

    return mediaUrl;
  };

  const handleShare = async (post) => {
    try {
      const watermarkedUrl = await addWatermarkToMedia(post.url);
      const result = await Share.share({
        message: `Check out this post: ${watermarkedUrl}`,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log("Shared with activity type: ", result.activityType);
        } else {
          console.log("Shared");
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("Dismissed");
      }
    } catch (error) {
      console.error("Error sharing post: ", error);
    }
  };

const renderPost = ({ item, index }) => {
  const userLiked = item.userLiked || [];

  return (
    <View style={styles.postCard}>
      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <>
          {item.format === "mp4" ? (
            <TouchableOpacity
              style={styles.postMedia}
              onPress={() => handleVideoPress(index)}
              activeOpacity={1}
            >
              <Video
                ref={(ref) => (videoRefs.current[index] = ref)}
                source={{ uri: item.url }}
                style={styles.postMedia}
                resizeMode="contain"
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
            <View style={styles.postMediaContainer}>
              {loadingFetch && (
                <ActivityIndicator
                  size="large"
                  color="#ffffff"
                  style={styles.loadingIndicator}
                />
              )}
              <Image
                source={{ uri: item.url }}
                style={styles.postMedia}
                resizeMode="contain"
                onLoadStart={() => setLoadingFetch(true)} // Start loading
                onLoadEnd={() => setLoadingFetch(false)} // End loading when the image is fully loaded
              />
            </View>
          )}
          <View style={styles.overlay}>
            <View style={styles.bottomContainer}>
              <View style={styles.userInfo}>
                <Image
                  source={require("../../assets/images.png")}
                  style={styles.profilePic}
                />  
                <Text style={styles.userNameText}>
                  {item.username || "Unknown"}
                </Text>
              </View>
              <Text style={styles.captionText}>{item.caption || ""}</Text>

              {/* Reaction container */}
              <View style={styles.reactionsContainer}>
                <Icon name="eye-outline" size={30} color="#fff" />
                <View style={{ flexDirection: "column", alignItems: "center" }}>
                  <TouchableOpacity onPress={() => handleLike(item._id, index)}>
                    <Icon
                      name={userLiked.includes(id) ? "heart" : "heart-outline"}
                      size={27}
                      color={userLiked.includes(id) ? "red" : "#fff"}
                    />
                  </TouchableOpacity>
                  {item.likes > 0 && (
                    <Text style={styles.likesText}>{item.likes}</Text>
                  )}
                </View>
                <View style={{ flexDirection: "column", alignItems: "center" }}>
                  <TouchableOpacity
                    onPress={() => handleCommentIconPress(item._id)}
                  >
                    <Icon name="chatbubble-outline" size={25} color="#fff" />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => handleShare(item)}>
                  <Icon name="share-outline" size={25} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

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
        initialNumToRender={7} // Initially render 7 items
        maxToRenderPerBatch={7} // Render 7 items per batch
        windowSize={3} // Keep 3 screens' worth of items in memory
        getItemLayout={(data, index) => ({
          length: screenHeight,
          offset: screenHeight * index,
          index,
        })}
      />

      {/* Comment Modal */}
      <Modal
        visible={showCommentModal}
        transparent={true}
        animationType="slide"
      >
        <TouchableWithoutFeedback onPress={() => setShowCommentModal(false)}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.modalContent}>
                {/* Comments List */}
                <View style={{ alignItems: "center" }}>
                  <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                    Comments
                  </Text>
                </View>
                <FlatList
                  data={comments} // Assuming you have a 'comments' array
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <View style={styles.commentItem}>
                      <Text style={styles.commentUser}>{item.username}</Text>
                      <Text style={styles.commentText}>{item.comment}</Text>
                    </View>
                  )}
                  style={styles.commentsList}
                />

                {/* Comment Input */}
                <View style={styles.commentInput}>
                  <TextInput
                    placeholder="Leave a comment..."
                    value={commentText}
                    onChangeText={setCommentText}
                    placeholderTextColor="#888"
                  />

                  <TouchableOpacity onPress={handleCommentSubmit}>
                    <Icon name="send" size={25} color="#2C702A" />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};

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
    bottom: 0,
    width: "100%",
    paddingHorizontal: 10,
    paddingBottom: 75, // Ensure padding is enough to stay above the tab menu
    zIndex: 1, // Make sure this view stays on top
  },
  bottomContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: 10,
    borderRadius: 8,
    flexDirection: "column",
  },
  reactionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    zIndex: 1, // Ensure this stays visible on top
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  captionText: {
    color: "#fff",
    marginBottom: 10,
  },
  likesText: {
    color: "#fff",
    fontSize: 12,
    marginTop: 2,
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
    marginBottom: 30,
    paddingHorizontal: 10,
    width: "100%",
  },
  playPauseButton: {
    position: "absolute",
    top: "40%",
    left: "40%",
    zIndex: 1,
  },
  progressBar: {
    height: 3,
    width: "100%",
    backgroundColor: "#ccc",
    position: "absolute",
    bottom: 0,
  },
  progress: {
    height: "100%",
    backgroundColor: "#fff",
  },
  likesText: {
    color: "white",
  },

  modalContainer: {
    flex: 1,
    justifyContent: "flex-end", // Align modal to the bottom
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Transparent background
  },
  modalContent: {
    height: "45%", // Take 45% of the screen height
    backgroundColor: "#fff",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 10,
  },
  commentsList: {
    flex: 1, // This will allow the comment list to grow and push the TextInput down
    paddingVertical: 15,
  },
  commentItem: {
    marginBottom: 15,
  },
  commentUser: {
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 5,
    color: "#333",
  },
  commentText: {
    fontSize: 14,
    color: "#555",
  },
  commentInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
    color: "#000",
    width: "100%",
  },

  postMedia: {
    width: "100%",
    height: "80%",
  },
  loadingIndicator: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
});

export default Dashboard;
