import React, { useState } from 'react';

import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { ResizeMode, Video } from 'expo-av';
import { router } from 'expo-router';

/* ---------------- SCREEN ---------------- */
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import { useTranslation } from 'react-i18next';

import { IListing } from '@/src/types/sell-machine/listing-details';

/* ---------------- MOCK DATA ---------------- */

const LISTING: IListing = {
  title: 'Mahindra Tractor 575 DI',
  location: 'Nashik',
  distance: '12 km',
  rate: '1200',
  rateUnit: '/day',
  rateType: 'Negotiable',
  imageUrl: 'https://images.unsplash.com/photo-1606813908981-dc4dc9b16f33',
  totalImages: 5,
  isLive: true,
  analytics: {
    views: 128,
    calls: 14,
  },
  media: [
    {
      uri: 'https://images.unsplash.com/photo-1606813908981-dc4dc9b16f33',
      type: 'image',
    },
    {
      uri: 'https://images.unsplash.com/photo-1598514982205-f0b3b0b1b0b4',
      type: 'image',
    },
    {
      uri: 'https://www.w3schools.com/html/mov_bbb.mp4',
      type: 'video',
    },
  ],
  specs: [
    { icon: 'settings', label: 'Model', value: '575 DI' },
    { icon: 'calendar-today', label: 'Year', value: '2019' },
    { icon: 'build', label: 'Condition', value: 'Good' },
    { icon: 'agriculture', label: 'Usage', value: 'Farm Use' },
  ],
  description:
    'Well maintained tractor, regularly serviced and in good working condition. Suitable for all farming activities.',
};

const { width } = Dimensions.get('window');

