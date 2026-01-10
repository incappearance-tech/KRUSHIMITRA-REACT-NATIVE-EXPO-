import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

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
    color: '#6B7280',
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
    borderColor: '#E5E7EB',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },

  radioButtonActive: {
    backgroundColor: '#2E7D32',
    borderColor: '#2E7D32',
  },

  radioText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },

  radioTextActive: {
    color: '#000000',
    fontWeight: '600',
  },
});
