import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Modal,
  Dimensions,
  Image
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ServiceProvider, ApiResponse } from '../types/apiTypes';

// Add the missing Service type definition
interface Service {
  id: number;
  name: string;
  category: string;
}

type RootStackParamList = {
  SolutionProvidersList: undefined;
  ProviderDetails: { provider: ServiceProvider };
};

const { width } = Dimensions.get('window');

const SolutionProvidersScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [providers, setProviders] = useState<ServiceProvider[]>([]);
  const [filteredProviders, setFilteredProviders] = useState<ServiceProvider[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [totalProviders, setTotalProviders] = useState(0);
  
  // New state for location selection
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedState, setSelectedState] = useState<string | null>(null);

  useEffect(() => {
    fetchProviders();
  }, []);

  useEffect(() => {
    filterProviders();
  }, [searchQuery, selectedLocation, providers]);

  const fetchProviders = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://stg-api.abilitynetwork.in/api/services/search');
      
      // Check if the response is successful
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: ApiResponse = await response.json();
      
      // Debug: log the API response to see its structure
      console.log('API Response:', JSON.stringify(data, null, 2));
      
      // Check if providers exists and is an array
      if (!data.providers || !Array.isArray(data.providers)) {
        console.error('Unexpected API response structure:', data);
        setProviders([]);
        setTotalProviders(0);
        return;
      }
      
      // Transform API data to match our ServiceProvider interface
      const providersData: ServiceProvider[] = data.providers.map((item: any) => ({
        id: item.id,
        name: item.organization_name,
        type: item.organization_type,
        location: `${item.city}, ${item.state}`,
        city: item.city,
        state: item.state,
        services: item.services ? item.services.map((service: any) => ({
          id: service.id,
          name: service.name,
          category: service.category
        })) : [],
        about: item.description || 'No description available',
        contact_info: item.contact_info || {}
      }));
      
      setProviders(providersData);
      setTotalProviders(providersData.length);
      
      // Extract unique states and cities
      const uniqueStates = Array.from(new Set(providersData.map(p => p.state))).filter(Boolean);
      setStates(uniqueStates);
      
    } catch (error) {
      console.error('Error fetching providers:', error);
      // Set empty arrays to prevent further errors
      setProviders([]);
      setTotalProviders(0);
    } finally {
      setLoading(false);
    }
  };

  const handleStateSelect = (state: string) => {
    setSelectedState(state);
    // Extract cities for the selected state
    const stateCities = Array.from(
      new Set(providers.filter(p => p.state === state).map(p => p.city))
    ).filter(Boolean);
    setCities(stateCities);
  };

  const handleCitySelect = (city: string) => {
    if (selectedState) {
      const location = `${city}, ${selectedState}`;
      setSelectedLocation(location);
      setShowLocationModal(false);
      setSelectedState(null); // Reset state selection
    }
  };

  const filterProviders = () => {
    let filtered = providers;
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(provider => 
        provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        provider.services.some(service => 
          service.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
    
    // Filter by location
    if (selectedLocation) {
      filtered = filtered.filter(provider => 
        provider.location === selectedLocation
      );
    }
    
    setFilteredProviders(filtered);
  };

  const renderServiceTag = (service: Service) => (
    <View key={service.id} style={styles.serviceTag}>
      <Text style={styles.serviceTagText}>{service.name}</Text>
    </View>
  );

  const renderProviderCard = ({ item }: { item: ServiceProvider }) => (
    <View style={styles.providerCard}>
      <View style={styles.providerHeader}>
        <Text style={styles.providerName}>{item.name}</Text>
        <Text style={styles.providerType}>{item.type}</Text>
      </View>
      
      <View style={styles.locationContainer}>
        <Icon name="location-on" size={16} color="#666" />
        <Text style={styles.locationText}>{item.location}</Text>
      </View>
      
      <Text style={styles.servicesLabel}>Services:</Text>
      <View style={styles.servicesContainer}>
        {item.services.slice(0, 3).map(renderServiceTag)}
        {item.services.length > 3 && (
          <View style={styles.moreServicesTag}>
            <Text style={styles.moreServicesText}>+{item.services.length - 3} more</Text>
          </View>
        )}
      </View>
      
      <TouchableOpacity 
        style={styles.viewDetailsButton}
        onPress={() => navigation.navigate('ProviderDetails', { provider: item })}
      >
        <Text style={styles.viewDetailsText}>View Details</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0066b3" />
        <Text style={styles.loadingText}>Loading providers...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={require('../assets/images/logo.png')} 
          style={styles.logo}
        />
        <Text style={styles.headerTitle}>THE ABILITY NETWORK</Text>
      </View>
      
      <Text style={styles.headline}>Find Organisations and People who care about making a difference</Text>
      <Text style={styles.subtitle}>DISCOVER - CONNECT - DIGNIFY</Text>
      
      <View style={styles.filterContainer}>
        <TouchableOpacity 
          style={styles.locationSelector}
          onPress={() => setShowLocationModal(true)}
        >
          <Text style={selectedLocation ? styles.locationSelectedText : styles.locationPlaceholder}>
            {selectedLocation || 'Choose Location...'}
          </Text>
          <Icon name="arrow-drop-down" size={24} color="#666" />
        </TouchableOpacity>
        
        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for services or Locations..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>
      
      <Text style={styles.noteText}>
        Please note: that for now, we are only displaying solution providers for Bengaluru & Telangana, 
        and we will open up the solution for other Locations gradually in a few months from now.
      </Text>
      
      <View style={styles.resultsHeader}>
        <Text style={styles.sectionTitle}>Solution Providers</Text>
        <Text style={styles.resultsCount}>{filteredProviders.length} providers found</Text>
      </View>
      
      {filteredProviders.length === 0 ? (
        <View style={styles.centerContainer}>
          <Text style={styles.noResultsText}>No providers found matching your criteria.</Text>
        </View>
      ) : (
        <FlatList
          data={filteredProviders}
          renderItem={renderProviderCard}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      )}
      
      <Modal
        visible={showLocationModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => {
          setShowLocationModal(false);
          setSelectedState(null);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {selectedState ? `Cities in ${selectedState}` : 'Select State'}
              </Text>
              <TouchableOpacity onPress={() => {
                if (selectedState) {
                  setSelectedState(null);
                } else {
                  setShowLocationModal(false);
                }
              }}>
                <Icon name={selectedState ? "arrow-back" : "close"} size={24} color="#333" />
              </TouchableOpacity>
            </View>
            
            {selectedState ? (
              // Show cities for the selected state
              <FlatList
                data={cities}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.locationItem}
                    onPress={() => handleCitySelect(item)}
                  >
                    <Text style={styles.locationItemText}>{item}</Text>
                  </TouchableOpacity>
                )}
                ListEmptyComponent={
                  <Text style={styles.noLocationsText}>No cities found for this state</Text>
                }
              />
            ) : (
              // Show states
              <FlatList
                data={states}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.locationItem}
                    onPress={() => handleStateSelect(item)}
                  >
                    <Text style={styles.locationItemText}>{item}</Text>
                    <Icon name="chevron-right" size={20} color="#666" />
                  </TouchableOpacity>
                )}
                ListEmptyComponent={
                  <Text style={styles.noLocationsText}>No states available</Text>
                }
              />
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0066b3',
  },
  headline: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#0066b3',
    fontWeight: '500',
  },
  filterContainer: {
    marginBottom: 16,
  },
  locationSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  locationPlaceholder: {
    color: '#999',
  },
  locationSelectedText: {
    color: '#333',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
  },
  noteText: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 20,
    textAlign: 'center',
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  resultsCount: {
    color: '#666',
  },
  listContainer: {
    paddingBottom: 20,
  },
  providerCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  providerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  providerName: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    color: '#333',
  },
  providerType: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationText: {
    marginLeft: 4,
    color: '#666',
    fontSize: 14,
  },
  servicesLabel: {
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  servicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  serviceTag: {
    backgroundColor: '#e6f7ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  serviceTagText: {
    color: '#0066b3',
    fontSize: 12,
  },
  moreServicesTag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  moreServicesText: {
    color: '#666',
    fontSize: 12,
  },
  viewDetailsButton: {
    backgroundColor: '#0066b3',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  viewDetailsText: {
    color: 'white',
    fontWeight: 'bold',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    color: '#666',
  },
  noResultsText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    width: width * 0.8,
    maxHeight: '60%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  locationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  locationItemText: {
    fontSize: 16,
    color: '#333',
  },
  noLocationsText: {
    padding: 16,
    textAlign: 'center',
    color: '#666',
    fontStyle: 'italic',
  },
});

export default SolutionProvidersScreen;