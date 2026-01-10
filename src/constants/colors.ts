export const COLORS = {
  // Primary - Green (Agriculture/Nature)
  // Base: #2ecc71
  primary: {
    50: '#eafaf1',
    100: '#d5f5e3',
    200: '#aae9c6',
    300: '#80ddaa',
    400: '#55d18d',
    500: '#2ecc71', // Base
    600: "#13ec37",
    700: '#25a35a',
    800: '#1c7a44',
    900: '#12522d',
    950: '#092917',

    1000: '#05140b',
  },

  // Secondary - Blue (Water/Trust)
  // Base: #3498db
  secondary: {
    50: '#ebf5fb',
    100: '#d6eaf8',
    200: '#aed6f1',
    300: '#85c1e9',
    400: '#5dade2',
    500: '#3498db', // Base
    600: '#2e86c1',
    700: '#2874a6',
    800: '#21618c',
    900: '#1b4f72',
    950: '#154360',
  },

  // Status Colors (Matching Dashboard/List usage)
  success: '#16a34a', // green-600
  successLight: '#dcfce7', // green-100
  successDark: '#166534', // green-800

  warning: '#f59e0b', // amber-500
  warningLight: '#fffbeb', // amber-50
  warningDark: '#b45309', // amber-700

  danger: '#ef4444', // red-500
  dangerLight: '#fef2f2', // red-50
  dangerDark: '#b91c1c', // red-700

  info: '#3b82f6', // blue-500
  infoLight: '#dbeafe', // blue-100
  infoDark: '#1e40af', // blue-800

  // Neutrals / Grays (Slate-ish)
  gray: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617',
  },

  // Base
  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',

  // Semantic Aliases (mapped to scales)
  background: '#f6faf5ff', // Updated to match login screen background
  surface: '#ffffff',
  surfaceHighlight: '#f8faf8', // Light background for inputs etc

  border: '#e5e7eb', // gray[200]
  borderFocus: '#37ec13', // Bright Green

  text: '#1a1a1a', // Darker than gray[800]
  textSecondary: '#6b7280', // gray[500]-ish
  textLight: '#9ca3af', // gray[400]

  // Custom Brand Colors
  brand: {
    primary: '#37ec13', // The bright neon green used in login
    secondary: '#052e00', // Dark green for text on primary button
    muted: 'rgba(147, 250, 126, 0.15)', // Light brand background
  }
};
