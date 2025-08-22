import React from 'react';
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

const EventsScreen = () => {
  const events = [
    {
      id: 1,
      title: 'The Purple Fest & Talks 2025 - New Delhi',
      location: 'Rashtrapati Bhawan Lawns, New Delhi',
      date: 'January 2025',
      description: 'The Ability Network (TAN) was unveiled at The Purple Fest 2025, a vibrant celebration of empowerment of persons with disabilities (PwDs). Tech Mahindra Foundation, along with TAN, showcased impactful work through stalls, performances, and inclusive innovations. The event highlighted the abilities of PwDs and promoted dialogue on building an inclusive society.',
      image: require('../assets/images/purple-fest.jpg')
    },
    {
      id: 2,
      title: 'The Ability Dialogues — Mumbai',
      location: 'SP Jain Institute of Management & Research, Mumbai',
      date: 'March 2025',
      description: 'TAN hosted "The Ability Dialogues" at SPJIMR, Mumbai. This second discourse brought together over 70 experts from diverse sectors to address key challenges and solutions for PwDs across various life stages. The event featured a keynote address, experiential corridor demonstrating innovative solutions, and the release of a research study on barriers faced by girls with disabilities in accessing education.',
      image: require('../assets/images/dialogues-mumbai.jpg')
    },
    {
      id: 3,
      title: 'The Ability Dialogues — Bengaluru',
      location: 'Tech Mahindra Ltd Campus, Bengaluru',
      date: 'February 2025',
      description: 'The inaugural public discourse of TAN was held at Tech Mahindra Campus in Bengaluru. Bringing together over 50 experts from NGOs, Assistive Tech providers, government bodies, and technology specialists, the conference focused on fostering collaboration and innovation to support PwDs and their caregivers. The event featured discussions, experiential corridor showcasing solutions, and a panel dialogue on digital public infrastructure.',
      image: require('../assets/images/dialogues-bengaluru.jpg')
    }
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>Join us at our events and be part of the movement towards a more inclusive and accessible world</Text>
      
      {events.map((event) => (
        <View key={event.id} style={styles.eventCard}>
          <Image source={event.image} style={styles.eventImage} />
          <Text style={styles.eventTitle}>{event.title}</Text>
          <View style={styles.locationContainer}>
            <Image 
              source={require('../assets/icons/location.png')} 
              style={styles.locationIcon}
            />
            <Text style={styles.eventLocation}>{event.location}</Text>
          </View>
          <Text style={styles.eventDate}>{event.date}</Text>
          <Text style={styles.eventDescription}>{event.description}</Text>
        </View>
      ))}
      
      <View style={styles.subscribeContainer}>
        <Text style={styles.subscribeTitle}>Stay Updated with Our Events</Text>
        <Text style={styles.subscribeText}>Subscribe to our mailing list to receive updates about upcoming events and initiatives.</Text>
        
        <View style={styles.emailContainer}>
          <TextInput
            style={styles.emailInput}
            placeholder="Enter your email address"
            placeholderTextColor="#999"
          />
          <TouchableOpacity style={styles.subscribeButton}>
            <Text style={styles.subscribeButtonText}>Subscribe</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    padding: 20,
    backgroundColor: '#f3e5f5',
    color: '#4a0072',
    lineHeight: 28
  },
  eventCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden'
  },
  eventImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover'
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 15,
    color: '#333'
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 5
  },
  locationIcon: {
    width: 16,
    height: 16,
    marginRight: 5,
    tintColor: '#666'
  },
  eventLocation: {
    fontSize: 14,
    color: '#666'
  },
  eventDate: {
    paddingHorizontal: 15,
    marginBottom: 10,
    color: '#d81b60',
    fontWeight: '600'
  },
  eventDescription: {
    fontSize: 14,
    lineHeight: 22,
    color: '#444',
    padding: 15,
    paddingTop: 0
  },
  subscribeContainer: {
    backgroundColor: '#e3f2fd',
    margin: 20,
    padding: 20,
    borderRadius: 12
  },
  subscribeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#0d47a1',
    textAlign: 'center'
  },
  subscribeText: {
    fontSize: 15,
    color: '#1e88e5',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22
  },
  emailContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden'
  },
  emailInput: {
    flex: 1,
    padding: 15,
    fontSize: 16
  },
  subscribeButton: {
    backgroundColor: '#0d47a1',
    paddingHorizontal: 20,
    justifyContent: 'center'
  },
  subscribeButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16
  }
});

export default EventsScreen;