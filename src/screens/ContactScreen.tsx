import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';

const iconMap: Record<string, any> = {
  whatsapp: require("../assets/icons/whatsapp.png"),
  digital: require("../assets/icons/digital.png"),
  helpline: require("../assets/icons/helpline.png"),
  phygital: require("../assets/icons/phygital.png"),
  government: require("../assets/icons/government.png"),
};

const socials: (keyof typeof iconMap)[] = [
  "whatsapp",
  "digital",
  "helpline",
  "phygital",
  "government",
];

const ContactScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = () => {
    // Handle form submission
    console.log({ name, email, subject, message, subscribed });
    // Reset form
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    setSubscribed(false);
    alert('Thank you for your message! We will get back to you soon.');
  };

  const faqs = [
    'What is The Ability Network?',
    'How do I search for solution providers?',
    'How can I become a solution provider on the platform?',
    'Is the information about solution providers verified?',
    'How can I provide feedback about a solution provider?',
    'Is the platform free to use?',
    'How do I report issues with the website?'
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Get in touch</Text>
      <Text style={styles.subtitle}>Have questions or want to learn more about our initiatives? We're here to help.</Text>
      
      <TouchableOpacity style={styles.faqButton}>
        <Text style={styles.faqButtonText}>View FAQs</Text>
      </TouchableOpacity>
      
      <View style={styles.contactInfo}>
        <Text style={styles.sectionTitle}>Contact Information</Text>
        
        <View style={styles.infoItem}>
          <Image 
            source={require('../assets/icons/location.png')} 
            style={styles.infoIcon}
          />
          <Text style={styles.infoText}>
            Harijan Sevak Sangh, Gandhi Ashram, Kingsway Camp, Delhi 110009, India
          </Text>
        </View>
        
        <View style={styles.infoItem}>
          <Image 
            source={require('../assets/icons/email.png')} 
            style={styles.infoIcon}
          />
          <Text style={styles.infoText}>tan@techmahindrafoundation.org</Text>
        </View>
        
        <View style={styles.infoItem}>
          <Image 
            source={require('../assets/icons/clock.png')} 
            style={styles.infoIcon}
          />
          <Text style={styles.infoText}>
            Monday-Friday: 9AM - 5PM{"\n"}
            Saturday - Sunday: Closed
          </Text>
        </View>
      </View>
      
      <View style={styles.socialContainer}>
        <Text style={styles.socialTitle}>Follow Us</Text>
        <View style={styles.socialIcons}>
          {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
            <TouchableOpacity key={social} style={styles.socialButton}>
              <Image 
                source={iconMap[social]}
                style={styles.socialIcon}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Send Us a Message</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Your Name"
          value={name}
          onChangeText={setName}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Subject"
          value={subject}
          onChangeText={setSubject}
        />
        
        <TextInput
          style={[styles.input, styles.messageInput]}
          placeholder="Please describe how we can help you"
          multiline
          numberOfLines={4}
          value={message}
          onChangeText={setMessage}
        />
        
        <View style={styles.checkboxContainer}>
          <TouchableOpacity 
            style={[styles.checkbox, subscribed && styles.checked]} 
            onPress={() => setSubscribed(!subscribed)}
          >
            {subscribed && <Text style={styles.checkmark}>✓</Text>}
          </TouchableOpacity>
          <Text style={styles.checkboxLabel}>Keep me updated on news and upcoming events</Text>
        </View>
        
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Send Message</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.faqContainer}>
        <Text style={styles.faqTitle}>Frequently Asked Questions</Text>
        {faqs.map((faq, index) => (
          <TouchableOpacity key={index} style={styles.faqItem}>
            <Text style={styles.faqQuestion}>{faq}</Text>
            <Image 
              source={require('../assets/icons/chevron-down.png')} 
              style={styles.chevronIcon}
            />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    color: '#333'
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
    color: '#6c757d',
    paddingHorizontal: 25
  },
  faqButton: {
    alignSelf: 'center',
    marginBottom: 30
  },
  faqButtonText: {
    color: '#663399',
    fontWeight: '600',
    fontSize: 16,
    textDecorationLine: 'underline'
  },
  contactInfo: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 15,
    borderRadius: 12,
    elevation: 2
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333'
  },
  infoItem: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'flex-start'
  },
  infoIcon: {
    width: 24,
    height: 24,
    marginRight: 15,
    tintColor: '#663399'
  },
  infoText: {
    flex: 1,
    fontSize: 16,
    color: '#495057',
    lineHeight: 24
  },
  socialContainer: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 15,
    borderRadius: 12,
    elevation: 2
  },
  socialTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333'
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  socialButton: {
    padding: 10
  },
  socialIcon: {
    width: 32,
    height: 32
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 15,
    borderRadius: 12,
    elevation: 2
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16
  },
  messageInput: {
    height: 120,
    textAlignVertical: 'top'
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 4,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  checked: {
    backgroundColor: '#663399',
    borderColor: '#663399'
  },
  checkmark: {
    color: '#fff',
    fontWeight: 'bold'
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#495057',
    flex: 1
  },
  submitButton: {
    backgroundColor: '#663399',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center'
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16
  },
  faqContainer: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 15,
    borderRadius: 12,
    elevation: 2
  },
  faqTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333'
  },
  faqItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  faqQuestion: {
    fontSize: 16,
    color: '#495057',
    flex: 1
  },
  chevronIcon: {
    width: 20,
    height: 20,
    tintColor: '#6c757d'
  }
});

export default ContactScreen;

function alert(arg0: string) {
  throw new Error('Function not implemented.');
}
