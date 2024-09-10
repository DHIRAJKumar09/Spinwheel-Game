import React, { useState } from 'react';
import { View, Button, Animated, StyleSheet, Text, Alert } from 'react-native';
import Svg, { G, Path, Text as SvgText } from 'react-native-svg';

const SpinWheel = () => {
  const [spinValue] = useState(new Animated.Value(0));
  const [score, setScore] = useState(0);  // Player's score
  const [result, setResult] = useState(null);  // To store result (Money/Lose)

  const sections = 6;
  const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33FF', '#FF5733', '#FFFF33'];
  
  // Each section holds either money or a "Lose" value
  const sectionValues = [100, 200, 'Lose', 500, 300, 'Lose'];

  const startSpin = () => {
    const spinTo = Math.floor(Math.random() * 360) + 360 * 3; // 3 full rotations + random stop

    Animated.timing(spinValue, {
      toValue: spinTo,
      duration: 4000,
      useNativeDriver: true,
    }).start(() => {
      // Calculate the angle the wheel stopped at
      const stoppingAngle = spinTo % 360;
      const sectionAngle = 360 / sections;

      // Determine which section the angle falls in
      const sectionIndex = Math.floor(stoppingAngle / sectionAngle);
      const value = sectionValues[sectionIndex];

      if (value === 'Lose') {
        // If the player loses, reset the game
        setResult('Game Over');
        Alert.alert('Game Over', 'You lost the game!', [
          { text: 'OK', onPress: () => resetGame() },
        ]);
      } else {
        // If the player wins money, add to the score
        setScore(prevScore => prevScore + value);
        setResult(`You won $${value}`);
      }
    });
  };

  // Reset the game (score and spin)
  const resetGame = () => {
    setScore(0);
    setResult(null);
    spinValue.setValue(0);  // Reset spin animation
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      {/* Arrow emoji */}
      <Text style={styles.arrow}>⬆️</Text>

      {/* Wheel */}
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <Svg height="300" width="300" viewBox="0 0 300 300">
          <G transform="translate(150,150)">
            {Array.from({ length: sections }).map((_, i) => {
              const angle = (2 * Math.PI) / sections;
              const rotateAngle = (angle * i * 180) / Math.PI; // Rotate text with the section

              return (
                <G key={i}>
                  {/* Section Path */}
                  <Path
                    d={`M0,0 L${150 * Math.cos(angle * i)},${150 * Math.sin(angle * i)} A150,150 0 0,1 ${150 *
                      Math.cos(angle * (i + 1))},${150 * Math.sin(angle * (i + 1))} Z`}
                    fill={colors[i % colors.length]}
                  />

                  {/* Display the value in the section */}
                  <SvgText
                    x={90 * Math.cos(angle * (i + 0.5))}  // Position text halfway in the section
                    y={90 * Math.sin(angle * (i + 0.5))}
                    fill="black"
                    fontSize="16"
                    fontWeight="bold"
                    textAnchor="middle"
                    transform={`rotate(${rotateAngle}, ${90 * Math.cos(angle * (i + 0.5))}, ${90 * Math.sin(angle * (i + 0.5))})`} // Rotate text
                  >
                    {sectionValues[i] === 'Lose' ? 'Lose' : `$${sectionValues[i]}`}
                  </SvgText>
                </G>
              );
            })}
          </G>
        </Svg>
      </Animated.View>

      <Button title="Spin the Wheel!" onPress={startSpin} />

      {/* Display the result of the spin (Money or Game Over) */}
      {result && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>{result}</Text>
        </View>
      )}

      {/* Display the current score */}
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>Score: ${score}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    fontSize: 40,  // Size of the arrow emoji
    position: 'absolute',  // Position the arrow absolutely
    top: 50,  // Adjust the top position to place it above the wheel
    zIndex: 1,  // Make sure the arrow is above the wheel
  },
  resultContainer: {
    marginTop: 20,
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  scoreContainer: {
    marginTop: 20,
  },
  scoreText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default SpinWheel;
