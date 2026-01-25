import React from 'react';

import { StyleSheet, Text, View } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

import { COLORS } from '../constants/colors';
import Button from './Button';

export interface EmptyStateProps {
  icon: keyof typeof MaterialIcons.glyphMap;
  title: string;
  description: string;
  actionLabel?: string;
  onActionPress?: () => void;
  actionVariant?: 'primary' | 'outline';
}

/**
 * Reusable EmptyState component
 * Displays a consistent empty state UI across the application
 */
export default function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onActionPress,
  actionVariant = 'outline',
}: EmptyStateProps) {
  return (
    <View style={styles.emptyState}>
      <MaterialIcons name={icon} size={64} color={COLORS.gray[200]} />
      <Text style={styles.emptyTitle}>{title}</Text>
      <Text style={styles.emptyDescription}>{description}</Text>

      {actionLabel && onActionPress && (
        <Button
          label={actionLabel}
          onPress={onActionPress}
          variant={actionVariant}
          style={styles.actionButton}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    marginTop: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.text,
    marginTop: 16,
    textAlign: 'center',
  },
  emptyDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },
  actionButton: {
    marginTop: 20,
  },
});
