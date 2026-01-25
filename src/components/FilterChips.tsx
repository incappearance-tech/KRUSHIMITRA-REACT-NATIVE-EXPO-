import React from 'react';

import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

import { COLORS } from '../constants/colors';

export interface FilterItem {
  id: string;
  label: string;
  icon?: keyof typeof MaterialIcons.glyphMap;
}

export interface FilterChipsProps {
  filters: FilterItem[];
  activeFilter: string;
  onFilterChange: (filterId: string) => void;
  showIcons?: boolean;
  variant?: 'default' | 'compact';
}

/**
 * Reusable FilterChips component
 * Displays horizontal scrollable filter chips with optional icons
 */
export default function FilterChips({
  filters,
  activeFilter,
  onFilterChange,
  showIcons = false,
  variant = 'default',
}: FilterChipsProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.filterStrip}
    >
      {filters.map((filter) => {
        const active = activeFilter === filter.id;
        return (
          <TouchableOpacity
            key={filter.id}
            onPress={() => onFilterChange(filter.id)}
            style={[
              styles.filterChip,
              variant === 'compact' && styles.filterChipCompact,
              active && styles.filterChipActive,
            ]}
          >
            {showIcons && filter.icon && (
              <MaterialIcons
                name={filter.icon}
                size={18}
                color={active ? COLORS.black : COLORS.textSecondary}
              />
            )}
            <Text
              style={[
                styles.filterChipText,
                variant === 'compact' && styles.filterChipTextCompact,
                active && styles.filterChipTextActive,
              ]}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  filterStrip: {
    paddingVertical: 12,
    gap: 10,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 100,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.gray[100],
  },
  filterChipCompact: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 18,
  },
  filterChipActive: {
    backgroundColor: COLORS.brand.primary,
    borderColor: COLORS.brand.primary,
  },
  filterChipText: {
    fontWeight: '700',
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  filterChipTextCompact: {
    fontSize: 13,
    fontWeight: '600',
  },
  filterChipTextActive: {
    color: COLORS.black,
  },
});
