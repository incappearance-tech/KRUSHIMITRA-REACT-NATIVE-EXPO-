import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import {
  Controller,
  Control,
  FieldValues,
  Path,
} from 'react-hook-form';
import { MaterialIcons } from '@expo/vector-icons';

type FormDropdownProps<TForm extends FieldValues, TValue extends string> = {
  control: Control<TForm>;
  name: Path<TForm>;

  label?: string;
  placeholder?: string;

  options: TValue[];
  disabled?: boolean;
};

function FormDropdown<TForm extends FieldValues, TValue extends string>({
  control,
  name,
  label,
  placeholder = 'Select',
  options,
  disabled = false,
}: FormDropdownProps<TForm, TValue>) {
  const [visible, setVisible] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState }) => (
        <View style={styles.field}>
          {/* Label */}
          {label && <Text style={styles.label}>{label}</Text>}

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
              color="#6B7280"
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
                            color="#2E7D32"
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
    marginBottom: 16,
  },

  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
    marginBottom: 6,
  },

  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },

  inputDisabled: {
    backgroundColor: '#F3F4F6',
  },

  inputError: {
    borderColor: '#D32F2F',
  },

  inputText: {
    fontSize: 15,
    color: '#111827',
  },

  placeholder: {
    color: '#9CA3AF',
  },

  icon: {
    position: 'absolute',
    right: 12,
  },

  error: {
    marginTop: 6,
    fontSize: 13,
    color: '#D32F2F',
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },

  sheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '50%',
  },

  sheetTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
    color: '#111827',
  },

  option: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  optionText: {
    fontSize: 16,
    color: '#111827',
  },

  optionActive: {
    color: '#2E7D32',
    fontWeight: '700',
  },
});
