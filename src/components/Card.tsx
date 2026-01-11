import { StyleSheet, View } from 'react-native';

import { ICardProps } from '@/src/types/components/Card';

export default function Card({ children }: ICardProps) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 8, paddingHorizontal: 16, paddingVertical: 12, marginVertical: 8 },
});
