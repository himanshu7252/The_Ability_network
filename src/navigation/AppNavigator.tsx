import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import HomeScreen from '../screens/HomeScreen';
import SolutionProvidersScreen from '../screens/SolutionProvidersScreen';
import ProviderDetailsScreen from '../screens/ProviderDetailsScreen';
import EventsScreen from '../screens/EventsScreen';
import BlogsScreen from '../screens/BlogsScreen';
import ContactScreen from '../screens/ContactScreen';

import DrawerContent from '../components/DrawerContent';

import { ServiceProvider } from '../types/apiTypes';

export type RootStackParamList = {
  Home: undefined;
  SolutionProviders: undefined;
  Events: undefined;
  Blogs: undefined;
  Contact: undefined;
};

export type SolutionProvidersStackParamList = {
  SolutionProvidersList: undefined;
  ProviderDetails: { provider: ServiceProvider }; 
};

const Drawer = createDrawerNavigator<RootStackParamList>();
const Stack = createStackNavigator<SolutionProvidersStackParamList>();

function SolutionProvidersStack() {
  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerStyle: { backgroundColor: '#0066b3' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' }
      }}
    >
      <Stack.Screen 
        name="SolutionProvidersList" 
        component={SolutionProvidersScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="ProviderDetails" 
        component={ProviderDetailsScreen} 
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}


const AppNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: '#0066b3' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
        drawerActiveTintColor: '#0066b3',
        drawerInactiveTintColor: '#333',
      }}
    >
      <Drawer.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen 
        name="SolutionProviders" 
        component={SolutionProvidersStack} 
        options={{
          title: 'Search Providers',
          drawerIcon: ({ color, size }) => (
            <Icon name="search" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen 
        name="Events" 
        component={EventsScreen} 
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="event" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen 
        name="Blogs" 
        component={BlogsScreen} 
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="article" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen 
        name="Contact" 
        component={ContactScreen} 
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="contact-mail" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default AppNavigator;