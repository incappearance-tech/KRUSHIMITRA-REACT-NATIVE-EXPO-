import { StyleSheet, Text, View } from 'react-native';

export default function TransporterDashboard() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Transporter Dashboard
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24 },
});
