import { StyleSheet } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TabLayout = () => {
  const [userName, setUserName] = useState("");
  const [lastTabPress, setLastTabPress] = useState(0); // Track the last tab press time
  const homeTabPressCount = useRef(0); // Ref to keep track of multiple presses

  const fetchUserData = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      if (user) {
        const parsedUser = JSON.parse(user);
        setUserName(parsedUser.userName || "User");
      }
    } catch (error) {
      console.log("Error fetching user data: ", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleTabPress = (tabName) => {
    const now = Date.now();
    if (tabName === "dashboard") {
      if (now - lastTabPress < 300) { // If tapped again within 300ms
        homeTabPressCount.current += 1;
        if (homeTabPressCount.current > 1) {
          // Trigger refresh feed logic here
          console.log("Refresh feed triggered");
          // You may need to use a callback or context to inform the Dashboard to refresh
        }
      } else {
        homeTabPressCount.current = 1;
      }
      setLastTabPress(now);
    }
  };

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
          listeners: {
            tabPress: () => handleTabPress("dashboard"),
          },
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
          title: userName,
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
