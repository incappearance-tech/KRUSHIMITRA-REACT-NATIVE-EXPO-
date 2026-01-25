import React from 'react';

import { StyleSheet, Text, View } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

import { COLORS } from '../constants/colors';

export interface RatingBadgeProps {
  rating: number;
  variant?: 'default' | 'compact' | 'detailed';
  showIcon?: boolean;
}

/**
 * Reusable RatingBadge component
 * Displays rating value with star icon in a consistent badge
 */
export default function RatingBadge({
  rating,
  variant = 'default',
  showIcon = true,
}: RatingBadgeProps) {
  return (
    <View style={[styles.badge, variant === 'compact' && styles.badgeCompact]}>
      {showIcon && (
        <MaterialIcons
          name="star"
          size={variant === 'compact' ? 10 : 12}
          color={COLORS.warning}
        />
      )}
      <Text
        style={[
          styles.ratingText,
          variant === 'compact' && styles.ratingTextCompact,
        ]}
      >
        {rating.toFixed(1)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.warningLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fef08a',
  },
  badgeCompact: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    gap: 2,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.warningDark,
  },
  ratingTextCompact: {
    fontSize: 10,
  },
});
