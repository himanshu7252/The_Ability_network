import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  FlatList
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
              <Text>{item}</Text>
            </TouchableOpacity>
          )}
        />
        <Button title="Close" onPress={() => setVisible(false)} />
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search keyword..."
        style={styles.input}
        value={query}
        onChangeText={setQuery}
      />

      <TouchableOpacity style={styles.selector} onPress={() => openModal('city')}>
        <Text>{city || 'Select City'} ▼</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.selector} onPress={() => openModal('state')}>
        <Text>{state || 'Select State'} ▼</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.selector} onPress={() => openModal('disability')}>
        <Text>{disability || 'Select Disability'} ▼</Text>
      </TouchableOpacity>

      <Button
        title="Search"
        onPress={() =>
          navigation.navigate('Results', {
            query,
            cities: city,
            states: state,
            disabilities: disability
          } as any) // type cast to avoid TS error if params are not in type
        }
      />

      {renderModal(cityModalVisible, setCityModalVisible, cities, setCity)}
      {renderModal(stateModalVisible, setStateModalVisible, states, setState)}
      {renderModal(disabilityModalVisible, setDisabilityModalVisible, disabilities, setDisability)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginBottom: 10
  },
  selector: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#f0f0f0'
  },
  modalContainer: {
    marginTop: '50%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 20,
    elevation: 5
  },
  modalItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd'
  }
});

export default ServiceSearchScreen;