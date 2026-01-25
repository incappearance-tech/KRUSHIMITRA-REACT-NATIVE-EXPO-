import React from 'react';

import { StyleSheet } from 'react-native';

import { Image, ImageProps } from 'expo-image';

/**
 * Optimized Image component using expo-image
 * Features:
 * - Automatic caching (memory + disk)
 * - Smooth transitions
 * - Better performance than React Native Image
 * - Support for blurhash placeholders
 */

export interface OptimizedImageProps extends Omit<ImageProps, 'source'> {
  /**
   * Image source URI
   */
  source: string | { uri: string };

  /**
   * Optional blurhash string for placeholder
   * Generate at: https://blurha.sh/
   */
  placeholder?: string;

  /**
   * Transition duration in ms (default: 200)
   */
  transitionDuration?: number;

  /**
   * Cache policy (default: 'memory-disk')
   */
  cachePolicy?: 'none' | 'memory' | 'disk' | 'memory-disk';
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  source,
  placeholder,
  transitionDuration = 200,
  cachePolicy = 'memory-disk',
  contentFit = 'cover',
  style,
  ...props
}) => {
  // Normalize source to object format
  const imageSource = typeof source === 'string' ? { uri: source } : source;

  return (
    <Image
      source={imageSource}
      placeholder={placeholder}
      contentFit={contentFit}
      transition={transitionDuration}
      cachePolicy={cachePolicy}
      style={[styles.image, style]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    backgroundColor: '#f3f4f6', // Light gray placeholder
  },
});

// Memoize to prevent unnecessary re-renders
export default React.memo(OptimizedImage);
