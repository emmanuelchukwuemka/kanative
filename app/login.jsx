import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import GetStarted from '../Components/Landing/GetStarted'

const login = () => {
  return (
    <View style={styles.container}>
    <GetStarted/>
    </View>
  )
}

export default login

const styles = StyleSheet.create({
    container:{
        flex:1,
    }
})