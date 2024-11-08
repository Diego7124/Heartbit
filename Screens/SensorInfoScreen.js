import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { realtimeDb } from '../database/firebaseConfig.js';
import { ref, onValue } from 'firebase/database';
import { ThemeContext } from '../ThemeContext';
import { FontAwesome, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'; // Asegúrate de tener instalada esta dependencia

const SensorInfoScreen = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [sensorData, setSensorData] = useState({
    temperature: 0,
    humidity: 0,
    ph: 7.0,
    turbidity: 0.0,
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

    // Simulación de pH y turbidez
    const phInterval = setInterval(() => {
      const newPh = (Math.random() * (8 - 6) + 6).toFixed(2);
      setSensorData(prevData => ({ ...prevData, ph: newPh }));
    }, 3000);

    const turbidityInterval = setInterval(() => {
      const newTurbidity = (Math.random() * 100).toFixed(2);
      setSensorData(prevData => ({ ...prevData, turbidity: newTurbidity }));
    }, 5000);

    return () => {
  
      clearInterval(phInterval);
      clearInterval(turbidityInterval);
    };
  }, []);

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#FFFFFF' }]}>
      <View style={styles.header}>
        <Text style={[styles.headerText, { color: isDarkMode ? '#E0E0E0' : '#333333' }]}>Lecturas</Text>
        <TouchableOpacity onPress={() => { /* Refrescar datos */ }}>
          <FontAwesome name="refresh" size={24} color={isDarkMode ? '#E0E0E0' : '#333333'} />
        </TouchableOpacity>
      </View>

      <View style={[styles.sensorContainer, { backgroundColor: isDarkMode ? '#1E1E1E' : '#FFFFFF', borderColor: '#00CED1' }]}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons name="thermometer" size={24} color={isDarkMode ? '#00CED1' : '#00CED1'} />
          <Text style={[styles.sensorTitle, { color: isDarkMode ? '#00CED1' : '#00CED1' }]}>Temperatura</Text>
        </View>
        <Text style={[styles.sensorValue, { color: isDarkMode ? '#E0E0E0' : '#333333' }]}>{sensorData.temperature} °C</Text>
      </View>

      <View style={[styles.sensorContainer, { backgroundColor: isDarkMode ? '#1E1E1E' : '#FFFFFF', borderColor: '#00CED1' }]}>
        <View style={styles.iconContainer}>
          <Ionicons name="water" size={24} color={isDarkMode ? '#00CED1' : '#00CED1'} />
          <Text style={[styles.sensorTitle, { color: isDarkMode ? '#00CED1' : '#00CED1' }]}>Humedad</Text>
        </View>
        <Text style={[styles.sensorValue, { color: isDarkMode ? '#E0E0E0' : '#333333' }]}>{sensorData.humidity} %</Text>
      </View>

      <View style={[styles.sensorContainer, { backgroundColor: isDarkMode ? '#1E1E1E' : '#FFFFFF', borderColor: '#00CED1' }]}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons name="ph" size={24} color={isDarkMode ? '#00CED1' : '#00CED1'} />
          <Text style={[styles.sensorTitle, { color: isDarkMode ? '#00CED1' : '#00CED1' }]}>pH</Text>
        </View>
        <Text style={[styles.sensorValue, { color: isDarkMode ? '#E0E0E0' : '#333333' }]}>{sensorData.ph}</Text>
      </View>

      <View style={[styles.sensorContainer, { backgroundColor: isDarkMode ? '#1E1E1E' : '#FFFFFF', borderColor: '#00CED1' }]}>
        <View style={styles.iconContainer}>
          <FontAwesome name="tint" size={24} color={isDarkMode ? '#00CED1' : '#00CED1'} />
          <Text style={[styles.sensorTitle, { color: isDarkMode ? '#00CED1' : '#00CED1' }]}>Turbidez</Text>
        </View>
        <Text style={[styles.sensorValue, { color: isDarkMode ? '#E0E0E0' : '#333333' }]}>{sensorData.turbidity} NTU</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 35,
    paddingVertical: 20,
  },
  sensorContainer: {
    marginBottom: 15,
    padding: 20,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
    alignItems: 'center',
    borderWidth: 2,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  sensorTitle: {
    fontSize: 22,
    marginLeft: 10,
  },
  sensorValue: {
    fontSize: 20,
  },
});

export default SensorInfoScreen;
