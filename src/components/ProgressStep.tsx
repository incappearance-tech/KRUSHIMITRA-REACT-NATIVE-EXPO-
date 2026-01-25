import React from 'react';

import { StyleSheet, Text, View } from 'react-native';

interface ProgressStepProps {
  currentStep: number;
  totalSteps: number;
  label: string;
}

export const ProgressStep: React.FC<ProgressStepProps> = ({
  currentStep,
  totalSteps,
  label,
}) => {
  const progressPercent = (currentStep / totalSteps) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.textRow}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.stepIndicator}>
          Step {currentStep} of {totalSteps}
        </Text>
      </View>
      <View style={styles.barBackground}>
        <View style={[styles.barFill, { width: `${progressPercent}%` }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 16, marginBottom: 8 },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  label: { fontSize: 14, fontWeight: '600', color: '#0f172a' },
  stepIndicator: { fontSize: 12, fontWeight: '500', color: '#15803d' },
  barBackground: {
    height: 8,
    backgroundColor: '#dcfce7',
    borderRadius: 4,
    overflow: 'hidden',
  },
  barFill: { height: '100%', backgroundColor: '#37ec13', borderRadius: 4 },
});
