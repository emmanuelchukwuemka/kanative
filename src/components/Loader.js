import React, {useState} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import colors from '../assets/colors/colors';
const Loader = ({}) => {
  return (
    <View style={Styles.container}>
      <ActivityIndicator size={'small'} color={colors.primary} />
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Loader;
