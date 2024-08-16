import { StyleSheet, Text, View } from "react-native";

import { useEffect, useState } from "react";
import UserLogin from "../Components/Auth/UserLogin";
import Landing from "../Components/Landing/Landing";
import SplashScreen from "../Components/Loader/SplashScreen";
import { router } from "expo-router";

export default function Page() {
  const [isSplash, setIsSplash] = useState(true)

  useEffect(()=>{
 setIsSplash(true);
    setTimeout(() => {
     
      const isLoggedIn = checkUserLoggedIn();

      if (isLoggedIn) {
        router.replace('Dashboard');
      } else {
        setIsSplash(false); 
      }
    }, 3700);
  }, []);

  const checkUserLoggedIn = () => {
   
    const userToken = null;
    return !!userToken;
  };
  
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
