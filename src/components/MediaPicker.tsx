import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Video, ResizeMode } from 'expo-av';

type MediaItem = {
  uri: string;
  type: 'image' | 'video';
};

type MediaPickerProps = {
  title?: string;
  media: MediaItem[];
  min?: number;
  max?: number;
  onAdd: () => void;
  onRemove: (index: number) => void;
};

const MediaPicker: React.FC<MediaPickerProps> = ({
  title = 'Photos & Videos',
  media,
  min = 0,
  max = 5,
  onAdd,
  onRemove,
}) => {
  const isInvalid = media.length < min;

  return (
    <View style={styles.section}>
      {/* Header */}
      <View style={styles.rowBetween}>
        <Text style={styles.heading}>{title}</Text>
        <Text style={[styles.subText, isInvalid && styles.errorText]}>
          {media.length}/{max} {min > 0 && `(Min ${min})`}
        </Text>
      </View>

      {/* Media List */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scroll}
      >
        {/* Add Button */}
        {media.length < max && (
          <TouchableOpacity style={styles.addBox} onPress={onAdd}>
            <View style={styles.iconCircle}>
              <MaterialIcons name="add-a-photo" size={24} color="#2E7D32" />
            </View>
            <Text style={styles.addText}>Add</Text>
          </TouchableOpacity>
        )}

        {/* Media Items */}
        {media.map((item, index) => (
          <View key={index} style={styles.mediaWrapper}>
            {item.type === 'video' ? (
              <>
                <Video
                  style={styles.media}
                  source={{ uri: item.uri }}
                  resizeMode={ResizeMode.COVER}
                  shouldPlay={false}
                  isMuted
                />
                <View style={styles.videoOverlay}>
                  <MaterialIcons
                    name="play-circle-fill"
                    size={24}
                    color="#fff"
                  />
                </View>
              </>
            ) : (
              <Image source={{ uri: item.uri }} style={styles.media} />
            )}

            {/* Remove */}
            <TouchableOpacity
              style={styles.removeBtn}
              onPress={() => onRemove(index)}
            >
              <MaterialIcons name="close" size={14} color="#fff" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default MediaPicker;

/* =======================
   Styles
   ======================= */
const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  heading: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },

  subText: {
    fontSize: 14,
    color: '#6B7280',
  },

  errorText: {
    color: '#D32F2F',
  },

  scroll: {
    marginTop: 12,
  },

  addBox: {
    width: 110,
    height: 110,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#E5E7EB',
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  iconCircle: {
    backgroundColor: 'rgba(46,125,50,0.1)',
    padding: 8,
    borderRadius: 50,
    marginBottom: 4,
  },

  addText: {
    fontSize: 12,
    color: '#2E7D32',
    fontWeight: '500',
  },

  mediaWrapper: {
    position: 'relative',
    marginRight: 12,
  },

  media: {
    width: 110,
    height: 110,
    borderRadius: 12,
    backgroundColor: '#000',
  },

  videoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },

  removeBtn: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#D32F2F',
    borderRadius: 12,
    width: 22,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
});
