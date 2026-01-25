import React, { useState } from 'react';

import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useRouter } from 'expo-router';

import { MaterialIcons } from '@expo/vector-icons';

import Button from '@/src/components/Button';
import FilterChips from '@/src/components/FilterChips';
import SearchBar from '@/src/components/SearchBar';
import { COLORS } from '@/src/constants/colors';
import { useRentalStore } from '@/src/store/rental.store';

import { RENTAL_MACHINES } from './data';

// const { width } = Dimensions.get('window');

const CATEGORIES = [
  { id: 'all', label: 'All', icon: 'grid-view' },
  { id: 'tractor', label: 'Tractors', icon: 'agriculture' },
  { id: 'harvester', label: 'Harvesters', icon: 'local-shipping' },
  { id: 'implement', label: 'Implements', icon: 'handyman' },
];

export default function RentInBrowseScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { rentals: globalRentals } = useRentalStore();

  // Merge mock data with dynamic global rentals
  const allRentals: any[] = [
    ...RENTAL_MACHINES,
    ...globalRentals
      .filter((r) => r.visible && !r.expired)
      .map((r) => ({
        id: r.id,
        name: r.name,
        type: r.type,
        owner: r.ownerName,
        location: r.location,
        distance: r.distance,
        rating: r.rating,
        pricePerHour:
          r.period === 'hr' ? r.price : (Number(r.price) / 8).toFixed(0),
        pricePerDay:
          r.period === 'day' ? r.price : (Number(r.price) * 8).toFixed(0),
        availability: r.expiry,
        minDuration: 'Min. 4 Hours',
        image: r.image,
        category: r.category,
        addons: ['Verified Machine'],
        operator: true,
      })),
  ];

  const filteredMachines = allRentals.filter((machine) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      machine.category.toLowerCase() === selectedCategory;
    const matchesSearch = machine.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerTitle}>Browse Rental Machines</Text>
            <View style={styles.locationRow}>
              <MaterialIcons
                name="location-on"
                size={14}
                color={COLORS.textSecondary}
              />
              <Text style={styles.locationText}>Near Rampur Village</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.notifBtn}>
            <MaterialIcons
              name="notifications-none"
              size={24}
              color={COLORS.text}
            />
            <View style={styles.notifDot} />
          </TouchableOpacity>
        </View>

        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search tractors for rent..."
          showFilterButton
          onFilterPress={() => router.push('/(farmer)/rent-in/filters')}
        />

        <View style={{ marginTop: 12 }}>
          <FilterChips
            filters={CATEGORIES as any}
            activeFilter={selectedCategory}
            onFilterChange={setSelectedCategory}
            showIcons
          />
        </View>
      </View>

      {/* Main Content */}
      <ScrollView
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.sortRow}>
          <Text style={styles.sortText}>
            Sorted by:{' '}
            <Text style={styles.sortBold}>Distance & Availability</Text>
          </Text>
          <Text style={styles.sortText}>
            {filteredMachines.length} Machines
          </Text>
        </View>

        {filteredMachines.map((machine) => (
          <TouchableOpacity
            key={machine.id}
            style={styles.card}
            activeOpacity={0.9}
            onPress={() =>
              router.push({
                pathname: '/(farmer)/rent-in/request',
                params: { id: machine.id },
              })
            }
          >
            {/* Image Section */}
            <View style={styles.cardImageContainer}>
              <Image source={{ uri: machine.image }} style={styles.cardImage} />
              <View style={styles.badgeLabel}>
                <Text style={styles.badgeText}>{machine.type}</Text>
              </View>
              <TouchableOpacity style={styles.favBtn}>
                <MaterialIcons
                  name="favorite-border"
                  size={20}
                  color={COLORS.white}
                />
              </TouchableOpacity>
              <View style={styles.distanceBadge}>
                <MaterialIcons
                  name="near-me"
                  size={16}
                  color={COLORS.brand.primary}
                />
                <Text style={styles.distanceText}>{machine.distance}</Text>
              </View>
            </View>

            {/* Content Section */}
            <View style={styles.cardContent}>
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.machineName}>{machine.name}</Text>
                  <View style={styles.ownerRow}>
                    <MaterialIcons
                      name="person"
                      size={14}
                      color={COLORS.textSecondary}
                    />
                    <Text style={styles.ownerText}>
                      {machine.owner} • {machine.location}
                    </Text>
                  </View>
                </View>
                <View style={styles.ratingBadge}>
                  <MaterialIcons
                    name="star"
                    size={16}
                    color={COLORS.warningDark}
                  />
                  <Text style={styles.ratingText}>{machine.rating}</Text>
                </View>
              </View>

              <View style={styles.metaRow}>
                <View style={styles.metaBadgeGreen}>
                  <MaterialIcons
                    name="calendar-today"
                    size={16}
                    color={COLORS.successDark}
                  />
                  <Text style={styles.metaTextGreen}>
                    {machine.availability}
                  </Text>
                </View>
                <View style={styles.metaBadgeGray}>
                  <MaterialIcons
                    name="hourglass-bottom"
                    size={16}
                    color={COLORS.textSecondary}
                  />
                  <Text style={styles.metaTextGray}>{machine.minDuration}</Text>
                </View>
              </View>

              <View style={styles.footerRow}>
                <View>
                  <View style={styles.priceRow}>
                    <Text style={styles.priceMain}>
                      ${machine.pricePerHour}
                    </Text>
                    <Text style={styles.priceSub}>/ hour</Text>
                  </View>
                  {machine.pricePerDay && (
                    <Text style={styles.priceAlt}>
                      or ${machine.pricePerDay} / day
                    </Text>
                  )}
                  {machine.addons.length > 0 && (
                    <Text style={styles.priceAlt}>{machine.addons[0]}</Text>
                  )}
                </View>
                <Button
                  label="Book"
                  onPress={() => {}}
                  icon="call"
                  style={{ height: 44, paddingHorizontal: 24 }}
                />
              </View>
            </View>
          </TouchableOpacity>
        ))}

        <View style={{ height: 80 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.background,
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 40,
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.text,
    letterSpacing: -0.5,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  locationText: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.textSecondary,
  },
  notifBtn: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'transparent',
  },
  notifDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.brand.primary,
    borderWidth: 2,
    borderColor: COLORS.background,
  },

  // Categories
  categoriesContainer: {
    backgroundColor: COLORS.background,
    paddingVertical: 12,
    zIndex: 10,
  },
  categoriesContent: {
    paddingHorizontal: 16,
    gap: 12,
  },

  // List
  listContent: {
    paddingHorizontal: 16,
    gap: 20,
  },
  sortRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 4,
  },
  sortText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  sortBold: {
    color: COLORS.text,
    fontWeight: '700',
  },

  // Card
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.gray[100],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  cardImageContainer: {
    height: 200,
    backgroundColor: COLORS.gray[200],
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  badgeLabel: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(255,255,255,0.95)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
    color: COLORS.text,
  },
  favBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    padding: 8,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
  },
  distanceBadge: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  distanceText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '700',
  },

  // Card Content
  cardContent: {
    padding: 20,
    gap: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  machineName: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.text,
    letterSpacing: -0.5,
  },
  ownerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  ownerText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.warningLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.warningDark,
  },

  metaRow: {
    flexDirection: 'row',
    gap: 12,
  },
  metaBadgeGreen: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.successLight,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  metaTextGreen: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.successDark,
  },
  metaBadgeGray: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.gray[50],
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  metaTextGray: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textSecondary,
  },

  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray[100],
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  priceMain: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.brand.primary,
    letterSpacing: -1,
  },
  priceSub: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  priceAlt: {
    fontSize: 11,
    color: COLORS.textLight,
    fontWeight: '500',
    marginTop: 2,
  },
});
