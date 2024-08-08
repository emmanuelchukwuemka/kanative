import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import GetStarted from '../Components/Landing/GetStarted'

const getstarted = () => {
  return (
    <View style={styles.container}>
    <GetStarted/>
    </View>
  )
}

export default getstarted

const styles = StyleSheet.create({
    container:{
        flex:1,
    }
})