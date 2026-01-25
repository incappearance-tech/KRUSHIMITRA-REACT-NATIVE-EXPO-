import React from 'react';

import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

import { COLORS } from '../constants/colors';

export interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  showFilterButton?: boolean;
  onFilterPress?: () => void;
  variant?: 'default' | 'rounded' | 'minimal';
}

/**
 * Reusable SearchBar component
 * Provides consistent search UI across the application
 */
export default function SearchBar({
  value,
  onChangeText,
  placeholder = 'Search...',
  showFilterButton = false,
  onFilterPress,
  variant = 'default',
}: SearchBarProps) {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.searchBarContainer,
          variant === 'minimal' && styles.searchBarMinimal,
          variant === 'rounded' && styles.searchBarRounded,
        ]}
      >
        <MaterialIcons name="search" size={20} color={COLORS.textSecondary} />
        <TextInput
          style={styles.searchInput}
          placeholder={placeholder}
          placeholderTextColor={COLORS.textSecondary}
          autoCapitalize="none"
          autoCorrect={false}
          value={value}
          onChangeText={onChangeText}
        />
      </View>

      {showFilterButton && onFilterPress && (
        <TouchableOpacity style={styles.filterBtn} onPress={onFilterPress}>
          <MaterialIcons name="tune" size={24} color={COLORS.text} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 12,
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
  searchBarMinimal: {
    backgroundColor: COLORS.gray[50],
    borderRadius: 10,
    height: 48,
    borderWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
  },
  searchBarRounded: {
    borderRadius: 100,
    height: 50,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: COLORS.text,
  },
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
});
