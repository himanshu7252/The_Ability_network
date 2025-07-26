import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { fetchServices } from '../services/serviceAPI';
import ServiceCard from '../components/ServiceCard';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import type { Service } from '../types/Service';

type Props = NativeStackScreenProps<RootStackParamList, 'Results'>;

const ServiceResultsScreen = ({ route, navigation }: Props) => {
  const { query } = route.params;
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    fetchServices(query).then(setServices);
  }, [query]);

  return (
    <View style={styles.container}>
      <FlatList
        data={services}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ServiceCard
            service={item}
            onPress={() => navigation.navigate('Details', { service: item })}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 }
});

export default ServiceResultsScreen;
