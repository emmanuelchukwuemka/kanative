import { StyleSheet, Text, View } from "react-native";
import SplashScreen from "../Components/SplashScreen";
import { useEffect, useState } from "react";
import UserLogin from "../Components/Auth/UserLogin";
import Landing from "../Components/Landing/Landing";

export default function Page() {
  const [isSplash, setIsSplash] = useState(true)
  useEffect(() => {
    setIsSplash(true)
    setTimeout(()=>{
      setIsSplash(false)
    },3000)
  }, [])
  
  return (
    <View style={styles.container}>
      {
        isSplash?(
          <SplashScreen/>
        ):(
          <Landing/>
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});
