import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CameraScreen from '../../Components/Create/CameraScreen'; 

const TabLayout = () => {
  const [userName, setUserName] = useState("");

  const fetchUserData = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      if (user) {
        const parsedUser = JSON.parse(user);
        setUserName(parsedUser.userName || "User"); // Default to "User" if userName is not present
      }
    } catch (error) {
      console.log("Error fetching user data: ", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "green",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          paddingTop: 10,
        },
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              color={color}
              size={size}
            />
          ),
          headerShown: false,
          tabBarLabel: "",
        }}
      />
      <Tabs.Screen
        name="create"
      
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "add-circle" : "add-circle-outline"}
              color={color}
              size={size}
            />
          ),
          tabBarLabel: "",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "person-circle" : "person-circle-outline"}
              color={color}
              size={size}
            />
          ),
          title: userName, // Pass userName directly as the title
          tabBarLabel: "",
          headerRight: () => (
            <View style={styles.headerIconsContainer}>
              <TouchableOpacity onPress={() => console.log("Notifications")}>
                <Ionicons
                  name="notifications-outline"
                  size={24}
                  color="black"
                  style={styles.icon}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => console.log("Settings")}>
                <Ionicons
                  name="settings-outline"
                  size={24}
                  color="black"
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;

const styles = StyleSheet.create({
  headerIconsContainer: {
    flexDirection: "row",
    marginRight: 10,
  },
  icon: {
    marginLeft: 15,
  },
});
