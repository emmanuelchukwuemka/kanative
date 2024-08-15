import {
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
  Image,
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";

const UserSignup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  const backendUrl = "http://192.168.10.75:8000/user/register";

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const handleRegister = (values, { resetForm }) => {
    axios.post(backendUrl, {
      username: values.username,
      email: values.email,
      phone: values.phone,
      password: values.password,
    })
      .then(response => {
        resetForm();
        setModalVisible(true);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <StatusBar
          animated={true}
          barStyle={"light-content"}
          backgroundColor={"#132812"}
        />
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
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
                    maxLength={11}
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
                    Login here
                  </Text>
                </Text>
              </View>
            )}
          </Formik>
        </ScrollView>

        {/* Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
                <Image source={require("../../assets/checked.png")} style={styles.image}/>
              <Text style={styles.modalText}>Your account has been created successfully</Text>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  setModalVisible(false);
                  router.replace("login");
                }}
              >
                <Text style={styles.modalButtonText}>Log In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default UserSignup;

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
    paddingTop: 50,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    width: 350,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
  },
  modalButton: {
    backgroundColor: "#132812",
    borderRadius: 10,
    padding: 13,
    width: "100%",
    marginVertical:10,
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  image: {
      width:80,
      height:80,
      marginVertical:30,
      }
});
