import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SellMachineForm, sellMachineSchema } from '@/src/validators/sellMachine.schema';
import { navigate } from 'expo-router/build/global-state/routing';

const CONDITIONS = ['Fair', 'Good', 'Excellent'] as const;
const USAGE_TYPES = ['Personal', 'Commercial'] as const;

export default function SellMachineScreen() {
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SellMachineForm>({
    resolver: zodResolver(sellMachineSchema),
    defaultValues: {
      media: [],
      category: '',
      condition: 'Good',
      modelYear: '',
      price: '',
      usageType: 'Personal',
      location: '',
    },
  });

  const media = watch('media');
  const condition = watch('condition');
  const usageType = watch('usageType');

  const pickMedia = async () => {
    if (media.length >= 5) return;

    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) return;

    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 0.7,
      videoMaxDuration: 60,
    });

    if (!res.canceled) {
      setValue('media', [...media, res.assets[0]], {
        shouldValidate: true,
      });
    }
  };

  const removeMedia = (index: number) => {
    setValue(
      'media',
      media.filter((_, i) => i !== index),
      { shouldValidate: true }
    );
  };

  const onSubmit = (data: SellMachineForm) => {
    console.log('VALID SELL MACHINE DATA:', data);
    navigate('/(farmer)/sell-machine/select-plan');
  };

  return (
    <View style={styles.root}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sell Machine</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* MEDIA */}
        <Text style={styles.sectionTitle}>
          Upload Photos / Video <Text style={styles.required}>*</Text>
        </Text>

        <View style={styles.photoGrid}>
          {media.length < 5 && (
            <TouchableOpacity style={styles.addPhoto} onPress={pickMedia}>
              <Ionicons name="camera" size={28} color="#16A34A" />
              <Text style={styles.addPhotoText}>Add</Text>
            </TouchableOpacity>
          )}

          {media.map((item, i) => (
            <View key={i} style={styles.photoWrap}>
              {item.type?.startsWith('video') ? (
                <View style={styles.videoThumb}>
                  <Ionicons name="play-circle" size={32} color="#fff" />
                </View>
              ) : (
                <Image source={{ uri: item.uri }} style={styles.photo} />
              )}

              <TouchableOpacity
                style={styles.removeBtn}
                onPress={() => removeMedia(i)}
              >
                <Ionicons name="close" size={14} color="#fff" />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {errors.media && (
          <Text style={styles.error}>{errors.media.message}</Text>
        )}

        {/* CATEGORY */}
        <Text style={styles.label}>Category *</Text>
        <TextInput
          style={styles.input}
          placeholder="Select machine type"
          onChangeText={(v) =>
            setValue('category', v, { shouldValidate: true })
          }
        />
        {errors.category && (
          <Text style={styles.error}>{errors.category.message}</Text>
        )}

        {/* CONDITION */}
        <Text style={styles.label}>Condition *</Text>
        <View style={styles.toggleRow}>
          {CONDITIONS.map(c => (
            <TouchableOpacity
              key={c}
              style={[
                styles.toggleBtn,
                condition === c && styles.toggleActive,
              ]}
              onPress={() =>
                setValue('condition', c, { shouldValidate: true })
              }
            >
              <Text
                style={[
                  styles.toggleText,
                  condition === c && styles.toggleTextActive,
                ]}
              >
                {c}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* YEAR + PRICE */}
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Model Year *</Text>
            <TextInput
              style={styles.input}
              placeholder="YYYY"
              keyboardType="number-pad"
              maxLength={4}
              onChangeText={(v) =>
                setValue('modelYear', v, { shouldValidate: true })
              }
            />
            {errors.modelYear && (
              <Text style={styles.error}>{errors.modelYear.message}</Text>
            )}
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Price *</Text>
            <View style={styles.priceWrap}>
              <Text style={styles.rupee}>₹</Text>
              <TextInput
                style={styles.priceInput}
                keyboardType="number-pad"
                onChangeText={(v) =>
                  setValue('price', v, { shouldValidate: true })
                }
              />
            </View>
            {errors.price && (
              <Text style={styles.error}>{errors.price.message}</Text>
            )}
          </View>
        </View>

        {/* USAGE */}
        <Text style={styles.label}>Usage Type *</Text>
        <View style={styles.usageGrid}>
          {USAGE_TYPES.map(t => (
            <TouchableOpacity
              key={t}
              style={[
                styles.usageCard,
                usageType === t && styles.usageActive,
              ]}
              onPress={() =>
                setValue('usageType', t, { shouldValidate: true })
              }
            >
              <MaterialIcons
                name={t === 'Personal' ? 'person' : 'work'}
                size={20}
              />
              <Text>{t}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* LOCATION */}
        <Text style={styles.label}>Location *</Text>
        <TextInput
          style={styles.input}
          placeholder="City or Pincode"
          onChangeText={(v) =>
            setValue('location', v, { shouldValidate: true })
          }
        />
        {errors.location && (
          <Text style={styles.error}>{errors.location.message}</Text>
        )}
      </ScrollView>

      {/* FOOTER */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.publishBtn}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.publishText}>Publish Listing</Text>
          <Ionicons name="checkmark-circle" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}


export const styles = StyleSheet.create({
  /* ROOT */
  root: {
    flex: 1,
    backgroundColor: '#F8FAF8',
  },

  /* HEADER */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
  },

  error: {
  color: '#DC2626',
  fontSize: 12,
  marginBottom: 4,
},


  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },

  /* CONTENT */
  content: {
    padding: 16,
    paddingBottom: 140,
  },

  /* DRAFT */
  draftRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  draftBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },

  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#F59E0B',
    marginRight: 6,
  },

  draftText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#92400E',
  },

  stepText: {
    fontSize: 12,
    color: '#6B7280',
  },

  /* SECTION */
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6,
  },

  subText: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 12,
  },

  required: {
    color: '#DC2626',
  },

  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 20,
  },

  /* MEDIA GRID */
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },

  addPhoto: {
    width: 96,
    height: 96,
    borderRadius: 16,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#22C55E',
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
  },

  addPhotoText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#16A34A',
    marginTop: 4,
  },

  photoWrap: {
    position: 'relative',
  },

  photo: {
    width: 96,
    height: 96,
    borderRadius: 16,
  },

  /* VIDEO THUMB (NEW) */
  videoThumb: {
    width: 96,
    height: 96,
    borderRadius: 16,
    backgroundColor: '#111827',
    alignItems: 'center',
    justifyContent: 'center',
  },

  removeBtn: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#EF4444',
    borderRadius: 12,
    padding: 4,
  },

  photoCount: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'right',
    marginTop: 6,
  },

  /* FORM */
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 6,
  },

  input: {
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    paddingHorizontal: 14,
    backgroundColor: '#FFFFFF',
    marginBottom: 4,
  },

  row: {
    flexDirection: 'row',
    gap: 12,
  },

  /* TOGGLE */
  toggleRow: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    padding: 4,
    borderRadius: 12,
    marginBottom: 14,
  },

  toggleBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },

  toggleActive: {
    backgroundColor: '#FFFFFF',
  },

  toggleText: {
    fontSize: 13,
    color: '#6B7280',
  },

  toggleTextActive: {
    fontWeight: '700',
    color: '#111827',
  },

  /* PRICE */
  priceWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    backgroundColor: '#FFFFFF',
  },

  rupee: {
    fontSize: 16,
    marginRight: 6,
  },

  priceInput: {
    flex: 1,
  },

  /* USAGE */
  usageGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 14,
  },

  usageCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFFFFF',
  },

  usageActive: {
    borderColor: '#22C55E',
    backgroundColor: '#ECFDF5',
  },

  /* SUMMARY */
  summary: {
    marginTop: 20,
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#EFF6FF',
  },

  summaryTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 12,
    color: '#1E3A8A',
  },

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },

  green: {
    color: '#16A34A',
    fontWeight: '700',
  },

  /* FOOTER */
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFFEE',
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#E5E7EB',
  },

  publishBtn: {
    height: 56,
    borderRadius: 26,
    backgroundColor: '#22C55E',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },

  publishText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
});
