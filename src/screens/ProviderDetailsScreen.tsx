import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Image,
  Alert,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ServiceProvider, Service, Contact } from '../types/apiTypes';

type RootStackParamList = {
  ProviderDetails: { provider: ServiceProvider };
};

type ProviderDetailsScreenRouteProp = RouteProp<RootStackParamList, 'ProviderDetails'>;

interface ProviderDetailsScreenProps {
  route: ProviderDetailsScreenRouteProp;
}

const ProviderDetailsScreen: React.FC<ProviderDetailsScreenProps> = ({ route }) => {
  const { provider } = route.params;
  const [activeTab, setActiveTab] = useState<'about' | 'services'>('about');

  // Extract primary contact with prioritization for phone and email
  const primaryContact: Contact | undefined =
    provider.contact_info?.find(c => c.category === 'primary') || provider.contact_info?.[0];

  // Handle calling the contact's phone number
  const handleCallPress = () => {
    if (primaryContact?.phone) {
      Linking.openURL(`tel:${primaryContact.phone}`);
    } else {
      Alert.alert('Contact info', 'Phone number not available.');
    }
  };

  // Handle sending an email if available
  const handleEmailPress = () => {
    if (primaryContact?.email) {
      Linking.openURL(`mailto:${primaryContact.email}`);
    } else {
      Alert.alert('Contact info', 'Email address not available.');
    }
  };

  const renderServiceItem = (service: Service, index: number) => (
    <View key={service.id} style={styles.serviceItem}>
      <Text style={styles.serviceName}>{service.name}</Text>
      {index < provider.services.length - 1 && <View style={styles.divider} />}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/images/abilitynetworklogo.png')}
          style={styles.logo}
        />
        <Text style={styles.headerTitle}>Provider Details</Text>
      </View>

      <View style={styles.profileSection}>
        <Text style={styles.providerName} numberOfLines={1} ellipsizeMode="tail">
          {provider.name}
        </Text>
        <Text style={styles.providerType}>{provider.type || ''}</Text>
        <View style={styles.locationContainer}>
          <Icon name="location-on" size={18} color="#666" />
          <Text style={styles.locationText}>{provider.location}</Text>
        </View>

        <View style={styles.contactButtonsRow}>
          <TouchableOpacity style={styles.contactButton} onPress={handleCallPress}>
            <Icon name="phone" size={18} color="white" />
            <Text style={styles.contactButtonText}>Call</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.contactButton, styles.emailButton]} onPress={handleEmailPress}>
            <Icon name="email" size={18} color="white" />
            <Text style={styles.contactButtonText}>Email</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'about' && styles.activeTab]}
          onPress={() => setActiveTab('about')}
        >
          <Text style={[styles.tabText, activeTab === 'about' && styles.activeTabText]}>
            About
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'services' && styles.activeTab]}
          onPress={() => setActiveTab('services')}
        >
          <Text style={[styles.tabText, activeTab === 'services' && styles.activeTabText]}>
            Services
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contentSection}>
        {activeTab === 'about' ? (
          <Text style={styles.aboutText}>
            {provider.about && provider.about.trim() !== ''
              ? provider.about
              : 'No description available.'}
          </Text>
        ) : (
          <View>
            <Text style={styles.servicesTitle}>Services Offered:</Text>
            {provider.services.map(renderServiceItem)}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  logo: {
    width: 60,                  
    aspectRatio: 1,             
    marginRight: 10,
    resizeMode: 'contain',
},
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#0066b3' },
  profileSection: {
    backgroundColor: 'white',
    padding: 20,
    margin: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  providerName: { fontSize: 22, fontWeight: 'bold', marginBottom: 8, color: '#333' },
  providerType: { fontSize: 16, color: '#666', marginBottom: 12 },
  locationContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  locationText: { marginLeft: 6, color: '#666', fontSize: 16 },

  contactButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0066b3',
    padding: 12,
    borderRadius: 8,
    flex: 0.48,
  },

  emailButton: {
    backgroundColor: '#007acc',
  },

  contactButtonText: { color: 'white', fontWeight: 'bold', marginLeft: 8 },

  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 8,
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
  },
  tab: { flex: 1, padding: 16, alignItems: 'center' },
  activeTab: { backgroundColor: '#0066b3' },
  tabText: { fontWeight: 'bold', color: '#666' },
  activeTabText: { color: 'white' },
  contentSection: {
    backgroundColor: 'white',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    minHeight: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  aboutText: { fontSize: 16, lineHeight: 24, color: '#333' },
  servicesTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 16, color: '#333' },
  serviceItem: { marginBottom: 12 },
  serviceName: { fontSize: 16, color: '#333', marginBottom: 12 },
  divider: { height: 1, backgroundColor: '#eee', marginVertical: 8 },
});

export default ProviderDetailsScreen;
