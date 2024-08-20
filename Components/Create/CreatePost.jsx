import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  RefreshControl,
  View,
  Text,
  Button,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const CreatePost = () => {
  const [refreshing, setRefreshing] = useState(false);



const handleOpenCamera = (mediaType) => {
  ImagePicker.requestCameraPermissionsAsync()
    .then((permissionResult) => {
      if (!permissionResult.granted) {
        alert("Permission to access camera is required!");
        return Promise.reject("Camera permission not granted");
      }

      return ImagePicker.launchCameraAsync({
        mediaTypes: mediaType,
        quality: 1,
        cameraType: ImagePicker.CameraType.front, // Use front camera
      });
    })
    .then((result) => {
      if (!result.cancelled) {
        const source = { uri: result.uri };
        if (source.uri) {
          console.log("Camera response:", source);
          // Handle the selected image or video here
        } else {
          console.error("Failed to capture media, uri is undefined");
        }
      }
    })
    .catch((error) => {
      if (error !== "Camera permission not granted") {
        console.error("Error opening camera:", error);
      }
    });
};



  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={() => {}} />
        }
      >
        <View>
          <Text>Open Camera</Text>
          <Button title="Open Camera" onPress={handleOpenCamera} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreatePost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
