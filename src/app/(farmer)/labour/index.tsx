import React, { useMemo, useState } from 'react';

import {
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useRouter } from 'expo-router';

import { MaterialIcons } from '@expo/vector-icons';

import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Button from '@/src/components/Button';
import FilterChips from '@/src/components/FilterChips';
import SearchBar from '@/src/components/SearchBar';
import { COLORS } from '@/src/constants/colors';

import { LABOURERS } from './data';

interface Labourer {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  role: string;
  location: string;
  distance: string;
  image: string;
  tags: string[];
  verified: boolean;
  experience: string;
  expertise: string[];
  availability: string;
  preferredHours: string;
  price: number;
  busy?: boolean;
}

export default function LabourBrowsingScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const insets = useSafeAreaInsets();

  // FILTERS inside component to access translations
  const FILTERS = [
    { id: 'All', label: t('find_labour.filters.all'), icon: 'groups' },
    {
      id: 'Harvesting',
      label: t('find_labour.filters.harvesting'),
      icon: 'agriculture',
    },
    { id: 'Sowing', label: t('find_labour.filters.sowing'), icon: 'grass' },
    {
      id: 'Tractor Driver',
      label: t('find_labour.filters.tractor_driver'),
      icon: 'directions-car',
    },
    {
      id: 'Day Shift',
      label: t('find_labour.filters.day_shift'),
      icon: 'wb-sunny',
    },
  ];

  const filteredLabourers = useMemo(() => {
    return LABOURERS.filter((l) => {
      const matchesSearch =
        l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.role.toLowerCase().includes(searchQuery.toLowerCase());
      const mapsToFilter = (role: string, filterId: string) => {
        if (filterId === 'All') return true;
        if (filterId === 'Day Shift') return l.availability === 'Day Shift';
        return role.includes(filterId);
      };
      const matchesFilter = mapsToFilter(l.role, selectedFilter);
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, selectedFilter]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Header */}
      <View
        style={[
          styles.header,
          {
            paddingTop:
              Platform.OS === 'android'
                ? (StatusBar.currentHeight || 24) + 10
                : insets.top + 10,
          },
        ]}
      >
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.headerTitle}>{t('find_labour.title')}</Text>
            <View style={styles.locationRow}>
              <MaterialIcons
                name="location-on"
                size={14}
                color={COLORS.textSecondary}
              />
              <Text style={styles.locationText}>
                {t('find_labour.near_location', { location: 'Rampur (5km)' })}
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.profileBtn}>
            <Image
              source={{
                uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCB9ln3Vpct6yeyFcvFxKgGlJs-3Xr7PEvqMTJOpy1iLYhgCO7zNLeJA5-INB-VwhU9SYIZr8reh4hYyGp13MqV8OQEkH8v-VIyijaj2jyl7-Nuk1iNXYOno_tN2CjCFuWO6sAf_jLA5LkweB-V4ObuQ8Qu1ILIRFHDWb5KuTLPIi0yUMaAPTU60mXIAwFv3t95pX5xgedZO_BR9kWImid8mpVL-SMIHtgQb5WjlHPGruydydU7oF0Q3r05h_jc0KqEH43wfcfNqChkex',
              }}
              style={styles.profileImg}
            />
          </TouchableOpacity>
        </View>

        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder={t('find_labour.search_placeholder')}
          showFilterButton
          onFilterPress={() => router.push('/(farmer)/labour/filters')}
        />

        <View style={{ marginTop: 12 }}>
          <FilterChips
            filters={FILTERS as any}
            activeFilter={selectedFilter}
            onFilterChange={setSelectedFilter}
            showIcons
          />
        </View>
      </View>

      {/* List */}
      <ScrollView
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredLabourers.map((labour: Labourer) => {
          const isBusy = labour.busy;
          return (
            <View
              key={labour.id}
              style={[styles.card, isBusy && styles.cardBusy]}
            >
              <View style={styles.cardHeader}>
                <View style={styles.avatarContainer}>
                  <Image
                    source={{ uri: labour.image }}
                    style={[styles.avatar, isBusy && styles.avatarBusy]}
                  />
                  {labour.verified && (
                    <View style={styles.verifiedBadge}>
                      <MaterialIcons
                        name="workspace-premium"
                        size={12}
                        color={COLORS.white}
                      />
                    </View>
                  )}
                </View>
                <View style={styles.infoContainer}>
                  <View style={styles.nameRow}>
                    <Text style={styles.name}>{labour.name}</Text>
                    <View style={styles.ratingBadge}>
                      <Text style={styles.ratingValue}>{labour.rating}</Text>
                      <MaterialIcons
                        name="star"
                        size={12}
                        color={COLORS.warningDark}
                      />
                    </View>
                  </View>
                  <Text style={styles.roleText}>
                    {labour.role} • {labour.location}
                  </Text>
                  <View style={styles.tagsRow}>
                    {labour.tags.map((tag: string) => (
                      <View
                        key={tag}
                        style={[
                          styles.tag,
                          tag.includes('Night')
                            ? styles.tagIndigo
                            : tag.includes('Both')
                              ? styles.tagPrimary
                              : styles.tagGreen,
                        ]}
                      >
                        <MaterialIcons
                          name={
                            tag.includes('Night')
                              ? 'bedtime'
                              : tag.includes('Both')
                                ? 'schedule'
                                : 'wb-sunny'
                          }
                          size={12}
                          color={
                            tag.includes('Night')
                              ? '#4338ca'
                              : tag.includes('Both')
                                ? COLORS.black
                                : COLORS.successDark
                          }
                        />
                        <Text
                          style={[
                            styles.tagText,
                            tag.includes('Night')
                              ? styles.tagTextIndigo
                              : tag.includes('Both')
                                ? styles.tagTextBlack
                                : styles.tagTextGreen,
                          ]}
                        >
                          {tag}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
              <View style={styles.actionsRow}>
                <Button
                  label={t('find_labour.view_profile')}
                  onPress={() =>
                    router.push({
                      pathname: '/(farmer)/labour/details',
                      params: { id: labour.id },
                    })
                  }
                  backgroundColor={COLORS.white}
                  textColor={COLORS.text}
                  style={styles.browseButtonStyle}
                  labelStyle={{ fontSize: 12 }}
                  iconSize={16}
                  icon="visibility"
                />

                {isBusy ? (
                  <Button
                    label={t('find_labour.busy')}
                    onPress={() => { }}
                    disabled
                    backgroundColor={COLORS.gray[100]}
                    textColor={COLORS.textSecondary}
                    style={styles.browseButtonStyle}
                    labelStyle={{ fontSize: 12 }}
                    iconSize={16}
                    icon="call-end"
                  />
                ) : (
                  <Button
                    label={t('find_labour.call')}
                    onPress={() =>
                      router.push({
                        pathname: '/(farmer)/labour/details',
                        params: { id: labour.id },
                      })
                    }
                    backgroundColor={COLORS.white}
                    textColor={COLORS.text}
                    style={styles.browseButtonStyle}
                    labelStyle={{ fontSize: 12 }}
                    iconSize={16}
                    icon="call"
                  />
                )}
              </View>
            </View>
          );
        })}
        <View style={{ height: 100 }} />
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
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  headerRow: {
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
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  profileBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.gray[200],
  },
  profileImg: {
    width: '100%',
    height: '100%',
  },
  listContent: {
    padding: 16,
    gap: 20,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.gray[100],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  cardBusy: {
    opacity: 0.8,
    backgroundColor: COLORS.gray[50],
  },
  cardHeader: {
    flexDirection: 'row',
    gap: 16,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.gray[100],
  },
  avatarBusy: {
    opacity: 0.6,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.warning,
    padding: 4,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  infoContainer: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  name: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 4,
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
  ratingValue: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.warningDark,
  },
  roleText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 10,
    fontWeight: '500',
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 100,
    borderWidth: 1,
  },
  tagGreen: {
    backgroundColor: COLORS.successLight,
    borderColor: 'transparent',
  },
  tagIndigo: {
    backgroundColor: '#eef2ff',
    borderColor: 'transparent',
  },
  tagPrimary: {
    backgroundColor: COLORS.brand.muted,
    borderColor: 'transparent',
  },
  tagText: {
    fontSize: 12,
    fontWeight: '700',
  },
  tagTextGreen: {
    color: COLORS.successDark,
  },
  tagTextIndigo: {
    color: '#4338ca',
  },
  tagTextBlack: {
    color: COLORS.text,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray[100],
  },
  browseButtonStyle: {
    flex: 1,
    height: 40, // Slightly more compact
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.gray[200],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    paddingHorizontal: 8, // Tighter padding
    gap: 6, // Centered spacing between icon and text
  },
});
