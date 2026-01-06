import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  Platform,
  StatusBar as RNStatusBar,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { navigate } from 'expo-router/build/global-state/routing';

// --- Theme Constants (Matching Tailwind Config) ---
const COLORS = {
  primary: '#37ec13',
  backgroundLight: '#f6f8f6',
  surfaceLight: '#ffffff',
  textDark: '#0f172a', // slate-900
  textGray: '#64748b', // slate-500
  border: '#e2e8f0',   // gray-200
  amber: '#f59e0b',
  amberBg: '#fffbeb',  // amber-50
  greenText: '#15803d', // green-700
  greenBg: '#dcfce7',   // green-100
  redText: '#ef4444',
  danger: '#ef4444',
};

// --- Mock Data ---
const CATEGORIES = [
  { id: 'all', label: 'All', icon: 'grid-view' },
  { id: 'tractor', label: 'Tractors', icon: 'agriculture' },
  { id: 'harvester', label: 'Harvesters', icon: 'local-shipping' },
  { id: 'implement', label: 'Implements', icon: 'handyman' },
];

const MACHINES = [
  {
    id: '1',
    type: 'Tractor',
    title: 'John Deere 5050D',
    postedTime: 'Posted 2 hours ago',
    rating: 4.8,
    distance: '2.5 km',
    image: 'https://images.unsplash.com/photo-1595246140625-573b715e11d3?q=80&w=600&auto=format&fit=crop', // Real tractor image
    condition: 'Good Condition',
    hours: '2,400 hrs',
    price: '$12,000',
    negotiable: true,
    expiry: 'Exp: 2 days left',
    expiryColor: COLORS.redText,
  },
  {
    id: '2',
    type: 'Harvester',
    title: 'Kubota DC-70G',
    postedTime: 'Posted yesterday',
    rating: 4.5,
    distance: '12 km',
    image: 'https://images.unsplash.com/photo-1530267981375-f0de93bf3e94?q=80&w=600&auto=format&fit=crop', // Real harvester image
    condition: 'Excellent',
    hours: '1,200 hrs',
    price: '$25,500',
    negotiable: false,
    expiry: 'Exp: 5 days left',
    expiryColor: COLORS.textGray,
  },
  {
    id: '3',
    type: 'Implement',
    title: 'Mahindra Rotavator',
    postedTime: 'Posted 3 days ago',
    rating: 5.0,
    distance: '8 km',
    image: 'https://images.unsplash.com/photo-1563205764-59e2b9631b7e?q=80&w=600&auto=format&fit=crop', // Real implement image
    condition: 'Like New',
    hours: 'Used Once',
    price: '$3,200',
    negotiable: true,
    expiry: 'Exp: 1 week left',
    expiryColor: '#f97316', // orange
  },
];

// --- Components ---

const Header = () => (
  <View style={styles.headerContainer}>
    <View style={styles.headerTop}>
      <View>
        <Text style={styles.headerTitle}>Browse Machines</Text>
        <View style={styles.locationContainer}>
          <MaterialIcons name="location-on" size={14} color={COLORS.textGray} />
          <Text style={styles.locationText}>Near Rampur Village</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.notificationBtn}>
        <MaterialIcons name="notifications" size={24} color={COLORS.textDark} />
        <View style={styles.notificationBadge} />
      </TouchableOpacity>
    </View>

    <View style={styles.searchRow}>
      <View style={styles.searchBarContainer}>
        <MaterialIcons name="search" size={20} color={COLORS.textGray} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search tractors, harvesters..."
          placeholderTextColor={COLORS.textGray}
        />
      </View>
      <TouchableOpacity style={styles.filterBtn} onPress={() => navigate("/buy-machine/filters")}>
        <MaterialIcons name="tune" size={24} color={COLORS.textDark} />
      </TouchableOpacity>
    </View>
  </View>
);

const FilterTabs = ({ activeTab, setActiveTab }) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.filterScrollContent}
    style={styles.filterScrollContainer}
  >
    {CATEGORIES.map((cat) => {
      const isActive = activeTab === cat.id;
      return (
        <TouchableOpacity
          key={cat.id}
          onPress={() => setActiveTab(cat.id)}
          style={[
            styles.filterChip,
            isActive ? styles.filterChipActive : styles.filterChipInactive,
          ]}
        >
          <MaterialIcons
            name={cat.icon}
            size={20}
            color={isActive ? '#000' : COLORS.textGray}
          />
          <Text
            style={[
              styles.filterChipText,
              isActive ? styles.filterChipTextActive : styles.filterChipTextInactive,
            ]}
          >
            {cat.label}
          </Text>
        </TouchableOpacity>
      );
    })}
  </ScrollView>
);

