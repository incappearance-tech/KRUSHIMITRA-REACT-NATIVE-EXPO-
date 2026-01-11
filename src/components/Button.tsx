import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS } from '../constants/colors';

import { IButtonProps, IButtonType } from '@/src/types/components/Button';

/* =======================
   Component
   ======================= */

const Button: React.FC<IButtonProps> = ({
  label,
  onPress,
  type = 'primary' as IButtonType,
  icon,

  loading = false,
  disabled = false,

  backgroundColor,
  textColor,
  borderColor,

  sticky = false,
}) => {
  const isDisabled = disabled || loading;

  const bg =
    backgroundColor ??
    (type === 'danger'
      ? COLORS.danger
      : type === 'secondary'
        ? COLORS.gray[50]
        : COLORS.primary[600]);

  const txtColor =
    textColor ??
    (type === 'secondary' ? '#374151' : COLORS.gray[200]);

  const brColor =
    borderColor ??
    (type === 'secondary' ? '#E5E7EB' : 'transparent');

  return (
    <View style={[sticky && styles.sticky]}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
        disabled={isDisabled}
        style={[
          styles.button,
          {
            backgroundColor: bg,
            borderColor: brColor,
          },
          isDisabled && styles.disabled,
        ]}
      >
        {loading ? (
          <ActivityIndicator color={txtColor} />
        ) : (
          <>
            <Text style={[styles.text, { color: txtColor }]}>
              {label}
            </Text>

            {icon && (
              <MaterialIcons
                name={icon}
                size={20}
                color={txtColor}
              />
            )}
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Button;

/* =======================
   Styles
   ======================= */

const styles = StyleSheet.create({
  sticky: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.background,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },

  button: {
    height: 56,
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,

  },

  text: {
    fontSize: 18,
    fontWeight: '700',
  },

  disabled: {
    opacity: 0.5,
  },
});
