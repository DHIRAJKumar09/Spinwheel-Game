import React, { useState } from 'react';
import { View, Text, Button, Animated, StyleSheet } from 'react-native';
import Svg, { G, Path, Text as SvgText } from 'react-native-svg';

const SpinWheel = () => {
  const [spinValue] = useState(new Animated.Value(0));
  const [score, setScore] = useState(0); 
  const [result, setResult] = useState(null); 

  const sections = 6;
  const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33FF', '#FF5733', '#FFFF33'];
  
  const sectionValues = [100, 200, 'Lose', 500, 300, 'Lose'];
  const sectionAngle = 360 / sections; 

  const startSpin = () => {
    const spinTo = Math.floor(Math.random() * 360) + 360 * 3; // 3 full rotations + random stop

    Animated.timing(spinValue, {
      toValue: spinTo,
      duration: 4000,
      useNativeDriver: true,
    }).start(() => {
      const stoppingAngle = spinTo % 360;
      const sectionIndex = Math.floor(stoppingAngle / sectionAngle);
      const value = sectionValues[sectionIndex];

      if (value === 'Lose') {
        setResult('Game Over');
      } else {
        setScore(prevScore => prevScore + value);
        setResult(`You won $${value}`);
      }
    });
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
    
      <Text style={styles.arrow}>⬆️</Text>

    
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <Svg height="300" width="300" viewBox="0 0 300 300">
          <G transform="translate(150,150)">
            {Array.from({ length: sections }).map((_, i) => {
              const angle = (2 * Math.PI) / sections;
              const rotateAngle = (angle * i * 180) / Math.PI;

              return (
                <G key={i}>
                
                  <Path
                    d={`M0,0 L${150 * Math.cos(angle * i)},${150 * Math.sin(angle * i)} A150,150 0 0,1 ${150 *
                      Math.cos(angle * (i + 1))},${150 * Math.sin(angle * (i + 1))} Z`}
                    fill={colors[i % colors.length]}
                  />

                
                  <SvgText
                    x={90 * Math.cos(angle * (i + 0.5))}
                    y={90 * Math.sin(angle * (i + 0.5))}
                    fill="black"
                    fontSize="16"
                    fontWeight="bold"
                    textAnchor="middle"
                    transform={`rotate(${rotateAngle}, ${90 * Math.cos(angle * (i + 0.5))}, ${90 * Math.sin(angle * (i + 0.5))})`}
                  >
                    {sectionValues[i] === 'Lose' ? 'Lose' : `$${sectionValues[i]}`}
                  </SvgText>
                </G>
              );
            })}
          </G>
        </Svg>
      </Animated.View>

      {/* Spin Button */}
      <Button title="Spin the Wheel!" onPress={startSpin} />

     
      {result && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>{result}</Text>
        </View>
      )}

     
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>Score: ${score}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5', 
  },
  arrow: {
    fontSize: 40,
    position: 'absolute',
    top: 80,
    zIndex: 1,
  },
  resultContainer: {
    marginTop: 20,
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50', 
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
