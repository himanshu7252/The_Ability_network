import React, { useRef, useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  TouchableOpacity, 
  Linking, 
  Animated,
  Platform,
  StatusBar,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');
const HEADER_MAX_HEIGHT = 220;
const HEADER_MIN_HEIGHT = 80;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const BlogsScreen = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

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
  }, []);

  const blogs = [
    {
      id: 1,
      title: 'From Silos to Solutions: Building India\'s Disability Ecosystem',
      date: 'June 27, 2025',
      excerpt: 'Sometimes the most profound realizations come not from grand newsletters, but from moments of honest reflection. For me, such a moment came when I realized how fragmented India\'s disability support ecosystem was...',
      image: require('../assets/images/blog1.jpg'),
      link: 'https://www.linkedin.com/pulse/from-silos-solutions-building-indias-disability-support-chetan-kapoor-ivfgc/?trackingId=JFVb8lWSRA6AQNR0ap8EvQ%3D%3D',
      readTime: '5 min read',
      category: 'Ecosystem',
      author: 'Chetan Kapoor'
    },
    {
      id: 2,
      title: 'A Call to Rewrite the Narrative on Disability',
      date: 'May 15, 2025',
      excerpt: 'Chimamanda Ngozi Adichie warns us about the danger of a single story. How it creates stereotypes and "the problem with stereotypes is not that they are untrue, but..."',
      image: require('../assets/images/blog2.jpg'),
      link: 'https://www.linkedin.com/pulse/call-rewrite-narrative-disability-sajid-ali-eoehc/?trackingId=lKt%2BZWRkRY60nRhGf3Yzpg%3D%3D',
      readTime: '4 min read',
      category: 'Advocacy',
      author: 'Sajid Ali'
    },
  ];

  // Header height animation
  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0.5, 0],
    extrapolate: 'clamp',
  });

  const titleScale = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0.8],
    extrapolate: 'clamp',
  });

  const BlogCard = ({ blog, index }: { blog: any; index: number }) => {
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

    const getCategoryColor = (category: string) => {
      switch (category) {
        case 'Ecosystem': return '#0ea5e9';
        case 'Advocacy': return '#d946ef';
        case 'Technology': return '#10b981';
        default: return '#f59e0b';
      }
    };

    return (
      <Animated.View
        style={[
          styles.blogCard,
          {
            opacity: cardAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={styles.imageContainer}>
          <Image source={blog.image} style={styles.blogImage} />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            style={styles.imageOverlay}
          >
            <View style={styles.imageBadges}>
              <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(blog.category) }]}>
                <Text style={styles.categoryText}>{blog.category}</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        <View style={styles.blogContent}>
          <View style={styles.blogMeta}>
            <View style={styles.authorSection}>
              <View style={styles.authorAvatar}>
                <Icon name="person" size={16} color="#0ea5e9" />
              </View>
              <Text style={styles.authorName}>{blog.author}</Text>
            </View>
            
            <View style={styles.metaRight}>
              <View style={styles.dateContainer}>
                <Icon name="schedule" size={14} color="#64748b" />
                <Text style={styles.blogDate}>{blog.date}</Text>
              </View>
              <View style={styles.readTimeContainer}>
                <Icon name="auto-stories" size={14} color="#64748b" />
                <Text style={styles.readTime}>{blog.readTime}</Text>
              </View>
            </View>
          </View>

          <Text style={styles.blogTitle}>{blog.title}</Text>
          <Text style={styles.blogExcerpt}>{blog.excerpt}</Text>

          <TouchableOpacity 
            style={styles.readMoreButton} 
            onPress={() => Linking.openURL(blog.link)}
          >
            <LinearGradient
              colors={['#0ea5e9', '#0284c7']}
              style={styles.readMoreGradient}
            >
              <Text style={styles.readMoreText}>Read Full Article</Text>
              <Icon name="arrow-forward" size={16} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animated.View>
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
            <Icon name="article" size={32} color="white" style={styles.headerIcon} />
            <Text style={styles.headerTitle}>Our Blogs</Text>
            <Text style={styles.subTitle}>
              Discover insights, stories, and updates from the community on accessibility, inclusion, and innovation.
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
      >
        {/* Featured Section */}
        <Animated.View 
          style={[
            styles.featuredSection,
            { opacity: fadeAnim }
          ]}
        >
          <LinearGradient
            colors={['#d946ef', '#c026d3']}
            style={styles.featuredBanner}
          >
            <Icon name="star" size={24} color="white" style={styles.featuredIcon} />
            <Text style={styles.featuredTitle}>Featured Articles</Text>
            <Text style={styles.featuredText}>
              Explore our latest insights on building inclusive communities and empowering persons with disabilities.
            </Text>
          </LinearGradient>
        </Animated.View>

        {/* Blog Cards */}
        <View style={styles.blogsSection}>
          {blogs.map((blog, index) => (
            <BlogCard key={blog.id} blog={blog} index={index} />
          ))}
        </View>

        {/* Subscribe Section */}
        <Animated.View 
          style={[
            styles.subscribeSection,
            { opacity: fadeAnim }
          ]}
        >
          <LinearGradient
            colors={['#f0f9ff', '#e0f2fe']}
            style={styles.subscribeContainer}
          >
            <View style={styles.subscribeIconContainer}>
              <Icon name="notifications-active" size={28} color="#0ea5e9" />
            </View>
            <Text style={styles.subscribeTitle}>Stay Updated</Text>
            <Text style={styles.subscribeText}>
              Get the latest articles and insights delivered to your inbox. Join our community of changemakers.
            </Text>
            <TouchableOpacity style={styles.subscribeButton}>
              <LinearGradient
                colors={['#0ea5e9', '#0284c7']}
                style={styles.subscribeGradient}
              >
                <Text style={styles.subscribeButtonText}>Subscribe to Newsletter</Text>
                <Icon name="email" size={16} color="white" />
              </LinearGradient>
            </TouchableOpacity>
          </LinearGradient>
        </Animated.View>

        {/* Categories Section */}
        <Animated.View 
          style={[
            styles.categoriesSection,
            { opacity: fadeAnim }
          ]}
        >
          <Text style={styles.categoriesTitle}>Explore More Topics</Text>
          <View style={styles.categoriesGrid}>
            {[
              { name: 'Accessibility', icon: 'accessibility', color: '#0ea5e9' },
              { name: 'Innovation', icon: 'lightbulb', color: '#f59e0b' },
              { name: 'Policy', icon: 'gavel', color: '#10b981' },
              { name: 'Community', icon: 'groups', color: '#d946ef' },
            ].map((category, index) => (
              <TouchableOpacity key={category.name} style={styles.categoryItem}>
                <LinearGradient
                  colors={[category.color + '20', category.color + '10']}
                  style={styles.categoryGradient}
                >
                  <Icon name={category.icon} size={24} color={category.color} />
                  <Text style={[styles.categoryItemText, { color: category.color }]}>
                    {category.name}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

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
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    color: 'white',
    marginBottom: 8,
  },
  subTitle: {
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
  featuredSection: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  featuredBanner: {
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    ...Platform.select({
      android: {
        elevation: 6,
      },
      ios: {
        shadowColor: '#d946ef',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
      }
    })
  },
  featuredIcon: {
    marginBottom: 12,
  },
  featuredTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
    marginBottom: 8,
  },
  featuredText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.95)',
    textAlign: 'center',
    lineHeight: 20,
  },
  blogsSection: {
    paddingHorizontal: 16,
  },
  blogCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    marginBottom: 24,
    overflow: 'hidden',
    ...Platform.select({
      android: {
        elevation: 8,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      }
    })
  },
  imageContainer: {
    position: 'relative',
    height: 200,
  },
  blogImage: {
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
  },
  categoryBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  categoryText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  blogContent: {
    padding: 20,
  },
  blogMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    alignItems: 'center',
  },
  authorSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#e0f2fe',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  authorName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0ea5e9',
  },
  metaRight: {
    alignItems: 'flex-end',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  blogDate: {
    fontSize: 12,
    color: '#64748b',
    marginLeft: 4,
  },
  readTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  readTime: {
    fontSize: 12,
    color: '#64748b',
    marginLeft: 4,
  },
  blogTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
    color: '#1e293b',
    lineHeight: 26,
  },
  blogExcerpt: {
    fontSize: 15,
    lineHeight: 24,
    color: '#475569',
    marginBottom: 20,
  },
  readMoreButton: {
    borderRadius: 12,
    overflow: 'hidden',
    alignSelf: 'flex-start',
  },
  readMoreGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  readMoreText: {
    color: 'white',
    fontWeight: '600',
    marginRight: 8,
    fontSize: 14,
  },
  subscribeSection: {
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 24,
  },
  subscribeContainer: {
    borderRadius: 20,
    padding: 24,
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
  subscribeIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  subscribeTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
    color: '#0369a1',
    textAlign: 'center',
  },
  subscribeText: {
    fontSize: 14,
    color: '#0284c7',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
    paddingHorizontal: 16,
  },
  subscribeButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  subscribeGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  subscribeButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
    marginRight: 8,
  },
  categoriesSection: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  categoriesTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 16,
    textAlign: 'center',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryItem: {
    width: (width - 48) / 2,
    marginBottom: 12,
    borderRadius: 16,
    overflow: 'hidden',
  },
  categoryGradient: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  categoryItemText: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
  },
  bottomSpacing: {
    height: 40,
  },
});

export default BlogsScreen;