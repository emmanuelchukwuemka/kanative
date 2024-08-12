import { Platform, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import UserSignup from '../Components/Auth/UserSignup'

const signup = () => {
  return (
    <View style={styles.container}>
     <UserSignup/>
    </View>
  )
}

export default signup

const styles = StyleSheet.create({
    container:{
        flex:1,

    }
})