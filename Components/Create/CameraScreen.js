import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  SafeAreaView,
  Dimensions,
  Alert,
} from "react-native";
import { Camera, CameraType } from "expo-camera/legacy";
import * as Audio from "expo-av";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

export default function CameraScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const cameraRef = useRef(null);

  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      const audioStatus = await Audio.Audio.requestPermissionsAsync();

      if (
        cameraStatus.status !== "granted" ||
        audioStatus.status !== "granted"
      ) {
        Alert.alert(
          "Permissions required",
          "Camera and audio permissions are required to use this feature."
        );
      }

      setHasPermission(
        cameraStatus.status === "granted" && audioStatus.status === "granted"
      );
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePicture = () => {
    if (cameraRef.current) {
      cameraRef.current
        .takePictureAsync({ quality: 1, base64: true })
        .then((photo) => {
          console.log(photo.uri);
          uploadMedia(photo.uri, "photo.jpg", "image/jpeg");
        })
        .catch((error) => {
          console.error("Error taking picture: ", error);
        });
    }
  };

  const startRecording = () => {
    if (cameraRef.current) {
      cameraRef.current
        .recordAsync({ quality: "1080p" })
        .then((video) => {
          console.log(video.uri);
          uploadMedia(video.uri, "video.mp4", "video/mp4");
        })
        .catch((error) => {
          console.error("Error recording video: ", error);
        });
    }
  };

  const stopRecording = () => {
    if (cameraRef.current && isRecording) {
      cameraRef.current.stopRecording();
      setIsRecording(false);
    }
  };

  const uploadMedia = (uri, name, type) => {
    const formData = new FormData();
    formData.append("file", {
      uri: uri,
      name: name,
      type: type,
    });

    // axios.post('https://your-backend-api.com/upload', formData, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   },
    // })
    // .then(response => {
    //   console.log('Media uploaded successfully:', response.data);
    //   Alert.alert('Upload Success', 'Your media has been uploaded to the feed!');
    //   navigation.navigate('NewFeedPage');
    // })
    // .catch(error => {
    //   console.error('Error uploading media:', error);
    //   Alert.alert('Upload Failed', 'There was an error uploading your media. Please try again.');
    // });
  };

  const pickImageFromGallery = () => {
    ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      quality: 1,
    })
      .then((result) => {
        if (!result.canceled) {
          const { uri, type } = result.assets[0];
          const mediaType = type === "video" ? "video/mp4" : "image/jpeg";
          const mediaName = type === "video" ? "video.mp4" : "photo.jpg";
          console.log(uri);
          uploadMedia(uri, mediaName, mediaType);
        }
      })
      .catch((error) => {
        console.error("Error picking media from gallery: ", error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Camera style={styles.camera} type={CameraType.back} ref={cameraRef}>
        <View style={styles.overlay}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.iconButtonSmall}
              onPress={pickImageFromGallery}
            >
              <Ionicons name="images" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.captureButton}
              onPressIn={() => setIsRecording(true)}
              onPressOut={stopRecording}
              onLongPress={startRecording}
              onPress={takePicture}
            >
              <Ionicons name="camera" size={40} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </Camera>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  camera: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "flex-end",
    paddingBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 50,
  },
  iconButtonSmall: {
    alignItems: "center",
  },
  captureButton: {
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: "red",
    padding: 15,
  },
});
