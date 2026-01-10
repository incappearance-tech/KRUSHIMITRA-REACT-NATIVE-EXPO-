import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LanguageProvider } from '../context/LanguageContext';
import { loadSavedLanguage } from '../services/i18n';
import { COLORS } from '../constants/colors';

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        await loadSavedLanguage();
      } catch (error) {
        console.error('Failed to load language:', error);
      } finally {
        setIsReady(true);
      }
    };

    init();
  }, []);

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <LanguageProvider>
      <SafeAreaView style={{ flex: 1,backgroundColor:COLORS.background,paddingLeft:16,paddingRight:16 }}>
        {/* Default system status bar (no overlap) */}
        <StatusBar style="light" />

        <Stack
          screenOptions={{
            headerShown: false,
            animation: 'fade',
          }}
        />
      </SafeAreaView>
    </LanguageProvider>
  );
}
