import {
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { router } from "expo-router";

const Landing = () => {
  return (
    <View style={styles.container}>
      <View style={styles.landCon}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            textAlign: "center",
            color: "#fff",
          }}
        >
          Welcome To
        </Text>
        <Image
          source={require("../../assets/Vector.png")}
          style={styles.imageStyle}
        />
        <Text style={styles.landTitle}>KAP</Text>
        <Text style={styles.landTitle1}>
          A Social Platform that allows you to share quality photos and videos.
          Also connect with friends and have fun
        </Text>
      </View>
      <View style={styles.btnCon}>
        <TouchableOpacity
          style={styles.btnTrigger}
          onPress={() => router.push("login")}
        >
          <Text
            style={styles.textbtn}
          >
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Landing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2C702A",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  landCon: {
    marginTop: 100,
    alignItems: "center",
  },
  landTitle: {
    fontSize: 48,
    fontWeight: "bold",
    color: "white",
  },
  landTitle1: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    width: 300,
    marginTop: 17,
    lineHeight: 24,
  },
  btnCon: {
    position: "relative",
    top: 200,
    paddingHorizontal: 50,
  },
  btnTrigger: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
  },
  imageStyle: {
    marginVertical: 35,
    width: 120,
    height: 120,
  },
  textbtn: { 
    fontSize: 18, 
    fontWeight: "bold", 
    textAlign: "center"
   },
});
