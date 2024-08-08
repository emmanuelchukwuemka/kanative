import {
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons"; // Import the icon library
import { router } from "expo-router";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to handle password visibility

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar
        animated={true}
        barStyle={"light-content"}
        backgroundColor={"#132812"}
      />
      <View style={styles.curved}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.replace("getstarted")}
        >
          <Icon name="chevron-left" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.h1}>Create an account</Text>
        <Text style={styles.p}>Register with correct information</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Icon name="person" size={20} color="gray" style={styles.icon} />
          <TextInput
            placeholder="Username"
            style={styles.input}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="email" size={20} color="gray" style={styles.icon} />
          <TextInput
            placeholder="Email Address"
            style={styles.input}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="phone" size={20} color="gray" style={styles.icon} />
          <TextInput
            placeholder="Phone Number"
            style={styles.input}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color="gray" style={styles.icon} />
          <TextInput
            placeholder="Password"
            secureTextEntry={!showPassword}
            style={styles.input}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.showPasswordIcon}
          >
            <Icon
              name={showPassword ? "visibility" : "visibility-off"}
              size={20}
              color="gray"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color="gray" style={styles.icon} />
          <TextInput
            placeholder="Confirm Password"
            secureTextEntry={!showPassword}
            style={styles.input}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.showPasswordIcon}
          >
            <Icon
              name={showPassword ? "visibility" : "visibility-off"}
              size={20}
              color="gray"
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            // Handle login logic here
            console.log("Email:", email);
            console.log("Password:", password);
          }}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <Text style={{ textAlign: "center", fontSize: 15 }}>
          Already have an account?{" "}
          <Text style={{ color: "#2C702A", fontWeight: "bold" }}>
            Sign up here
          </Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

export default UserLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    padding: 10,
  },
  icon: {
    marginRight: 10,
  },
  showPasswordIcon: {
    padding: 10,
  },
  button: {
    backgroundColor: "#132812",
    padding: 10,
    marginVertical: 15,
    borderRadius: 30,
    marginTop: 70,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
  h1: {
    fontSize: 34,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#fff",
  },
  p: {
    textAlign: "center",
    fontSize: 14,
    color: "#fff",
    marginTop: -10,
  },
  curved: {
    backgroundColor: "#132812",
    borderBottomStartRadius: 200,
    borderBottomEndRadius: 200,
    paddingVertical: 60,
    alignItems: "center", // Center content horizontally
  },
  backButton: {
    position: "absolute",
    left: 20,
    top: 20,
    backgroundColor: "lightgreen",
    borderRadius: 20,
    padding: 5,
  },
  form: {
    paddingHorizontal: 30,
    paddingTop: 50,
  },
});
