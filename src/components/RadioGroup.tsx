import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS } from '../constants/colors';

export type RadioOption<T extends string> = {
  label: string;
  value: T;
};

type RadioGroupProps<T extends string> = {
  label?: string;
  value?: T;
  options: RadioOption<T>[];
  onChange: (value: T) => void;
};

function RadioGroup<T extends string>({
  label,
  value,
  options,
  onChange,
}: RadioGroupProps<T>) {
  return (
    <View style={styles.fieldGroup}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={styles.radioGroup}>
        {options.map((option) => {
          const isActive = option.value === value;

          return (
            <TouchableOpacity
              key={option.value}
              onPress={() => onChange(option.value)}
              style={[
                styles.radioButton,
                isActive && styles.radioButtonActive,
              ]}
            >
              <Text
                style={[
                  styles.radioText,
                  isActive && styles.radioTextActive,
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export default RadioGroup;

/* =======================
   Styles
   ======================= */
const styles = StyleSheet.create({
  fieldGroup: {
    marginBottom: 16,
  },

  label: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textSecondary,
    marginBottom: 6,
  },

  radioGroup: {
    flexDirection: 'row',
    gap: 8,
  },

  radioButton: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },

  radioButtonActive: {
    backgroundColor: COLORS.brand.primary,
    borderColor: COLORS.brand.primary,
  },

  radioText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textSecondary,
  },

  radioTextActive: {
    color: COLORS.black,
    fontWeight: '600',
  },
});
