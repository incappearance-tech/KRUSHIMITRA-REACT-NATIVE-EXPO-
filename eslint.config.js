// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const security = require('eslint-plugin-security');
const prettier = require('eslint-config-prettier');

module.exports = defineConfig([
  // Expo base config
  expoConfig,

  // Security rules
  {
    plugins: {
      security,
    },
    rules: {
      ...security.configs.recommended.rules,

      // RN-safe overrides
      'security/detect-object-injection': 'off',
    },
  },

  // Disable ESLint rules that conflict with Prettier
  prettier,

  // Project-specific ignores
  {
    ignores: ['dist/*', 'node_modules/*', '.expo/*', 'android/*', 'ios/*'],
  },
]);
