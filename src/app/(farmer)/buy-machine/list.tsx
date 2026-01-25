import React, { useCallback, useMemo, useState } from 'react';

import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { router } from 'expo-router';

import { MaterialIcons } from '@expo/vector-icons';

import { useTranslation } from 'react-i18next';

import Button from '@/src/components/Button';
import EmptyState from '@/src/components/EmptyState';
import FilterChips, { FilterItem } from '@/src/components/FilterChips';
import SearchBar from '@/src/components/SearchBar';
import { FARM_MACHINES_DATA } from '@/src/data/machines.data';
import { useBuyMachineFiltersStore } from '@/src/store/buy-machine-filters.store';
import { useSellingStore } from '@/src/store/selling.store';
import { IMachine, IMachineCardProps } from '@/src/types/buy-machine/list';

import { COLORS } from '../../../constants/colors';

/* ---------------------------------------------------------------- */
/* MACHINE LIST DATA */
/* ---------------------------------------------------------------- */

/* ---------------------------------------------------------------- */
/* MAIN SCREEN */
/* ---------------------------------------------------------------- */

/* ---------------------------------------------------------------- */
/* HELPERS & CONSTANTS */
/* ---------------------------------------------------------------- */

const getCategoryIcon = (category: string): any => {
  switch (category.toLowerCase()) {
    case 'tractor':
      return 'agriculture';
    case 'harvester':
      return 'local-shipping';
    case 'tiller':
      return 'handyman';
    case 'seeder':
      return 'grass';
    case 'sprayer':
      return 'water-drop';
    case 'cutter':
      return 'content-cut';
    case 'thresher':
      return 'grain';
    case 'plough':
      return 'landscape';
    case 'irrigation':
      return 'water';
    case 'baler':
      return 'inventory-2';
    default:
      return 'grid-view';
  }
};

const getImageForCategory = (category: string) => {
  switch (category.toLowerCase()) {
    case 'tractor':
      return 'https://images.unsplash.com/photo-1595246140625-573b715e11d3?q=80&w=600';
    case 'harvester':
      return 'https://images.unsplash.com/photo-1530267981375-f0de93bf3e94?q=80&w=600';
    case 'sprayer':
      return 'https://5.imimg.com/data5/SELLER/Default/2022/11/YI/ZF/XP/4738536/tractor-mounted-boom-sprayer.jpg';
    case 'irrigation':
      return 'https://images.unsplash.com/photo-1563205764-59e2b9631b7e?q=80&w=600';
    default:
      return 'https://images.unsplash.com/photo-1625246333195-09d9d48b3275?q=80&w=600';
  }
};

