import React from 'react';

import { KeyboardTypeOptions } from 'react-native';

import { Control, FieldValues, Path } from 'react-hook-form';

export interface IFormInputProps<T extends FieldValues> {
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
  helperText?: string;
  showHelperWhenError?: boolean;
}
