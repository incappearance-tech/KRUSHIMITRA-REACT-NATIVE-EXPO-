import { StyleSheet, View } from 'react-native';

interface CardProps {
  children: React.ReactNode;
}

export default function Card({ children }: CardProps) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 8, paddingHorizontal: 16, paddingVertical: 12, marginVertical: 8 },
});