export default function BrowseMachinesScreen() {
  const { t } = useTranslation();
  const filters = useBuyMachineFiltersStore();
  const [search, setSearch] = useState<string>('');
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id],
    );
  }, []);

  const CATEGORIES: FilterItem[] = [
    { id: 'all', label: t('machine_list.all'), icon: 'grid-view' },
    ...FARM_MACHINES_DATA.categories.map((cat) => ({
      id: cat.toLowerCase(),
      label: cat,
      icon: getCategoryIcon(cat),
    })),
  ];

  const Header = () => (
    <View>
      <View style={styles.headerTop}>
        <View>
          <Text style={styles.headerTitle}>{t('machine_list.title')}</Text>
          <View style={styles.locationContainer}>
            <MaterialIcons
              name="location-on"
              size={14}
              color={COLORS.brand.primary}
            />
            <Text style={styles.locationText}>
              {t('machine_list.nearby')} Rampur Village
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.notificationBtn}>
          <MaterialIcons
            name="notifications-none"
            size={24}
            color={COLORS.text}
          />
          <View style={styles.notificationBadge} />
        </TouchableOpacity>
      </View>

      <SearchBar
        value={search}
        onChangeText={setSearch}
        placeholder={t('machine_list.search_placeholder')}
        showFilterButton
        onFilterPress={() => router.push('/buy-machine/filters')}
      />
    </View>
  );

  const MachineCard = ({ item }: IMachineCardProps) => {
    const isFavorite = favorites.includes(item.id);

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push('/buy-machine/details')}
        activeOpacity={0.9}
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image }} style={styles.cardImage} />

          <View style={styles.typeBadge}>
            <Text style={styles.typeBadgeText}>
              {CATEGORIES.find((c) => c.id === item.type)?.label || item.type}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.heartBtn}
            onPress={() => toggleFavorite(item.id)}
          >
            <MaterialIcons
              name={isFavorite ? 'favorite' : 'favorite-border'}
              size={20}
              color={isFavorite ? COLORS.danger : COLORS.white}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.cardContent}>
          <View style={styles.titleRow}>
            <Text style={styles.machineTitle} numberOfLines={1}>
              {item.title}
            </Text>
            <View style={styles.conditionBadge}>
              <Text style={styles.conditionText}>{item.condition}</Text>
            </View>
          </View>

          <Text style={styles.postedTime}>{item.postedTime}</Text>

          <View style={styles.specsRow}>
            <View style={styles.specItem}>
              <MaterialIcons
                name="local-gas-station"
                size={14}
                color={COLORS.textSecondary}
              />
              <Text style={styles.specValueText}>{item.hours}</Text>
            </View>
            <View style={styles.specItem}>
              <MaterialIcons
                name="location-on"
                size={14}
                color={COLORS.textSecondary}
              />
              <Text style={styles.specValueText}>2.5 km</Text>
            </View>
          </View>

          <View style={styles.priceRow}>
            <View>
              <Text style={styles.priceText}>{item.price}</Text>
              {item.negotiable && (
                <Text style={styles.negotiableText}>
                  {t('common.negotiable')}
                </Text>
              )}
            </View>
            <Button
              label={t('common.contact_seller')}
              onPress={() => router.push('/buy-machine/details')}
              backgroundColor={COLORS.brand.primary}
              textColor={COLORS.black}
              style={styles.cardBtn}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const { machines: globalMachines } = useSellingStore();

  // Map static data to IMachine interface
  const staticMachines: IMachine[] = FARM_MACHINES_DATA.machines.map((m) => ({
    id: `static_${m.id}`,
    type: m.category.toLowerCase(),
    title: m.name,
    postedTime: 'Posted recently',
    image: getImageForCategory(m.category),
    condition: m.availability ? 'Available' : 'Sold Out',
    hours: m.power_hp
      ? `${m.power_hp} HP`
      : m.fuel !== 'Manual'
        ? m.fuel
        : 'Manual',
    price: `₹${m.price.toLocaleString()}`,
    rawPrice: m.price,
    negotiable: true,
  }));

  // Merge mock data with dynamic global listings
  const allMachines: IMachine[] = useMemo(
    () => [
      ...staticMachines,
      ...globalMachines
        .filter((m: any) => m.visible && !m.expired)
        .map((m: any) => ({
          id: m.id,
          type: m.category.toLowerCase(),
          title: `${m.brand} ${m.model}`,
          postedTime: 'New Listing',
          image:
            m.media[0]?.uri ||
            'https://images.unsplash.com/photo-1595246140625-573b715e11d3?q=80&w=600',
          condition: 'Good', // Mock default
          hours: m.year, // Use year as primary spec if hours not available
          price: `₹${Number(m.askingPrice).toLocaleString()}`,
          rawPrice: Number(m.askingPrice), // Add raw price for filtering
          negotiable: true,
        })),
    ],
    [staticMachines, globalMachines],
  );

  const filteredData = useMemo(() => {
    return allMachines.filter((item) => {
      // Category Filter
      const matchCategory =
        filters.category === 'all' ||
        item.type.toLowerCase() === filters.category.toLowerCase();

      // Search Filter
      const matchSearch = item.title
        .toLowerCase()
        .includes(search.toLowerCase());

      // Price Filter (Handle currency string parsing if needed, but mock data is tricky)
      // For now, simple cleaning of '$' and ','
      const priceVal =
        item.rawPrice || Number(item.price.replace(/[^0-9.-]+/g, ''));
      const matchPrice =
        priceVal >= Number(filters.minPrice) &&
        priceVal <= Number(filters.maxPrice);

      // Negotiable Filter
      const matchNegotiable = !filters.isNegotiable || item.negotiable === true;

      // Condition Filter
      // Allow loose matching for condition since data might say 'Available' or 'Good'
      const matchCondition = filters.condition === 'all' || true; // item.condition.toLowerCase().includes(filters.condition.toLowerCase());

      return (
        matchCategory &&
        matchSearch &&
        matchPrice &&
        matchNegotiable &&
        matchCondition
      );
    });
  }, [
    allMachines,
    filters.category,
    filters.minPrice,
    filters.maxPrice,
    filters.isNegotiable,
    filters.condition,
    search,
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.stickyHeader}>
        <Header />
        <FilterChips
          filters={CATEGORIES}
          activeFilter={filters.category}
          onFilterChange={filters.setCategory}
          showIcons
        />
      </View>

      {filteredData.length > 0 ? (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <MachineCard item={item} />}
          windowSize={10}
          maxToRenderPerBatch={10}
          updateCellsBatchingPeriod={50}
          initialNumToRender={5}
          removeClippedSubviews={true}
        />
      ) : (
        <EmptyState
          icon="search-off"
          title="No Results Found"
          description="Try searching for something else or check your filters."
          actionLabel="Clear All Filters"
          onActionPress={() => {
            setSearch('');
            filters.setCategory('all');
          }}
        />
      )}
    </View>
  );
}

/* ---------------------------------------------------------------- */
/* STYLES */
/* ---------------------------------------------------------------- */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },

  stickyHeader: {
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    zIndex: 10,
  },

  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.text,
    letterSpacing: -0.5,
  },

  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  locationText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontWeight: '500',
    marginLeft: 2,
  },

  notificationBtn: { padding: 8 },
  notificationBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.brand.primary,
    borderWidth: 1.5,
    borderColor: COLORS.white,
  },

  listContent: { padding: 16, paddingBottom: 100, gap: 20 },

  card: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 5,
    borderWidth: 1,
    borderColor: COLORS.gray[100],
  },
  imageContainer: { height: 220, position: 'relative' },
  cardImage: { width: '100%', height: '100%' },

  typeBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'rgba(255,255,255,0.95)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  typeBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.text,
    textTransform: 'uppercase',
  },

  heartBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 24,
  },

  cardContent: { padding: 20 },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 10,
  },
  machineTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.text,
    flex: 1,
  },
  conditionBadge: {
    backgroundColor: COLORS.successLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  conditionText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.successDark,
    textTransform: 'uppercase',
  },

  postedTime: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
    marginBottom: 12,
  },

  specsRow: { flexDirection: 'row', gap: 16, marginBottom: 16 },
  specItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  specValueText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },

  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray[50],
  },
  priceText: { fontSize: 24, fontWeight: '900', color: COLORS.brand.primary },
  negotiableText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.success,
    marginTop: 2,
    textTransform: 'uppercase',
  },
  cardBtn: { paddingHorizontal: 20, height: 44 },
});
