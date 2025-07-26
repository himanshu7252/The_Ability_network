import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ContactScreen = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Contact us at: support@abilitynetwork.in</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  text: { fontSize: 16 }
});

export default ContactScreen;
