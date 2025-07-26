import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  About: undefined;
  Contact: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: Props) => (
  <View style={styles.container}>
    <Text style={styles.title}>Welcome to Ability Network</Text>
    <Button title="Search Services" onPress={() => navigation.navigate('Search')} />
    <Button title="About" onPress={() => navigation.navigate('About')} />
    <Button title="Contact" onPress={() => navigation.navigate('Contact')} />
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 22, marginBottom: 20, fontWeight: 'bold' }
});

export default HomeScreen;
