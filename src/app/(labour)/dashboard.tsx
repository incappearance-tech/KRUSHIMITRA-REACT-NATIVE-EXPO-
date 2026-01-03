import { StyleSheet, Text, View } from 'react-native';

export default function LabourDashboard() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Labour Dashboard
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24 },
});
