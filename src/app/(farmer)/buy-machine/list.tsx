import Button from '@/src/components/Button';
import { useSellingStore } from '@/src/store/selling.store';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS } from '../../../constants/colors';

import { ICategory, IFilterTabsProps, IHeaderProps, IMachine, IMachineCardProps } from '@/src/types/buy-machine/list';

/* ---------------------------------------------------------------- */
/* MACHINE LIST DATA */
/* ---------------------------------------------------------------- */
const MACHINES: IMachine[] = [
  {
    id: 'mock_1',
    type: 'tractor',
    title: 'John Deere 5050D',
    postedTime: 'Posted 2 hours ago',
    image:
      'https://images.unsplash.com/photo-1595246140625-573b715e11d3?q=80&w=600',
    condition: 'Good Condition',
    hours: '2,400 hrs',
    price: '$12,000',
    negotiable: true,
  },
  {
    id: 'mock_2',
    type: 'harvester',
    title: 'Kubota DC-70G',
    postedTime: 'Posted yesterday',
    image:
      'https://images.unsplash.com/photo-1530267981375-f0de93bf3e94?q=80&w=600',
    condition: 'Excellent',
    hours: '1,200 hrs',
    price: '$25,500',
    negotiable: false,
  },
  {
    id: 'mock_3',
    type: 'implement',
    title: 'Mahindra Rotavator',
    postedTime: 'Posted 3 days ago',
    image:
      'https://images.unsplash.com/photo-1563205764-59e2b9631b7e?q=80&w=600',
    condition: 'Like New',
    hours: 'Used Once',
    price: '$3,200',
    negotiable: true,
  },
];

