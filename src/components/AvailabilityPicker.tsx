import React, { useCallback, useEffect, useMemo, useState } from 'react';

import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';

import {
  IAvailabilityOption,
  IAvailabilityPickerProps,
  IAvailabilityValue,
} from '@/src/types/components/AvailabilityPicker';

import { COLORS } from '../constants/colors';

/* =======================
   Type Guard
   ======================= */
const hasDate = (
  value: IAvailabilityValue,
): value is { key: string; date: Date } => {
  return 'date' in value;
};

/* =======================
   Component
   ======================= */

const AvailabilityPicker: React.FC<IAvailabilityPickerProps> = ({
  label = 'Available From',
  options,
  value,
  onChange,
}) => {
  /* ---------- Safe Default ---------- */
  const defaultOption = useMemo(() => {
    if (!options.length) {
      throw new Error('AvailabilityPicker requires at least one option');
    }
    return options[0];
  }, [options]);

  const [selectedKey, setSelectedKey] = useState<string>(
    value?.key ?? defaultOption.key,
  );

  const [date, setDate] = useState<Date>(
    value && hasDate(value)
      ? (value as { key: string; date: Date }).date
      : new Date(),
  );

  const [showPicker, setShowPicker] = useState(false);

  /* ---------- Sync from Parent ---------- */
  useEffect(() => {
    if (!value) return;

    setSelectedKey(value.key);

    if (hasDate(value)) {
      setDate(value.date);
    }
  }, [value]);

  /* ---------- Handlers ---------- */
  const handleSelect = useCallback(
    (option: IAvailabilityOption) => {
      setSelectedKey(option.key);

      if (option.type === 'static') {
        setShowPicker(false);
        onChange({ key: option.key });
        return;
      }

      setShowPicker(true);
      onChange({ key: option.key, date });
    },
    [date, onChange],
  );

  const handleDateChange = useCallback(
    (_: unknown, selected?: Date) => {
      if (!selected) return;

      setDate(selected);
      setShowPicker(Platform.OS === 'ios');

      onChange({
        key: selectedKey,
        date: selected,
      });
    },
    [onChange, selectedKey],
  );

  /* ---------- Render ---------- */
  return (
    <View style={styles.fieldGroup}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={styles.rowGap}>
        {options.map((option) => {
          const isActive = selectedKey === option.key;

          return (
            <TouchableOpacity
              key={option.key}
              onPress={() => handleSelect(option)}
              style={[styles.radioBoxRow, isActive && styles.radioBoxActive]}
            >
              <View
                style={[
                  styles.radioCircle,
                  isActive && styles.radioCircleActive,
                ]}
              />

              <Text style={styles.radioLabel}>
                {option.type === 'date' && isActive
                  ? date.toLocaleDateString()
                  : option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          minimumDate={new Date()}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
        />
      )}
    </View>
  );
};

export default AvailabilityPicker;

/* =======================
   Styles
   ======================= */

const styles = StyleSheet.create({
  fieldGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textSecondary,
    marginBottom: 6,
  },
  rowGap: {
    flexDirection: 'row',
    gap: 12,
  },
  radioBoxRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    backgroundColor: COLORS.white,
  },
  radioBoxActive: {
    borderColor: COLORS.brand.primary,
    backgroundColor: COLORS.brand.muted,
  },
  radioCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: COLORS.textLight,
    marginRight: 8,
  },
  radioCircleActive: {
    borderColor: COLORS.brand.primary,
    backgroundColor: COLORS.brand.primary,
  },
  radioLabel: {
    fontSize: 14,
    color: COLORS.text,
  },
});
