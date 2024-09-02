import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  Alert,
  Platform,
  StatusBar,
  TextInput,
} from "react-native";
import { Camera, CameraType, FlashMode } from "expo-camera/legacy";
import * as Audio from "expo-av";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { Video } from "expo-av";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CameraScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(CameraType.back);
  const [flashMode, setFlashMode] = useState(FlashMode.off);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [capturedMedia, setCapturedMedia] = useState(null);
  const [mediaType, setMediaType] = useState(null);
  const [caption, setCaption] = useState("");
  const [userName, setUserName] = useState("");
  const cameraRef = useRef(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const recordingTimeout = useRef(null);
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

  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1);
        setProgress((prevProgress) => Math.min(prevProgress + 0.05, 1));
      }, 1000);
    } else if (!isRecording && recordingTime !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const toggleCameraType = () => {
    setCameraType((prevCameraType) =>
      prevCameraType === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  const toggleFlashMode = () => {
    setFlashMode((prevFlashMode) =>
      prevFlashMode === FlashMode.off ? FlashMode.on : FlashMode.off
    );
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 1,
        base64: false,
      });
      setCapturedMedia(photo.uri);
      setMediaType("image");
    }
  };

  const confirmMedia = () => {
    if (capturedMedia) {
      const type = mediaType === "image" ? "image/jpeg" : "video/mp4";
      const name = mediaType === "image" ? "photo.jpg" : "video.mp4";
      uploadMedia(capturedMedia, name, type, caption); // Pass caption to uploadMedia
      setCapturedMedia(null);
      setMediaType(null);
      setCaption(""); // Reset caption after upload
    }
  };

  const startRecording = () => {
    if (!isCameraReady) {
      Alert.alert("Camera is not ready yet. Please wait a moment.");
      return;
    }

    setIsRecording(true);
    setRecordingTime(0);
    setProgress(0);

    if (cameraRef.current) {
      cameraRef.current
        .recordAsync({
          quality: Camera.Constants.VideoQuality["4K"],
        })
        .then((video) => {
          setCapturedMedia(video.uri);
          setMediaType("video");
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

  const handleCapturePressIn = () => {
    recordingTimeout.current = setTimeout(() => {
      startRecording();
    }, 1500);
  };

  const handleCapturePressOut = () => {
    if (recordingTimeout.current) {
      clearTimeout(recordingTimeout.current);
      if (!isRecording) {
        takePicture();
      } else {
        stopRecording();
      }
    }
  };

  const uploadMedia = (uri, name, type, caption, userName) => {
    const fileUri =
      Platform.OS === "android" && uri.startsWith("file://")
        ? uri
        : `file://${uri}`;
    const formData = new FormData();

  formData.append("file", {
    uri: fileUri,
    name: name,
    type: type,
  });
  formData.append("upload_preset", "kap_preset");
  

    axios
      .post(`https://kap-backend.onrender.com/user/saveMedia`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        const mediaUri = response.data.media;
        console.log("Media uploaded successfully to Cloudinary");
      })
      .then(() => {
        Alert.alert(
          "Upload Success",
          "Your media has been uploaded to the feed!"
        );
        router.replace("dashboard");
      })
      .catch((error) => {
        console.error("Error uploading media to Cloudinary:", error);
        Alert.alert(
          "Upload Failed",
          "There was an error uploading your media. Please try again."
        );
      });
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
          setCapturedMedia(uri);
          const selectedType = type === "video" ? "video" : "image";
          setMediaType(selectedType);
        }
      })
      .catch((error) => {
        console.error("Error picking media from gallery: ", error);
      });
  };

  if (capturedMedia) {
    return (
      <SafeAreaView style={styles.container}>
        {mediaType === "image" ? (
          <Image source={{ uri: capturedMedia }} style={styles.camera} />
        ) : (
          <Video
            source={{ uri: capturedMedia }}
            style={styles.camera}
            resizeMode="cover"
            shouldPlay
            isLooping
          />
        )}
        <TextInput
          style={styles.captionInput}
          placeholder="Add a caption..."
          placeholderTextColor="#888"
          value={caption}
          autoFocus
          onChangeText={(text) => {
            setCaption(text);
          }}
        />
        <View style={styles.overlay}>
          <View style={styles.buttonContainer1}>
            <TouchableOpacity
              style={styles.iconButtonSmall}
              onPress={() => setCapturedMedia(null)}
            >
              <Ionicons name="close" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButtonSmall}
              onPress={confirmMedia}
            >
              <Ionicons name="checkmark" size={30} color="white" />
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.iconButtonSmall1}>
              <Ionicons name="bulb" size={30} style={{ color: "lightgreen" }} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  const handleCameraReady = () => {
    setIsCameraReady(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Camera
        style={styles.camera}
        type={cameraType}
        flashMode={flashMode}
        ref={cameraRef}
        onCameraReady={handleCameraReady}
      >
        <View style={styles.overlay}>
          <View style={styles.flashLightContainer}>
            <TouchableOpacity
              onPress={toggleFlashMode}
              style={styles.iconButtonSmall1}
            >
              <Ionicons
                name={
                  flashMode === FlashMode.off
                    ? "flash-off"
                    : flashMode === FlashMode.on
                    ? "flash"
                    : "flash-auto"
                }
                size={30}
                color="yellow"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer2}>
            <TouchableOpacity onPress={toggleCameraType}>
              <Ionicons
                name="camera-reverse-outline"
                size={30}
                style={{ color: "white" }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.captureButton}
              onPressIn={handleCapturePressIn}
              onPressOut={handleCapturePressOut}
            >
              <View style={styles.progressCircle}>
                <View
                  style={[
                    styles.progressFill,
                    { height: `${progress * 100}%` },
                  ]}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={pickImageFromGallery}>
              <Ionicons
                name="image-outline"
                size={30}
                style={{ color: "white" }}
              />
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
    justifyContent: "center",
  },
  camera: {
    flex: 1,
    justifyContent: "flex-end",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "space-between",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 100,
  },

  buttonContainer2: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 50,
  },
  buttonContainer1: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 10,
  },
  flashLightContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 10,
  },
  iconButtonSmall: {
    backgroundColor: "#444",
    padding: 10,
    borderRadius: 30,
    opacity: 0.8,
  },
  iconButtonSmall1: {
    backgroundColor: "#444",
    padding: 10,
    borderRadius: 30,
    opacity: 0.8,
  },
  captureButton: {
    alignItems: "center",
  },
  progressCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
  },
  progressFill: {
    width: 30,
    height: 30,
    backgroundColor: "white",
    borderRadius: 35,
  },
  captionInput: {
    color: "white",
    padding: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    marginHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    borderWidth: 2,
    width: "100%",
  },
});
