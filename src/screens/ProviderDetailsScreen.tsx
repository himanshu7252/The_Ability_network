import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
  Animated,
  Platform,
  StatusBar,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

// Types - make sure these match your actual types
interface Service {
  id: string;
  name: string;
  category?: string;
}

interface Contact {
  category?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
}

interface ServiceProvider {
  id: string;
  name: string;
  location: string;
  city: string;
  state: string;
  services: Service[];
  about: string;
  contact_info: Contact[];
  type?: string;
}

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
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const tabIndicatorAnim = useRef(new Animated.Value(0)).current;

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
    ]).start();
  }, [fadeAnim, slideAnim]);

  useEffect(() => {
    // Tab indicator animation
    Animated.timing(tabIndicatorAnim, {
      toValue: activeTab === 'about' ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [activeTab, tabIndicatorAnim]);

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

  const ServiceItem = ({ service, index }: { service: Service; index: number }) => {
    const itemAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.9)).current;

    useEffect(() => {
      Animated.parallel([
        Animated.timing(itemAnim, {
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
    }, [index, itemAnim, scaleAnim]);

    return (
      <Animated.View
        style={[
          styles.serviceItem,
          {
            opacity: itemAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={styles.serviceIconContainer}>
          <Icon name="medical-services" size={24} color="#0ea5e9" />
        </View>
        <Text style={styles.serviceName}>{service.name}</Text>
        <Icon name="arrow-forward-ios" size={16} color="#94a3b8" />
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0ea5e9" />
      
      {/* Header */}
      <LinearGradient
        colors={['#0ea5e9', '#0284c7']}
        style={styles.header}
      >
        <View style={styles.headerTop}>
          <TouchableOpacity style={styles.backButton}>
            <Icon name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Provider Details</Text>
          <TouchableOpacity style={styles.shareButton}>
            <Icon name="share" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <Animated.View
          style={[
            styles.profileSection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <LinearGradient
            colors={['#fff', '#f8fafc']}
            style={styles.profileGradient}
          >
            {/* Organization Avatar */}
            <View style={styles.avatarContainer}>
              <LinearGradient
                colors={['#e0f2fe', '#bae6fd']}
                style={styles.avatarGradient}
              >
                <Icon name="business" size={40} color="#0ea5e9" />
              </LinearGradient>
            </View>

            <Text style={styles.providerName}>{provider.name}</Text>
            <Text style={styles.providerType}>{provider.type || 'Service Provider'}</Text>
            
            <View style={styles.locationContainer}>
              <Icon name="location-on" size={20} color="#0ea5e9" />
              <Text style={styles.locationText}>{provider.location}</Text>
            </View>

            {/* Contact Buttons */}
            <View style={styles.contactButtonsRow}>
              <TouchableOpacity 
                style={styles.contactButton} 
                onPress={handleCallPress}
              >
                <LinearGradient
                  colors={['#10b981', '#059669']}
                  style={styles.contactButtonGradient}
                >
                  <Icon name="phone" size={20} color="white" />
                  <Text style={styles.contactButtonText}>Call</Text>
                </LinearGradient>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.contactButton} 
                onPress={handleEmailPress}
              >
                <LinearGradient
                  colors={['#0ea5e9', '#0284c7']}
                  style={styles.contactButtonGradient}
                >
                  <Icon name="email" size={20} color="white" />
                  <Text style={styles.contactButtonText}>Email</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <View style={styles.tabWrapper}>
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

            {/* Tab Indicator */}
            <Animated.View
              style={[
                styles.tabIndicator,
                {
                  transform: [
                    {
                      translateX: tabIndicatorAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, width / 2 - 32],
                      }),
                    },
                  ],
                },
              ]}
            />
          </View>
        </View>

        {/* Content Section */}
        <View style={styles.contentSection}>
          {activeTab === 'about' ? (
            <Animated.View
              style={[
                styles.aboutContent,
                { opacity: fadeAnim }
              ]}
            >
              <View style={styles.aboutHeader}>
                <Icon name="info" size={24} color="#0ea5e9" />
                <Text style={styles.aboutTitle}>About Organization</Text>
              </View>
              <Text style={styles.aboutText}>
                {provider.about && provider.about.trim() !== ''
                  ? provider.about
                  : 'This organization is dedicated to providing quality services and support to persons with disabilities and their caregivers. They are committed to creating an inclusive environment where everyone can thrive.'}
              </Text>

              {/* Additional Info Cards */}
              <View style={styles.infoCards}>
                <View style={styles.infoCard}>
                  <LinearGradient
                    colors={['#fef3c7', '#fed7aa']}
                    style={styles.infoCardGradient}
                  >
                    <Icon name="verified" size={24} color="#d97706" />
                    <Text style={styles.infoCardTitle}>Verified Provider</Text>
                    <Text style={styles.infoCardText}>Quality assured services</Text>
                  </LinearGradient>
                </View>

                <View style={styles.infoCard}>
                  <LinearGradient
                    colors={['#dcfce7', '#bbf7d0']}
                    style={styles.infoCardGradient}
                  >
                    <Icon name="support-agent" size={24} color="#16a34a" />
                    <Text style={styles.infoCardTitle}>24/7 Support</Text>
                    <Text style={styles.infoCardText}>Always here to help</Text>
                  </LinearGradient>
                </View>
              </View>
            </Animated.View>
          ) : (
            <View style={styles.servicesContent}>
              <View style={styles.servicesHeader}>
                <Icon name="medical-services" size={24} color="#0ea5e9" />
                <Text style={styles.servicesTitle}>Services Offered</Text>
              </View>
              
              <View style={styles.servicesList}>
                {provider.services.map((service, index) => (
                  <ServiceItem key={service.id} service={service} index={index} />
                ))}
              </View>

              {provider.services.length === 0 && (
                <View style={styles.emptyServices}>
                  <Icon name="build" size={48} color="#cbd5e1" />
                  <Text style={styles.emptyServicesText}>No services listed</Text>
                </View>
              )}
            </View>
          )}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton}>
            <LinearGradient
              colors={['#d946ef', '#c026d3']}
              style={styles.actionButtonGradient}
            >
              <Icon name="favorite" size={20} color="white" />
              <Text style={styles.actionButtonText}>Save to Favorites</Text>
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <LinearGradient
              colors={['#f59e0b', '#d97706']}
              style={styles.actionButtonGradient}
            >
              <Icon name="rate-review" size={20} color="white" />
              <Text style={styles.actionButtonText}>Write Review</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f8fafc' 
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: { 
    fontSize: 20, 
    fontWeight: '700', 
    color: 'white',
    flex: 1,
    textAlign: 'center',
  },
  shareButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  profileSection: {
    marginHorizontal: 16,
    marginTop: -8,
    zIndex: 10,
  },
  profileGradient: {
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    ...Platform.select({
      android: {
        elevation: 8,
      },
      ios: {
        shadowColor: '#0ea5e9',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      }
    })
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatarGradient: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  providerName: { 
    fontSize: 24, 
    fontWeight: '800', 
    marginBottom: 8, 
    color: '#1e293b',
    textAlign: 'center',
  },
  providerType: { 
    fontSize: 16, 
    color: '#0ea5e9', 
    marginBottom: 16,
    fontWeight: '600',
  },
  locationContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 24,
  },
  locationText: { 
    marginLeft: 8, 
    color: '#64748b', 
    fontSize: 16,
    fontWeight: '500',
  },
  contactButtonsRow: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  contactButton: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  contactButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
  },
  contactButtonText: { 
    color: 'white', 
    fontWeight: '700', 
    marginLeft: 8,
    fontSize: 16,
  },
  tabContainer: {
    marginTop: 24,
    marginHorizontal: 16,
  },
  tabWrapper: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 4,
    position: 'relative',
    ...Platform.select({
      android: {
        elevation: 2,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      }
    })
  },
  tab: { 
    flex: 1, 
    paddingVertical: 14, 
    alignItems: 'center',
    zIndex: 2,
  },
  activeTab: {
    // Active tab styling is handled by the indicator
  },
  tabText: { 
    fontWeight: '600', 
    color: '#64748b',
    fontSize: 16,
  },
  activeTabText: { 
    color: 'white',
  },
  tabIndicator: {
    position: 'absolute',
    top: 4,
    left: 4,
    bottom: 4,
    width: '50%',
    backgroundColor: '#0ea5e9',
    borderRadius: 12,
    zIndex: 1,
  },
  contentSection: {
    marginTop: 24,
    marginHorizontal: 16,
    marginBottom: 24,
  },
  aboutContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
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
  aboutHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  aboutTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
    marginLeft: 12,
  },
  aboutText: { 
    fontSize: 16, 
    lineHeight: 26, 
    color: '#475569',
    marginBottom: 24,
  },
  infoCards: {
    flexDirection: 'row',
    gap: 12,
  },
  infoCard: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  infoCardGradient: {
    padding: 16,
    alignItems: 'center',
  },
  infoCardTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 8,
    marginBottom: 4,
    textAlign: 'center',
  },
  infoCardText: {
    fontSize: 12,
    textAlign: 'center',
    opacity: 0.8,
  },
  servicesContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
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
  servicesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  servicesTitle: { 
    fontSize: 20, 
    fontWeight: '700', 
    color: '#1e293b',
    marginLeft: 12,
  },
  servicesList: {
    // No specific styles needed
  },
  serviceItem: { 
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  serviceIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e0f2fe',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  serviceName: { 
    flex: 1,
    fontSize: 16, 
    color: '#1e293b',
    fontWeight: '600',
  },
  emptyServices: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyServicesText: {
    marginTop: 12,
    fontSize: 16,
    color: '#94a3b8',
  },
  actionButtons: {
    marginHorizontal: 16,
    marginBottom: 32,
    gap: 12,
  },
  actionButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  actionButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  actionButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
    marginLeft: 8,
  },
});

export default ProviderDetailsScreen;