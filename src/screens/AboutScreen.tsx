import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AboutScreen = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Ability Network is a Tech Mahindra Foundation initiative for disability services.</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  text: { fontSize: 16, textAlign: 'center' }
});

export default AboutScreen;