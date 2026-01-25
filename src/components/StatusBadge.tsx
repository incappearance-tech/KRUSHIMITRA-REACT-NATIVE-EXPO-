import React from 'react';

import { StyleSheet, Text, View } from 'react-native';

import { COLORS } from '../constants/colors';

export interface StatusBadgeProps {
  label: string;
  variant: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  size?: 'small' | 'medium' | 'large';
  uppercase?: boolean;
}

/**
 * Reusable StatusBadge component
 * Displays status labels with consistent styling based on variant
 */
export default function StatusBadge({
  label,
  variant,
  size = 'medium',
  uppercase = true,
}: StatusBadgeProps) {
  const variantStyles = {
    success: {
      backgroundColor: COLORS.successLight,
      textColor: COLORS.successDark,
    },
    warning: {
      backgroundColor: COLORS.warningLight,
      textColor: COLORS.warningDark,
    },
    danger: {
      backgroundColor: COLORS.dangerLight,
      textColor: COLORS.dangerDark,
    },
    info: {
      backgroundColor: COLORS.infoLight,
      textColor: COLORS.infoDark,
    },
    neutral: {
      backgroundColor: COLORS.gray[100],
      textColor: COLORS.gray[700],
    },
  };

  const sizeStyles = {
    small: { paddingHorizontal: 6, paddingVertical: 2, fontSize: 9 },
    medium: { paddingHorizontal: 8, paddingVertical: 4, fontSize: 10 },
    large: { paddingHorizontal: 10, paddingVertical: 6, fontSize: 11 },
  };

  const currentVariant = variantStyles[variant];
  const currentSize = sizeStyles[size];

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: currentVariant.backgroundColor,
          paddingHorizontal: currentSize.paddingHorizontal,
          paddingVertical: currentSize.paddingVertical,
        },
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            color: currentVariant.textColor,
            fontSize: currentSize.fontSize,
          },
          uppercase && styles.uppercase,
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  text: {
    fontWeight: '700',
  },
  uppercase: {
    textTransform: 'uppercase',
  },
});
