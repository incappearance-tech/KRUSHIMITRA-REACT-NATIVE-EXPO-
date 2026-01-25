import React, { useMemo, useState } from 'react';

import {
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

import { Control, Controller, FieldValues, Path } from 'react-hook-form';

// Assuming COLORS is imported from your constants
import { COLORS } from '../constants/colors';

// Re-defining props interface for clarity since I don't have your specific type file
export interface IFormDropdownProps<TForm extends FieldValues> {
  control: Control<TForm>;
  name: Path<TForm>;
  label?: string;
  placeholder?: string;
  options: string[]; // Keeping it simple strings based on your code
  disabled?: boolean;
  required?: boolean;
  searchPlaceholder?: string;
}

function FormDropdown<TForm extends FieldValues>({
  control,
  name,
  label,
  placeholder = 'Select',
  options,
  disabled = false,
  required,
  searchPlaceholder = 'Search...',
}: IFormDropdownProps<TForm>) {
  const [visible, setVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // 1. Optimize Filtering: Only re-calculate when searchQuery or options change
  const filteredOptions = useMemo(() => {
    if (!searchQuery) return options;
    return options.filter((item: string) =>
      item.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [options, searchQuery]);

  const handleClose = () => {
    setVisible(false);
    setSearchQuery(''); // Reset search when closing
  };

  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: required ? 'This field is required' : false }}
      render={({ field: { value, onChange }, fieldState }) => (
        <View style={styles.field}>
          {/* Label */}
          {label && (
            <Text style={styles.label}>
              {label}
              {required && <Text style={styles.required}> *</Text>}
            </Text>
          )}

          {/* Trigger Button */}
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
              style={[styles.inputText, !value && styles.placeholder]}
              numberOfLines={1}
            >
              {value || placeholder}
            </Text>

            <MaterialIcons
              name="expand-more"
              size={24}
              color={COLORS.textSecondary || '#666'}
              style={styles.icon}
            />
          </TouchableOpacity>

          {/* Error Message */}
          {fieldState.error?.message && (
            <Text style={styles.error}>
              {fieldState.error.message as string}
            </Text>
          )}

          {/* Selection Modal */}
          <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={handleClose}
          >
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}
              style={styles.overlay}
            >
              <TouchableOpacity
                style={styles.backdrop}
                activeOpacity={1}
                onPress={handleClose}
              />

              <View style={styles.sheet}>
                <View style={styles.header}>
                  <Text style={styles.sheetTitle}>
                    {label ? `Select ${label}` : 'Select Option'}
                  </Text>
                  <TouchableOpacity onPress={handleClose}>
                    <MaterialIcons
                      name="close"
                      size={24}
                      color={COLORS.text || '#000'}
                    />
                  </TouchableOpacity>
                </View>

                {/* 2. Search Bar */}
                <View style={styles.searchContainer}>
                  <MaterialIcons
                    name="search"
                    size={20}
                    color={COLORS.textLight || '#999'}
                    style={styles.searchIcon}
                  />
                  <TextInput
                    style={styles.searchInput}
                    placeholder={searchPlaceholder}
                    placeholderTextColor={COLORS.textLight || '#999'}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    autoCorrect={false}
                  />
                  {searchQuery.length > 0 && (
                    <TouchableOpacity onPress={() => setSearchQuery('')}>
                      <MaterialIcons
                        name="cancel"
                        size={18}
                        color={COLORS.textLight || '#999'}
                      />
                    </TouchableOpacity>
                  )}
                </View>

                {/* 3. List with Virtualization for Large Data */}
                <FlatList
                  data={filteredOptions}
                  keyExtractor={(item) => item}
                  keyboardShouldPersistTaps="handled"
                  showsVerticalScrollIndicator={true}
                  initialNumToRender={15} // Optimization for large lists
                  maxToRenderPerBatch={20} // Optimization for large lists
                  ListEmptyComponent={() => (
                    <View style={styles.emptyContainer}>
                      <Text style={styles.emptyText}>No options found</Text>
                    </View>
                  )}
                  renderItem={({ item }) => {
                    const selected = item === value;
                    return (
                      <TouchableOpacity
                        style={[
                          styles.option,
                          selected && styles.optionSelectedBg,
                        ]}
                        onPress={() => {
                          onChange(item);
                          handleClose();
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
                            color={COLORS.brand?.primary || 'blue'}
                          />
                        )}
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            </KeyboardAvoidingView>
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
    color: COLORS.text || '#333',
    fontWeight: '500',
  },
  required: {
    color: COLORS.danger || 'red',
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: COLORS.border || '#DDD',
    borderRadius: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white || '#FFF',
  },
  inputDisabled: {
    backgroundColor: COLORS.background || '#F5F5F5',
  },
  inputError: {
    borderColor: COLORS.danger || 'red',
  },
  inputText: {
    fontSize: 15,
    color: COLORS.text || '#333',
    flex: 1,
  },
  placeholder: {
    color: COLORS.textLight || '#999',
  },
  icon: {
    marginLeft: 8,
  },
  error: {
    marginTop: 6,
    fontSize: 13,
    color: COLORS.danger || 'red',
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  sheet: {
    backgroundColor: COLORS.white || '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30, // Safety padding for bottom
    height: '70%', // Increased height for better list viewing
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text || '#333',
  },

  // Search Styles
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background || '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: COLORS.text || '#333',
    height: '100%',
  },

  // List Styles
  option: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.background || '#F5F5F5',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionSelectedBg: {
    backgroundColor: '#F9FAFB',
  },
  optionText: {
    fontSize: 16,
    color: COLORS.text || '#333',
  },
  optionActive: {
    color: COLORS.brand?.primary || 'blue',
    fontWeight: '700',
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    color: COLORS.textLight || '#999',
    fontSize: 14,
  },
});
