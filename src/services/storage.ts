import AsyncStorage from '@react-native-async-storage/async-storage';

export const storage = {
  async set(key: string, value: any) {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  },
  async get(key: string) {
    const v = await AsyncStorage.getItem(key);
    return v ? JSON.parse(v) : null;
  },
};
