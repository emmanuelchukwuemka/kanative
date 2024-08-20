import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CreatePost from '../../Components/Create/CreatePost'

const create = () => {
  return (
    <View style={styles.container}>
      <CreatePost/>
    </View>
  )
}

export default create

const styles = StyleSheet.create({
  container:{
    flex:1,
  }
})