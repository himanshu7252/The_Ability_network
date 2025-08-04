import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ServiceSearchScreen from '../screens/ServiceSearchScreen';
import ServiceResultsScreen from '../screens/ServiceResultsScreen';
import ServiceDetailsScreen from '../screens/ServiceDetailsScreen';
import AboutScreen from '../screens/AboutScreen';
import ContactScreen from '../screens/ContactScreen';

export type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  Results: {
    query: string;
    cities: string;
    states: string;
    disabilities: string;
  };
  Details: { service: any };
  About: undefined;
  Contact: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Search" component={ServiceSearchScreen} />
      <Stack.Screen name="Results" component={ServiceResultsScreen} />
      <Stack.Screen name="Details" component={ServiceDetailsScreen} />
      <Stack.Screen name="About" component={AboutScreen} />
      <Stack.Screen name="Contact" component={ContactScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;