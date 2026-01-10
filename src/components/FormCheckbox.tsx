import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {
  Controller,
  Control,
  FieldValues,
  Path,
} from 'react-hook-form';

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
                color="#2E7D32"
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
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },

  checkboxChecked: {
    borderColor: '#2E7D32',
  },

  checkboxDisabled: {
    borderColor: '#E5E7EB',
    backgroundColor: '#F3F4F6',
  },

  text: {
    flex: 1,
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },

  textDisabled: {
    color: '#9CA3AF',
  },
});
