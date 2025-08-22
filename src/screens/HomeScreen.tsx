import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity, 
  Linking, 
  Dimensions,
  Platform 
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

const { width } = Dimensions.get('window');

// Define your stack param list
type RootStackParamList = {
  PartnersScreen: undefined;
  // add other screens here if needed
};

const HomeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handlePlayVideo = () => {
    Linking.openURL('https://youtu.be/dp4hhR51b5U');
  };

  const handleVisitWebsite = () => {
    Linking.openURL('https://techmahindrafoundation.org');
  };

  const navigateToPartners = () => {
    navigation.navigate('PartnersScreen');
  };

  // Feature data
  const features = [
    {
      icon: require('../assets/icons/digital.png'),
      title: 'Digital Accessibility',
      subtitle: 'Accessible digital platform for all'
    },
    {
      icon: require('../assets/icons/phygital.png'),
      title: 'Phygital Network',
      subtitle: 'On-ground support presence'
    },
    {
      icon: require('../assets/icons/government.png'),
      title: 'Government Street',
      subtitle: 'Integration of government schemes'
    },
    {
      icon: require('../assets/icons/phone.png'),
      title: 'Helpline Support',
      subtitle: '24/7 assistance'
    },
    {
      icon: require('../assets/icons/whatsapp.png'),
      title: 'WhatsApp Integration',
      subtitle: 'Multi-language chatbot'
    },
    
  ];

  // Stats data
  const stats = [
    { value: '26', label: 'Partner Organizations' },
    { value: '90+', label: 'Projects' },
    { value: '18+', label: 'States' },
    { value: '63', label: 'Years of Impact' }
  ];

  return (
    <ScrollView 
      style={styles.container} 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Header Section */}
      <LinearGradient
        colors={['#0066b3', '#1c2325ff']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Image 
          source={require('../assets/images/logo.png')} 
          style={styles.logo}
        />
        <Text style={styles.tagline}>Discover - Connect - Dignify</Text>
        <Text style={styles.title}>Ecosystem for Enabling Persons with Disabilities and their Caregivers</Text>
      </LinearGradient>

      {/* Network Description */}
      <View style={styles.section}>
        <Text style={styles.description}>
          The Ability Network, a Tech Mahindra Foundation initiative, is an inclusive network of verified solution providers that provides access to curated information for persons with disabilities and their caregivers.
        </Text>
      </View>

      {/* Vision & Mission Cards */}
      <View style={styles.cardContainer}>
        <View style={[styles.card, styles.visionCard]}>
          <Icon name="visibility" size={28} color="#0066b3" style={styles.cardIcon} />
          <Text style={styles.cardTitle}>Our Vision</Text>
          <Text style={styles.cardText}>
            We envision a world where Persons with Disabilities (PwDs) and their caregivers thrive with dignity and independence and are able to access resources that empower their full participation in society.
          </Text>
        </View>

        <View style={[styles.card, styles.missionCard]}>
          <Icon name="assistant-direction" size={28} color="#0066b3" style={styles.cardIcon} />
          <Text style={styles.cardTitle}>Our Mission</Text>
          <Text style={styles.cardText}>
            To create a dynamic, accessible and collaborative human-centric network built around a digital core that provides information and access to curated services across life stages to Persons with Disabilities and their caregivers.
          </Text>
        </View>
      </View>

      {/* Features Grid */}
      <Text style={styles.sectionHeader}>Key Features</Text>
      <View style={styles.featuresContainer}>
        {features.map((feature, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.featureCard}
            activeOpacity={0.8}
          >
            <View style={styles.featureIconContainer}>
              <Image source={feature.icon} style={styles.featureIcon} />
            </View>
            <Text style={styles.featureTitle}>{feature.title}</Text>
            <Text style={styles.featureSubtitle}>{feature.subtitle}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Ecosystem Banner */}
      <LinearGradient
        colors={['#0066b3', '#00a0dc']}
        style={styles.ecosystemBanner}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text style={styles.ecosystemTitle}>An Ecosystem for PwDs and Care Givers</Text>
        <Text style={styles.ecosystemText}>
          Discover how The Ability Network is transforming lives by connecting people with resources and support they need.
        </Text>
      </LinearGradient>

      {/* Video Section */}
      <TouchableOpacity 
        style={styles.videoContainer} 
        onPress={handlePlayVideo}
        activeOpacity={0.9}
      >
        <LinearGradient
          colors={['rgba(0, 102, 179, 0.7)', 'rgba(0, 160, 220, 0.7)']}
          style={styles.videoPlaceholder}
        >
          <Icon name="play-circle-filled" size={60} color="white" />
          <Text style={styles.playText}>Watch Our Story</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Partners Section */}
      <TouchableOpacity 
        style={styles.partnersContainer}
        onPress={navigateToPartners}
        activeOpacity={0.8}
      >
        <Text style={styles.partnersTitle}>The Ability Network is a collaborative initiated by Tech Mahindra Foundation with the support from core partners:</Text>
        <View style={styles.partnerLogos}>
          {[1, 2, 3, 4].map((_, index) => (
            <View key={index} style={styles.partnerLogoContainer}>
              <Image source={require('../assets/images/logo.png')} style={styles.partnerLogo} />
            </View>
          ))}
        </View>
        <Text style={styles.viewMore}>View all partners →</Text>
      </TouchableOpacity>

      {/* CTA Section */}
      <View style={styles.ctaContainer}>
        <Text style={styles.ctaTitle}>Transform Lives Together</Text>
        <Text style={styles.ctaText}>
          The Ability Network offers a wide range of features and benefits that will revolutionize support for PwDs and their caregivers.
        </Text>
        <TouchableOpacity style={styles.joinButton}>
          <Text style={styles.joinButtonText}>Join Our Mission</Text>
        </TouchableOpacity>
      </View>

      {/* Foundation Section */}
      <View style={styles.foundationContainer}>
        <Text style={styles.sectionHeader}>About Tech Mahindra Foundation</Text>
        <Image 
          source={require('../assets/images/logo.png')} 
          style={styles.foundationLogo}
        />
        <Text style={styles.foundationText}>
          Tech Mahindra Foundation is the Corporate Social Responsibility (CSR) arm of Tech Mahindra Limited, a Mahindra Group Company. Since 2006, guided by the vision of Empowerment through Education.
        </Text>
        
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statItem}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>
        
        <TouchableOpacity 
          style={styles.websiteButton} 
          onPress={handleVisitWebsite}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Visit Foundation Website</Text>
        </TouchableOpacity>
      </View>

      {/* Network Partners */}
      <View style={styles.networkPartners}>
        <Text style={styles.sectionHeader}>Our Network Partners</Text>
        <Text style={styles.partnerSubtitle}>Collaborating with leading organizations to create meaningful impact</Text>
        
        <View style={styles.partnerCategories}>
          <View style={styles.category}>
            <Text style={styles.categoryTitle}>Co-Creators</Text>
            <View style={styles.categoryLogos}>
              {[1, 2, 3].map((_, index) => (
                <View key={index} style={styles.networkLogoContainer}>
                  <Image source={require('../assets/images/logo.png')} style={styles.networkLogo} />
                </View>
              ))}
            </View>
          </View>
          
          <View style={styles.category}>
            <Text style={styles.categoryTitle}>Research, Policy & Advocacy Partners</Text>
            <Text style={styles.categorySubtitle}>Leading research institutions and policy makers shaping the future</Text>
            <View style={styles.categoryLogos}>
              <View style={styles.networkLogoContainer}>
                <Image source={require('../assets/images/logo.png')} style={styles.networkLogo} />
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  contentContainer: {
    paddingBottom: 40,
  },
  header: {
    padding: 24,
    paddingTop: Platform.OS === 'ios' ? 50 : 24,
    paddingBottom: 32,
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 16,
    ...Platform.select({
      android: {
        elevation: 4,
      },
      ios: {
        shadowColor: '#0066b3',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
      }
    })
  },
  logo: {
    width: 180,
    height: 50,
    resizeMode: 'contain',
    marginBottom: 16,
    tintColor: 'white',
  },
  tagline: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    color: 'white',
    marginTop: 8,
    lineHeight: 24,
  },
  section: {
    padding: 24,
    paddingBottom: 16,
  },
  description: {
    fontSize: 15,
    lineHeight: 24,
    color: '#334155',
    textAlign: 'center',
  },
  cardContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    ...Platform.select({
      android: {
        elevation: 3,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      }
    })
  },
  visionCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#00a0dc',
  },
  missionCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#34d399',
  },
  cardIcon: {
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0066b3',
    marginBottom: 12,
  },
  cardText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#475569',
  },
  sectionHeader: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0066b3',
    marginHorizontal: 24,
    marginBottom: 16,
    marginTop: 8,
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  featureCard: {
    width: (width - 48) / 2,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    ...Platform.select({
      android: {
        elevation: 2,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
      }
    })
  },
  featureIconContainer: {
    backgroundColor: '#e6f7ff',
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureIcon: {
    width: 32,
    height: 32,
    tintColor: '#0066b3',
  },
  featureTitle: {
    fontWeight: '700',
    textAlign: 'center',
    color: '#0066b3',
    marginBottom: 4,
    fontSize: 15,
  },
  featureSubtitle: {
    fontSize: 13,
    textAlign: 'center',
    color: '#64748b',
    lineHeight: 18,
  },
  ecosystemBanner: {
    padding: 24,
    marginHorizontal: 16,
    borderRadius: 16,
    marginBottom: 24,
    ...Platform.select({
      android: {
        elevation: 4,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
      }
    })
  },
  ecosystemTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
    marginBottom: 12,
    textAlign: 'center',
  },
  ecosystemText: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.95)',
    textAlign: 'center',
    lineHeight: 22,
  },
  videoContainer: {
    marginHorizontal: 16,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
    height: 200,
    ...Platform.select({
      android: {
        elevation: 3,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
      }
    })
  },
  videoPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#94a3b8',
  },
  playText: {
    marginTop: 12,
    color: 'white',
    fontWeight: '700',
    fontSize: 18,
  },
  partnersContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    marginHorizontal: 16,
    marginBottom: 24,
    ...Platform.select({
      android: {
        elevation: 2,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      }
    })
  },
  partnersTitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#334155',
    lineHeight: 24,
  },
  partnerLogos: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  partnerLogoContainer: {
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    padding: 16,
    margin: 8,
  },
  partnerLogo: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
  viewMore: {
    color: '#00a0dc',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 8,
  },
  ctaContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    marginHorizontal: 16,
    marginBottom: 24,
    alignItems: 'center',
    ...Platform.select({
      android: {
        elevation: 2,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      }
    })
  },
  ctaTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0066b3',
    marginBottom: 12,
    textAlign: 'center',
  },
  ctaText: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    color: '#475569',
    marginBottom: 24,
  },
  joinButton: {
    backgroundColor: '#0066b3',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 30,
    ...Platform.select({
      android: {
        elevation: 3,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      }
    })
  },
  joinButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 18,
  },
  foundationContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    marginHorizontal: 16,
    marginBottom: 24,
    alignItems: 'center',
    ...Platform.select({
      android: {
        elevation: 2,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      }
    })
  },
  foundationLogo: {
    width: 200,
    height: 60,
    resizeMode: 'contain',
    marginVertical: 16,
  },
  foundationText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#475569',
    marginBottom: 20,
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
    color: '#0066b3',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    textAlign: 'center',
    color: '#64748b',
    fontWeight: '500',
  },
  websiteButton: {
    backgroundColor: '#0066b3',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 30,
    ...Platform.select({
      android: {
        elevation: 3,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      }
    })
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  networkPartners: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    marginHorizontal: 16,
    marginBottom: 32,
    ...Platform.select({
      android: {
        elevation: 2,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
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
    marginBottom: 28,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0066b3',
    marginBottom: 12,
  },
  categorySubtitle: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 16,
    lineHeight: 20,
  },
  categoryLogos: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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
    resizeMode: 'contain',
  },
});

export default HomeScreen;