import React from 'react';

import { StyleSheet, TouchableOpacity } from 'react-native';

import { useRouter } from 'expo-router';

import { Ionicons } from '@expo/vector-icons';

import { COLORS } from '@/src/constants/colors';
import { IBackButtonProps } from '@/src/types/components/BackButton';

export default function BackButton({
  onPress,
  size = 40,
  iconSize = 22,
  color = COLORS.borderFocus,
  style,
}: IBackButtonProps) {
  const router = useRouter();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        styles.backBtn,
        {
          height: size,
          width: size,
          borderRadius: size / 2,
        },
        style,
      ]}
      onPress={onPress ?? router.back}
    >
      <Ionicons name="arrow-back" size={iconSize} color={color} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  backBtn: {
    borderWidth: 1,
    borderColor: COLORS.borderFocus,
    backgroundColor: COLORS.brand.muted,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
