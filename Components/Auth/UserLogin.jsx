import { KeyboardAvoidingView, Platform, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Text>Login</Text>
      <TextInput
        placeholder="Email Address"
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        style={styles.input1}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          // Handle login logic here
          console.log("Email:", email);
          console.log("Password:", password);
        }}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

export default UserLogin

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    // paddingHorizontal: 17,
  },
  input: {
    padding: 10,
    borderColor: "black",
    borderWidth: 2,
    marginTop: 100,
  },
  input1: {
    padding: 10,
    borderColor: "black",
    borderWidth: 2,
    marginTop: 10,
  },
  button: {
    backgroundColor: "green",
    padding: 15,
    marginVertical: 15,
    borderRadius: 30,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
});
