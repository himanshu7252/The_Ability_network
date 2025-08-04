import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  Platform,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Search'>;

const ServiceSearchScreen = ({ navigation }: Props) => {
  const [query, setQuery] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [disability, setDisability] = useState('');

  const [cityModalVisible, setCityModalVisible] = useState(false);
  const [stateModalVisible, setStateModalVisible] = useState(false);
  const [disabilityModalVisible, setDisabilityModalVisible] = useState(false);

  const cities = ['Delhi', 'Mumbai', 'Bangalore'];
  const states = ['Delhi', 'Maharashtra', 'Karnataka'];
  const disabilities = ['Visual Impairment', 'Hearing Impairment', 'Autism Spectrum Disorder'];

  const openModal = (type: 'city' | 'state' | 'disability') => {
    if (type === 'city') setCityModalVisible(true);
    if (type === 'state') setStateModalVisible(true);
    if (type === 'disability') setDisabilityModalVisible(true);
  };

  const renderModal = (
    visible: boolean,
    setVisible: (val: boolean) => void,
    data: string[],
    onSelect: (val: string) => void
  ) => (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <FlatList
            data={data}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  onSelect(item);
                  setVisible(false);
                }}
                style={styles.modalItem}
              >
                <Text style={styles.modalItemText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
          <Button title="Close" onPress={() => setVisible(false)} />
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Search Services</Text>

      <TextInput
        placeholder="Search keyword..."
        style={styles.input}
        value={query}
        onChangeText={setQuery}
        placeholderTextColor="#888"
      />

      <TouchableOpacity style={styles.selector} onPress={() => openModal('city')}>
        <Text style={styles.selectorText}>{city || 'Select City'} ▼</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.selector} onPress={() => openModal('state')}>
        <Text style={styles.selectorText}>{state || 'Select State'} ▼</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.selector} onPress={() => openModal('disability')}>
        <Text style={styles.selectorText}>{disability || 'Select Disability'} ▼</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.searchButton}
        onPress={() =>
          navigation.navigate('Results', {
            query,
            cities: city,
            states: state,
            disabilities: disability,
          } as any)
        }
      >
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>

      {renderModal(cityModalVisible, setCityModalVisible, cities, setCity)}
      {renderModal(stateModalVisible, setStateModalVisible, states, setState)}
      {renderModal(disabilityModalVisible, setDisabilityModalVisible, disabilities, setDisability)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fc',
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
    color: '#1f1f1f',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    backgroundColor: '#ffffff',
    color: '#000',
    elevation: 2,
  },
  selector: {
    padding: 14,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 12,
    backgroundColor: '#e6ecf5',
  },
  selectorText: {
    color: '#1f1f1f',
    fontWeight: '600',
  },
  searchButton: {
    backgroundColor: '#4b7bec',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#4b7bec',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000066',
    justifyContent: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 20,
    maxHeight: '70%',
  },
  modalItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalItemText: {
    fontSize: 16,
    color: '#333',
  },
});

export default ServiceSearchScreen;
