# Multi-Language Setup Guide

## Overview
The app now supports 3 languages:
- **English** (en)
- **Hindi** (hi) 
- **Marathi** (mr)

## Architecture

### 1. **I18n Configuration** (`src/services/i18n.ts`)
- Initializes i18next with all language resources
- Automatically detects system language
- Persists language selection to AsyncStorage
- Functions:
  - `initializeI18n()` - Initialize i18n and restore saved language
  - `changeLanguage(lang)` - Change language and save to storage
  - `getSavedLanguage()` - Get previously saved language

### 2. **Language Context** (`src/context/LanguageContext.tsx`)
- Provides language state and management to the entire app
- `LanguageProvider` - Wraps the app in the root layout
- `useLanguage()` hook - Access current language and setLanguage function

### 3. **Language Files** (`src/locales/`)
- `en.json` - English translations
- `hi.json` - Hindi translations
- `mr.json` - Marathi translations

Translation structure:
```json
{
  "common": { ... },
  "language": { ... },
  "auth": { ... },
  "roles": { ... },
  "farmer": { ... },
  "labour": { ... },
  "transporter": { ... },
  "navigation": { ... }
}
```

## Usage in Components

### Basic Usage
```tsx
import { useTranslation } from 'react-i18next';

export default function MyComponent() {
  const { t } = useTranslation();

  return <Text>{t('auth.mobile_number')}</Text>;
}
```

### Changing Language
```tsx
import { useLanguage } from '../context/LanguageContext';

export default function LanguageSelector() {
  const { setLanguage } = useLanguage();

  return (
    <TouchableOpacity onPress={() => setLanguage('hi')}>
      <Text>Switch to Hindi</Text>
    </TouchableOpacity>
  );
}
```

### Getting Current Language
```tsx
import { useLanguage } from '../context/LanguageContext';

export default function MyComponent() {
  const { currentLanguage } = useLanguage();

  return <Text>Current: {currentLanguage}</Text>;
}
```

## Adding New Translations

1. **Add to all locale files** (`en.json`, `hi.json`, `mr.json`):
```json
{
  "myFeature": {
    "title": "My Title",
    "description": "My description"
  }
}
```

2. **Use in component**:
```tsx
const { t } = useTranslation();
<Text>{t('myFeature.title')}</Text>
```

## Language Persistence

Language selection is automatically saved to AsyncStorage with key: `app_language`

When app restarts:
1. Check for saved language
2. If found, use saved language
3. If not found, detect system language
4. Default to English if detection fails

## Current Implementation Status

✅ **Completed:**
- i18n service with initialization
- Language context provider
- Comprehensive translations (3 languages)
- Language selection screen with translations
- Login/OTP/Role screens integrated with i18n
- Automatic language persistence

⏳ **Next Steps:**
- Update all dashboard screens with translations
- Add language settings screen
- Update all other screens and components

## Files Modified/Created

**Created:**
- `src/services/i18n.ts` - i18n configuration
- `src/context/LanguageContext.tsx` - Language context provider

**Updated:**
- `src/app/_layout.tsx` - Added LanguageProvider
- `src/app/(auth)/language.tsx` - Language selection with i18n
- `src/app/(auth)/login.tsx` - Added translations
- `src/app/(auth)/otp.tsx` - Added translations
- `src/app/(auth)/role-select.tsx` - Added translations
- `src/locales/en.json` - Comprehensive English translations
- `src/locales/hi.json` - Comprehensive Hindi translations
- `src/locales/mr.json` - Comprehensive Marathi translations