const MachineCard = ({ item }) => (
  <View style={styles.card} onTouchEnd={() => navigate(`/buy-machine/details`)}>
    {/* Image Section */}
    <View style={styles.imageContainer}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      
      {/* Overlay: Type Badge */}
      <View style={styles.typeBadge}>
        <Text style={styles.typeBadgeText}>{item.type}</Text>
      </View>
      
      {/* Overlay: Heart Icon */}
      <TouchableOpacity style={styles.heartBtn}>
        <MaterialIcons name="favorite" size={20} color="#fff" />
      </TouchableOpacity>

      {/* Overlay: Distance
      <BlurView intensity={30} tint="dark" style={styles.distanceBadge}>
        <MaterialIcons name="near-me" size={16} color={COLORS.primary} />
        <Text style={styles.distanceText}>{item.distance}</Text>
      </BlurView> */}
    </View>

    {/* Content Section */}
    <View style={styles.cardContent}>
      <View style={styles.cardHeaderRow}>
        <View>
          <Text style={styles.machineTitle}>{item.title}</Text>
          <Text style={styles.postedTime}>{item.postedTime}</Text>
        </View>
        <View style={styles.ratingContainer}>
          <MaterialIcons name="star" size={16} color={COLORS.amber} />
          <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
        </View>
      </View>

      {/* Specs Grid */}
      <View style={styles.specsGrid}>
        <View style={styles.specItem}>
          <MaterialIcons name="check-circle" size={16} color={COLORS.textGray} />
          <Text style={styles.specText}>{item.condition}</Text>
        </View>
        <View style={styles.specItem}>
          <MaterialIcons name="schedule" size={16} color={COLORS.textGray} />
          <Text style={styles.specText}>{item.hours}</Text>
        </View>
      </View>

      {/* Price & Action */}
      <View style={styles.footerRow}>
        <View>
          <View style={styles.priceRow}>
            <Text style={styles.priceText}>{item.price}</Text>
            {item.negotiable && (
              <View style={styles.negotiableBadge}>
                <Text style={styles.negotiableText}>NEGOTIABLE</Text>
              </View>
            )}
          </View>
          <View style={styles.expiryRow}>
            <MaterialIcons name="timer" size={12} color={item.expiryColor} />
            <Text style={[styles.expiryText, { color: item.expiryColor }]}>
              {item.expiry}
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.contactBtn}>
        <MaterialIcons name="call" size={18} color="#000" />
        <Text style={styles.contactBtnText}>Contact Seller</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const BottomNav = () => {
  const insets = useSafeAreaInsets();
  
  return (
    <View style={[styles.bottomNavContainer, { paddingBottom: Math.max(insets.bottom, 10) }]}>
      <View style={styles.bottomNavContent}>
        <NavIcon icon="home" label="Home" />
        
        {/* Active Item */}
        <View style={styles.navItemActive}>
          <View style={styles.navIndicator} />
          <MaterialIcons name="search" size={24} color={COLORS.greenText} />
          <Text style={styles.navLabelActive}>Browse</Text>
        </View>

        <NavIcon icon="add-circle" label="Sell" />
        <NavIcon icon="chat" label="Chat" />
        <NavIcon icon="person" label="Profile" />
      </View>
    </View>
  );
};

const NavIcon = ({ icon, label }) => (
  <TouchableOpacity style={styles.navItem}>
    <MaterialIcons name={icon} size={24} color={COLORS.textGray} />
    <Text style={styles.navLabel}>{label}</Text>
  </TouchableOpacity>
);

