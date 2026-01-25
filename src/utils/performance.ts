/**
 * Performance monitoring and optimization utilities
 */
import { useEffect, useRef } from 'react';

/**
 * Hook to detect unnecessary re-renders in development
 * Usage: useWhyDidYouUpdate('ComponentName', props);
 */
export function useWhyDidYouUpdate(name: string, props: Record<string, any>) {
  const previousProps = useRef<Record<string, any>>({});

  useEffect(() => {
    if (previousProps.current && __DEV__) {
      const allKeys = Object.keys({ ...previousProps.current, ...props });
      const changedProps: Record<string, { from: any; to: any }> = {};

      allKeys.forEach((key) => {
        if (previousProps.current![key] !== props[key]) {
          changedProps[key] = {
            from: previousProps.current![key],
            to: props[key],
          };
        }
      });

      if (Object.keys(changedProps).length > 0) {
        console.log('[why-did-you-update]', name, changedProps);
      }
    }

    previousProps.current = props;
  });
}

/**
 * Measure component render time
 */
export function useRenderTime(componentName: string) {
  const renderCount = useRef<number>(0);

  useEffect(() => {
    if (__DEV__) {
      renderCount.current += 1;
      console.log(`[${componentName}] Render #${renderCount.current}`);
    }
  });
}

/**
 * FlatList optimization configurations
 */
export const FLATLIST_CONFIG = {
  // Standard list (100-500 items)
  standard: {
    windowSize: 10,
    maxToRenderPerBatch: 10,
    updateCellsBatchingPeriod: 50,
    initialNumToRender: 10,
    removeClippedSubviews: true,
  },
  // Large list (500+ items)
  large: {
    windowSize: 5,
    maxToRenderPerBatch: 5,
    updateCellsBatchingPeriod: 100,
    initialNumToRender: 5,
    removeClippedSubviews: true,
  },
  // Small list (<100 items)
  small: {
    windowSize: 21,
    maxToRenderPerBatch: 15,
    updateCellsBatchingPeriod: 30,
    initialNumToRender: 15,
    removeClippedSubviews: false,
  },
};

/**
 * Get optimized FlatList props based on data size
 */
export function getOptimizedListProps(dataLength: number) {
  if (dataLength > 500) return FLATLIST_CONFIG.large;
  if (dataLength < 100) return FLATLIST_CONFIG.small;
  return FLATLIST_CONFIG.standard;
}
