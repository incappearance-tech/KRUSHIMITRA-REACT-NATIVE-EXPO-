import React from 'react';

import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

import { COLORS } from '../constants/colors';

export interface AvatarWithBadgeProps {
  imageUri?: string;
  size?: number;
  badge?: 'verified' | 'premium' | 'online' | 'none';
  onPress?: () => void;
  borderColor?: string;
}

/**
 * Reusable AvatarWithBadge component
 * Displays user/item avatar with optional verification/status badge
 */
export default function AvatarWithBadge({
  imageUri,
  size = 52,
  badge = 'none',
  onPress,
  borderColor,
}: AvatarWithBadgeProps) {
  const badgeConfig = {
    verified: {
      icon: 'verified' as keyof typeof MaterialIcons.glyphMap,
      backgroundColor: '#3b82f6',
    },
    premium: {
      icon: 'workspace-premium' as keyof typeof MaterialIcons.glyphMap,
      backgroundColor: '#eab308',
    },
    online: {
      icon: null,
      backgroundColor: COLORS.success,
    },
    none: {
      icon: null,
      backgroundColor: 'transparent',
    },
  };

  const config = badgeConfig[badge];
  const borderRadius = size / 2;
  const badgeSize = size * 0.35;

  const content = (
    <View style={[styles.container, { width: size, height: size }]}>
      {imageUri ? (
        <Image
          source={{ uri: imageUri }}
          style={[
            styles.avatar,
            {
              width: size,
              height: size,
              borderRadius,
              borderColor: borderColor || 'transparent',
              borderWidth: borderColor ? 1 : 0,
            },
          ]}
        />
      ) : (
        <View
          style={[
            styles.placeholder,
            {
              width: size,
              height: size,
              borderRadius,
              borderColor: borderColor || 'transparent',
              borderWidth: borderColor ? 1 : 0,
            },
          ]}
        >
          <MaterialIcons
            name="person"
            size={size * 0.5}
            color={COLORS.gray[400]}
          />
        </View>
      )}

      {badge !== 'none' && (
        <View
          style={[
            styles.badge,
            {
              backgroundColor: config.backgroundColor,
              width: badgeSize,
              height: badgeSize,
              borderRadius: badgeSize / 2,
            },
          ]}
        >
          {config.icon && (
            <MaterialIcons
              name={config.icon}
              size={badgeSize * 0.6}
              color={COLORS.white}
            />
          )}
        </View>
      )}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  avatar: {
    backgroundColor: COLORS.gray[100],
  },
  placeholder: {
    backgroundColor: COLORS.gray[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
  },
});
