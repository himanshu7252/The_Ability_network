import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';

const DrawerContent = (props: any) => {
  const { navigation } = props;
  const menuItems = [
    { name: 'Home', screen: 'Home', icon: 'home' },
    { name: 'Search', screen: 'SolutionProviders', icon: 'search' },
    { name: 'Events', screen: 'Events', icon: 'event' },
    { name: 'Blogs', screen: 'Blogs', icon: 'article' },
    { name: 'Contact', screen: 'Contact', icon: 'contact-mail' },
  ];

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>The Ability Network</Text>
        <Text style={styles.subtitle}>Discover - Connect - Dignify</Text>
      </View>
      
      <View style={styles.menuContainer}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.screen}
            style={styles.menuItem}
            onPress={() => navigation.navigate(item.screen)}
          >
            <Icon name={item.icon} size={24} color="#0066b3" style={styles.menuIcon} />
            <Text style={styles.menuText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2025 The Ability Network</Text>
        <Text style={styles.footerText}>Powered by Tech Mahindra Foundation</Text>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    padding: 20,
    backgroundColor: '#0066b3',
    borderRadius: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  menuContainer: {
    flex: 1,
    paddingTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuIcon: {
    marginRight: 15,
    width: 30,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  footerText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginBottom: 5,
  },
});

export default DrawerContent;