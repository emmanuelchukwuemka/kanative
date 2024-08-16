import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Dashboard from '../Components/Dashboard/Dashboard'
import SplashScreen from '../Components/Loader/SplashScreen';

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
    {isSplash ? <SplashScreen /> : <Dashboard />}
  </View>
);
}

export default dashboard

const styles = StyleSheet.create({})