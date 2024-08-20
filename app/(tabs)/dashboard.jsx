import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Dashboard from '../../Components/Dashboard/Dashboard'
import SplashScreen from '../../Components/Loader/SplashScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const dashboard = () => {
const [isSplash, setIsSplash] = useState(true);



useEffect(() => {
  setIsSplash(true);
  setTimeout(() => {
    setIsSplash(false);
  }, 3700);
}, []);

return (
  <View style={styles.container}>
    {isSplash ? <ActivityIndicator color={"green"} /> : <Dashboard />}
  </View>
);
}

export default dashboard

const styles = StyleSheet.create({
  container:{
    flex:1,
  }
})