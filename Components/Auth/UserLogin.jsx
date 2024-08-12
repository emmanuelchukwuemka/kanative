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
import Icon from "react-native-vector-icons/MaterialIcons";
import { router } from "expo-router";
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";

const UserLogin = () => {
  const [showPassword, setShowPassword] = useState(false); // State to handle password visibility

  const backendUrl = "http://localhost:8000/user/register";

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleRegister = (values) => {
    axios.post(backendUrl, {
      username: values.username,
      email: values.email,
      phone: values.phone,
      password: values.password,
    })
      .then(response => {
        console.log(response.data);

      })
      .catch(error => {
        console.error(error);
      });
  };

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
        <Text style={styles.h1}>Register</Text>
        <Text style={styles.p}>Register with correct information</Text>
      </View>

      <Formik
        initialValues={{ username: "", email: "", phone: "", password: "", confirmPassword: "" }}
        validationSchema={validationSchema}
        onSubmit={handleRegister}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Icon name="person" size={20} color="gray" style={styles.icon} />
              <TextInput
                placeholder="Username"
                style={styles.input}
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                value={values.username}
              />
            </View>
            {touched.username && errors.username && <Text style={styles.errorText}>{errors.username}</Text>}

            <View style={styles.inputContainer}>
              <Icon name="email" size={20} color="gray" style={styles.icon} />
              <TextInput
                placeholder="Email Address"
                style={styles.input}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                keyboardType="email-address"
              />
            </View>
            {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

            <View style={styles.inputContainer}>
              <Icon name="phone" size={20} color="gray" style={styles.icon} />
              <TextInput
                placeholder="Phone Number"
                style={styles.input}
                onChangeText={handleChange("phone")}
                onBlur={handleBlur("phone")}
                value={values.phone}
                keyboardType="phone-pad"
              />
            </View>
            {touched.phone && errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

            <View style={styles.inputContainer}>
              <Icon name="lock" size={20} color="gray" style={styles.icon} />
              <TextInput
                placeholder="Password"
                secureTextEntry={!showPassword}
                style={styles.input}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
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
            {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

            <View style={styles.inputContainer}>
              <Icon name="lock" size={20} color="gray" style={styles.icon} />
              <TextInput
                placeholder="Confirm Password"
                secureTextEntry={!showPassword}
                style={styles.input}
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                value={values.confirmPassword}
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
            {touched.confirmPassword && errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <Text style={{ textAlign: "center", fontSize: 15 }}>
              Already have an account?{" "}
              <Text style={{ color: "#2C702A", fontWeight: "bold" }}>
                Sign up here
              </Text>
            </Text>
          </View>
        )}
      </Formik>
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
  errorText: {
    color: "red",
    marginTop: 5,
    marginLeft: 10,
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
