import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const Rootlayout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false,}} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="getstarted" options={{ headerShown: false }} />
      <Stack.Screen
        name="signup"
        options={{
          headerTitle: "",
          headerStyle: { backgroundColor: "#132812" },
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          headerTitle: "",
          headerStyle: { backgroundColor: "#132812" },
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="forgot"
        options={{
          headerTitle: "",
          headerStyle: { backgroundColor: "#132812" },
          headerShown: false,
        }}
      />
    </Stack>
  );
}

export default Rootlayout

const styles = StyleSheet.create({})