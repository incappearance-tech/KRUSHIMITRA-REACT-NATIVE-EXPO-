import { Platform } from 'react-native';

import * as ImagePicker from 'expo-image-picker';

export const permissions = {
  async requestCamera() {
    if (Platform.OS === 'web') return true;
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    return status === 'granted';
  },

  async requestPhotoLibrary() {
    if (Platform.OS === 'web') return true;
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    return status === 'granted';
  },

  async requestLocation() {
    if (Platform.OS === 'web') return true;
    // Location permission stub - implement when needed
    return true;
  },

  async requestContacts() {
    if (Platform.OS === 'web') return true;
    // Contacts permission is platform-specific and requires native code
    // For now, returning true as it's not directly available in Expo
    return true;
  },
};
