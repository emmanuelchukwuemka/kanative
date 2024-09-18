import { Camera, CameraType } from "expo-camera/legacy";
import { useEffect, useRef, useState } from "react";
import {
  Button,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Video } from "expo-av";
import * as Audio from "expo-av"; // Import Audio for recording permission

export default function App() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasAudioPermission, setHasAudioPermission] = useState(null);
  const [cameraType, setCameraType] = useState(CameraType.back);
  const [photoUri, setPhotoUri] = useState(null);
  const [videoUri, setVideoUri] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);
  const cameraRef = useRef(null);
  const timerRef = useRef(null);

  // Request camera and audio permissions
  const requestPermissions = async () => {
    const { status: cameraStatus } =
      await Camera.requestCameraPermissionsAsync();
    setHasCameraPermission(cameraStatus === "granted");

    const { status: audioStatus } = await Audio.requestPermissionsAsync();
    setHasAudioPermission(audioStatus === "granted");
  };

  // Capture photo
  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 1,
        base64: true,
      });
      setPhotoUri(photo.uri);
      setModalVisible(true);
    }
  };

  // Start recording video
  const startRecording = async () => {
    if (cameraRef.current && hasAudioPermission && hasCameraPermission) {
      try {
        setIsRecording(true);
        setTimerStarted(true);
        const videoRecordPromise = cameraRef.current.recordAsync();
        if (videoRecordPromise) {
          const data = await videoRecordPromise;
          setVideoUri(data.uri);
        }
      } catch (error) {
        console.error("Error starting recording:", error);
      }
    } else {
      console.log("Permissions not granted or camera not available");
    }
  };

  // Stop recording video
  const stopRecording = () => {
    if (cameraRef.current && isRecording) {
      cameraRef.current.stopRecording();
      setIsRecording(false);
      setTimerStarted(false);
      setRecordingTime(0);
    }
  };

  // Flip camera type
  const flipCamera = () => {
    setCameraType((prevType) =>
      prevType === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  // Pick image from gallery
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhotoUri(result.uri);
      setModalVisible(true);
    }
  };

  // Request permissions on component mount
  useEffect(() => {
    requestPermissions();
  }, []);

  // Timer for recording
  useEffect(() => {
    if (timerStarted) {
      timerRef.current = setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [timerStarted]);

  if (hasCameraPermission === null || hasAudioPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for permissions...</Text>
      </View>
    );
  }

  if (!hasCameraPermission || !hasAudioPermission) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need camera and microphone permissions to make this work!
        </Text>
        <Button title="Grant Permissions" onPress={requestPermissions} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={cameraType} ref={cameraRef}>
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>
            {new Date(recordingTime * 1000).toISOString().substr(14, 5)}
          </Text>
        </View>
        <View style={styles.controlsContainer}>
          <TouchableOpacity style={styles.iconButton} onPress={flipCamera}>
            <FontAwesome name="refresh" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.captureButton}
            onLongPress={startRecording}
            onPressOut={stopRecording}
          >
            <FontAwesome
              name={isRecording ? "stop" : "camera"}
              size={40}
              color="white"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={pickImage}>
            <FontAwesome name="image" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </Camera>

      {/* Modal for previewing image or video */}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={styles.modalContent}>
              {videoUri ? (
                <Video
                  source={{ uri: videoUri }}
                  style={styles.modalVideo}
                  useNativeControls
                  resizeMode="contain"
                  shouldPlay
                />
              ) : (
                <Image source={{ uri: photoUri }} style={styles.modalImage} />
              )}
              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => setModalVisible(false)}
                >
                  <FontAwesome name="check" size={30} color="green" />
                  <Text style={styles.modalButtonText}>Done</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => setModalVisible(false)}
                >
                  <FontAwesome name="times" size={30} color="red" />
                  <Text style={styles.modalButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  timerContainer: {
    position: "absolute",
    top: 0,
    width: "100%",
    backgroundColor: "green",
    padding: 10,
    alignItems: "center",
  },
  timerText: {
    color: "white",
    fontSize: 20,
  },
  controlsContainer: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 20,
  },
  iconButton: {
    backgroundColor: "transparent",
    padding: 10,
  },
  captureButton: {
    backgroundColor: "green",
    borderRadius: 50,
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    width: "80%",
  },
  modalImage: {
    width: "100%",
    height: 300,
    marginBottom: 20,
  },
  modalVideo: {
    width: "100%",
    height: 300,
    marginBottom: 20,
  },
  modalActions: { 
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  modalButtonText: {
    marginLeft: 10,
    fontSize: 16,
  },
});
