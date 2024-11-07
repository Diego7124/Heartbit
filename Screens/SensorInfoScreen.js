import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function SensorInfoScreen() {
  return (
    <View style={styles.container}>
      <Text>Información de los Sensores</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SensorInfoScreen;
