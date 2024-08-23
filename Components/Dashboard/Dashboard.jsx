import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  FlatList,
  Image,
  View,
  Modal,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Ionicons";

const { height: screenHeight } = Dimensions.get("window");

const Dashboard = () => {
  const [userName, setUserName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [posts, setPosts] = useState([
    {
      id: "1",
      image: require("../../assets/post.jpeg"),
      caption: "First post",
    },
    {
      id: "2",
      image: require("../../assets/post.jpeg"),
      caption: "Second post",
    },
    // Add more posts here
  ]);

  useEffect(() => {
    fetchUserData();
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



const renderPost = ({ item }) => (
  <View style={styles.postCard}>
    <View>
      
      {item.image ? (
        <Image
          source={item.image}
          style={styles.postImage}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.noImageContainer}>
          <Image
            source={require("../../assets/icon.png")} 
            style={styles.appIcon}
            resizeMode="contain"
          />
        </View>
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
            <Icon name="eye-outline" size={30} color="#fff" />
            <Icon name="heart-outline" size={30} color="#fff" />
            <Icon name="chatbubble-outline" size={30} color="#fff" />
            <Icon name="share-outline" size={30} color="#fff" />
          </View>
        </View>
      </View>
    </View>
  </View>
);


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={true}
        barStyle={"light-content"}
        backgroundColor={"#000"}
      />
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatListContainer}
        snapToAlignment="start"
        decelerationRate="fast"
        snapToInterval={screenHeight}
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
  postImage: {
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
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userNameText: {
    fontSize: 18,
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
    justifyContent: "space-around",
    marginBottom: 10,
    width: "100%",
  },
  watermark: {
    color: "white",
    fontSize: 24,
    opacity: 0.5,
    alignSelf: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  modalCloseButton: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 99,
  },
  modalImage: {
    width: "100%",
    height: "100%",
  },
  modalContent: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    alignItems: "center",
  },
  noImageContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#333", // Background color for the placeholder
  },
  appIcon: {
    width: 100,
    height: 100,
  },
});
