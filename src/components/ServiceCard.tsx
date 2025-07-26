import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import type { Service } from '../types/Service';

type Props = {
  service: Service;
  onPress: () => void;
};

const ServiceCard = ({ service, onPress }: Props) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Text style={styles.title}>{service.service_name}</Text>
    <Text>{service.service_description}</Text>
    <Text>City: {service.cities.join(', ')}</Text>
    <Text>Org: {service.organization_names.join(', ')}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
  },
  title: { fontWeight: 'bold', fontSize: 16, marginBottom: 5 }
});

export default ServiceCard;
