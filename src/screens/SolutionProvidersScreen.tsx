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
  Image,
  ScrollView,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, NavigationProp } from '@react-navigation/native';

// --- Type Definitions ---
type Contact = {
  category?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
};

type Address = {
  address_label?: string;
  address_line_1: string;
  address_line_2?: string | null;
  city: string;
  contacts: Contact[];
  organization_name: string;
  pincode: number;
  state: string;
};

type Service = {
  id: string;
  name: string;
  category?: string;
};

type SolutionProvider = {
  id: string;
  name: string;
  location: string;
  city: string;
  state: string;
  services: Service[];
  about: string;
  contact_info: Contact[];
};

type ApiResponse = {
  services: Array<{
    id: string;
    organization_names: string[];
    service_name: string;
    service_description: string;
    addresses: Address[];
    cities: string[];
    disabilities: string[];
    states: string[];
  }>;
  total: number;
  filtered_response: boolean;
};

type RootStackParamList = {
  SolutionProvidersList: undefined;
  ProviderDetails: { provider: SolutionProvider };
};

const { width } = Dimensions.get('window');

const getServiceTags = (services: Service[], max = 2) => {
  const display = services.slice(0, max);
  const extra = Math.max(services.length - max, 0);
  return { display, extra };
};

const SolutionProvidersScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [providers, setProviders] = useState<SolutionProvider[]>([]);
  const [filteredProviders, setFilteredProviders] = useState<SolutionProvider[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [serviceSuggestions, setServiceSuggestions] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedState, setSelectedState] = useState<string | null>(null);

  // Fetch providers and initialize state
  const fetchProviders = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://stg-api.abilitynetwork.in/api/services/search');
      const data: ApiResponse = await response.json();

      const flatProviders = data.services.flatMap(serviceGroup =>
        serviceGroup.addresses.map(address => ({
          orgKey: `${address.organization_name}__${address.city}__${address.state}`,
          id: serviceGroup.id,
          name: address.organization_name,
          location: `${address.city}, ${address.state}`,
          city: address.city,
          state: address.state,
          service: {
            id: serviceGroup.id,
            name: serviceGroup.service_name,
            category: 'Service',
          },
          about: serviceGroup.service_description,
          contact_info: address.contacts,
        }))
      );

      const groupedMap = new Map<string, SolutionProvider>();
      flatProviders.forEach(item => {
        if (!groupedMap.has(item.orgKey)) {
          groupedMap.set(item.orgKey, {
            id: item.orgKey,
            name: item.name,
            location: item.location,
            city: item.city,
            state: item.state,
            services: [item.service],
            about: item.about,
            contact_info: item.contact_info,
          });
        } else {
          const existing = groupedMap.get(item.orgKey)!;
          if (!existing.services.some(s => s.id === item.service.id)) {
            existing.services.push(item.service);
          }
        }
      });

      const providersData = Array.from(groupedMap.values());
      setProviders(providersData);
      setFilteredProviders(providersData);
      setStates([...new Set(providersData.map(p => p.state))].filter(Boolean) as string[]);
    } catch (error) {
      console.error('Error fetching providers:', error);
      setProviders([]);
      setFilteredProviders([]);
    } finally {
      setLoading(false);
    }
  };

  // Generate service suggestions as user types
  useEffect(() => {
    if (searchQuery) {
      const allServices = Array.from(
        new Set(providers.flatMap(p => p.services.map(s => s.name)))
      );
      const query = searchQuery.toLowerCase();
      const matches = allServices.filter(name => name.toLowerCase().includes(query));
      setServiceSuggestions(matches);
    } else {
      setServiceSuggestions([]);
    }
  }, [searchQuery, providers]);

  // ⭐ KEY CHANGE: Apply BOTH filters together - search AND location
  useEffect(() => {
    let filtered = providers;

    // Apply search filter if search query exists
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(provider =>
        provider.name.toLowerCase().includes(query) ||
        provider.services.some(service => service.name.toLowerCase().includes(query))
      );
    }

    // Apply location filter if location is selected
    if (selectedLocation) {
      filtered = filtered.filter(provider => provider.location === selectedLocation);
    }

    setFilteredProviders(filtered);
  }, [searchQuery, selectedLocation, providers]);

  useEffect(() => {
    fetchProviders();
  }, []);

  const handleStateSelect = (state: string) => {
    setSelectedState(state);
    setCities([...new Set(providers.filter(p => p.state === state).map(p => p.city))].filter(Boolean));
  };

  // ⭐ KEY CHANGE: When selecting a city, DON'T clear the search query
  const handleCitySelect = (city: string) => {
    if (selectedState) {
      setSelectedLocation(`${city}, ${selectedState}`);
      // ⭐ REMOVED: setSearchQuery(''); - Keep search query when location is selected
      setShowLocationModal(false);
      setSelectedState(null);
    }
  };

  // Function to clear location filter (show all locations)
  const selectAllLocations = () => {
    setSelectedLocation(null);
    setShowLocationModal(false);
    setSelectedState(null);
  };

  const renderServiceTag = (service: Service) => (
    <View key={service.id} style={styles.serviceTag}>
      <Text style={styles.serviceTagText}>{service.name}</Text>
    </View>
  );

  const renderProviderCard = ({ item }: { item: SolutionProvider }) => {
    const { display, extra } = getServiceTags(item.services);
    return (
      <View style={styles.cardContainer}>
        <Text style={styles.cardOrgName} numberOfLines={2} ellipsizeMode="tail">{item.name}</Text>
        <View style={styles.cardLocationRow}>
          <Icon name="location-on" size={15} color="#a085ff" />
          <Text style={styles.cardLocation}>{item.location}</Text>
        </View>
        <View style={styles.cardTagsRow}>
          {display.map(renderServiceTag)}
          {extra > 0 && (
            <View style={styles.serviceTag}>
              <Text style={styles.serviceTagText}>+{extra}</Text>
            </View>
          )}
        </View>
        <TouchableOpacity
          style={styles.viewDetailsBtn}
          onPress={() => navigation.navigate('ProviderDetails', { provider: item })}
        >
          <Text style={styles.viewDetailsText}>View Details</Text>
        </TouchableOpacity>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#7c60e4" />
        <Text style={styles.loadingText}>Loading providers...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.screenBackground}>
      <View style={styles.headerSection}>
        <Image source={require('../assets/images/abilitynetworklogo.png')} style={styles.logo} />
        <Text style={styles.title}>Find Organisations and People who care about making a difference</Text>
        <Text style={styles.subtitle}>DISCOVER · CONNECT · DIGNIFY</Text>
        
        <View style={styles.searchRow}>
          {/* ⭐ KEY CHANGE: Location selector always shows selected location */}
          <TouchableOpacity
            style={styles.locationSelector}
            onPress={() => setShowLocationModal(true)}
          >
            <Text style={selectedLocation ? styles.locationSelectedText : styles.locationPlaceholder}>
              {selectedLocation || 'Choose Location'}
            </Text>
            <Icon name="arrow-drop-down" size={24} color="#666" />
          </TouchableOpacity>

          {/* Service search with scrollable suggestions */}
          <View style={styles.searchContainer}>
            <Icon name="search" size={20} color="#666" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for services"
              placeholderTextColor="#999"
              value={searchQuery}
              onChangeText={setSearchQuery} // ⭐ REMOVED: location clearing logic
              autoCorrect={false}
            />
            {serviceSuggestions.length > 0 && (
              <FlatList
                nestedScrollEnabled
                style={styles.suggestionList}
                data={serviceSuggestions}
                keyExtractor={(_, idx) => idx.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.suggestionItem}
                    onPress={() => {
                      setSearchQuery(item);
                      setServiceSuggestions([]);
                      Keyboard.dismiss();
                    }}
                  >
                    <Text style={styles.suggestionText}>{item}</Text>
                  </TouchableOpacity>
                )}
                keyboardShouldPersistTaps="always"
              />
            )}
          </View>
        </View>
      </View>

      <View style={styles.providersHeader}>
        <Text style={styles.providersTitle}>Solution Providers</Text>
        <Text style={styles.providersCount}>{filteredProviders.length} providers found</Text>
      </View>

      {filteredProviders.length === 0 ? (
        <View style={styles.centerContainer}>
          <Text style={styles.noResultsText}>No providers found matching your criteria.</Text>
        </View>
      ) : (
        <FlatList
          data={filteredProviders}
          renderItem={renderProviderCard}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listSpacing}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Location selection modal */}
      <Modal
        visible={showLocationModal}
        transparent
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
                {selectedState ? `Cities in ${selectedState}` : 'Select Location'}
              </Text>
              <TouchableOpacity onPress={() => {
                if (selectedState) {
                  setSelectedState(null);
                } else {
                  setShowLocationModal(false);
                }
              }}>
                <Icon name={selectedState ? 'arrow-back' : 'close'} size={24} color="#333" />
              </TouchableOpacity>
            </View>
            {selectedState ? (
              <FlatList
                data={cities}
  
                keyExtractor={(_, idx) => idx.toString()}
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
              <FlatList
                data={states}
                ListHeaderComponent={() => (
                  <TouchableOpacity
                    style={[styles.locationItem, styles.selectLocationItem]}
                    onPress={selectAllLocations}
                  >
                    <Text style={[styles.locationItemText, styles.selectLocationText]}>
                      All Locations
                    </Text>
                    
                  </TouchableOpacity>
                )}
                keyExtractor={(_, idx) => idx.toString()}
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screenBackground: {
    flex: 1,
    backgroundColor: '#ffffffff',
    paddingHorizontal: 12,
  },
  logo: {
    width: 100,
    height: 100,
    aspectRatio: 1,
    marginBottom: 4,
    resizeMode: 'contain',
  },
  headerSection: {
    alignItems: 'center',
    marginVertical: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#7c60e4',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#5a7fa4',
    marginTop: 4,
    fontWeight: '500',
    letterSpacing: 0.6,
  },
  searchRow: {
    flexDirection: 'row',
    marginTop: 16,
    width: '100%',
    justifyContent: 'space-between',
  },
  locationSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    flex: 1,
    marginRight: 12,
    justifyContent: 'flex-start',
    position: 'relative',
    paddingRight: 30,
  },
  locationPlaceholder: {
    color: '#999',
    fontSize: 14,
  },
  locationSelectedText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
  },
  searchContainer: {
    flex: 2,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 14,
    paddingVertical: 6,
    alignItems: 'center',
    position: 'relative',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 4,
  },
  suggestionList: {
    position: 'absolute',
    top: 44,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    zIndex: 100,
    elevation: 4,
    maxHeight: 200,
    width: '100%',
  },
  suggestionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  suggestionText: {
    fontSize: 14,
    color: '#333',
  },
  providersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 14,
  },
  providersTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#321d6d',
  },
  providersCount: {
    color: '#888',
    fontSize: 14,
    alignSelf: 'center',
  },
  listSpacing: {
    paddingBottom: 80,
  },
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 14,
    marginBottom: 14,
    padding: 18,
    shadowColor: '#a085ff',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    borderWidth: 0.7,
    borderColor: '#eee',
    elevation: 4,
  },
  cardOrgName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#321d6d',
    marginBottom: 4,
  },
  cardLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardLocation: {
    marginLeft: 4,
    color: '#a085ff',
    fontSize: 13,
    fontWeight: '600',
  },
  cardTagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  serviceTag: {
    backgroundColor: '#f4edff',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  serviceTagText: {
    color: '#7c60e4',
    fontSize: 13,
    fontWeight: '600',
  },
  viewDetailsBtn: {
    backgroundColor: '#7c60e4',
    borderRadius: 12,
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 8,
  },
  viewDetailsText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
    letterSpacing: 0.7,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 14,
    color: '#7c60e4',
    fontWeight: '600',
  },
  noResultsText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    fontWeight: '500',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 14,
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
    fontWeight: '700',
    color: '#321d6d',
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
    color: '#321d6d',
  },
  selectLocationItem: {
    backgroundColor: '#f8f9fa',
  },
  selectLocationText: {
    fontWeight: '700',
    color: '#7c60e4',
  },
  selectLocationSubText: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  noLocationsText: {
    padding: 18,
    textAlign: 'center',
    color: '#888',
    fontStyle: 'italic',
  },
});

export default SolutionProvidersScreen;
