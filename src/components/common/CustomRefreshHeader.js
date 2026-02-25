import React, { useEffect, useState } from 'react';
import { View, Text, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';

export default function CustomRefreshHeader({ refreshing }) {
  const rotation = useSharedValue(0);
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(-100);
  const scale = useSharedValue(0.8);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (refreshing) {
      setShowSuccess(false);
      // Haptic feedback on start
      if (Platform.OS !== 'web') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }

      // Show header
      opacity.value = withTiming(1, { duration: 300 });
      translateY.value = withSpring(0, { damping: 12, stiffness: 100 });
      scale.value = withSpring(1, { damping: 12, stiffness: 100 });
      
      // Rotate icon continuously
      rotation.value = withRepeat(
        withTiming(360, { duration: 1000, easing: Easing.linear }),
        -1,
        false
      );
    } else {
      // Transition to success state before hiding
      setShowSuccess(true);
      if (Platform.OS !== 'web') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }

      // Stop rotation
      rotation.value = withTiming(0, { duration: 300 });

      // Delay hiding to show success state
      const hideTimer = setTimeout(() => {
        opacity.value = withTiming(0, { duration: 300 });
        translateY.value = withTiming(-100, { duration: 300 });
        scale.value = withTiming(0.8, { duration: 300 });
        setShowSuccess(false);
      }, 800);

      return () => clearTimeout(hideTimer);
    }
  }, [refreshing]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateY: translateY.value },
      { scale: scale.value }
    ],
  }));

  const iconStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${rotation.value}deg` },
    ],
  }));

  // Render content based on state (refreshing vs success)
  const renderContent = () => (
    <View className="flex-row items-center justify-center py-3 px-5 bg-white/80 rounded-full shadow-sm border border-white/20">
      {showSuccess ? (
        <Ionicons name="checkmark-circle" size={20} color="#10B981" className="mr-2" />
      ) : (
        <Animated.View style={iconStyle} className="mr-3">
          <Ionicons name="refresh" size={20} color="#0176FF" />
        </Animated.View>
      )}
      
      <Text className={`text-sm font-semibold ${showSuccess ? 'text-green-600' : 'text-blue-600'}`}>
        {showSuccess ? 'Updated Successfully' : 'Refreshing Dashboard...'}
      </Text>
    </View>
  );

  return (
    <Animated.View 
      style={animatedStyle}
      className="absolute top-2 left-0 right-0 z-50 items-center justify-center p-4 pointer-events-none"
    >
      {Platform.OS === 'ios' ? (
        <BlurView intensity={20} tint="light" className="rounded-full overflow-hidden">
          {renderContent()}
        </BlurView>
      ) : (
        renderContent()
      )}
    </Animated.View>
  );
}
