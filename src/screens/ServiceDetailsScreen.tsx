import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

const ServiceDetailsScreen = ({ route }: Props) => {
  const { service } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{service.service_name}</Text>
      <Text>{service.service_description}</Text>
      <Text>Disabilities: {service.disabilities.join(', ')}</Text>
      <Text>Organizations: {service.organization_names.join(', ')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 }
});

export default ServiceDetailsScreen;
