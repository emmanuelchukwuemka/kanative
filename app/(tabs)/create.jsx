import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import CameraScreen from '../../Components/Create/CameraScreen'

const create = () => {
  return (
    <View style={styles.container}>
      <CameraScreen/>
    </View>
  )
}

export default create

const styles = StyleSheet.create({
  container:{
    flex:1,
  }
})