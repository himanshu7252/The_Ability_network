import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import SolutionProvidersScreen from '../screens/SolutionProvidersScreen';
import ProviderDetailsScreen from '../screens/ProviderDetailsScreen';
import EventsScreen from '../screens/EventsScreen';
import BlogsScreen from '../screens/BlogsScreen';
import ContactScreen from '../screens/ContactScreen';

// Import drawer content
import DrawerContent from '../components/DrawerContent';

// Import types
import { ServiceProvider } from '../types/apiTypes';

// Define navigation param types
export type RootStackParamList = {
  Home: undefined;
  SolutionProviders: undefined;
  Events: undefined;
  Blogs: undefined;
  Contact: undefined;
};

export type SolutionProvidersStackParamList = {
  SolutionProvidersList: undefined;
  ProviderDetails: { provider: ServiceProvider }; // Changed from providerId to provider
};

const Drawer = createDrawerNavigator<RootStackParamList>();
const Stack = createStackNavigator<SolutionProvidersStackParamList>();

// Create a stack navigator for Solution Providers
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
        options={{ title: 'Solution Providers' }}
      />
      <Stack.Screen 
        name="ProviderDetails" 
        component={ProviderDetailsScreen} 
        options={{ title: 'Provider Details' }}
      />
    </Stack.Navigator>
  );
}

// Rest of your AppNavigator code remains the same...

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