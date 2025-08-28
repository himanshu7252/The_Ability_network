import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  Animated,
  Platform,
  StatusBar,
  Dimensions,
  Alert,
  Keyboard,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');
const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 80;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const ContactScreen = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const formAnim = useRef(new Animated.Value(0)).current;

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
      Animated.timing(formAnim, {
        toValue: 1,
        duration: 700,
        delay: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleSubmit = () => {
    if (!name || !email || !subject || !message) {
      Alert.alert('Missing Information', 'Please fill in all fields before submitting.');
      return;
    }

    // Animate button press
    const scaleAnim = new Animated.Value(1);
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    // Handle form submission
    console.log({ name, email, subject, message, subscribed });
    
    // Reset form
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    setSubscribed(false);
    Keyboard.dismiss();
    
    Alert.alert(
      '✅ Message Sent!', 
      'Thank you for your message! We will get back to you within 24 hours.',
      [{ text: 'OK', style: 'default' }]
    );
  };

  // Header animations
  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0.7, 0],
    extrapolate: 'clamp',
  });

  const titleScale = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0.8],
    extrapolate: 'clamp',
  });

  const contactInfo = [
    {
      icon: 'location-on',
      title: 'Our Address',
      details: 'Harijan Sevak Sangh, Gandhi Ashram\nKingsway Camp, Delhi 110009, India',
      color: '#0ea5e9',
      actionText: 'View on Maps',
      action: () => console.log('Open maps')
    },
    {
      icon: 'email',
      title: 'Email Us',
      details: 'tan@techmahindrafoundation.org',
      color: '#10b981',
      actionText: 'Send Email',
      action: () => console.log('Open email')
    },
    {
      icon: 'schedule',
      title: 'Office Hours',
      details: 'Monday - Friday: 9:00 AM - 5:00 PM\nSaturday - Sunday: Closed',
      color: '#f59e0b',
      actionText: 'Call Now',
      action: () => console.log('Make call')
    },
  ];

  const faqs = [
    {
      question: 'What is The Ability Network?',
      answer: 'The Ability Network is a comprehensive platform created by Tech Mahindra Foundation to support persons with disabilities and their caregivers through verified service providers, resources, and community connections.',
    },
    {
      question: 'How do I search for solution providers?',
      answer: 'You can easily search for service providers using our search feature. Filter by location, service type, or specific needs to find verified providers in your area.',
    },
    {
      question: 'How can I become a solution provider?',
      answer: 'To become a verified solution provider, contact us through this form or email us directly. We have a thorough verification process to ensure quality services for our community.',
    },
    {
      question: 'Is the information verified?',
      answer: 'Yes, all solution providers undergo a comprehensive verification process to ensure accuracy, reliability, and quality of services offered through our platform.',
    },
    {
      question: 'Is the platform free to use?',
      answer: 'Absolutely! The Ability Network is completely free for users seeking services and information. Our mission is to make support accessible to everyone.',
    },
  ];

  const ContactInfoCard = ({ info, index }: { info: any; index: number }) => {
    const cardAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.95)).current;

    useEffect(() => {
      Animated.parallel([
        Animated.timing(cardAnim, {
          toValue: 1,
          duration: 500,
          delay: index * 150,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 100,
          friction: 8,
          delay: index * 150,
          useNativeDriver: true,
        }),
      ]).start();
    }, [index]);

    return (
      <Animated.View
        style={[
          styles.infoCard,
          { 
            opacity: cardAnim, 
            transform: [{ scale: scaleAnim }] 
          }
        ]}
      >
        <LinearGradient
          colors={['#ffffff', '#f8fafc']}
          style={styles.infoCardGradient}
        >
          <View style={[styles.infoIconContainer, { backgroundColor: info.color + '20' }]}>
            <Icon name={info.icon} size={24} color={info.color} />
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>{info.title}</Text>
            <Text style={styles.infoDetails}>{info.details}</Text>
            <TouchableOpacity 
              style={[styles.infoAction, { backgroundColor: info.color + '15' }]}
              onPress={info.action}
            >
              <Text style={[styles.infoActionText, { color: info.color }]}>
                {info.actionText}
              </Text>
              <Icon name="arrow-forward" size={14} color={info.color} />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </Animated.View>
    );
  };

  const FAQItem = ({ faq, index }: { faq: any; index: number }) => {
    const isExpanded = expandedFaq === index;
    const rotateAnim = useRef(new Animated.Value(0)).current;
    const heightAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      Animated.parallel([
        Animated.timing(rotateAnim, {
          toValue: isExpanded ? 1 : 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(heightAnim, {
          toValue: isExpanded ? 1 : 0,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();
    }, [isExpanded]);

    return (
      <View style={styles.faqItem}>
        <TouchableOpacity
          style={styles.faqQuestion}
          onPress={() => setExpandedFaq(isExpanded ? null : index)}
        >
          <Text style={styles.faqQuestionText}>{faq.question}</Text>
          <Animated.View
            style={{
              transform: [{
                rotate: rotateAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '180deg'],
                }),
              }],
            }}
          >
            <Icon name="keyboard-arrow-down" size={24} color="#64748b" />
          </Animated.View>
        </TouchableOpacity>
        
        <Animated.View
          style={[
            styles.faqAnswer,
            {
              maxHeight: heightAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 200],
              }),
              opacity: heightAnim,
            },
          ]}
        >
          <Text style={styles.faqAnswerText}>{faq.answer}</Text>
        </Animated.View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0ea5e9" />
      
      {/* Animated Header */}
      <Animated.View style={[styles.header, { height: headerHeight }]}>
        <LinearGradient
          colors={['#0ea5e9', '#0284c7', '#0369a1']}
          style={styles.headerGradient}
        >
          <Animated.View
            style={[
              styles.headerContent,
              {
                opacity: headerOpacity,
                transform: [{ scale: titleScale }],
              },
            ]}
          >
            <Icon name="contact-support" size={32} color="white" style={styles.headerIcon} />
            <Text style={styles.title}>Get in Touch</Text>
            <Text style={styles.subtitle}>
              Have questions or want to learn more about our initiatives? We're here to help.
            </Text>
          </Animated.View>
        </LinearGradient>
      </Animated.View>

      {/* Scrollable Content */}
      <Animated.ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        keyboardShouldPersistTaps="handled"
      >
        {/* Quick Actions */}
        <Animated.View 
          style={[
            styles.quickActions,
            { opacity: fadeAnim }
          ]}
        >
          <TouchableOpacity style={styles.quickAction}>
            <LinearGradient
              colors={['#d946ef', '#c026d3']}
              style={styles.quickActionGradient}
            >
              <Icon name="help-outline" size={20} color="white" />
              <Text style={styles.quickActionText}>View FAQs</Text>
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickAction}>
            <LinearGradient
              colors={['#10b981', '#059669']}
              style={styles.quickActionGradient}
            >
              <Icon name="phone" size={20} color="white" />
              <Text style={styles.quickActionText}>Call Us</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        {/* Contact Information */}
        <View style={styles.contactInfoSection}>
          <Text style={styles.sectionTitle}>How to Reach Us</Text>
          {contactInfo.map((info, index) => (
            <ContactInfoCard key={index} info={info} index={index} />
          ))}
        </View>

        {/* Social Links */}
        <Animated.View 
          style={[
            styles.socialSection,
            { opacity: fadeAnim }
          ]}
        >
          <LinearGradient
            colors={['#f8fafc', '#e2e8f0']}
            style={styles.socialContainer}
          >
            <Text style={styles.socialTitle}>Connect With Us</Text>
            <Text style={styles.socialSubtitle}>Follow our journey on social media</Text>
            <View style={styles.socialIcons}>
              {[
                { name: 'Facebook', color: '#1877f2' },
                { name: 'Twitter', color: '#1da1f2' },
                { name: 'Instagram', color: '#e4405f' },
                { name: 'LinkedIn', color: '#0077b5' }
              ].map((social, index) => (
                <TouchableOpacity key={social.name} style={styles.socialButton}>
                  <LinearGradient
                    colors={[social.color, social.color + 'cc']}
                    style={styles.socialButtonGradient}
                  >
                    <Icon name="public" size={18} color="white" />
                  </LinearGradient>
                  <Text style={[styles.socialName, { color: social.color }]}>{social.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Contact Form */}
        <Animated.View 
          style={[
            styles.formContainer,
            { 
              opacity: formAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <Text style={styles.formTitle}>Send Us a Message</Text>
          <Text style={styles.formSubtitle}>We typically respond within 24 hours</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Full Name *</Text>
            <View style={styles.inputContainer}>
              <Icon name="person" size={20} color="#64748b" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Enter your full name"
                value={name}
                onChangeText={setName}
                placeholderTextColor="#94a3b8"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email Address *</Text>
            <View style={styles.inputContainer}>
              <Icon name="email" size={20} color="#64748b" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Enter your email address"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#94a3b8"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Subject *</Text>
            <View style={styles.inputContainer}>
              <Icon name="subject" size={20} color="#64748b" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="What's this about?"
                value={subject}
                onChangeText={setSubject}
                placeholderTextColor="#94a3b8"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Message *</Text>
            <View style={[styles.inputContainer, styles.messageContainer]}>
              <Icon name="message" size={20} color="#64748b" style={[styles.inputIcon, styles.messageIcon]} />
              <TextInput
                style={[styles.input, styles.messageInput]}
                placeholder="Tell us more about your inquiry..."
                value={message}
                onChangeText={setMessage}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                placeholderTextColor="#94a3b8"
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setSubscribed(!subscribed)}
          >
            <View style={[styles.checkbox, subscribed && styles.checked]}>
              {subscribed && <Icon name="check" size={16} color="white" />}
            </View>
            <Text style={styles.checkboxLabel}>
              📧 Keep me updated on news and upcoming events
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <LinearGradient
              colors={['#0ea5e9', '#0284c7']}
              style={styles.submitGradient}
            >
              <Text style={styles.submitButtonText}>Send Message</Text>
              <Icon name="send" size={16} color="white" />
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        {/* FAQs */}
        <View style={styles.faqSection}>
          <Text style={styles.faqTitle}>Frequently Asked Questions</Text>
          <View style={styles.faqContainer}>
            {faqs.map((faq, index) => (
              <FAQItem key={index} faq={faq} index={index} />
            ))}
          </View>
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f8fafc' 
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    overflow: 'hidden',
  },
  headerGradient: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerIcon: {
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    color: 'white',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: 'rgba(255,255,255,0.95)',
    paddingHorizontal: 16,
    lineHeight: 22,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: HEADER_MAX_HEIGHT + 10,
    paddingBottom: 40,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12,
    marginHorizontal: 16,
    marginBottom: 24,
  },
  quickAction: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  quickActionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    ...Platform.select({
      android: {
        elevation: 4,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
      }
    })
  },
  quickActionText: {
    color: 'white',
    fontWeight: '600',
    marginLeft: 8,
    fontSize: 14,
  },
  contactInfoSection: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoCard: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  infoCardGradient: {
    padding: 20,
    ...Platform.select({
      android: {
        elevation: 3,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
      }
    })
  },
  infoIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoContent: {
    // No specific styles needed
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 8,
  },
  infoDetails: {
    fontSize: 15,
    color: '#475569',
    lineHeight: 22,
    marginBottom: 12,
  },
  infoAction: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  infoActionText: {
    fontSize: 14,
    fontWeight: '600',
    marginRight: 6,
  },
  socialSection: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  socialContainer: {
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    ...Platform.select({
      android: {
        elevation: 3,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
      }
    })
  },
  socialTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 8,
  },
  socialSubtitle: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 20,
  },
  socialIcons: {
    flexDirection: 'row',
    gap: 20,
  },
  socialButton: {
    alignItems: 'center',
  },
  socialButtonGradient: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  socialName: {
    fontSize: 12,
    fontWeight: '600',
  },
  formContainer: {
    backgroundColor: 'white',
    padding: 24,
    margin: 16,
    borderRadius: 20,
    marginBottom: 24,
    ...Platform.select({
      android: {
        elevation: 4,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      }
    })
  },
  formTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
    color: '#1e293b',
    textAlign: 'center',
  },
  formSubtitle: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    backgroundColor: '#f8fafc',
    paddingHorizontal: 16,
    minHeight: 50,
  },
  messageContainer: {
    alignItems: 'flex-start',
    paddingVertical: 16,
    minHeight: 120,
  },
  inputIcon: {
    marginRight: 12,
  },
  messageIcon: {
    marginTop: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1e293b',
    paddingVertical: 0,
  },
  messageInput: {
    textAlignVertical: 'top',
    minHeight: 80,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    borderRadius: 6,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  checked: {
    backgroundColor: '#0ea5e9',
    borderColor: '#0ea5e9',
  },
  checkboxLabel: {
    fontSize: 15,
    color: '#475569',
    flex: 1,
    lineHeight: 22,
  },
  submitButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  submitGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
    marginRight: 8,
  },
  faqSection: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  faqTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 20,
    textAlign: 'center',
  },
  faqContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
    ...Platform.select({
      android: {
        elevation: 3,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
      }
    })
  },
  faqItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  faqQuestion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  faqQuestionText: {
    fontSize: 16,
    color: '#1e293b',
    flex: 1,
    fontWeight: '600',
  },
  faqAnswer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    overflow: 'hidden',
  },
  faqAnswerText: {
    fontSize: 15,
    color: '#475569',
    lineHeight: 24,
  },
  bottomSpacing: {
    height: 40,
  },
});

export default ContactScreen;