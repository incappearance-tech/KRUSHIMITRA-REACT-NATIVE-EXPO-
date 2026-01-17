import Button from '@/src/components/Button';
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
    id: '1',
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
    id: '2',
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
    id: '3',
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
              color={COLORS.textSecondary}
            />
            <Text style={styles.locationText}>
              {t('machine_list.nearby')} Rampur Village
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.notificationBtn}>
          <MaterialIcons
            name="notifications"
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
          <MaterialIcons name="tune" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const FilterTabs = ({ activeTab, setActiveTab }: IFilterTabsProps) => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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

  const MachineCard = ({ item }: IMachineCardProps) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push('/buy-machine/details')}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.cardImage} />

        <View style={styles.typeBadge}>
          <Text style={styles.typeBadgeText}>
            {CATEGORIES.find(c => c.id === item.type)?.label || item.type}
          </Text>
        </View>

        <TouchableOpacity style={styles.heartBtn}>
          <MaterialIcons
            name="favorite"
            size={20}
            color={COLORS.white}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.cardContent}>
        <Text style={styles.machineTitle}>
          {item.title}
        </Text>
        <Text style={styles.postedTime}>
          {item.postedTime}
        </Text>

        <View style={styles.specsGrid}>
          <Text style={styles.specText}>
            {t(`machine_list.${item.condition.toLowerCase().replace(/ /g, '_')}`)}
          </Text>
          <Text style={styles.specText}>
            {item.hours}
          </Text>
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.priceText}>
            {item.price}
          </Text>
          {item.negotiable && (
            <Text style={styles.negotiableText}>
              {t('common.negotiable')}
            </Text>
          )}
        </View>

        <Button
          label={t('common.contact_seller')}
          icon="call"
          onPress={() => { }}
          backgroundColor={COLORS.brand.primary}
          textColor={COLORS.black}
        />
      </View>
    </TouchableOpacity>
  );

  const filteredData = MACHINES.filter((item) => {
    const matchTab =
      activeTab === 'all' || item.type === activeTab;
    const matchSearch = item.title
      .toLowerCase()
      .includes(search.toLowerCase());
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

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <MachineCard item={item} />
        )}
      />
    </View>
  );
}

/* ---------------------------------------------------------------- */
/* STYLES */
/* ---------------------------------------------------------------- */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background ,paddingHorizontal:16},

  stickyHeader: {
    backgroundColor: 'rgba(246,248,246,0.95)',
    zIndex: 10,
  },

  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTitle: { fontSize: 24, fontWeight: '700' },

  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  locationText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },

  notificationBtn: { padding: 8 },
  notificationBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.brand.primary,
  },

  searchRow: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 12,
  },
  searchBarContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  searchInput: { flex: 1, marginLeft: 8 },

  filterBtn: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },

  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
    margin: 6,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
  },
  filterChipActive: {
    backgroundColor: COLORS.brand.primary,
  },
  filterChipText: { fontWeight: '600' },
  filterChipTextActive: { color: COLORS.black },

  listContent: { paddingBottom: 100, gap: 16 },

  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    overflow: 'hidden',
  },
  imageContainer: { height: 200 },
  cardImage: { width: '100%', height: '100%' },

  typeBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: COLORS.white,
    padding: 6,
    borderRadius: 4,
  },
  typeBadgeText: { fontSize: 10, fontWeight: '700' },

  heartBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    padding: 8,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
  },

  cardContent: { padding: 16 },
  machineTitle: { fontSize: 18, fontWeight: '700' },
  postedTime: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },

  specsGrid: { flexDirection: 'row', gap: 12 },
  specText: { fontSize: 12 },

  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    gap: 8,
  },
  priceText: { fontSize: 20, fontWeight: '700' },
  negotiableText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.successDark,
  },
});
