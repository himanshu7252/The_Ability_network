import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, StatusBar } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: Props) => (
  <View style={styles.container}>
    <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
    <Image 
      source={require('../assets/abilitynetworklogo.png')} 
      style={styles.logo}
    />

    <Text style={styles.title}>Welcome to Ability Network</Text>
    <Text style={styles.subtitle}>Connecting you with essential services</Text>

    <View style={styles.buttonContainer}>
      <TouchableOpacity 
        style={[styles.button, styles.primaryButton]}
        onPress={() => navigation.navigate('Search')}
      >
        <Text style={styles.buttonText}>🔍 Search Services</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.button, styles.secondaryButton]}
        onPress={() => navigation.navigate('About')}
      >
        <Text style={styles.buttonText}>ℹ️ About Us</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.button, styles.accentButton]}
        onPress={() => navigation.navigate('Contact')}
      >
        <Text style={styles.buttonText}>📞 Contact</Text>
      </TouchableOpacity>
    </View>

    <Text style={styles.footerText}>Supporting our community since 2023</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 24,
  },
  logo: {
    width: 240,
    height: 120,
    marginBottom: 30,
    
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
    color: '#212529',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 40,
    color: '#6c757d',
    textAlign: 'center',
    maxWidth: '80%',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 320,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 12,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  primaryButton: {
    backgroundColor: '#4361ee',
  },
  secondaryButton: {
    backgroundColor: '#6c757d',
  },
  accentButton: {
    backgroundColor: '#3a0ca3',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginLeft: 10,
  },
  footerText: {
    position: 'absolute',
    bottom: 30,
    fontSize: 14,
    color: '#adb5bd',
  }
});

export default HomeScreen;
