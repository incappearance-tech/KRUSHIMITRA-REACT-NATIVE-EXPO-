import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardTypeOptions,
  Pressable,
} from 'react-native';
import {
  Controller,
  Control,
  FieldValues,
  Path,
} from 'react-hook-form';

type FormInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;

  placeholder?: string;
  required?: boolean;

  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;

  multiline?: boolean;
  numberOfLines?: number;

  disabled?: boolean;
  readOnly?: boolean;

  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  maxLength?: number;
};

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
}: FormInputProps<T>) {
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
              style={[
                styles.input,
                multiline && styles.multilineInput,
              ]}
              value={field.value}
              onChangeText={field.onChange}
              placeholder={placeholder}
              placeholderTextColor="#888"
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
          {fieldState.error?.message && (
            <Text style={styles.error}>
              {fieldState.error.message}
            </Text>
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
    marginBottom: 20,
  },

  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#1A1A1A',
    fontWeight: '500',
  },

  required: {
    color: '#D32F2F',
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DADADA',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
  },

  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 14,
    color: '#1A1A1A',
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
    borderColor: '#D32F2F',
  },

  inputDisabled: {
    backgroundColor: '#F2F2F2',
  },

  error: {
    marginTop: 6,
    fontSize: 13,
    color: '#D32F2F',
  },
});
