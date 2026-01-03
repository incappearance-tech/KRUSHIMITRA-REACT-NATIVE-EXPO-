import { StyleSheet, Text, View } from 'react-native';

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
}

export default function RatingStars({ rating, maxRating = 5 }: RatingStarsProps) {
  return (
    <View style={styles.container}>
      {Array.from({ length: maxRating }).map((_, index) => (
        <Text
          key={index}
          style={[styles.star, { color: index < rating ? '#ffc107' : '#ddd' }]}
        >
          ★
        </Text>
      ))}
      <Text style={styles.rating}>
        {rating}/{maxRating}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center' },
  star: { fontSize: 18, marginRight: 4 },
  rating: { marginLeft: 8, fontSize: 12, fontWeight: '600' },
});
