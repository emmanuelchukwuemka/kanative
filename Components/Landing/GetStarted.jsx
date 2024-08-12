import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  Platform,
  StatusBar,
} from "react-native";
import { router } from "expo-router";



const GetStarted = () => {

  return (
    <View style={styles.container}>
      <View style={styles.startedCon}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Get Started..</Text>
      </View>
      <View style={styles.imageCon}>
        <Image source={require("../../assets/cam.png")} />
        <Text style={styles.imageText}>KAP</Text>

        <Pressable style={styles.login} onPress={() => router.push("login")}>
          <Text style={styles.loginText}>Log In</Text>
        </Pressable>
      </View>
      <View style={styles.curvedView}>
        <Pressable style={styles.login1} onPress={()=>router.push("signup")}>
          <Text style={styles.loginText1}>Sign Up</Text>
        </Pressable>


      </View>
    </View>
  );
};

export default GetStarted;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#fff",
  },
  startedCon: {
    marginTop: 100,
    paddingHorizontal: 20,
  },
  imageCon: {
    alignItems: "center",
    marginTop: 80,
    width: "100%",
    paddingHorizontal: 30,
  },
  imageText: {
    fontSize: 40,
    fontWeight: "bold",
  },
  login: {
    backgroundColor: "#142D13",
    padding: 10,
    width: "100%",
    borderRadius: 20,
    marginVertical: 20,
  },
  login1: {
    backgroundColor: "#fff",
    padding: 10,
    width: "100%",
    borderRadius: 14,
    marginVertical: 20,
  },
  loginText: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  loginText1: {
    fontSize: 20,
    color: "#132812",
    textAlign: "center",
    fontWeight: "bold",
  },
  curvedView: {
    borderTopEndRadius: 50,
    borderTopStartRadius: 50,
    backgroundColor: "#132812",
    paddingHorizontal: 40,
    height: "100%",
  },
  social: {
    borderTopWidth: 2,
    borderColor: "#fff",
    marginTop: 100,
  },
  socialText: {
    backgroundColor: "#132812",
    padding: 10,
    width: 140,
    position: "relative",
    bottom: 20,
    left: "30%",
    textAlign: "center",
    color: "#fff",
  },
  socialFlex: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
});
