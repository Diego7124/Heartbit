// SettingsScreen.js
import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../ThemeContext';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = ({ navigation }) => {
  const { isDarkMode, toggleTheme, theme } = useContext(ThemeContext);
  const [isFahrenheit, setIsFahrenheit] = useState(false);

  useEffect(() => {
    const fetchUnitPreference = async () => {
      const value = await AsyncStorage.getItem('@unit_preference');
      if (value !== null) {
        setIsFahrenheit(value === 'fahrenheit');
      }
    };
    fetchUnitPreference();
  }, []);

  const toggleUnit = async () => {
    const newValue = !isFahrenheit;
    setIsFahrenheit(newValue);
    await AsyncStorage.setItem('@unit_preference', newValue ? 'fahrenheit' : 'celsius');
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('@user_session');
    navigation.replace('Login'); // Navegar a la pantalla de login
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.label, { color: theme.text }]}>Configuraciones</Text>
      
      <View style={styles.optionContainer}>
        <Text style={[styles.optionLabel, { color: theme.text }]}>Modo Oscuro</Text>
        <View style={styles.switchContainer}>
          <FontAwesome name="sun-o" size={24} color={theme.text} style={styles.icon} />
          <Switch
            onValueChange={toggleTheme}
            value={isDarkMode}
            thumbColor={isDarkMode ? '#fff' : '#333'}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
          />
          <FontAwesome name="moon-o" size={24} color={theme.text} style={styles.icon} />
        </View>
      </View>

      <View style={styles.optionContainer}>
        <Text style={[styles.optionLabel, { color: theme.text }]}>Unidades de Temperatura</Text>
        <View style={styles.switchContainer}>
          <Text style={{ color: theme.text }}>°C</Text>
          <Switch
            onValueChange={toggleUnit}
            value={isFahrenheit}
            thumbColor={isFahrenheit ? '#fff' : '#333'}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
          />
          <Text style={{ color: theme.text }}>°F</Text>
        </View>
      </View>

      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 24,
    marginBottom: 20,
  },
  optionContainer: {
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
  },
  optionLabel: {
    fontSize: 18,
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginHorizontal: 10,
  },
  logoutButton: {
    marginTop: 40,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#d9534f',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default SettingsScreen;
