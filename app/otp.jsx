import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import OtpAuth from '../Components/ForgotPassword/OtpAuth'

const otp = () => {
  return (
    <View style={styles.container}>
      <OtpAuth/>
    </View>
  )
}

export default otp

const styles = StyleSheet.create({
    container:{
        flex:1
    }
})