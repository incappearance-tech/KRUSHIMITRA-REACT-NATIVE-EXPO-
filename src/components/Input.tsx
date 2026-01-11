import { StyleSheet, TextInput } from 'react-native';
import { COLORS } from '../constants/colors';

import { IInputProps } from '@/src/types/components/Input';

export default function Input({
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
  secureTextEntry = false,
}: IInputProps) {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      placeholderTextColor={COLORS.textLight}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginVertical: 8,
    fontSize: 16,
    color: COLORS.text,
    backgroundColor: COLORS.white,
  },
});
