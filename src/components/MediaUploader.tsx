import React, { useCallback, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
import { Video, ResizeMode } from 'expo-av';

/* =======================
   Types
   ======================= */
type MediaItem = {
  uri: string;
  type: 'image' | 'video';
};

type MediaUploaderProps = {
  title?: string;
  min?: number;
  max?: number;
  onChange: (media: MediaItem[]) => void;
};

/* =======================
   Media Item (Memoized)
   ======================= */
const MediaPreview = React.memo(
  ({
    item,
    onRemove,
  }: {
    item: MediaItem;
    onRemove: () => void;
  }) => {
    return (
      <View style={styles.mediaWrapper}>
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
              <MaterialIcons name="play-circle-fill" size={24} color="#fff" />
            </View>
          </>
        ) : (
          <Image source={{ uri: item.uri }} style={styles.media} />
        )}

        <TouchableOpacity style={styles.removeBtn} onPress={onRemove}>
          <MaterialIcons name="close" size={14} color="#fff" />
        </TouchableOpacity>
      </View>
    );
  }
);

/* =======================
   Main Component
   ======================= */
const MediaUploader: React.FC<MediaUploaderProps> = ({
  title = 'Photos & Videos',
  min = 0,
  max = 5,
  onChange,
}) => {
  const [media, setMedia] = useState<MediaItem[]>([]);

  /* ---------- Derived State ---------- */
  const countText = useMemo(
    () => `${media.length}/${max}${min ? ` (Min ${min})` : ''}`,
    [media.length, min, max]
  );

  const isInvalid = useMemo(
    () => media.length < min,
    [media.length, min]
  );

  /* ---------- Permission ---------- */
  const ensurePermission = useCallback(async () => {
    const { granted } =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) {
      Alert.alert('Permission required to upload photos/videos');
    }
    return granted;
  }, []);

  /* ---------- Pick Media ---------- */
  const pickMedia = useCallback(async () => {
    if (media.length >= max) {
      Alert.alert(`Maximum ${max} files allowed`);
      return;
    }

    const hasPermission = await ensurePermission();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      quality: 0.7,
    });

    if (result.canceled) return;

    const newItems: MediaItem[] = result.assets.map((asset) => ({
      uri: asset.uri,
      type: asset.type === 'video' ? 'video' : 'image',
    }));

    setMedia((prev) => {
      const updated = [...prev, ...newItems].slice(0, max);
      onChange(updated); // 🔥 send final data immediately
      return updated;
    });
  }, [ensurePermission, media.length, max, onChange]);

  /* ---------- Remove ---------- */
  const removeMedia = useCallback(
    (index: number) => {
      setMedia((prev) => {
        const updated = prev.filter((_, i) => i !== index);
        onChange(updated);
        return updated;
      });
    },
    [onChange]
  );

  /* =======================
     Render
     ======================= */
  return (
    <View style={styles.section}>
      {/* Header */}
      <View style={styles.rowBetween}>
        <Text style={styles.heading}>{title}</Text>
        <Text style={[styles.subText, isInvalid && styles.errorText]}>
          {countText}
        </Text>
      </View>

      {/* Media */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scroll}
      >
        {media.length < max && (
          <TouchableOpacity style={styles.addBox} onPress={pickMedia}>
            <View style={styles.iconCircle}>
              <MaterialIcons name="add-a-photo" size={24} color="#2E7D32" />
            </View>
            <Text style={styles.addText}>Add</Text>
          </TouchableOpacity>
        )}

        {media.map((item, index) => (
          <MediaPreview
            key={item.uri}
            item={item}
            onRemove={() => removeMedia(index)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default MediaUploader;

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
    inset: 0,
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
