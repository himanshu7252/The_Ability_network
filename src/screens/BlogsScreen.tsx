import React from 'react';
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const BlogsScreen = () => {
  const blogs = [
    {
      id: 1,
      title: 'From Silos to Solutions: Building India\'s Disability Ecosystem',
      date: 'June 27, 2025',
      excerpt: 'Sometimes the most profound realizations come not from grand newsletters, but from moments of honest reflection. For me, such a moment came when I realized how fragmented India\'s disability support ecosystem was...',
      image: require('../assets/images/blog1.jpg')
    },
    {
      id: 2,
      title: 'Breaking Barriers: Digital Accessibility in India',
      date: 'May 15, 2025',
      excerpt: 'Digital accessibility isn\'t just a nice-to-have feature—it\'s a fundamental right. In this post, we explore how technology can bridge gaps and create inclusive experiences for PwDs...',
      image: require('../assets/images/blog2.jpg')
    },
    {
      id: 3,
      title: 'Empowering Caregivers: The Unsung Heroes',
      date: 'April 3, 2025',
      excerpt: 'Caregivers play a crucial role in the lives of persons with disabilities, yet their needs are often overlooked. This article discusses support systems and resources available for caregivers...',
      image: require('../assets/images/blog3.jpg')
    }
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>Our Blogs</Text>
      <Text style={styles.subTitle}>Discover insights, stories, and updates from the community on accessibility, inclusion, and innovation.</Text>
      
      {blogs.map((blog) => (
        <View key={blog.id} style={styles.blogCard}>
          <Image source={blog.image} style={styles.blogImage} />
          <View style={styles.blogContent}>
            <Text style={styles.blogTitle}>{blog.title}</Text>
            <Text style={styles.blogDate}>{blog.date}</Text>
            <Text style={styles.blogExcerpt}>{blog.excerpt}</Text>
            <TouchableOpacity style={styles.readMoreButton}>
              <Text style={styles.readMoreText}>Read More</Text>
              <Image 
                source={require('../assets/icons/arrow-right.png')} 
                style={styles.arrowIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    color: '#333'
  },
  subTitle: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
    color: '#6c757d',
    paddingHorizontal: 25,
    marginBottom: 30
  },
  blogCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden'
  },
  blogImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover'
  },
  blogContent: {
    padding: 20
  },
  blogTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333'
  },
  blogDate: {
    fontSize: 14,
    color: '#d81b60',
    marginBottom: 12
  },
  blogExcerpt: {
    fontSize: 15,
    lineHeight: 24,
    color: '#495057',
    marginBottom: 15
  },
  readMoreButton: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  readMoreText: {
    color: '#663399',
    fontWeight: '600'
  },
  arrowIcon: {
    width: 16,
    height: 16,
    marginLeft: 5,
    tintColor: '#663399'
  }
});

export default BlogsScreen;