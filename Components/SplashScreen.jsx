import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";


const SplashScreen = () => {
  return (
       <View
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.container}
      >     
    <View
      style={styles.container}
    >
        <View style={styles.logoContainer}>
          <Image source={
            require("../assets/Vector.png")
          }/>
        <Text style={styles.title}>KAP</Text>
        </View>
      
    </View>
        </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#2C702A",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 54,
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    marginVertical: 20,
  },
  logoContainer: {},
});

export default SplashScreen;
