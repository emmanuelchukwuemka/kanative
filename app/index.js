import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import UserLogin from "../Components/Auth/UserLogin";
import Landing from "../Components/Landing/Landing";
import SplashScreen from "../Components/Loader/SplashScreen";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

export default function Page() {
  const [isSplash, setIsSplash] = useState(true);

  useEffect(() => {
    setIsSplash(true);
    setTimeout(() => {
      checkUserLoggedIn();
    }, 3700);
  }, []);

  const checkUserLoggedIn = () => {
    AsyncStorage.getItem("user")
      .then((user) => {
        if (user) {
          router.replace("dashboard");
        } else {
          setIsSplash(false);
        }
      })
      .catch((error) => {
        console.error("Failed to check user login status:", error);
        setIsSplash(false);
      });
  };

  return (
    <View style={styles.container}>
      {isSplash ? <SplashScreen /> : <Landing />}
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
