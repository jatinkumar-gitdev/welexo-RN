import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolate,
} from 'react-native-reanimated';

// Skeleton Card Component
export function SkeletonCard({ height = 100, className = '' }) {
  const shimmer = useSharedValue(0);

  useEffect(() => {
    shimmer.value = withRepeat(
      withTiming(1, { duration: 1500 }),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      shimmer.value,
      [0, 0.5, 1],
      [0.3, 0.6, 0.3]
    );
    return { opacity };
  });

  return (
    <View className={`bg-gray-100 rounded-3xl overflow-hidden ${className}`} style={{ height }}>
      <Animated.View 
        className="w-full h-full bg-gray-300"
        style={animatedStyle}
      />
    </View>
  );
}

// Skeleton Stats Grid
export function SkeletonStatsGrid() {
  return (
    <View className="flex-row flex-wrap justify-between px-6 py-4">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <View key={i} className="w-[48%] mb-4">
          <SkeletonCard height={100} />
        </View>
      ))}
    </View>
  );
}

// Skeleton Chart
export function SkeletonChart({ height = 220 }) {
  return (
    <View className="px-6 mb-6">
      <SkeletonCard height={height} />
    </View>
  );
}

// Skeleton List Item
export function SkeletonListItem() {
  const shimmer = useSharedValue(0);

  useEffect(() => {
    shimmer.value = withRepeat(
      withTiming(1, { duration: 1500 }),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      shimmer.value,
      [0, 0.5, 1],
      [0.3, 0.6, 0.3]
    );
    return { opacity };
  });

  return (
    <View className="flex-row items-center p-4 bg-gray-50 rounded-2xl mb-3">
      <Animated.View 
        className="w-12 h-12 bg-gray-300 rounded-xl mr-3"
        style={animatedStyle}
      />
      <View className="flex-1">
        <Animated.View 
          className="h-4 bg-gray-300 rounded mb-2"
          style={[{ width: '70%' }, animatedStyle]}
        />
        <Animated.View 
          className="h-3 bg-gray-200 rounded"
          style={[{ width: '40%' }, animatedStyle]}
        />
      </View>
    </View>
  );
}

// Skeleton Home Screen
export function SkeletonHomeScreen() {
  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-6 pb-6 rounded-b-3xl">
        <SkeletonCard height={50} className="mb-4" />
      </View>
      
      {/* Stats Grid */}
      <SkeletonStatsGrid />
      
      {/* Charts */}
      <SkeletonChart height={250} />
      <SkeletonChart height={220} />
      <SkeletonChart height={220} />
    </View>
  );
}

// Skeleton History Screen
export function SkeletonHistoryScreen() {
  return (
    <View className="flex-1 bg-gray-50 px-6 pt-6">
      {/* Chart */}
      <SkeletonCard height={200} className="mb-6" />
      
      {/* Filter Tabs */}
      <View className="flex-row gap-3 mb-6">
        <SkeletonCard height={40} className="flex-1" />
        <SkeletonCard height={40} className="flex-1" />
        <SkeletonCard height={40} className="flex-1" />
      </View>
      
      {/* List Items */}
      {[1, 2, 3, 4].map((i) => (
        <SkeletonListItem key={i} />
      ))}
    </View>
  );
}

// Skeleton Settings Screen
export function SkeletonSettingsScreen() {
  return (
    <View className="flex-1 bg-gray-50 px-6 pt-6">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <SkeletonListItem key={i} />
      ))}
    </View>
  );
}
