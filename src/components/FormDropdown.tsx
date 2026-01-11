import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Controller,
  FieldValues
} from 'react-hook-form';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS } from '../constants/colors';

import { IFormDropdownProps } from '@/src/types/components/FormDropdown';

function FormDropdown<TForm extends FieldValues, TValue extends string>({
  control,
  name,
  label,
  placeholder = 'Select',
  options,
  disabled = false,
  required
}: IFormDropdownProps<TForm, TValue>) {
  const [visible, setVisible] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState }) => (
        <View style={styles.field}>
          {/* Label */}
          {label && <Text style={styles.label}>{label}
            {required && <Text style={styles.required}> *</Text>}

          </Text>}

          {/* Input */}
          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              styles.input,
              fieldState.error && styles.inputError,
              disabled && styles.inputDisabled,
            ]}
            onPress={() => !disabled && setVisible(true)}
          >
            <Text
              style={[
                styles.inputText,
                !value && styles.placeholder,
              ]}
            >
              {value || placeholder}
            </Text>

            <MaterialIcons
              name="expand-more"
              size={24}
              color={COLORS.textSecondary}
              style={styles.icon}
            />
          </TouchableOpacity>

          {/* Error */}
          {fieldState.error?.message && (
            <Text style={styles.error}>
              {fieldState.error.message}
            </Text>
          )}

          {/* Modal */}
          <Modal visible={visible} transparent animationType="fade">
            <TouchableOpacity
              style={styles.overlay}
              activeOpacity={1}
              onPress={() => setVisible(false)}
            >
              <View style={styles.sheet}>
                <Text style={styles.sheetTitle}>
                  {label ? `Select ${label}` : 'Select'}
                </Text>

                <FlatList
                  data={options}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => {
                    const selected = item === value;

                    return (
                      <TouchableOpacity
                        style={styles.option}
                        onPress={() => {
                          onChange(item);
                          setVisible(false);
                        }}
                      >
                        <Text
                          style={[
                            styles.optionText,
                            selected && styles.optionActive,
                          ]}
                        >
                          {item}
                        </Text>

                        {selected && (
                          <MaterialIcons
                            name="check"
                            size={20}
                            color={COLORS.brand.primary}
                          />
                        )}
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            </TouchableOpacity>
          </Modal>
        </View>
      )}
    />
  );
}

export default FormDropdown;

/* =======================
   Styles
   ======================= */
const styles = StyleSheet.create({
  field: {
    marginBottom: 12,
  },

  label: {
    fontSize: 16,
    marginBottom: 8,
    color: COLORS.text,
    fontWeight: '500',
  },

  required: {
    color: COLORS.danger,
  },

  input: {
    height: 48,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },

  inputDisabled: {
    backgroundColor: COLORS.background,
  },

  inputError: {
    borderColor: COLORS.danger,
  },

  inputText: {
    fontSize: 15,
    color: COLORS.text,
  },

  placeholder: {
    color: COLORS.textLight,
  },

  icon: {
    position: 'absolute',
    right: 12,
  },

  error: {
    marginTop: 6,
    fontSize: 13,
    color: COLORS.danger,
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },

  sheet: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '50%',
  },

  sheetTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
    color: COLORS.text,
  },

  option: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.background,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  optionText: {
    fontSize: 16,
    color: COLORS.text,
  },

  optionActive: {
    color: COLORS.brand.primary,
    fontWeight: '700',
  },
});
