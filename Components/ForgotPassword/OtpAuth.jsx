import {
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
} from "react-native";
import React, { useState, useRef } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { router } from "expo-router";
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OtpAuth = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);

  const otpInputs = useRef([]);

  const verifyUrl = "https://kap-backend.onrender.com/user/verifyNumber";

  const validationSchema = Yup.object().shape({
    phone: Yup.string().required("Phone number is required"),
  });

  const handleRegister = (values) => {
    axios
      .post(verifyUrl, {
        phone: values.phone,
      })
      .then((response) => {
        // console.log(response.data.user);
        if (response.status == 200) {
          router.push("dashboard");
        }
        // AsyncStorage.setItem("userData", JSON.stringify(response.data.user))
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleOtpChange = (index, value) => {
    if (/^[0-9]$/.test(value)) {
      let newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (index < 3 && value) {
        otpInputs.current[index + 1].focus();
      }
    } else if (value === "") {
      let newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
    }
  };

  const handleOtpSubmit = () => {
    // Implement your OTP verification logic here
    console.log("OTP submitted:", otp.join(""));
    setModalVisible(false);
    // Redirect to the dashboard or any other page after OTP verification
    // router.push("dashboard");
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
          onPress={() => router.replace("login")}
        >
          <Icon name="chevron-left" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.h1}>Verify Your Account</Text>
        <Text style={styles.p}>Please enter your registered phone number</Text>
      </View>

      <Formik
        initialValues={{ phone: "" }}
        validationSchema={validationSchema}
        onSubmit={handleRegister}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
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
            {touched.phone && errors.phone && (
              <Text style={styles.errorText}>{errors.phone}</Text>
            )}

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Verify</Text>
            </TouchableOpacity>
            <Text style={{ textAlign: "center", fontSize: 15 }}>
              Please remember that OTP will be sent to you to complete your
              verification.{" "}
              <Text style={{ color: "green", fontWeight: "bold" }}>
                Try again
              </Text>
            </Text>
          </View>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
};

export default OtpAuth;

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
    marginVertical: 20,
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
