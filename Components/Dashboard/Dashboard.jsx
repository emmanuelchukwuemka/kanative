import React, { useState, useCallback, useEffect } from "react";
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  ScrollView,
  RefreshControl,
  Image,
  View,
  TextInput,
  Modal,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Ionicons";

const Dashboard = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [userName, setUserName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      if (user) {
        const parsedUser = JSON.parse(user);
        setUserName(parsedUser.userName);
      }
    } catch (error) {
      console.log("Error fetching user data: ", error);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      console.log("Screen refreshed!");
    }, 2000);
  }, []);

  const handleImagePress = (image) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

const renderImageModal = () => (
  <Modal
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => setModalVisible(false)}
  >
    <View style={styles.modalContainer}>
      <TouchableOpacity
        style={styles.modalCloseButton}
        onPress={() => setModalVisible(false)}
      >
        <Icon name="close-circle" size={30} color="#fff" />
      </TouchableOpacity>
      {selectedImage && (
        <Image
          source={selectedImage}
          style={styles.modalImage}
          resizeMode="contain"
        />
      )}
    </View>
  </Modal>
);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={true}
        barStyle={"light-content"}
        backgroundColor={"#132812"}
      />

      <View style={styles.searchContainer}>
        <Icon name="search-outline" size={24} color="#666" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.postCard}>
          <TouchableOpacity
            onPress={() => handleImagePress(require("../../assets/post.jpeg"))}
          >
            <View style={styles.postContainer}>
              <Image
                source={require("../../assets/post.jpeg")}
                style={styles.post}
                resizeMode="cover"
              />
            </View>
          </TouchableOpacity>
          <View style={styles.infoContainer}>
            <View style={styles.viewContainer}>
              <Image
                source={require("../../assets/profile.jpeg")}
                style={styles.picPost}
              />
              <View style={styles.userInfo}>
                <View
                  style={{
                    flexDirection: "row",
                    width: 200,
                    alignItems: "center",
                    gap: 20,
                  }}
                >
                  <Text style={styles.userNameText}>{userName}</Text>
                  <Text style={{ color: "#ccc", marginTop: 50 }}>
                    22:00 19/08/2024
                  </Text>
                </View>
                <Text style={styles.statusText}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
                  nulla, quibusdam voluptas eligendi id facilis beatae corrupti
                  sed similique vel quo voluptatibus ab minus culpa odit
                  accusantium, natus cum eaque.
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.iconsContainer}>
            <Icon name="heart-outline" size={24} color="#000" />
            <Icon name="chatbubble-outline" size={24} color="#000" />
            <Icon name="share-outline" size={24} color="#000" />
          </View>
        </View>

        <View style={styles.postCard}>
          <TouchableOpacity
            onPress={() => handleImagePress(require("../../assets/phone.png"))}
          >
            <View style={styles.postContainer}>
              <Image
                source={require("../../assets/phone.png")}
                style={styles.post}
                resizeMode="cover"
              />
            </View>
          </TouchableOpacity>
          <View style={styles.infoContainer}>
            <View style={styles.viewContainer}>
              <Image
                source={require("../../assets/profile.jpeg")}
                style={styles.picPost}
              />
              <View style={styles.userInfo}>
                <View
                  style={{
                    flexDirection: "row",
                    width: 200,
                    alignItems: "center",
                    gap: 20,
                  }}
                >
                  <Text style={styles.userNameText}>{userName}</Text>
                  <Text style={{ color: "#ccc", marginTop: 50 }}>
                    22:00 19/08/2024
                  </Text>
                </View>
                <Text style={styles.statusText}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
                  nulla, quibusdam voluptas eligendi id facilis beatae corrupti
                  sed similique vel quo voluptatibus ab minus culpa odit
                  accusantium, natus cum eaque.
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.iconsContainer}>
            <Icon name="heart-outline" size={24} color="#000" />
            <Icon name="chatbubble-outline" size={24} color="#000" />
            <Icon name="share-outline" size={24} color="#000" />
          </View>
        </View>
      </ScrollView>

      {renderImageModal()}
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    height: 40,
    borderColor: "#f4f4f4",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: "#fafafa",
  },
  scrollView: {
    flexGrow: 1,
  },
  postCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    flex: 1,
  },
  postContainer: {
    width: "100%",
    backgroundColor: "#fff",
    flex: 1,
  },
  post: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
  },
  infoContainer: {
    paddingHorizontal: 10,
    alignItems: "center",
  },
  viewContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: -30,
    paddingVertical: 10,
  },
  picPost: {
    width: 50,
    height: 50,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "green",
    marginRight: 10,
  },
  userInfo: {
    flexDirection: "column",
  },
  userNameText: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 50,
    color: "#333",
  },
  statusText: {
    fontSize: 14,
    color: "#666",
    width: 300,
    marginTop: 5,
    textAlign: "justify",
  },
  iconsContainer: {
    borderTopWidth: 2,
    borderColor: "#ccc",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 20,
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
    zIndex:99,
  },
  modalImage: {
    width: "100%",
    height: "100%",
  },
});
