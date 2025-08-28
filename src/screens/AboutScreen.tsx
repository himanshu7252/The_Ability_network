import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Dimensions,
  Platform,
  Animated,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

const { width } = Dimensions.get('window');

type RootStackParamList = {
  PartnersScreen: undefined;
};

const HomeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const scrollY = useRef(new Animated.Value(0)).current;
  const fadeAnimValue = useRef(new Animated.Value(0)).current;
  const slideAnimValue = useRef(new Animated.Value(50)).current;
  
  // Animation states for features
  const [featuresVisible, setFeaturesVisible] = useState(false);
  
  useEffect(() => {
    // Initial animations
    Animated.parallel([
      Animated.timing(fadeAnimValue, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnimValue, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    // Delayed feature animation
    setTimeout(() => {
      setFeaturesVisible(true);
    }, 400);
  }, []);

  const handlePlayVideo = () => {
    Linking.openURL('https://youtu.be/dp4hhR51b5U');
  };

  const handleVisitWebsite = () => {
    Linking.openURL('https://techmahindrafoundation.org');
  };

  const navigateToPartners = () => {
    navigation.navigate('PartnersScreen');
  };

  const features = [
    {
      icon: require('../assets/icons/digital.png'),
      title: 'Digital Accessibility',
      subtitle: 'Accessible digital platform for all',
      color: '#0ea5e9'
    },
    {
      icon: require('../assets/icons/phygital.png'),
      title: 'Phygital Network',
      subtitle: 'On-ground support presence',
      color: '#d946ef'
    },
    {
      icon: require('../assets/icons/government.png'),
      title: 'Government Street',
      subtitle: 'Integration of government schemes',
      color: '#10b981'
    },
    {
      icon: require('../assets/icons/phone.png'),
      title: 'Helpline Support',
      subtitle: '24/7 assistance',
      color: '#f59e0b'
    },
    {
      icon: require('../assets/icons/whatsapp.png'),
      title: 'WhatsApp Integration',
      subtitle: 'Multi-language chatbot',
      color: '#ef4444'
    },
  ];

  const stats = [
    { value: '26', label: 'Partner Organizations' },
    { value: '90+', label: 'Projects' },
    { value: '18+', label: 'States' },
    { value: '63', label: 'Years of Impact' }
  ];

  const FeatureCard = ({ feature, index }: { feature: any; index: number }) => {
    const animValue = useRef(new Animated.Value(0)).current;
    const scaleValue = useRef(new Animated.Value(0.8)).current;

    useEffect(() => {
      if (featuresVisible) {
        Animated.parallel([
          Animated.timing(animValue, {
            toValue: 1,
            duration: 500,
            delay: index * 100,
            useNativeDriver: true,
          }),
          Animated.spring(scaleValue, {
            toValue: 1,
            tension: 50,
            friction: 7,
            delay: index * 100,
            useNativeDriver: true,
          }),
        ]).start();
      }
    }, [featuresVisible, index]);

    return (
      <Animated.View
        style={[
          styles.featureCard,
          {
            opacity: animValue,
            transform: [{ scale: scaleValue }],
          },
        ]}
      >
        <View style={[styles.featureIconContainer, { backgroundColor: feature.color + '20' }]}>
          <Image source={feature.icon} style={[styles.featureIcon, { tintColor: feature.color }]} />
        </View>
        <Text style={styles.featureTitle}>{feature.title}</Text>
        <Text style={styles.featureSubtitle}>{feature.subtitle}</Text>
      </Animated.View>
    );
  };

  const StatCard = ({ stat, index }: { stat: any; index: number }) => {
    const countValue = useRef(new Animated.Value(0)).current;
    
    useEffect(() => {
      Animated.timing(countValue, {
        toValue: 1,
        duration: 1000,
        delay: index * 200,
        useNativeDriver: false,
      }).start();
    }, [index]);

    return (
      <View style={styles.statItem}>
        <Text style={styles.statValue}>{stat.value}</Text>
        <Text style={styles.statLabel}>{stat.label}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0ea5e9" />
      
      <Animated.ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {/* Header Section with Gradient */}
        <LinearGradient
          colors={['#0ea5e9', '#0284c7', '#0369a1']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <Animated.View
            style={[
              styles.headerContent,
              {
                opacity: fadeAnimValue,
                transform: [{ translateY: slideAnimValue }],
              },
            ]}
          >
            <Image source={require('../assets/logo.png')} style={styles.logo} />
            <Text style={styles.tagline}>Discover - Connect - Dignify</Text>
            <Text style={styles.title}>
              Ecosystem for Enabling Persons with Disabilities and their Caregivers
            </Text>
            <Text style={styles.description}>
              The Ability Network, a Tech Mahindra Foundation initiative, is an inclusive network of verified solution providers that provides access to curated information for persons with disabilities and their caregivers.
            </Text>
          </Animated.View>
        </LinearGradient>

        {/* Vision and Mission Cards */}
        <View style={styles.cardContainer}>
          <Animated.View style={[styles.card, styles.visionCard, { opacity: fadeAnimValue }]}>
            <View style={styles.cardHeader}>
              <Icon name="visibility" size={28} color="#0ea5e9" />
              <Text style={styles.cardTitle}>Our Vision</Text>
            </View>
            <Text style={styles.cardText}>
              We envision a world where Persons with Disabilities (PwDs) and their caregivers thrive with dignity and independence and are able to access resources that empower their full participation in society.
            </Text>
          </Animated.View>

          <Animated.View style={[styles.card, styles.missionCard, { opacity: fadeAnimValue }]}>
            <View style={styles.cardHeader}>
              <Icon name="track-changes" size={28} color="#10b981" />
              <Text style={styles.cardTitle}>Our Mission</Text>
            </View>
            <Text style={styles.cardText}>
              To create a dynamic, accessible and collaborative human-centric network built around a digital core that provides information and access to curated services across life stages to Persons with Disabilities and their caregivers.
            </Text>
          </Animated.View>
        </View>

        {/* Key Features Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Key Features</Text>
          <View style={styles.featuresContainer}>
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} index={index} />
            ))}
          </View>
        </View>

        {/* Ecosystem Banner */}
        <LinearGradient
          colors={['#d946ef', '#c026d3', '#a21caf']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.ecosystemBanner}
        >
          <Text style={styles.ecosystemTitle}>An Ecosystem for PwDs and Care Givers</Text>
          <Text style={styles.ecosystemText}>
            Discover how The Ability Network is transforming lives by connecting people with resources and support they need.
          </Text>
          
          <TouchableOpacity style={styles.videoButton} onPress={handlePlayVideo}>
            <LinearGradient
              colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.1)']}
              style={styles.videoButtonGradient}
            >
              <Icon name="play-circle-outline" size={32} color="#fff" />
              <Text style={styles.videoButtonText}>Watch Our Story</Text>
            </LinearGradient>
          </TouchableOpacity>
        </LinearGradient>

        {/* Partners Section */}
        <View style={styles.partnersContainer}>
          <Text style={styles.partnersTitle}>
            The Ability Network is a collaborative initiated by Tech Mahindra Foundation with the support from core partners:
          </Text>
          
          <View style={styles.partnerLogos}>
            {[1, 2, 3, 4].map((_, index) => (
              <View key={index} style={styles.partnerLogoContainer}>
                <View style={styles.partnerLogo} />
              </View>
            ))}
          </View>
          
          <TouchableOpacity onPress={navigateToPartners}>
            <Text style={styles.viewMore}>View all partners →</Text>
          </TouchableOpacity>
        </View>

        {/* CTA Section */}
        <LinearGradient
          colors={['#0ea5e9', '#0284c7']}
          style={styles.ctaContainer}
        >
          <Text style={styles.ctaTitle}>Transform Lives Together</Text>
          <Text style={styles.ctaText}>
            The Ability Network offers a wide range of features and benefits that will revolutionize support for PwDs and their caregivers. Join our mission to create meaningful change and ensure everyone has the opportunity to thrive.
          </Text>
          
          <TouchableOpacity style={styles.joinButton}>
            <LinearGradient
              colors={['#fff', '#f8fafc']}
              style={styles.joinButtonGradient}
            >
              <Text style={styles.joinButtonText}>Join The Network</Text>
              <Icon name="arrow-forward" size={20} color="#0ea5e9" />
            </LinearGradient>
          </TouchableOpacity>
        </LinearGradient>

        {/* Foundation Section */}
        <View style={styles.foundationContainer}>
          <Text style={styles.foundationTitle}>About Tech Mahindra Foundation</Text>
          <View style={styles.foundationLogo} />
          <Text style={styles.foundationText}>
            Tech Mahindra Foundation is the Corporate Social Responsibility (CSR) arm of Tech Mahindra Limited, a Mahindra Group Company. Since 2006, guided by the vision of Empowerment through Education.
          </Text>
          
          <View style={styles.statsContainer}>
            {stats.map((stat, index) => (
              <StatCard key={index} stat={stat} index={index} />
            ))}
          </View>
          
          <TouchableOpacity style={styles.websiteButton} onPress={handleVisitWebsite}>
            <LinearGradient
              colors={['#0ea5e9', '#0284c7']}
              style={styles.websiteButtonGradient}
            >
              <Text style={styles.buttonText}>Visit Foundation Website</Text>
              <Icon name="open-in-new" size={18} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Network Partners */}
        <View style={styles.networkPartners}>
          <Text style={styles.sectionHeader}>Our Network Partners</Text>
          <Text style={styles.partnerSubtitle}>
            Collaborating with leading organizations to create meaningful impact
          </Text>
          
          <View style={styles.partnerCategories}>
            <View style={styles.category}>
              <Text style={styles.categoryTitle}>Co-Creators</Text>
              <View style={styles.categoryLogos}>
                {[1, 2, 3].map((_, index) => (
                  <View key={index} style={styles.networkLogoContainer}>
                    <View style={styles.networkLogo} />
                  </View>
                ))}
              </View>
            </View>
            
            <View style={styles.category}>
              <Text style={styles.categoryTitle}>Research, Policy & Advocacy Partners</Text>
              <Text style={styles.categorySubtitle}>
                Leading research institutions and policy makers shaping the future
              </Text>
            </View>
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 40,
    paddingHorizontal: 24,
  },
  headerContent: {
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 60,
    resizeMode: 'contain',
    marginBottom: 20,
    tintColor: 'white',
  },
  tagline: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
    marginBottom: 12,
    letterSpacing: 1,
    textAlign: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    color: 'rgba(255,255,255,0.95)',
    marginBottom: 16,
    lineHeight: 26,
    paddingHorizontal: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    paddingHorizontal: 8,
  },
  cardContainer: {
    paddingHorizontal: 16,
    marginTop: -20,
    zIndex: 10,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
    ...Platform.select({
      android: {
        elevation: 8,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 12,
      }
    })
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  visionCard: {
    borderLeftWidth: 6,
    borderLeftColor: '#0ea5e9',
  },
  missionCard: {
    borderLeftWidth: 6,
    borderLeftColor: '#10b981',
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1e293b',
    marginLeft: 12,
  },
  cardText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#475569',
  },
  section: {
    paddingHorizontal: 16,
    marginTop: 32,
  },
  sectionHeader: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1e293b',
    marginBottom: 24,
    textAlign: 'center',
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    width: (width - 48) / 2,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
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
  featureIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureIcon: {
    width: 32,
    height: 32,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    color: '#1e293b',
    marginBottom: 8,
  },
  featureSubtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#64748b',
    lineHeight: 20,
  },
  ecosystemBanner: {
    margin: 16,
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    ...Platform.select({
      android: {
        elevation: 8,
      },
      ios: {
        shadowColor: '#d946ef',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
      }
    })
  },
  ecosystemTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: 'white',
    marginBottom: 16,
    textAlign: 'center',
  },
  ecosystemText: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.95)',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  videoButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  videoButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  videoButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
    marginLeft: 12,
  },
  partnersContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    marginHorizontal: 16,
    marginTop: 24,
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
  partnersTitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    color: '#475569',
    lineHeight: 24,
  },
  partnerLogos: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  partnerLogoContainer: {
    backgroundColor: '#f1f5f9',
    borderRadius: 16,
    padding: 20,
    margin: 8,
  },
  partnerLogo: {
    width: 70,
    height: 70,
    backgroundColor: '#e2e8f0',
    borderRadius: 8,
  },
  viewMore: {
    color: '#0ea5e9',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 16,
  },
  ctaContainer: {
    margin: 16,
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: 'white',
    marginBottom: 16,
    textAlign: 'center',
  },
  ctaText: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    color: 'rgba(255,255,255,0.95)',
    marginBottom: 28,
  },
  joinButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  joinButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  joinButtonText: {
    color: '#0ea5e9',
    fontWeight: '700',
    fontSize: 18,
    marginRight: 8,
  },
  foundationContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    marginHorizontal: 16,
    marginTop: 24,
    alignItems: 'center',
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
  foundationTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 16,
    textAlign: 'center',
  },
  foundationLogo: {
    width: 200,
    height: 60,
    backgroundColor: '#e2e8f0',
    borderRadius: 8,
    marginVertical: 20,
  },
  foundationText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#475569',
    marginBottom: 24,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 24,
  },
  statItem: {
    width: (width - 80) / 2,
    alignItems: 'center',
    marginBottom: 20,
  },
  statValue: {
    fontSize: 36,
    fontWeight: '800',
    color: '#0ea5e9',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    textAlign: 'center',
    color: '#64748b',
    fontWeight: '500',
  },
  websiteButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  websiteButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
    marginRight: 8,
  },
  networkPartners: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 32,
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
  partnerSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    color: '#64748b',
    lineHeight: 24,
  },
  partnerCategories: {
    marginTop: 8,
  },
  category: {
    marginBottom: 32,
    alignItems: 'center'
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 12,
  },
  categorySubtitle: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 16,
    lineHeight: 20,
    textAlign: 'center',
  },
  categoryLogos: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  networkLogoContainer: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    marginRight: 16,
    marginBottom: 16,
  },
  networkLogo: {
    width: 80,
    height: 40,
    backgroundColor: '#e2e8f0',
    borderRadius: 6,
  },
});

export default HomeScreen;