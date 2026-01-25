import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { IActionGridProps } from '@/src/types/components/ActionGrid';

export default function ActionGrid({ actions }: IActionGridProps) {
  return (
    <View style={styles.container}>
      {actions.map((action) => (
        <TouchableOpacity
          key={action.id}
          style={styles.card}
          onPress={action.onPress}
        >
          <Text style={styles.icon}>{action.icon}</Text>
          <Text style={styles.label}>{action.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  card: {
    width: '45%',
    aspectRatio: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },
  icon: { fontSize: 32, marginBottom: 8 },
  label: { fontSize: 12, fontWeight: '600', textAlign: 'center' },
});
