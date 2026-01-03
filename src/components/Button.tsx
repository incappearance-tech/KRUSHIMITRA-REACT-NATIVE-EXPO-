import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
}

export default function Button({ title, onPress, variant = 'primary' }: ButtonProps) {
  const style = variant === 'primary' ? styles.primary : styles.secondary;

  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: { paddingHorizontal: 24, paddingVertical: 12, borderRadius: 8, alignItems: 'center', marginVertical: 8 },
  primary: { backgroundColor: '#4CAF50' },
  secondary: { backgroundColor: '#999' },
  text: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
