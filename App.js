import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeProvider, ThemeContext } from './ThemeContext';

import Register from './Screens/Register';
import Home from './Screens/Home';
import Login from './Screens/Login';
import SettingsScreen from './Screens/SettingsScreen';
import SensorInfoScreen from './Screens/SensorInfoScreen';

export default function App() {
  const Stack = createStackNavigator();
  const [isLoading, setIsLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState('Register');

  useEffect(() => {
    const checkCurrentRoute = async () => {
      try {
        const route = await AsyncStorage.getItem('@current_route');
        if (route != null) {
          setInitialRoute(route);
        }
      } catch (e) {
        console.error('Error loading current route', e);
      } finally {
        setIsLoading(false);
      }
    };

    checkCurrentRoute();
  }, []);

  const saveCurrentRoute = async (routeName) => {
    try {
      await AsyncStorage.setItem('@current_route', routeName);
    } catch (e) {
      console.error('Error saving current route', e);
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ThemeProvider>
      <ThemeContext.Consumer>
        {({ isDarkMode, theme }) => (
          <NavigationContainer
            theme={isDarkMode ? DarkTheme : DefaultTheme}
            onStateChange={(state) => {
              const currentRoute = state.routes[state.index];
              saveCurrentRoute(currentRoute.name);
            }}
          >
            <Stack.Navigator initialRouteName={initialRoute}>
              <Stack.Screen 
                name="Register" 
                component={Register} 
                options={{ unmountOnBlur: true }}
              />
              <Stack.Screen 
                name="Login" 
                component={Login} 
                options={{ unmountOnBlur: true }}
              />
              <Stack.Screen 
                name="Home" 
                component={Home} 
                options={{ 
                  headerShown: false,
                  unmountOnBlur: true,
                }} 
              />
              <Stack.Screen 
                name="Settings" 
                component={SettingsScreen} 
                options={{ headerTitle: 'Configuración' }}
              />
              <Stack.Screen 
                name="SensorInfo" 
                component={SensorInfoScreen} 
              />
            </Stack.Navigator>
          </NavigationContainer>
        )}
      </ThemeContext.Consumer>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
