import { Dimensions, Platform, ScaledSize, StatusBar } from 'react-native';

// Get screen dimensions - these will be reactive to dimension changes
let { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Base dimensions (iPhone SE as reference)
const BASE_WIDTH = 375;
const BASE_HEIGHT = 667;

// Listen for dimension changes (orientation, window resize)
Dimensions.addEventListener('change', ({ window }: { window: ScaledSize }) => {
  SCREEN_WIDTH = window.width;
  SCREEN_HEIGHT = window.height;
});

// Memoize scale factor calculations
// const scaleFactorWidth = SCREEN_WIDTH / BASE_WIDTH;
// const scaleFactorHeight = SCREEN_HEIGHT / BASE_HEIGHT;

/**
 * Responsive scaling utilities for cross-platform compatibility
 * Works on iOS and Android, from smallest (320px) to largest (tablets) screens
 */

/**
 * Scale based on screen width
 */
export const scale = (size: number): number => {
  return (SCREEN_WIDTH / BASE_WIDTH) * size;
};

/**
 * Scale based on screen height
 */
export const verticalScale = (size: number): number => {
  return (SCREEN_HEIGHT / BASE_HEIGHT) * size;
};

/**
 * Moderate scaling with custom factor
 * Default factor of 0.5 provides balanced scaling
 */
export const moderateScale = (size: number, factor = 0.5): number => {
  return size + (scale(size) - size) * factor;
};

/**
 * Responsive font sizes based on screen width
 * Small phones: 90% of base size
 * Standard phones: 100% of base size
 * Large phones/tablets: 110% of base size
 */
export const getFontSize = (size: number): number => {
  if (SCREEN_WIDTH < 350) return size * 0.9;
  if (SCREEN_WIDTH > 420) return size * 1.1;
  return size;
};

/**
 * Responsive spacing based on screen width
 * Small phones: 85% of base spacing
 * Standard phones: 100% of base spacing
 * Large phones/tablets: 115% of base spacing
 */
export const getSpacing = (size: number): number => {
  if (SCREEN_WIDTH < 350) return size * 0.85;
  if (SCREEN_WIDTH > 420) return size * 1.15;
  return size;
};

/**
 * Get safe header padding for both iOS and Android
 */
export const getHeaderPadding = (
  insetsTop: number,
  extraPadding = 10,
): number => {
  return Platform.select({
    ios: insetsTop + getSpacing(extraPadding),
    android: (StatusBar.currentHeight || 0) + getSpacing(extraPadding),
    default: getSpacing(20),
  }) as number;
};

/**
 * Get safe bottom padding for scrollable content
 */
export const getBottomPadding = (
  insetsBottom: number,
  extraPadding = 100,
): number => {
  return Platform.OS === 'ios'
    ? getSpacing(extraPadding) + insetsBottom
    : getSpacing(extraPadding * 0.8);
};

/**
 * Platform-specific shadow/elevation styles
 */
export const getShadowStyle = (elevation = 3) => {
  return Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: elevation > 5 ? 4 : 2 },
      shadowOpacity: elevation > 5 ? 0.1 : 0.05,
      shadowRadius: elevation > 5 ? 12 : 8,
    },
    android: {
      elevation,
    },
    default: {},
  });
};

/**
 * Check if device is a tablet
 */
export const isTablet = (): boolean => {
  return SCREEN_WIDTH >= 768;
};

/**
 * Check if device is a small phone
 */
export const isSmallDevice = (): boolean => {
  return SCREEN_WIDTH < 350;
};

/**
 * Get responsive card padding
 */
export const getCardPadding = (): number => {
  if (SCREEN_WIDTH < 350) return 12;
  if (SCREEN_WIDTH > 420) return 20;
  return 16;
};

/**
 * Get responsive border radius
 */
export const getBorderRadius = (size: number): number => {
  return moderateScale(size);
};

// Export screen dimensions
export { SCREEN_HEIGHT, SCREEN_WIDTH };
