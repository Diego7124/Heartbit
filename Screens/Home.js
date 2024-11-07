import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SensorInfoScreen from './SensorInfoScreen';
import SettingsScreen from './SettingsScreen';

const Tab = createBottomTabNavigator();

export default function Home() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Información de Sensores" component={SensorInfoScreen} />
      <Tab.Screen name="Ajustes" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