// --- Main Screen ---
export default function BrowseMachinesScreen() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('all');

  return (
    <SafeAreaProvider>
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <StatusBar style="dark" backgroundColor={COLORS.backgroundLight} />
        
        {/* Sticky Header */}
        <View style={styles.stickyHeader}>
            <Header />
            <FilterTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </View>

        {/* Main Content */}
        <FlatList
          data={MACHINES}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <MachineCard item={item} />}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={
            <View style={styles.listHeader}>
                <Text style={styles.sortText}>
                    Sorted by: <Text style={styles.sortTextBold}>Distance & Latest</Text>
                </Text>
                <Text style={styles.sortText}>45 Results</Text>
            </View>
          }
          ListFooterComponent={
            // Pulse Skeleton Effect (Simplified)
            <View style={styles.skeletonCard}>
               <View style={styles.skeletonImage} />
               <View style={styles.skeletonContent}>
                   <View style={styles.skeletonRow} />
                   <View style={styles.skeletonGrid} />
                   <View style={styles.skeletonBar} />
                   <View style={styles.skeletonBtn} />
               </View>
            </View>
          }
        />

        <BottomNav />
      </View>
    </SafeAreaProvider>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
  },
  stickyHeader: {
    backgroundColor: 'rgba(246, 248, 246, 0.95)', // background-light/95
    zIndex: 50,
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
  },
  // Header
  headerContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textDark,
    letterSpacing: -0.5,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 4,
  },
  locationText: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.textGray,
  },
  notificationBtn: {
    padding: 8,
    borderRadius: 99,
    backgroundColor: 'transparent', // Hover effect hard to replicate exactly without Pressable state
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#fff',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  searchBarContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceLight,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textDark,
    height: '100%',
  },
  filterBtn: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceLight,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    elevation: 1,
  },
  // Filter Tabs
  filterScrollContainer: {
    marginBottom: 0,
  },
  filterScrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 99,
    borderWidth: 1,
    height: 40,
  },
  filterChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  filterChipInactive: {
    backgroundColor: COLORS.surfaceLight,
    borderColor: '#f1f5f9', // gray-100
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: '600',
  },
  filterChipTextActive: {
    color: '#000',
  },
  filterChipTextInactive: {
    color: '#475569', // slate-600
  },
  // List
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 100, // Space for bottom nav
    gap: 20,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  sortText: {
    fontSize: 12,
    color: COLORS.textGray,
  },
  sortTextBold: {
    fontWeight: '700',
    color: COLORS.textDark,
  },
  // Card
  card: {
    backgroundColor: COLORS.surfaceLight,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  imageContainer: {
    height: 208, // h-52
    width: '100%',
    backgroundColor: '#e5e7eb', // gray-200
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  typeBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    zIndex: 10,
  },
  typeBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#1e293b', // slate-800
    letterSpacing: 0.5,
  },
  heartBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    padding: 8,
    borderRadius: 99,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    zIndex: 10,
  },
  distanceBadge: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    overflow: 'hidden',
  },
  distanceText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  cardContent: {
    padding: 16,
    gap: 12,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  machineTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textDark,
    lineHeight: 24,
  },
  postedTime: {
    fontSize: 12,
    color: COLORS.textGray,
    marginTop: 2,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.amberBg,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#fef3c7', // amber-100
  },
  ratingText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#b45309', // amber-700
  },
  specsGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  specItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#f8fafc', // gray-50
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
  },
  specText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#334155', // slate-700
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  priceText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textDark,
  },
  negotiableBadge: {
    backgroundColor: COLORS.greenBg,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  negotiableText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.greenText,
    textTransform: 'uppercase',
  },
  expiryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  expiryText: {
    fontSize: 10,
    fontWeight: '500',
  },
  contactBtn: {
    width: '100%',
    paddingVertical: 12,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 4,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  contactBtnText: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
  },
  // Skeleton
  skeletonCard: {
    height: 400,
    backgroundColor: COLORS.surfaceLight,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
    opacity: 0.8,
  },
  skeletonImage: {
    height: 208,
    backgroundColor: '#e2e8f0', // gray-200
  },
  skeletonContent: {
    padding: 16,
    gap: 12,
  },
  skeletonRow: {
    height: 20,
    width: '60%',
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
  },
  skeletonGrid: {
    flexDirection: 'row',
    gap: 8,
    height: 32,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    marginTop: 8,
  },
  skeletonBar: {
    height: 24,
    width: '40%',
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    marginTop: 4,
  },
  skeletonBtn: {
    height: 48,
    width: '100%',
    backgroundColor: '#e2e8f0',
    borderRadius: 12,
    marginTop: 8,
  },
  // Bottom Nav
  bottomNavContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 8,
  },
  bottomNavContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 60,
  },
  navItem: {
    alignItems: 'center',
    gap: 4,
    width: 60,
  },
  navItemActive: {
    alignItems: 'center',
    gap: 4,
    width: 60,
    position: 'relative',
  },
  navLabel: {
    fontSize: 10,
    fontWeight: '500',
    color: COLORS.textGray,
  },
  navLabelActive: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.greenText, // text-slate-900 logic from HTML, visually browses matches primary
  },
  navIndicator: {
    position: 'absolute',
    top: -12,
    width: 32,
    height: 4,
    backgroundColor: COLORS.primary,
    borderRadius: 99,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
});