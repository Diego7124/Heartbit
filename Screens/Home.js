import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SensorInfoScreen from './SensorInfoScreen';
import SettingsScreen from './SettingsScreen';
import { FontAwesome } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function Home() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Información de Sensores') {
            iconName = focused ? 'thermometer' : 'thermometer-empty';
          } else if (route.name === 'Ajustes') {
            iconName = focused ? 'cogs' : 'cog';
          }

          // Puedes retornar cualquier componente que desees aquí
          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6200EE',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        },
      })}
    >
      <Tab.Screen
        name="Información de Sensores"
        component={SensorInfoScreen}
      />
      <Tab.Screen
        name="Ajustes"
        component={SettingsScreen}
      />
    </Tab.Navigator>
  );
}