/* ---------------------------------------------------------------- */
/* MAIN SCREEN */
/* ---------------------------------------------------------------- */
export default function BrowseMachinesScreen() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };

  const CATEGORIES: ICategory[] = [
    { id: 'all', label: t('machine_list.all'), icon: 'grid-view' },
    { id: 'tractor', label: t('machine_list.tractors'), icon: 'agriculture' },
    { id: 'harvester', label: t('machine_list.harvesters'), icon: 'local-shipping' },
    { id: 'implement', label: t('machine_list.implements'), icon: 'handyman' },
  ];

  const Header = ({ search, setSearch }: IHeaderProps) => (
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

      <View style={styles.searchRow}>
        <View style={styles.searchBarContainer}>
          <MaterialIcons
            name="search"
            size={20}
            color={COLORS.textSecondary}
          />
          <TextInput
            style={styles.searchInput}
            placeholder={t('machine_list.search_placeholder')}
            placeholderTextColor={COLORS.textSecondary}
            autoCapitalize="none"
            autoCorrect={false}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <TouchableOpacity
          style={styles.filterBtn}
          onPress={() => router.push('/buy-machine/filters')}
        >
          <MaterialIcons name="tune" size={24} color={COLORS.text} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const FilterTabs = ({ activeTab, setActiveTab }: IFilterTabsProps) => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.filterStrip}
    >
      {CATEGORIES.map((cat) => {
        const active = activeTab === cat.id;
        return (
          <TouchableOpacity
            key={cat.id}
            onPress={() => setActiveTab(cat.id)}
            style={[
              styles.filterChip,
              active && styles.filterChipActive,
            ]}
          >
            <MaterialIcons
              name={cat.icon}
              size={18}
              color={active ? COLORS.black : COLORS.textSecondary}
            />
            <Text
              style={[
                styles.filterChipText,
                active && styles.filterChipTextActive,
              ]}
            >
              {cat.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
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
              {CATEGORIES.find(c => c.id === item.type)?.label || item.type}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.heartBtn}
            onPress={() => toggleFavorite(item.id)}
          >
            <MaterialIcons
              name={isFavorite ? "favorite" : "favorite-border"}
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
              <Text style={styles.conditionText}>{t(`machine_list.${item.condition.toLowerCase().replace(/ /g, '_')}`)}</Text>
            </View>
          </View>

          <Text style={styles.postedTime}>
            {item.postedTime}
          </Text>

          <View style={styles.specsRow}>
            <View style={styles.specItem}>
              <MaterialIcons name="schedule" size={14} color={COLORS.textSecondary} />
              <Text style={styles.specValueText}>{item.hours}</Text>
            </View>
            <View style={styles.specItem}>
              <MaterialIcons name="location-on" size={14} color={COLORS.textSecondary} />
              <Text style={styles.specValueText}>2.5 km</Text>
            </View>
          </View>

          <View style={styles.priceRow}>
            <View>
              <Text style={styles.priceText}>{item.price}</Text>
              {item.negotiable && (
                <Text style={styles.negotiableText}>{t('common.negotiable')}</Text>
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

  // Merge mock data with dynamic global listings
  const allMachines: IMachine[] = [
    ...MACHINES,
    ...globalMachines
      .filter((m: any) => m.visible && !m.expired)
      .map((m: any) => ({
        id: m.id,
        type: m.category.toLowerCase(),
        title: `${m.brand} ${m.model}`,
        postedTime: 'New Listing',
        image: m.media[0]?.uri || 'https://images.unsplash.com/photo-1595246140625-573b715e11d3?q=80&w=600',
        condition: 'Good', // Mock default
        hours: m.year, // Use year as primary spec if hours not available
        price: `₹${Number(m.askingPrice).toLocaleString()}`,
        negotiable: true,
      })),
  ];

  const filteredData = allMachines.filter((item) => {
    const matchTab = activeTab === 'all' || item.type.includes(activeTab);
    const matchSearch = item.title.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  return (
    <View style={styles.container}>
      <View style={styles.stickyHeader}>
        <Header search={search} setSearch={setSearch} />
        <FilterTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </View>

      {filteredData.length > 0 ? (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <MachineCard item={item} />
          )}
        />
      ) : (
        <View style={styles.emptyState}>
          <MaterialIcons name="search-off" size={64} color={COLORS.gray[200]} />
          <Text style={styles.emptyTitle}>No Results Found</Text>
          <Text style={styles.emptySub}>Try searching for something else or check your filters.</Text>
          <Button
            label="Clear All Filters"
            onPress={() => { setSearch(''); setActiveTab('all'); }}
            variant="outline"
            style={{ marginTop: 20 }}
          />
        </View>
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
  headerTitle: { fontSize: 28, fontWeight: '900', color: COLORS.text, letterSpacing: -0.5 },

  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  locationText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontWeight: '500',
    marginLeft: 2
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
    borderColor: COLORS.white
  },

  searchRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 8
  },
  searchBarContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 52,
    borderWidth: 1,
    borderColor: COLORS.gray[100],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },
  searchInput: { flex: 1, marginLeft: 8, fontSize: 16, color: COLORS.text },

  filterBtn: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.gray[100],
    elevation: 2,
  },

  filterStrip: { paddingVertical: 12 },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginRight: 10,
    borderRadius: 100,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.gray[100],
  },
  filterChipActive: {
    backgroundColor: COLORS.brand.primary,
    borderColor: COLORS.brand.primary,
  },
  filterChipText: { fontWeight: '700', color: COLORS.textSecondary, fontSize: 14 },
  filterChipTextActive: { color: COLORS.black },

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
  typeBadgeText: { fontSize: 11, fontWeight: '800', color: COLORS.text, textTransform: 'uppercase' },

  heartBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 24,
  },

  cardContent: { padding: 20 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 },
  machineTitle: { fontSize: 20, fontWeight: '800', color: COLORS.text, flex: 1 },
  conditionBadge: { backgroundColor: COLORS.successLight, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  conditionText: { fontSize: 10, fontWeight: '700', color: COLORS.successDark, textTransform: 'uppercase' },

  postedTime: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
    marginBottom: 12,
  },

  specsRow: { flexDirection: 'row', gap: 16, marginBottom: 16 },
  specItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  specValueText: { fontSize: 13, color: COLORS.textSecondary, fontWeight: '600' },

  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray[50],
  },
  priceText: { fontSize: 24, fontWeight: '900', color: COLORS.brand.primary },
  negotiableText: { fontSize: 10, fontWeight: '700', color: COLORS.success, marginTop: 2, textTransform: 'uppercase' },
  cardBtn: { paddingHorizontal: 20, height: 44 },

  emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 40, marginTop: 40 },
  emptyTitle: { fontSize: 20, fontWeight: '800', color: COLORS.text, marginTop: 16 },
  emptySub: { fontSize: 14, color: COLORS.textSecondary, textAlign: 'center', marginTop: 8 },
});
