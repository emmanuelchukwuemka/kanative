import { Platform, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const GetStarted = () => {
  return (
    <View style={styles.container
    }>
      <Text>GetStarted</Text>
    </View>
  )
}

export default GetStarted

const styles = StyleSheet.create({
    container:{
        paddingTop: Platform.OS === "android"? StatusBar.currentHeight:0
    }
})