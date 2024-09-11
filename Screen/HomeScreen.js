import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';

const HomeScreen = ({ navigation }) => {
  
  const showInstructions = () => {
    Alert.alert(
      'How to Play',
      '1. Press the Spin button to start the game.\n' +
        '2. The wheel will spin and stop at a random section.\n' +
        '3. If the wheel stops on a money section, the amount will be added to your score.\n' +
        '4. If the wheel stops on the "Lose" section, the game will be over.\n' +
        'Good luck!',
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Spin Wheel Game</Text>

      
      <Button
        title="Start Game"
        onPress={() => navigation.navigate('SpinWheel')}
        color="#008CBA"
      />

      
      <Button
        title="How to Play"
        onPress={showInstructions}
        color="#f39c12"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2', 
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 50,
    color: '#2c3e50', 
  },
});

export default HomeScreen;
