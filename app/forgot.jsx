import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ForgotPassword from '../Components/ForgotPassword/ForgotPassword'

const forgot = () => {
  return (
    <View style={styles.container}>
      <ForgotPassword/>
    </View>
  )
}

export default forgot

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});