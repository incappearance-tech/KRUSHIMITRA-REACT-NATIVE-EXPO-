import React from 'react';
import {
  Control,
  Controller,
  FieldValues,
  Path,
} from 'react-hook-form';
import {
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import { COLORS } from '../constants/colors';

type FormSwitchProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  disabled?: boolean;
};

function FormSwitch<T extends FieldValues>({
  control,
  name,
  label,
  disabled = false,
}: FormSwitchProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <View style={styles.container}>
          <Text style={styles.label}>{label}</Text>

          <Switch
            value={!!value}
            onValueChange={onChange}
            disabled={disabled}
            trackColor={{
              false: COLORS.border,
              true: COLORS.brand.primary,
            }}
            thumbColor={COLORS.white}
          />
        </View>
      )}
    />
  );
}

export default FormSwitch;

/* =======================
   Styles
   ======================= */
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
});
