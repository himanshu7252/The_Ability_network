import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const iconMap: Record<string, any> = {
  whatsapp: require('../assets/icons/whatsapp.png'),
  digital: require('../assets/icons/digital.png'),
  helpline: require('../assets/icons/helpline.png'),
  phygital: require('../assets/icons/phygital.png'),
  government: require('../assets/icons/government.png'),
};

const AboutScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Image
        source={require('../assets/images/abilitynetworklogo.png')}
        style={styles.banner}
      />

      <Text style={styles.title}>Discover - Connect - Dignify</Text>
      <Text style={styles.subtitle}>
        Ecosystem for Enabling Persons with Disabilities and their Caregivers
      </Text>

      <Text style={styles.description}>
        The Ability Network, a Tech Mahindra Foundation initiative, is an
        inclusive network of verified solution providers and provides access to
        curated information to PwDs and their caregivers across various
        Life-stages.
      </Text>

      <TouchableOpacity style={styles.learnMoreButton}>
        <Text style={styles.learnMoreText}>Learn More About Us</Text>
      </TouchableOpacity>

      <View style={styles.section}>
        <View style={styles.iconContainer}>
          <Image
            source={require('../assets/icons/vision.png')}
            style={styles.icon}
          />
        </View>
        <Text style={styles.sectionTitle}>Our Vision</Text>
        <Text style={styles.sectionContent}>
          We envision a world where Persons with Disabilities (PwDs) and their
          caregivers thrive with dignity and independence and are able to
          access resources that empower their full participation in society.
        </Text>
      </View>

      <View style={styles.section}>
        <View style={styles.iconContainer}>
          <Image
            source={require('../assets/icons/mission.png')}
            style={styles.icon}
          />
        </View>
        <Text style={styles.sectionTitle}>Our Mission</Text>
        <Text style={styles.sectionContent}>
          To create a dynamic, accessible and collaborative human-centric
          network built around a digital core that provides information and
          access to curated services across life stages to Persons with
          Disabilities and their caregivers.
        </Text>
      </View>

      <Text style={styles.featuresTitle}>Key Features</Text>

      <View style={styles.featuresContainer}>
        {[
          {
            icon: 'digital',
            title: 'Digital Accessibility',
            desc: "An accessible application to look for solution providers in user's vicinity",
          },
          {
            icon: 'whatsapp',
            title: 'WhatsApp Integration',
            desc: 'WhatsApp chatbot in a language comfortable to the user',
          },
          {
            icon: 'helpline',
            title: 'Helpline Support',
            desc: 'Integration of helpline numbers',
          },
          {
            icon: 'phygital',
            title: 'Phygital Network',
            desc: 'Presence of on-ground support for communities',
          },
          {
            icon: 'government',
            title: 'Government Integration',
            desc: 'Systemic change through integration of govt schemes and processes',
          },
        ].map((feature, index) => (
          <View key={index} style={styles.featureCard}>
            <Image
              source={iconMap[feature.icon]}
              style={styles.featureIcon}
            />
            <Text style={styles.featureTitle}>{feature.title}</Text>
            <Text style={styles.featureDesc}>{feature.desc}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.teamTitle}>Our Team</Text>
      <Text style={styles.teamDesc}>
        The Ability Network is a collaborative initiated by Tech Mahindra
        Foundation with the support from core partners — UIA PwD, EkStep, Enable
        India and Nayi Disha.
      </Text>

      <View style={styles.teamContainer}>
        {[
          {
            name: 'Chetan Kapoor',
            role: 'Chief Executive Officer',
            org: 'Tech Mahindra Foundation',
          },
          {
            name: 'Neha Soneji',
            role: 'Program Director',
            org: 'Child Development & The Ability Network',
          },
          {
            name: 'Sajid Ali',
            role: 'Chief Operating Officer',
            org: 'Tech Mahindra Foundation',
          },
          {
            name: 'Pauravi Srivastava',
            role: 'Assistant Manager',
            org: 'Disability Tech Mahindra Foundation',
          },
        ].map((member, index) => (
          <View key={index} style={styles.teamMember}>
            <View style={styles.avatarPlaceholder} />
            <Text style={styles.memberName}>{member.name}</Text>
            <Text style={styles.memberRole}>{member.role}</Text>
            <Text style={styles.memberOrg}>{member.org}</Text>
          </View>
        ))}
      </View>

      <View style={styles.ctaContainer}>
        <Text style={styles.ctaTitle}>Transform Lives Together</Text>
        <Text style={styles.ctaText}>
          The Ability Network offers a wide range of features and benefits that
          will revolutionize support for PwDs and their caregivers. Join our
          mission to create meaningful change and ensure everyone has the
          opportunity to thrive.
        </Text>
        <TouchableOpacity style={styles.ctaButton}>
          <Text style={styles.ctaButtonText}>Join the Network</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  banner: { width: '100%', height: 200, resizeMode: 'cover' },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    color: '#663399',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
    color: '#495057',
    paddingHorizontal: 20,
  },
  description: {
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 20,
    color: '#333',
    paddingHorizontal: 20,
  },
  learnMoreButton: {
    backgroundColor: '#663399',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignSelf: 'center',
    marginBottom: 30,
  },
  learnMoreText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  iconContainer: {
    backgroundColor: '#f3e5f5',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  icon: {
    width: 30,
    height: 30,
    tintColor: '#663399',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  sectionContent: {
    fontSize: 15,
    lineHeight: 24,
    color: '#495057',
  },
  featuresTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  featuresContainer: {
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  featureCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
  },
  featureIcon: {
    width: 50,
    height: 50,
    marginBottom: 15,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
    textAlign: 'center',
  },
  featureDesc: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
    lineHeight: 22,
  },
  teamTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  teamDesc: {
    fontSize: 15,
    color: '#495057',
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
    lineHeight: 24,
  },
  teamContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginBottom: 30,
  },
  teamMember: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#e0e0e0',
    marginBottom: 10,
  },
  memberName: {
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
  },
  memberRole: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
    marginTop: 4,
  },
  memberOrg: {
    fontSize: 13,
    color: '#6c757d',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  ctaContainer: {
    backgroundColor: '#663399',
    padding: 30,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
    textAlign: 'center',
  },
  ctaText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  ctaButton: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  ctaButtonText: {
    color: '#663399',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default AboutScreen;
