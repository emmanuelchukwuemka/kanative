import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import UserProfile from '../../Components/Profile/UserProfile'

const profile = () => {
  return (
    <View style={styles.container}>
     <UserProfile/>
    </View>
  )
}

export default profile

const styles = StyleSheet.create({
  container:{
    flex:1
  }
})