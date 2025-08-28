import React, { useRef, useEffect, useState } from 'react';
import { 
  ScrollView, 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput,
  Animated,
  Platform,
  StatusBar,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

const EventsScreen = () => {
  const [email, setEmail] = useState('');
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const headerAnim = useRef(new Animated.Value(0)).current;

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
      Animated.timing(headerAnim, {
        toValue: 1,
        duration: 1000,
        delay: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const events = [
    {
      id: 1,
      title: 'The Purple Fest & Talks 2025 - New Delhi',
      location: 'Rashtrapati Bhawan Lawns, New Delhi',
      date: 'January 2025',
      status: 'Completed',
      description: 'The Ability Network (TAN) was unveiled at The Purple Fest 2025, a vibrant celebration of empowerment of persons with disabilities (PwDs). Tech Mahindra Foundation, along with TAN, showcased impactful work through stalls, performances, and inclusive innovations. The event highlighted the abilities of PwDs and promoted dialogue on building an inclusive society.',
      image: require('../assets/images/purple-fest.jpg'),
      attendees: '500+',
      type: 'Festival',
    },
    {
      id: 2,
      title: 'The Ability Dialogues — Mumbai',
      location: 'SP Jain Institute of Management & Research, Mumbai',
      date: 'March 2025',
      status: 'Completed',
      description: 'TAN hosted "The Ability Dialogues" at SPJIMR, Mumbai. This second discourse brought together over 70 experts from diverse sectors to address key challenges and solutions for PwDs across various life stages. The event featured a keynote address, experiential corridor demonstrating innovative solutions, and the release of a research study on barriers faced by girls with disabilities in accessing education.',
      image: require('../assets/images/dialogues-mumbai.jpg'),
      attendees: '70+',
      type: 'Conference',
    },
    {
      id: 3,
      title: 'The Ability Dialogues — Bengaluru',
      location: 'Tech Mahindra Ltd Campus, Bengaluru',
      date: 'February 2025',
      status: 'Completed',
      description: 'The inaugural public discourse of TAN was held at Tech Mahindra Campus in Bengaluru. Bringing together over 50 experts from NGOs, Assistive Tech providers, government bodies, and technology specialists, the conference focused on fostering collaboration and innovation to support PwDs and their caregivers. The event featured discussions, experiential corridor showcasing solutions, and a panel dialogue on digital public infrastructure.',
      image: require('../assets/images/dialogues-bengaluru.jpg'),
      attendees: '50+',
      type: 'Conference',
    },
  ];

  const EventCard = ({ event, index }: { event: any; index: number }) => {
    const cardAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.95)).current;

    useEffect(() => {
      Animated.parallel([
        Animated.timing(cardAnim, {
          toValue: 1,
          duration: 600,
          delay: index * 200,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 100,
          friction: 8,
          delay: index * 200,
          useNativeDriver: true,
        }),
      ]).start();
    }, [index]);

    const getStatusColor = (status: string) => {
      switch (status) {
        case 'Completed': return '#10b981';
        case 'Upcoming': return '#0ea5e9';
        case 'Live': return '#ef4444';
        default: return '#64748b';
      }
    };

    const getTypeColor = (type: string) => {
      switch (type) {
        case 'Festival': return '#d946ef';
        case 'Conference': return '#0ea5e9';
        case 'Workshop': return '#f59e0b';
        default: return '#64748b';
      }
    };

    return (
      <Animated.View
        style={[
          styles.eventCard,
          {
            opacity: cardAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={styles.imageContainer}>
          <Image source={event.image} style={styles.eventImage} />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)']}
            style={styles.imageOverlay}
          >
            <View style={styles.imageBadges}>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(event.status) }]}>
                <Text style={styles.badgeText}>{event.status}</Text>
              </View>
              <View style={[styles.typeBadge, { backgroundColor: getTypeColor(event.type) }]}>
                <Text style={styles.badgeText}>{event.type}</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        <View style={styles.eventContent}>
          <Text style={styles.eventTitle}>{event.title}</Text>
          
          <View style={styles.eventMeta}>
            <View style={styles.metaItem}>
              <Icon name="location-on" size={16} color="#0ea5e9" />
              <Text style={styles.eventLocation}>{event.location}</Text>
            </View>
            
            <View style={styles.metaItem}>
              <Icon name="event" size={16} color="#f59e0b" />
              <Text style={styles.eventDate}>{event.date}</Text>
            </View>
            
            <View style={styles.metaItem}>
              <Icon name="group" size={16} color="#10b981" />
              <Text style={styles.eventAttendees}>{event.attendees} attendees</Text>
            </View>
          </View>

          <Text style={styles.eventDescription}>{event.description}</Text>

          <View style={styles.eventActions}>
            <TouchableOpacity style={styles.actionButton}>
              <LinearGradient
                colors={['#0ea5e9', '#0284c7']}
                style={styles.actionGradient}
              >
                <Icon name="info" size={16} color="white" />
                <Text style={styles.actionText}>Learn More</Text>
              </LinearGradient>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.shareButton}>
              <Icon name="share" size={20} color="#64748b" />
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0ea5e9" />
      
      {/* Header */}
      <LinearGradient
        colors={['#0ea5e9', '#0284c7', '#0369a1']}
        style={styles.header}
      >
        <Animated.View
          style={[
            styles.headerContent,
            {
              opacity: headerAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Icon name="event" size={32} color="white" style={styles.headerIcon} />
          <Text style={styles.headerTitle}>Our Events</Text>
          <Text style={styles.headerSubtitle}>
            Join us at our events and be part of the movement towards a more inclusive and accessible world
          </Text>
        </Animated.View>
      </LinearGradient>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Stats Section */}
        <Animated.View 
          style={[
            styles.statsSection,
            { opacity: fadeAnim }
          ]}
        >
          <LinearGradient
            colors={['#fff', '#f8fafc']}
            style={styles.statsContainer}
          >
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <LinearGradient
                  colors={['#0ea5e9', '#0284c7']}
                  style={styles.statIconBg}
                >
                  <Icon name="event-available" size={24} color="white" />
                </LinearGradient>
                <Text style={styles.statNumber}>15+</Text>
                <Text style={styles.statLabel}>Events Hosted</Text>
              </View>
              
              <View style={styles.statItem}>
                <LinearGradient
                  colors={['#10b981', '#059669']}
                  style={styles.statIconBg}
                >
                  <Icon name="group" size={24} color="white" />
                </LinearGradient>
                <Text style={styles.statNumber}>2000+</Text>
                <Text style={styles.statLabel}>Participants</Text>
              </View>
              
              <View style={styles.statItem}>
                <LinearGradient
                  colors={['#d946ef', '#c026d3']}
                  style={styles.statIconBg}
                >
                  <Icon name="location-city" size={24} color="white" />
                </LinearGradient>
                <Text style={styles.statNumber}>8</Text>
                <Text style={styles.statLabel}>Cities Covered</Text>
              </View>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Events List */}
        <View style={styles.eventsSection}>
          {events.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </View>

        {/* Newsletter Subscription */}
        <Animated.View 
          style={[
            styles.subscribeSection,
            { opacity: fadeAnim }
          ]}
        >
          <LinearGradient
            colors={['#d946ef', '#c026d3', '#a21caf']}
            style={styles.subscribeContainer}
          >
            <Icon name="notifications-active" size={40} color="white" style={styles.subscribeIcon} />
            <Text style={styles.subscribeTitle}>Stay Updated with Our Events</Text>
            <Text style={styles.subscribeText}>
              Subscribe to our mailing list to receive updates about upcoming events and initiatives.
            </Text>
            
            <View style={styles.emailContainer}>
              <View style={styles.emailInputContainer}>
                <Icon name="email" size={20} color="#64748b" style={styles.emailIcon} />
                <TextInput
                  style={styles.emailInput}
                  placeholder="Enter your email address"
                  value={email}
                  onChangeText={setEmail}
                  placeholderTextColor="#94a3b8"
                  keyboardType="email-address"
                />
              </View>
              <TouchableOpacity style={styles.subscribeButton}>
                <LinearGradient
                  colors={['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.2)']}
                  style={styles.subscribeButtonGradient}
                >
                  <Text style={styles.subscribeButtonText}>Subscribe</Text>
                  <Icon name="arrow-forward" size={18} color="white" />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Upcoming Events Preview */}
        <Animated.View 
          style={[
            styles.upcomingSection,
            { opacity: fadeAnim }
          ]}
        >
          <Text style={styles.upcomingTitle}>Coming Soon</Text>
          <LinearGradient
            colors={['#f0f9ff', '#e0f2fe']}
            style={styles.upcomingContainer}
          >
            <Icon name="event-note" size={48} color="#0ea5e9" style={styles.upcomingIcon} />
            <Text style={styles.upcomingMainText}>New Events in Planning</Text>
            <Text style={styles.upcomingSubText}>
              We're working on exciting new events and initiatives. Stay tuned for announcements!
            </Text>
            <TouchableOpacity style={styles.notifyButton}>
              <LinearGradient
                colors={['#0ea5e9', '#0284c7']}
                style={styles.notifyGradient}
              >
                <Icon name="notifications" size={16} color="white" />
                <Text style={styles.notifyText}>Notify Me</Text>
              </LinearGradient>
            </TouchableOpacity>
          </LinearGradient>
        </Animated.View>
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
    paddingBottom: 32,
    paddingHorizontal: 24,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerIcon: {
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: 'white',
    marginBottom: 12,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.95)',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 16,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  statsSection: {
    marginHorizontal: 16,
    marginTop: -16,
    zIndex: 10,
  },
  statsContainer: {
    borderRadius: 20,
    padding: 24,
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
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statIconBg: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1e293b',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    fontWeight: '500',
  },
  eventsSection: {
    marginTop: 24,
  },
  eventCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    margin: 16,
    overflow: 'hidden',
    ...Platform.select({
      android: {
        elevation: 6,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.12,
        shadowRadius: 10,
      }
    })
  },
  imageContainer: {
    position: 'relative',
    height: 200,
  },
  eventImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    justifyContent: 'flex-end',
    padding: 16,
  },
  imageBadges: {
    flexDirection: 'row',
    gap: 8,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  typeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  eventContent: {
    padding: 20,
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 16,
    lineHeight: 26,
  },
  eventMeta: {
    marginBottom: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  eventLocation: {
    fontSize: 14,
    color: '#0ea5e9',
    marginLeft: 8,
    fontWeight: '600',
    flex: 1,
  },
  eventDate: {
    color: '#f59e0b',
    fontSize: 14,
    marginLeft: 8,
    fontWeight: '600',
  },
  eventAttendees: {
    color: '#10b981',
    fontSize: 14,
    marginLeft: 8,
    fontWeight: '600',
  },
  eventDescription: {
    fontSize: 15,
    lineHeight: 24,
    color: '#475569',
    marginBottom: 20,
  },
  eventActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 12,
  },
  actionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  actionText: {
    color: 'white',
    fontWeight: '600',
    marginLeft: 8,
  },
  shareButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subscribeSection: {
    margin: 16,
    marginTop: 32,
  },
  subscribeContainer: {
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
  },
  subscribeIcon: {
    marginBottom: 20,
  },
  subscribeTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: 'white',
    marginBottom: 12,
    textAlign: 'center',
  },
  subscribeText: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.95)',
    textAlign: 'center',
    marginBottom: 28,
    lineHeight: 24,
    paddingHorizontal: 8,
  },
  emailContainer: {
    width: '100%',
    gap: 12,
  },
  emailInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  emailIcon: {
    marginRight: 12,
    color: 'rgba(255,255,255,0.8)',
  },
  emailInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: 'white',
  },
  subscribeButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  subscribeButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  subscribeButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
    marginRight: 8,
  },
  upcomingSection: {
    marginHorizontal: 16,
    marginTop: 32,
  },
  upcomingTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 20,
    textAlign: 'center',
  },
  upcomingContainer: {
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    ...Platform.select({
      android: {
        elevation: 4,
      },
      ios: {
        shadowColor: '#0ea5e9',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      }
    })
  },
  upcomingIcon: {
    marginBottom: 20,
  },
  upcomingMainText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0369a1',
    marginBottom: 12,
    textAlign: 'center',
  },
  upcomingSubText: {
    fontSize: 15,
    color: '#0284c7',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
    paddingHorizontal: 16,
  },
  notifyButton: {
    borderRadius: 14,
    overflow: 'hidden',
  },
  notifyGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
  },
  notifyText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
    marginLeft: 8,
  },
});

export default EventsScreen;