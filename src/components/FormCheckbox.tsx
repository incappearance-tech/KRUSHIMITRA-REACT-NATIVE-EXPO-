import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
  Control,
  Controller,
  FieldValues,
  Path,
} from 'react-hook-form';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS } from '../constants/colors';

type FormCheckboxProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  disabled?: boolean;
};

function FormCheckbox<T extends FieldValues>({
  control,
  name,
  label,
  disabled = false,
}: FormCheckboxProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => !disabled && onChange(!value)}
          style={styles.container}
        >
          <View
            style={[
              styles.checkbox,
              value && styles.checkboxChecked,
              disabled && styles.checkboxDisabled,
            ]}
          >
            {value && (
              <MaterialIcons
                name="check"
                size={16}
                color={COLORS.brand.primary}
              />
            )}
          </View>

          <Text
            style={[
              styles.text,
              disabled && styles.textDisabled,
            ]}
          >
            {label}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
}

export default FormCheckbox;

/* =======================
   Styles
   ======================= */
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 8,
    marginBottom: 40,
  },

  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },

  checkboxChecked: {
    borderColor: COLORS.brand.primary,
  },

  checkboxDisabled: {
    borderColor: COLORS.border,
    backgroundColor: COLORS.background,
  },

  text: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },

  textDisabled: {
    color: COLORS.textLight,
  },
});
