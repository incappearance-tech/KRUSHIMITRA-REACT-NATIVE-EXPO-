import React from 'react';

import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { Controller, FieldValues } from 'react-hook-form';

import { IFormInputProps } from '@/src/types/components/FormInput';

import { COLORS } from '../constants/colors';

function FormInput<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  required = false,
  keyboardType = 'default',
  secureTextEntry = false,
  multiline = false,
  numberOfLines = 3,
  disabled = false,
  readOnly = false,
  leftIcon,
  rightIcon,
  maxLength,
  onRightIconPress,
  helperText,
  showHelperWhenError = false,
}: IFormInputProps<T>) {
  const isDisabled = disabled || readOnly;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <View style={styles.field}>
          {/* Label */}
          <Text style={styles.label}>
            {label}
            {required && <Text style={styles.required}> *</Text>}
          </Text>

          {/* Input Wrapper */}
          <View
            style={[
              styles.inputWrapper,
              fieldState.error && styles.inputError,
              isDisabled && styles.inputDisabled,
            ]}
          >
            {/* Left Icon */}
            {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}

            {/* Input */}
            <TextInput
              style={[styles.input, multiline && styles.multilineInput]}
              value={field.value}
              onChangeText={field.onChange}
              placeholder={placeholder}
              placeholderTextColor={COLORS.textLight}
              keyboardType={keyboardType}
              secureTextEntry={secureTextEntry}
              editable={!isDisabled}
              multiline={multiline}
              numberOfLines={multiline ? numberOfLines : 1}
              textAlignVertical={multiline ? 'top' : 'center'}
              maxLength={maxLength}
            />

            {/* Right Icon */}
            {rightIcon && (
              <Pressable
                onPress={onRightIconPress}
                disabled={!onRightIconPress}
                style={styles.iconRight}
              >
                {rightIcon}
              </Pressable>
            )}
          </View>

          {/* Error */}
          {/* Helper / Error */}
          {fieldState.error?.message ? (
            <>
              <Text style={styles.error}>{fieldState.error.message}</Text>
              {showHelperWhenError && helperText && (
                <Text style={styles.helper}>{helperText}</Text>
              )}
            </>
          ) : (
            helperText && <Text style={styles.helper}>{helperText}</Text>
          )}
        </View>
      )}
    />
  );
}

export default FormInput;

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

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    paddingHorizontal: 12,
  },

  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 14,
    color: COLORS.text,
  },

  multilineInput: {
    paddingTop: 14,
    paddingBottom: 14,
  },

  iconLeft: {
    marginRight: 8,
  },

  iconRight: {
    marginLeft: 8,
  },

  inputError: {
    borderColor: COLORS.danger,
  },

  inputDisabled: {
    backgroundColor: COLORS.gray[100],
  },

  error: {
    marginTop: 6,
    fontSize: 13,
    color: COLORS.danger,
  },
  helper: {
    marginTop: 4,
    fontSize: 13,
    color: COLORS.textLight,
  },
});
