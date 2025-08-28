import React, { useState, useEffect, useRef } from 'react';
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
  Animated,
  Platform,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, NavigationProp } from '@react-navigation/native';

const { width } = Dimensions.get('window');

// --- Type Definitions ---
interface Contact {
  category?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
}

interface Address {
  address_label?: string;
  address_line_1: string;
  address_line_2?: string | null;
  city: string;
  contacts: Contact[];
  organization_name: string;
  pincode: number;
  state: string;
}

interface Service {
  id: string;
  name: string;
  category?: string;
}

interface SolutionProvider {
  id: string;
  name: string;
  location: string;
  city: string;
  state: string;
  services: Service[];
  about: string;
  contact_info: Contact[];
}

interface ApiResponse {
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
}

type RootStackParamList = {
  SolutionProvidersList: undefined;
  ProviderDetails: { provider: SolutionProvider };
};

const getServiceTags = (services: Service[], max = 2) => {
  const display = services.slice(0, max);
  const extra = Math.max(services.length - max, 0);
  return { display, extra };
};

const SolutionProvidersScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  
  // All state hooks at the top level
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

  // All ref hooks at the top level
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const searchBarAnim = useRef(new Animated.Value(0)).current;

  // All effect hooks at the top level
  useEffect(() => {
    // Initial animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(searchBarAnim, {
        toValue: 1,
        duration: 700,
        delay: 200,
        useNativeDriver: true,
      }),
    ]).start();

    fetchProviders();
  }, [fadeAnim, slideAnim, searchBarAnim]);

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

  // Apply BOTH filters together - search AND location
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

  // Fetch providers function
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

  const handleStateSelect = (state: string) => {
    setSelectedState(state);
    setCities([...new Set(providers.filter(p => p.state === state).map(p => p.city))].filter(Boolean));
  };

  const handleCitySelect = (city: string) => {
    if (selectedState) {
      setSelectedLocation(`${city}, ${selectedState}`);
      setShowLocationModal(false);
      setSelectedState(null);
    }
  };

  const selectAllLocations = () => {
    setSelectedLocation(null);
    setShowLocationModal(false);
    setSelectedState(null);
  };

  // Service Tag Component
  const ServiceTag: React.FC<{ service: Service }> = ({ service }) => (
    <View style={styles.serviceTag}>
      <Text style={styles.serviceTagText}>{service.name}</Text>
    </View>
  );

  // Provider Card Component
  const ProviderCard: React.FC<{ item: SolutionProvider; index: number }> = ({ item, index }) => {
    const { display, extra } = getServiceTags(item.services);
    const cardAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.95)).current;

    useEffect(() => {
      Animated.parallel([
        Animated.timing(cardAnim, {
          toValue: 1,
          duration: 500,
          delay: index * 100,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 100,
          friction: 8,
          delay: index * 100,
          useNativeDriver: true,
        }),
      ]).start();
    }, [index, cardAnim, scaleAnim]);

    return (
      <Animated.View
        style={[
          styles.cardContainer,
          {
            opacity: cardAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <LinearGradient
          colors={['#fff', '#f8fafc']}
          style={styles.cardGradient}
        >
          <View style={styles.cardHeader}>
            <View style={styles.organizationInfo}>
              <Text style={styles.cardOrgName}>{item.name}</Text>
              <View style={styles.cardLocationRow}>
                <Icon name="location-on" size={16} color="#0ea5e9" />
                <Text style={styles.cardLocation}>{item.location}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.favoriteButton}>
              <Icon name="favorite-border" size={20} color="#d946ef" />
            </TouchableOpacity>
          </View>

          <View style={styles.cardTagsRow}>
            {display.map(service => (
              <ServiceTag key={service.id} service={service} />
            ))}
            {extra > 0 && (
              <View style={[styles.serviceTag, styles.extraTag]}>
                <Text style={styles.extraTagText}>+{extra}</Text>
              </View>
            )}
          </View>

          <TouchableOpacity
            style={styles.viewDetailsBtn}
            onPress={() => navigation.navigate('ProviderDetails', { provider: item })}
          >
            <LinearGradient
              colors={['#0ea5e9', '#0284c7']}
              style={styles.viewDetailsBtnGradient}
            >
              <Text style={styles.viewDetailsText}>View Details</Text>
              <Icon name="arrow-forward" size={16} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
        </LinearGradient>
      </Animated.View>
    );
  };

  // Loading Animation Component
  const LoadingAnimation: React.FC = () => (
    <View style={styles.centerContainer}>
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0ea5e9" />
        <Text style={styles.loadingText}>Finding amazing providers...</Text>
      </View>
    </View>
  );

  // Main render
  if (loading) {
    return (
      <View style={[styles.screenBackground, { justifyContent: 'center' }]}>
        <StatusBar barStyle="light-content" backgroundColor="#0ea5e9" />
        <LoadingAnimation />
      </View>
    );
  }

  return (
    <View style={styles.screenBackground}>
      <StatusBar barStyle="light-content" backgroundColor="#0ea5e9" />
      
      {/* Header */}
      <LinearGradient
        colors={['#0ea5e9', '#0284c7']}
        style={styles.header}
      >
        <Animated.View
          style={[
            styles.headerContent,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Image source={require('../assets/images/logo.png')} style={styles.logo} />
          <Text style={styles.title}>Find Organizations and People who care about making a difference</Text>
          <Text style={styles.subtitle}>DISCOVER · CONNECT · DIGNIFY</Text>
        </Animated.View>
      </LinearGradient>

      {/* Search Section */}
      <Animated.View
        style={[
          styles.searchSection,
          { opacity: searchBarAnim }
        ]}
      >
        <View style={styles.searchRow}>
          {/* Location Selector */}
          <TouchableOpacity
            style={styles.locationSelector}
            onPress={() => setShowLocationModal(true)}
          >
            <Icon name="location-on" size={20} color="#0ea5e9" />
            <Text
              style={[
                styles.locationText,
                selectedLocation ? styles.locationSelectedText : styles.locationPlaceholder,
              ]}
            >
              {selectedLocation || 'Choose Location'}
            </Text>
            <Icon name="keyboard-arrow-down" size={20} color="#94a3b8" />
          </TouchableOpacity>

          {/* Service Search */}
          <View style={styles.searchContainer}>
            <Icon name="search" size={20} color="#64748b" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search services..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#94a3b8"
            />
            {searchQuery !== '' && (
              <TouchableOpacity
                style={styles.clearButton}
                onPress={() => setSearchQuery('')}
              >
                <Icon name="close" size={18} color="#94a3b8" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Service Suggestions */}
        {serviceSuggestions.length > 0 && (
          <View style={styles.suggestionList}>
            <FlatList
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
                  <Icon name="search" size={16} color="#64748b" />
                  <Text style={styles.suggestionText}>{item}</Text>
                </TouchableOpacity>
              )}
              keyboardShouldPersistTaps="always"
              showsVerticalScrollIndicator={false}
            />
          </View>
        )}
      </Animated.View>

      {/* Results Header */}
      <View style={styles.resultsHeader}>
        <Text style={styles.resultsTitle}>Solution Providers</Text>
        <View style={styles.resultsCount}>
          <Text style={styles.resultsCountText}>{filteredProviders.length} found</Text>
        </View>
      </View>

      {/* Results List */}
      {filteredProviders.length === 0 ? (
        <View style={styles.centerContainer}>
          <Icon name="search-off" size={64} color="#cbd5e1" />
          <Text style={styles.noResultsText}>No providers found matching your criteria</Text>
          <TouchableOpacity
            style={styles.resetButton}
            onPress={() => {
              setSearchQuery('');
              setSelectedLocation(null);
            }}
          >
            <Text style={styles.resetButtonText}>Reset Filters</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={filteredProviders}
          renderItem={({ item, index }) => <ProviderCard item={item} index={index} />}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listSpacing}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Location Selection Modal */}
      <Modal
        visible={showLocationModal}
        animationType="slide"
        transparent={true}
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
              <TouchableOpacity
                onPress={() => {
                  if (selectedState) {
                    setSelectedState(null);
                  } else {
                    setShowLocationModal(false);
                  }
                }}
              >
                <Icon name="close" size={24} color="#64748b" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalScroll}>
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
                      <Icon name="arrow-forward-ios" size={16} color="#94a3b8" />
                    </TouchableOpacity>
                  )}
                  ListEmptyComponent={
                    <Text style={styles.noLocationsText}>No cities found for this state</Text>
                  }
                />
              ) : (
                <>
                  <TouchableOpacity
                    style={[styles.locationItem, styles.selectLocationItem]}
                    onPress={selectAllLocations}
                  >
                    <View>
                      <Text style={styles.selectLocationText}>All Locations</Text>
                      <Text style={styles.selectLocationSubText}>Show all providers</Text>
                    </View>
                    <Icon name="public" size={20} color="#0ea5e9" />
                  </TouchableOpacity>

                  <FlatList
                    data={states}
                    keyExtractor={(_, idx) => idx.toString()}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.locationItem}
                        onPress={() => handleStateSelect(item)}
                      >
                        <Text style={styles.locationItemText}>{item}</Text>
                        <Icon name="arrow-forward-ios" size={16} color="#94a3b8" />
                      </TouchableOpacity>
                    )}
                    ListEmptyComponent={
                      <Text style={styles.noLocationsText}>No states available</Text>
                    }
                  />
                </>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  screenBackground: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
  headerContent: {
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 40,
    resizeMode: 'contain',
    marginBottom: 16,
    tintColor: 'white',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '600',
    letterSpacing: 1.5,
  },
  searchSection: {
    paddingHorizontal: 16,
    marginTop: -12,
    zIndex: 10,
  },
  searchRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 8,
  },
  locationSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    flex: 1,
    ...Platform.select({
      android: {
        elevation: 4,
      },
      ios: {
        shadowColor: '#0ea5e9',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
      }
    })
  },
  locationText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
  },
  locationPlaceholder: {
    color: '#94a3b8',
  },
  locationSelectedText: {
    color: '#1e293b',
    fontWeight: '600',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 16,
    paddingHorizontal: 16,
    flex: 2,
    ...Platform.select({
      android: {
        elevation: 4,
      },
      ios: {
        shadowColor: '#0ea5e9',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
      }
    })
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 14,
    color: '#1e293b',
  },
  clearButton: {
    padding: 4,
  },
  suggestionList: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginTop: 4,
    maxHeight: 200,
    ...Platform.select({
      android: {
        elevation: 6,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      }
    })
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  suggestionText: {
    fontSize: 14,
    color: '#1e293b',
    marginLeft: 12,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  resultsTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1e293b',
  },
  resultsCount: {
    backgroundColor: '#e0f2fe',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  resultsCountText: {
    color: '#0369a1',
    fontSize: 12,
    fontWeight: '600',
  },
  listSpacing: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  cardContainer: {
    marginBottom: 16,
  },
  cardGradient: {
    borderRadius: 20,
    padding: 20,
    ...Platform.select({
      android: {
        elevation: 4,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      }
    })
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  organizationInfo: {
    flex: 1,
  },
  cardOrgName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 6,
  },
  cardLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardLocation: {
    marginLeft: 4,
    color: '#0ea5e9',
    fontSize: 14,
    fontWeight: '600',
  },
  favoriteButton: {
    padding: 8,
  },
  cardTagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  serviceTag: {
    backgroundColor: '#e0f2fe',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  serviceTagText: {
    color: '#0369a1',
    fontSize: 13,
    fontWeight: '600',
  },
  extraTag: {
    backgroundColor: '#f3e8ff',
  },
  extraTagText: {
    color: '#a21caf',
    fontSize: 13,
    fontWeight: '700',
  },
  viewDetailsBtn: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  viewDetailsBtnGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
  },
  viewDetailsText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
    marginRight: 8,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  loadingContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 32,
    borderRadius: 20,
    ...Platform.select({
      android: {
        elevation: 8,
      },
      ios: {
        shadowColor: '#0ea5e9',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
      }
    })
  },
  loadingText: {
    marginTop: 16,
    color: '#0ea5e9',
    fontWeight: '600',
    fontSize: 16,
  },
  noResultsText: {
    fontSize: 18,
    color: '#64748b',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  resetButton: {
    backgroundColor: '#0ea5e9',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  resetButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '70%',
    paddingBottom: Platform.OS === 'ios' ? 34 : 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
  },
  modalScroll: {
    flex: 1,
  },
  locationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f8fafc',
  },
  locationItemText: {
    fontSize: 16,
    color: '#1e293b',
  },
  selectLocationItem: {
    backgroundColor: '#f0f9ff',
  },
  selectLocationText: {
    fontWeight: '700',
    color: '#0ea5e9',
    fontSize: 16,
  },
  selectLocationSubText: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 2,
  },
  noLocationsText: {
    padding: 20,
    textAlign: 'center',
    color: '#94a3b8',
    fontStyle: 'italic',
  },
});

export default SolutionProvidersScreen;