export default function ListingDetailsScreen() {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);

  const localizedSpecs = [
    {
      icon: 'settings',
      label: t('sell_machine.specs.model'),
      value: LISTING.specs[0].value,
    },
    {
      icon: 'calendar-today',
      label: t('sell_machine.specs.year'),
      value: LISTING.specs[1].value,
    },
    {
      icon: 'build',
      label: t('sell_machine.specs.condition'),
      value: LISTING.specs[2].value,
    },
    {
      icon: 'agriculture',
      label: t('sell_machine.specs.usage'),
      value: LISTING.specs[3].value,
    },
  ];

  return (
    <View style={styles.root}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerBtn}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          {t('sell_machine.listing_details')}
        </Text>

        <TouchableOpacity style={styles.headerBtn}>
          <Ionicons name="ellipsis-vertical" size={22} />
        </TouchableOpacity>
      </View>

      {/* SCROLLABLE CONTENT */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* HERO CAROUSEL */}
        <View style={styles.hero}>
          <FlatList
            data={LISTING.media}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, i) => i.toString()}
            onMomentumScrollEnd={(e) => {
              const index = Math.round(e.nativeEvent.contentOffset.x / width);
              setActiveIndex(index);
            }}
            renderItem={({ item }) => (
              <View style={{ width }}>
                {item.type === 'video' ? (
                  <Video
                    source={{ uri: item.uri }}
                    style={styles.heroImage}
                    resizeMode={ResizeMode.COVER}
                    useNativeControls
                    shouldPlay={false}
                  />
                ) : (
                  <Image source={{ uri: item.uri }} style={styles.heroImage} />
                )}

                {item.type === 'video' && (
                  <View style={styles.videoOverlay}>
                    <MaterialIcons
                      name="play-circle-fill"
                      size={64}
                      color="#FFFFFF"
                    />
                  </View>
                )}
              </View>
            )}
          />

          {/* LIVE BADGE */}
          {LISTING.isLive && (
            <View style={styles.liveBadge}>
              <View style={styles.liveDotOuter}>
                <View style={styles.liveDot} />
              </View>
              <Text style={styles.liveText}>
                {t('sell_machine.live_listing')}
              </Text>
            </View>
          )}

          {/* COUNTER */}
          <View style={styles.photoCounter}>
            <MaterialIcons name="photo-camera" size={14} color="#fff" />
            <Text style={styles.photoText}>
              {activeIndex + 1}/{LISTING.media.length}
            </Text>
          </View>
        </View>

        {/* INFO */}
        <View style={styles.infoWrap}>
          <Text style={styles.title}>{LISTING.title}</Text>

          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={16} />
            <Text style={styles.locationText}>
              {LISTING.location} ({LISTING.distance})
            </Text>
          </View>
        </View>

        {/* RATE CARD */}
        <View style={styles.rateCard}>
          <View>
            <Text style={styles.rateLabel}>
              {t('sell_payment.success.total_paid')}
            </Text>
            <View style={styles.rateRow}>
              <Text style={styles.rateValue}>₹{LISTING.rate}</Text>
              <Text style={styles.rateUnit}>{LISTING.rateUnit}</Text>
            </View>
          </View>

          <View style={styles.rateTypeBadge}>
            <Text style={styles.rateTypeText}>{LISTING.rateType}</Text>
          </View>
        </View>

        {/* ANALYTICS */}
        <View style={styles.analyticsWrap}>
          <Text style={styles.sectionTitle}>
            {t('sell_machine.performance_7_days')}
          </Text>

          <View style={styles.analyticsGrid}>
            <View style={styles.analyticsCard}>
              <View
                style={[styles.analyticsIcon, { backgroundColor: '#DBEAFE' }]}
              >
                <MaterialIcons name="visibility" size={20} color="#2563EB" />
              </View>
              <Text style={styles.analyticsValue}>
                {LISTING.analytics.views}
              </Text>
              <Text style={styles.analyticsLabel}>
                {t('sell_machine.total_views')}
              </Text>
            </View>

            <View style={styles.analyticsCard}>
              <View
                style={[styles.analyticsIcon, { backgroundColor: '#DCFCE7' }]}
              >
                <MaterialIcons name="call" size={20} color="#15803D" />
              </View>
              <Text style={styles.analyticsValue}>
                {LISTING.analytics.calls}
              </Text>
              <Text style={styles.analyticsLabel}>
                {t('sell_machine.calls_received')}
              </Text>
            </View>
          </View>
        </View>

        {/* SPECS */}
        <View style={styles.specsWrap}>
          <Text style={styles.sectionTitle}>
            {t('sell_machine.machine_specs')}
          </Text>

          <View style={styles.specsGrid}>
            {localizedSpecs.map((s, i) => (
              <View key={i} style={styles.specCard}>
                <View style={styles.specIcon}>
                  <MaterialIcons name={s.icon as any} size={20} />
                </View>
                <View>
                  <Text style={styles.specLabel}>{s.label}</Text>
                  <Text style={styles.specValue}>{s.value}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* DESCRIPTION */}
        <View style={styles.descWrap}>
          <Text style={styles.sectionTitle}>
            {t('sell_machine.description')}
          </Text>
          <Text style={styles.descText}>{LISTING.description}</Text>
        </View>
      </ScrollView>

      {/* STICKY BOTTOM BAR */}
      <View style={styles.bottomBar}>
        <View style={styles.bottomRow}>
          <TouchableOpacity style={styles.iconAction}>
            <MaterialIcons name="edit" size={22} />
            <Text style={styles.iconLabel}>{t('sell_machine.edit')}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconAction}>
            <MaterialIcons name="bar-chart" size={22} />
            <Text style={styles.iconLabel}>{t('sell_machine.analytics')}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.primaryAction}>
            <MaterialIcons name="check-circle" size={20} />
            <Text style={styles.primaryText}>
              {t('sell_machine.mark_as_sold')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F6F8F6',
  },

  /* HEADER */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
  },
  headerBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
  },

  /* CONTENT */
  content: {
    paddingBottom: 120,
  },

  /* HERO */
  hero: {
    width: '100%',
    aspectRatio: 4 / 3,
    backgroundColor: '#E5E7EB',
  },
  videoOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.25)',
  },

  heroImage: {
    width: '100%',
    height: '100%',
  },
  liveBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(19,236,55,0.9)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  liveDotOuter: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#14532D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#14532D',
  },
  liveText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#102213',
  },
  photoCounter: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    flexDirection: 'row',
    gap: 6,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  photoText: {
    fontSize: 12,
    color: '#fff',
  },

  /* INFO */
  infoWrap: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
  },
  locationRow: {
    flexDirection: 'row',
    gap: 4,
    marginTop: 6,
  },
  locationText: {
    fontSize: 13,
    color: '#64748B',
  },

  /* RATE */
  rateCard: {
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rateLabel: {
    fontSize: 12,
    color: '#64748B',
  },
  rateRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  rateValue: {
    fontSize: 24,
    fontWeight: '800',
  },
  rateUnit: {
    fontSize: 14,
  },
  rateTypeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: '#DCFCE7',
  },
  rateTypeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#15803D',
  },

  /* ANALYTICS */
  analyticsWrap: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  analyticsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  analyticsCard: {
    flex: 1,
    padding: 12,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  analyticsIcon: {
    padding: 6,
    borderRadius: 8,
    marginBottom: 6,
  },
  analyticsValue: {
    fontSize: 22,
    fontWeight: '800',
  },
  analyticsLabel: {
    fontSize: 12,
    color: '#64748B',
  },

  /* SPECS */
  specsWrap: {
    padding: 16,
  },
  specsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  specCard: {
    width: '48%',
    flexDirection: 'row',
    gap: 10,
    padding: 12,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  specIcon: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: '#DCFCE7',
  },
  specLabel: {
    fontSize: 12,
    color: '#64748B',
  },
  specValue: {
    fontSize: 14,
    fontWeight: '600',
  },

  /* DESCRIPTION */
  descWrap: {
    padding: 16,
  },
  descText: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
  },

  /* BOTTOM BAR */
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderColor: '#E5E7EB',
    padding: 16,
  },
  bottomRow: {
    flexDirection: 'row',
    gap: 12,
  },
  iconAction: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  iconLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  primaryAction: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#13EC37',
    borderRadius: 12,
    paddingVertical: 10,
  },
  primaryText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#102213',
  },
});
