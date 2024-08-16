import React from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";



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
            require("../../assets/Vector.png")
          } style={{width:120, height:120,}}/>
        <Text style={styles.title}>KAP</Text>
        </View>

        <ActivityIndicator color={"#fff"} size={40} style={styles.loader}/>
      
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
    fontSize: 34,
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    marginVertical: 20,
  },
  loader: {
    position:"relative",
    top: 200,
  },
});

export default SplashScreen;
