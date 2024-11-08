import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Register from './Screens/Register';
import Home from './Screens/Home'; 
import Login from './Screens/Login';

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

  const MyStack = () => {
    return (
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
      </Stack.Navigator>
    );
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer onStateChange={(state) => {
      const currentRoute = state.routes[state.index];
      saveCurrentRoute(currentRoute.name);
    }}>
      <MyStack />
    </NavigationContainer>
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
