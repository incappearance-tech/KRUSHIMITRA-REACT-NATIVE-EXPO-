import React from 'react';

import { FlatList, StyleSheet, Text, View } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

import AppBar from '@/src/components/AppBar';
import { COLORS } from '@/src/constants/colors';

const MANDI_RATES = [
  {
    id: '1',
    crop: 'Wheat (Gehu)',
    variety: 'Lokwan',
    price: '₹2,450',
    change: '+₹50',
    trend: 'up',
  },
  {
    id: '2',
    crop: 'Soybean',
    variety: 'Yellow',
    price: '₹4,800',
    change: '-₹120',
    trend: 'down',
  },
  {
    id: '3',
    crop: 'Onion (Kanda)',
    variety: 'Red',
    price: '₹1,800',
    change: '+₹200',
    trend: 'up',
  },
  {
    id: '4',
    crop: 'Cotton (Kapas)',
    variety: 'Long Staple',
    price: '₹7,200',
    change: '0',
    trend: 'neutral',
  },
];

export default function MandiScreen() {
  return (
    <View style={styles.container}>
      <AppBar
        title="Mandi Bhav (Live)"
        rightIcon={
          <View style={styles.headerRight}>
            <Text style={styles.locationText}>Rampur</Text>
            <MaterialIcons
              name="keyboard-arrow-down"
              size={16}
              color={COLORS.text}
            />
          </View>
        }
        onRightPress={() => {}}
      />

      <View style={styles.tickerStrip}>
        <MaterialIcons name="trending-up" size={16} color={COLORS.white} />
        <Text style={styles.tickerText}>
          Market is BULLISH today. Soybean rates up by 2%.
        </Text>
      </View>

      <FlatList
        data={MANDI_RATES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.rateCard}>
            <View style={styles.cropInfo}>
              <Text style={styles.cropName}>{item.crop}</Text>
              <Text style={styles.varietyText}>{item.variety}</Text>
            </View>
            <View style={styles.priceInfo}>
              <Text style={styles.priceText}>{item.price}/qt</Text>
              <View
                style={[
                  styles.trendBadge,
                  item.trend === 'up'
                    ? styles.trendUp
                    : item.trend === 'down'
                      ? styles.trendDown
                      : styles.trendNeutral,
                ]}
              >
                <MaterialIcons
                  name={
                    item.trend === 'up'
                      ? 'arrow-upward'
                      : item.trend === 'down'
                        ? 'arrow-downward'
                        : 'remove'
                  }
                  size={12}
                  color={
                    item.trend === 'up'
                      ? COLORS.successDark
                      : item.trend === 'down'
                        ? COLORS.danger
                        : COLORS.textSecondary
                  }
                />
                <Text
                  style={[
                    styles.changeTextSmall,
                    item.trend === 'up'
                      ? styles.textGreen
                      : item.trend === 'down'
                        ? styles.textRed
                        : styles.textGray,
                  ]}
                >
                  {item.change}
                </Text>
              </View>
            </View>
          </View>
        )}
        contentContainerStyle={{ padding: 16, gap: 12 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    padding: 6,
    backgroundColor: COLORS.gray[100],
    borderRadius: 8,
  },
  locationText: { fontSize: 12, fontWeight: '700', color: COLORS.text },

  tickerStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: COLORS.successDark,
    padding: 10,
    paddingHorizontal: 16,
  },
  tickerText: { color: COLORS.white, fontSize: 12, fontWeight: '600' },

  rateCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.gray[100],
  },
  cropInfo: { gap: 2 },
  cropName: { fontSize: 16, fontWeight: '700', color: COLORS.text },
  varietyText: { fontSize: 12, color: COLORS.textSecondary, fontWeight: '500' },
  priceInfo: { alignItems: 'flex-end', gap: 4 },
  priceText: { fontSize: 18, fontWeight: '800', color: COLORS.text },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },

  trendUp: { backgroundColor: COLORS.successLight },
  trendDown: { backgroundColor: COLORS.dangerLight },
  trendNeutral: { backgroundColor: COLORS.gray[100] }, // Match my-farm behavior? No using constants here.

  changeTextSmall: { fontSize: 11, fontWeight: '700' },
  textGreen: { color: COLORS.successDark },
  textRed: { color: COLORS.danger },
  textGray: { color: COLORS.textSecondary },
});
