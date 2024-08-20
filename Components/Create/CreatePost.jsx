import React, { useState } from "react";
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

  const handleOpenCamera = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestCameraPermissionsAsync();

      if (!permissionResult.granted) {
        alert("Permission to access camera is required!");
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (!result.cancelled) {
        const source = { uri: result.uri };
        console.log("Camera response:", source);
        // Handle the selected image here
      }
    } catch (error) {
      console.error("Error opening camera:", error);
    }
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
