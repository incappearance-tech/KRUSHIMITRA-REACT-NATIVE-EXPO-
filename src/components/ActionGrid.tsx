import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ActionGridProps {
  actions: Array<{
    id: string;
    label: string;
    icon: string;
    onPress: () => void;
  }>;
}

export default function ActionGrid({ actions }: ActionGridProps) {
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
  container: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' },
  card: { width: '45%', aspectRatio: 1, backgroundColor: '#f5f5f5', borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginVertical: 8 },
  icon: { fontSize: 32, marginBottom: 8 },
  label: { fontSize: 12, fontWeight: '600', textAlign: 'center' },
});
