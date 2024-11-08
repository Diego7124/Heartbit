import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ThemeContext = createContext();

const lightTheme = {
  background: '#FFFFFF',
  text: '#333333',
  primary: '#6200EA',
  secondary: '#03A9F4',
  accent: '#D32F2F',
};

const darkTheme = {
  background: '#121212',
  text: '#E0E0E0',
  primary: '#BB86FC',
  secondary: '#03DAC6',
  accent: '#CF6679',
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const loadThemePreference = async () => {
      const savedTheme = await AsyncStorage.getItem('@theme_preference');
      if (savedTheme !== null) {
        setIsDarkMode(savedTheme === 'dark');
      }
    };
    loadThemePreference();
  }, []);

  const toggleTheme = async () => {
    setIsDarkMode(prevMode => !prevMode);
    await AsyncStorage.setItem('@theme_preference', !isDarkMode ? 'dark' : 'light');
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};
