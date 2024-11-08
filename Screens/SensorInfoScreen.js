// SensorInfoScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { realtimeDb } from '../database/firebaseConfig.js';
import { ref, onValue } from 'firebase/database';


const SensorInfoScreen = () => {
  const [sensorData, setSensorData] = useState({
    temperature: 0,
    humidity: 0,
  });

  useEffect(() => {
    const temperatureRef = ref(realtimeDb, 'sensor/temperatureC');
    const humidityRef = ref(realtimeDb, 'sensor/humidity');

    const temperatureListener = onValue(temperatureRef, (snapshot) => {
      const temperature = snapshot.val();
      setSensorData(prevData => ({ ...prevData, temperature }));
    });

    const humidityListener = onValue(humidityRef, (snapshot) => {
      const humidity = snapshot.val();
      setSensorData(prevData => ({ ...prevData, humidity }));
    });

    return () => {
      temperatureListener.off(); // Asegúrate de eliminar el listener cuando el componente se desmonte
      humidityListener.off();
    };
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Sensor Info</Text>
      </View>
      <View style={styles.sensorContainer}>
        <Text style={styles.sensorTitle}>Temperatura</Text>
        <Text style={styles.sensorValue}>{sensorData.temperature} °C</Text>
      </View>
      <View style={styles.sensorContainer}>
        <Text style={styles.sensorTitle}>Humedad</Text>
        <Text style={styles.sensorValue}>{sensorData.humidity} %</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  sensorContainer: {
    marginBottom: 15,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  sensorTitle: {
    fontSize: 18,
    color: '#333',
  },
  sensorValue: {
    fontSize: 16,
    color: '#6200EE',
  },
});

export default SensorInfoScreen;
