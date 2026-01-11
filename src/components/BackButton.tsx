import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { COLORS } from '@/src/constants/colors';

interface BackButtonProps {
  onPress?: () => void;
  size?: number;
  iconSize?: number;
  color?: string;
  style?: ViewStyle;
}

export default function BackButton({
  onPress,
  size = 40,
  iconSize = 22,
  color = COLORS.borderFocus,
  style,
}: BackButtonProps) {
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
