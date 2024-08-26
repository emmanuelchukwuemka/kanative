import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  Alert,
} from "react-native";
import { Camera, CameraType, FlashMode } from "expo-camera/legacy";
import * as Audio from "expo-av";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";

export default function CameraScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(CameraType.back);
  const [flashMode, setFlashMode] = useState(FlashMode.off); // Flash mode state
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [capturedImage, setCapturedImage] = useState(null); // State for captured image
  const cameraRef = useRef(null);

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
      prevFlashMode === FlashMode.off
        ? FlashMode.on
        : prevFlashMode === FlashMode.on
        ? FlashMode.auto
        : FlashMode.off
    );
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 1,
        base64: true,
      });
      setCapturedImage(photo.uri);
    }
  };

  const confirmImage = () => {
    if (capturedImage) {
      console.log(capturedImage);
      uploadMedia(capturedImage, "photo.jpg", "image/jpeg");
      setCapturedImage(null);
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    setProgress(0);
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

  if (capturedImage) {
    return (
      <SafeAreaView style={styles.container}>
        <Image source={{ uri: capturedImage }} style={styles.camera} />
        <View style={styles.overlay}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.iconButtonSmall}
              onPress={() => setCapturedImage(null)}
            >
              <Ionicons name="close" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButtonSmall}
              onPress={confirmImage}
            >
              <Ionicons name="checkmark" size={30} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Camera
        style={styles.camera}
        type={cameraType}
        flashMode={flashMode} // Set flash mode
        ref={cameraRef}
      >
        <View style={styles.overlay}>
          <View style={styles.flashLightContainer}>
            <TouchableOpacity onPress={toggleFlashMode}>
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
            <TouchableOpacity>
              <Ionicons name="bulb" size={30} color="white" />
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
                onPress={takePicture}
                onPressIn={startRecording}
                onPressOut={stopRecording}
              >
                <Ionicons name="camera" size={30} color="white" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.iconButtonSmall}
              onPress={pickImageFromGallery}
            >
              <Ionicons name="image" size={30} color="white" />
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
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "flex-end",
    paddingBottom: 20,
  },
  flashLightContainer: {
    position: "absolute",
    top: 100,
    right: -25,
    flexDirection: "column",
    justifyContent: "space-between",
    gap:20,
    width: 80, // Adjust the width based on the spacing you need
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 50,
  },
  iconButtonSmall: {
    alignItems: "center",
  },
  captureWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  captureButton: {
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: "green",
    padding: 15,
  },
  timerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "red",
    padding: 10,
    alignItems: "center",
  },
  recordingText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

