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
} from "react-native";
import { Camera, CameraType, FlashMode } from "expo-camera/legacy";
import * as Audio from "expo-av";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { Video } from "expo-av";


export default function CameraScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(CameraType.back);
  const [flashMode, setFlashMode] = useState(FlashMode.off);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [capturedMedia, setCapturedMedia] = useState(null);
  const [mediaType, setMediaType] = useState(null);
  const cameraRef = useRef(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const recordingTimeout = useRef(null);

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
        base64: true,
      });
      setCapturedMedia(photo.uri);
      setMediaType("image");
    }
  };

  const confirmMedia = () => {
    if (capturedMedia) {
      console.log(capturedMedia);
      const type = mediaType === "image" ? "image/jpeg" : "video/mp4";
      const name = mediaType === "image" ? "photo.jpg" : "video.mp4";
      uploadMedia(capturedMedia, name, type);
      setCapturedMedia(null);
      setMediaType(null);
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
        .recordAsync({ quality: "1080p" })
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
        takePicture(); // Take picture if the button is released before 2 seconds
      } else {
        stopRecording(); // Stop recording if already started
      }
    }
  };

  const uploadMedia = (uri, name, type) => {
    const formData = new FormData();
    formData.append("file", {
      uri: uri,
      name: name,
      type: type,
    });

    console.log(formData);

    axios
      .post("http://192.168.0.103/user/saveMedia", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Media uploaded successfully:", response.data);
        Alert.alert(
          "Upload Success",
          "Your media has been uploaded to the feed!"
        );
        navigation.replace("dashboard");
      })
      .catch((error) => {
        console.error("Error uploading media:", error);
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
        flashMode={flashMode} // Set flash mode
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
                color="white"
              />
            </TouchableOpacity>
          </View>

          {isRecording && (
            <View style={styles.timerContainer}>
              <Text style={styles.recordingText}>{recordingTime}s</Text>
            </View>
          )}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.iconButtonSmall}
              onPress={toggleCameraType}
            >
              <Ionicons name="camera-reverse" size={30} color="white" />
            </TouchableOpacity>
            <View style={styles.captureWrapper}>
              <TouchableOpacity
                style={[
                  styles.captureButton,
                  {
                    borderColor: "white",
                    borderWidth: isRecording ? progress * 10 : 5,
                  },
                ]}
                onPressIn={handleCapturePressIn}
                onPressOut={handleCapturePressOut}
              >
                <Ionicons name="camera" size={30} color="white" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.iconButtonSmall}
              onPress={pickImageFromGallery}
            >
              <Ionicons name="images" size={30} color="white" />
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
  },
  camera: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "space-between",
    padding: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },

  buttonContainer1: {
    position: "absolute",
    flexDirection: "row",
    gap: 12,
    bottom: 20,
    left: 10,
    justifyContent: "space-between",
    width: "100%",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  captureButton: {
    width: 70,
    height: 70,
    backgroundColor: "transparent",
    borderRadius: 35,
    borderColor: "white",
    borderWidth: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  captureWrapper: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  iconButtonSmall: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: 25,
  },

  iconButtonSmall1: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderWidth: 4,
    borderColor: "lightgreen",
    borderRadius: 25,
  },
  timerContainer: {
    position: "absolute",
    top: 46,
    left: 16,
    padding: 8,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 4,
  },
  recordingText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  flashLightContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 20,
    marginLeft: "auto",
    padding: 10,
    marginTop: 30,
  },
});
