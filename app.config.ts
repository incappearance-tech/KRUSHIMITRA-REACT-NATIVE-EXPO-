import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext) => ({
  ...config,
  plugins: [
    ...(config.plugins || []),
    "@react-native-community/datetimepicker"
  ],
  extra: {
    ...config.extra,
    apiBaseUrl: 'https://api.krushimitra.com',
    appVersion: '1.0.0',
    eas: {
      projectId: "4f8ce05d-02e4-472d-b21e-ef0139acfba8"
    }
  }
});
