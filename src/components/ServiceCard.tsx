import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import type { Service } from '../types/Service';

type Props = {
  service: Service;
  onPress: () => void;
};

const ServiceCard = ({ service, onPress }: Props) => (
  <TouchableOpacity style={styles.cardContainer} onPress={onPress} activeOpacity={0.9}>
    <View style={styles.cardContent}>
      <Text style={styles.title}>{service.service_name}</Text>

      <Text style={styles.description} numberOfLines={3}>
        {service.service_description}
      </Text>

      <View style={styles.infoRow}>
        <Text style={styles.label}>City:</Text>
        <Text style={styles.value}>{service.cities.join(', ')}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Organization:</Text>
        <Text style={styles.value}>{service.organization_names.join(', ')}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 16,
    borderRadius: 16,
    backgroundColor: '#edf2fb',
    padding: 1,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  cardContent: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    borderLeftWidth: 6,
    borderLeftColor: '#4361ee',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f1f1f',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#4b4b4b',
    marginBottom: 10,
    lineHeight: 20,
  },
  infoRow: {
    flexDirection: 'row',
    marginTop: 4,
    flexWrap: 'wrap',
  },
  label: {
    fontWeight: '600',
    color: '#4361ee',
    marginRight: 6,
  },
  value: {
    color: '#222',
    flex: 1,
  },
});

export default ServiceCard;
