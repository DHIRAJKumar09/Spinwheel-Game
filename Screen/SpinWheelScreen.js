import React from 'react';
import { View, StyleSheet } from 'react-native';
import SpinWheel from '../Components/SpinWheel';

const SpinWheelScreen = () => {
  return (
    <View style={styles.container}>
      <SpinWheel />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SpinWheelScreen;
