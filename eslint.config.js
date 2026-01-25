// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const security = require('eslint-plugin-security');
const prettier = require('eslint-config-prettier');
const importPlugin = require('eslint-plugin-import');
const unusedImports = require('eslint-plugin-unused-imports');

module.exports = defineConfig([
  // Expo base config
  expoConfig,

  // Import organization and unused imports
  {
    plugins: {
      'unused-imports': unusedImports,
    },
    rules: {
      // Remove unused imports automatically
      'no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],

      // Import ordering: third-party → react-native → local
      'import/order': 'off',

      // Additional import rules
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'off',
      'import/no-unresolved': 'off', // specific this task
      'import/namespace': 'off',
      'import/default': 'off',
      'import/no-named-as-default': 'off',
      'import/no-named-as-default-member': 'off',
    },
  },

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
