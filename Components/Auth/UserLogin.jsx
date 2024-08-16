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
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserLogin = () => {
  const [showPassword, setShowPassword] = useState(false); 

  const loginUrl = "http://192.168.10.142:8000/user/login";

  const validationSchema = Yup.object().shape({
    phone: Yup.string().required("Phone number is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const handleRegister = (values) => {
    axios.post(loginUrl, {
      phone: values.phone,
      password: values.password,
    })
      .then(response => {
        // console.log(response.data.user);
        if (response.status == 200){
          router.push("dashboard")
        }
        // AsyncStorage.setItem("userData", JSON.stringify(response.data.user))
      })
      .catch(error => {
        console.log(error);
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
        <Text style={styles.h1}>Welcome back!</Text>
        <Text style={styles.p}>Please login to your account</Text>
      </View>

      <Formik
        initialValues={{ phone: "", password: ""}}
        validationSchema={validationSchema}
        onSubmit={handleRegister}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Icon name="phone" size={20} color="gray" style={styles.icon} />
              <TextInput
                placeholder="Phone Number"
                style={styles.input}
                onChangeText={handleChange("phone")}
                onBlur={handleBlur("phone")}
                value={values.phone}
                keyboardType="phone-pad"
                maxLength={15}
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

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <Text style={{ textAlign: "center", fontSize: 15 }} onPress={() => router.push("forgot")}>
             forgot password?
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
    marginTop: 5,
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
    color: "#515050",
  },
  p: {
    textAlign: "center",
    fontSize: 14,
    color: "#515050",
    marginTop: -10,
  },
  curved: {
    marginVertical:20,
    borderBottomStartRadius: 200,
    borderBottomEndRadius: 200,
    paddingVertical: 80,
    alignItems: "center",
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

  },
});
