import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

// --- Theme Constants ---
const COLORS = {
  primary: '#37ec13',
  bgLight: '#f6f8f6',
  surface: '#ffffff',
  textMain: '#101b0d',
  textSub: '#599a4c',
  border: '#e5e7eb',
  starActive: '#37ec13',
  starInactive: '#d1d5db',
};

const FEEDBACK_TAGS = ["On Time", "Polite", "Hassle Free", "Genuine", "Fair Price"];

export default function RatingScreen() {
  return (
    <SafeAreaProvider>
      <RatingContent />
    </SafeAreaProvider>
  );
}

function RatingContent() {
  const insets = useSafeAreaInsets();
  
  // State
  const [rating, setRating] = useState(4);
  const [selectedTags, setSelectedTags] = useState(["On Time", "Polite"]);
  const [comment, setComment] = useState('');

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const getRatingText = () => {
    if (rating >= 5) return "Excellent!";
    if (rating >= 4) return "Good!";
    if (rating >= 3) return "Average";
    return "Could be better";
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Top App Bar */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity style={styles.iconButton}>
          <MaterialIcons name="arrow-back" size={24} color={COLORS.textMain} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Rating & Trust Update</Text>
        <View style={{ width: 48 }} />
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={{ flex: 1 }}
      >
        <ScrollView 
          contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 120 }]}
          showsVerticalScrollIndicator={false}
        >
          {/* Transaction Date */}
          <Text style={styles.dateLabel}>TRANSACTION COMPLETED: DEC 12, 2025</Text>

          {/* Summary Card */}
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1594411127027-02488e0e0f3e?q=80&w=150' }} 
                style={styles.tractorThumb} 
              />
              <View style={styles.summaryInfo}>
                <Text style={styles.tractorName}>John Deere 5050D</Text>
                <Text style={styles.soldTo}>Sold to: Ramesh Kumar</Text>
              </View>
              <View style={styles.checkBadge}>
                <MaterialIcons name="check-circle" size={20} color={COLORS.primary} />
              </View>
            </View>
          </View>

          {/* Rating Logic */}
          <View style={styles.ratingSection}>
            <Text style={styles.ratingPrompt}>How was your experience?</Text>
            <Text style={styles.ratingSubPrompt}>Rate your deal with Ramesh</Text>
            
            <View style={styles.starsRow}>
              {[1, 2, 3, 4, 5].map((num) => (
                <TouchableOpacity key={num} onPress={() => setRating(num)} activeOpacity={0.7}>
                  <MaterialIcons 
                    name={num <= rating ? "star" : "star-border"} 
                    size={48} 
                    color={num <= rating ? COLORS.starActive : COLORS.starInactive} 
                  />
                </TouchableOpacity>
              ))}
            </View>
            
            <Text style={styles.ratingStatusText}>{getRatingText()}</Text>
          </View>

          {/* Chips/Tags */}
          <View style={styles.tagsContainer}>
            {FEEDBACK_TAGS.map(tag => {
              const isActive = selectedTags.includes(tag);
              return (
                <TouchableOpacity 
                  key={tag} 
                  onPress={() => toggleTag(tag)}
                  style={[styles.tagChip, isActive && styles.tagChipActive]}
                >
                  <Text style={[styles.tagText, isActive && styles.tagTextActive]}>{tag}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Review Input */}
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textArea}
              placeholder="Write a short review (Optional)..."
              placeholderTextColor="#9ca3af"
              multiline
              value={comment}
              onChangeText={setComment}
            />
            <MaterialIcons name="edit-note" size={24} color="#d1d5db" style={styles.inputIcon} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Sticky Footer */}
      <View style={[styles.footer, { paddingBottom: Math.max(20, insets.bottom) }]}>
        <View style={styles.trustRow}>
          <MaterialIcons name="shield" size={14} color={COLORS.textSub} />
          <Text style={styles.trustText}>Your feedback helps build trust in our community.</Text>
        </View>
        <TouchableOpacity style={styles.submitButton} activeOpacity={0.8}>
          <Text style={styles.submitButtonText}>Submit Review</Text>
          <MaterialIcons name="send" size={20} color={COLORS.textMain} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bgLight },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 8,
    backgroundColor: COLORS.bgLight 
  },
  iconButton: { width: 48, height: 48, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 17, fontWeight: '700', color: COLORS.textMain },
  
  scrollContent: { paddingHorizontal: 20 },
  dateLabel: { 
    textAlign: 'center', 
    fontSize: 10, 
    fontWeight: '700', 
    color: COLORS.textSub, 
    letterSpacing: 1, 
    marginVertical: 12 
  },

  summaryCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    marginBottom: 32,
    ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5 }, android: { elevation: 2 } })
  },
  summaryRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  tractorThumb: { width: 60, height: 60, borderRadius: 12 },
  summaryInfo: { flex: 1 },
  tractorName: { fontSize: 16, fontWeight: '700', color: COLORS.textMain },
  soldTo: { fontSize: 14, color: COLORS.textSub, marginTop: 2 },
  checkBadge: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#f0fdf4', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(55,236,19,0.2)' },

  ratingSection: { alignItems: 'center', marginBottom: 24 },
  ratingPrompt: { fontSize: 22, fontWeight: '800', color: COLORS.textMain },
  ratingSubPrompt: { fontSize: 14, color: COLORS.textMuted, marginTop: 4, marginBottom: 20 },
  starsRow: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  ratingStatusText: { fontSize: 18, fontWeight: '700', color: COLORS.primary },

  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 10, marginBottom: 20 },
  tagChip: { 
    paddingHorizontal: 16, 
    paddingVertical: 8, 
    borderRadius: 25, 
    borderWidth: 1, 
    borderColor: '#e5e7eb', 
    backgroundColor: 'white' 
  },
  tagChipActive: { backgroundColor: 'rgba(55, 236, 19, 0.1)', borderColor: COLORS.primary },
  tagText: { fontSize: 13, fontWeight: '600', color: '#4b5563' },
  tagTextActive: { color: COLORS.textMain },

  inputWrapper: { width: '100%' },
  textArea: { 
    backgroundColor: 'white', 
    borderRadius: 16, 
    borderWidth: 1, 
    borderColor: COLORS.border, 
    padding: 16, 
    paddingRight: 40,
    fontSize: 15, 
    color: COLORS.textMain, 
    minHeight: 120, 
    textAlignVertical: 'top' 
  },
  inputIcon: { position: 'absolute', bottom: 12, right: 12 },

  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(246, 248, 246, 0.95)',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border
  },
  trustRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 12 },
  trustText: { fontSize: 11, color: COLORS.textSub },
  submitButton: { 
    height: 56, 
    backgroundColor: COLORS.primary, 
    borderRadius: 28, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    gap: 8,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6
  },
  submitButtonText: { fontSize: 18, fontWeight: '800', color: COLORS.textMain }
});