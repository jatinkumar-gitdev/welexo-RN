import React, { useEffect, useState } from 'react';
import { View, Text, Modal, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming, 
  withDelay,
  interpolate,
  Easing,
  ReduceMotion 
} from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';

const { width } = Dimensions.get('window');

const FingerprintScanModal = ({ visible, status, onDismiss }) => {
  const pulseAnim = useSharedValue(1);
  const opacityAnim = useSharedValue(0);
  const ripple1Anim = useSharedValue(0);
  const ripple2Anim = useSharedValue(0);
  const ripple3Anim = useSharedValue(0);

  const [displayText, setDisplayText] = useState('Touch the sensor');

  useEffect(() => {
    if (visible) {
      opacityAnim.value = withTiming(1, { duration: 300 });

      // Fingerprint Ripple Animations
      const baseDuration = 1500;
      ripple1Anim.value = withRepeat(
        withTiming(1, { duration: baseDuration, easing: Easing.out(Easing.ease) }),
        -1, false
      );
      ripple2Anim.value = withDelay(400, withRepeat(
        withTiming(1, { duration: baseDuration, easing: Easing.out(Easing.ease) }),
        -1, false
      ));
      ripple3Anim.value = withDelay(800, withRepeat(
        withTiming(1, { duration: baseDuration, easing: Easing.out(Easing.ease) }),
        -1, false
      ));
      
      // Initial Haptic
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

      pulseAnim.value = withRepeat(
        withTiming(1.05, { 
          duration: 1000,
          reduceMotion: ReduceMotion.Never
        }),
        -1,
        true
      );
    } else {
      opacityAnim.value = withTiming(0, { duration: 200 });
      pulseAnim.value = 1;
      ripple1Anim.value = 0;
      ripple2Anim.value = 0;
      ripple3Anim.value = 0;
    }
  }, [visible]);

  useEffect(() => {
    switch (status) {
      case 'scanning':
        setDisplayText('Scanning Fingerprint...');
        if (visible) {
           Haptics.selectionAsync();
        }
        break;
      case 'captured':
        setDisplayText('Fingerprint Captured!');
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        break;
      case 'verified':
        setDisplayText('Identity Verified');
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        break;
      case 'failed':
        setDisplayText('Scan Failed');
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        break;
      default:
        setDisplayText('Touch the sensor');
    }
  }, [status, visible]);

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseAnim.value }],
    opacity: interpolate(pulseAnim.value, [1, 1.05], [0.9, 1])
  }));

  const modalStyle = useAnimatedStyle(() => ({
    opacity: opacityAnim.value,
    transform: [{ scale: interpolate(opacityAnim.value, [0, 1], [0.9, 1]) }]
  }));

  const createRippleStyle = (animValue) => useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(animValue.value, [0, 1], [0.8, 2.5]) }],
    opacity: interpolate(animValue.value, [0, 0.5, 1], [0.8, 0.4, 0])
  }));

  const ripple1Style = createRippleStyle(ripple1Anim);
  const ripple2Style = createRippleStyle(ripple2Anim);
  const ripple3Style = createRippleStyle(ripple3Anim);

  return (
    <Modal visible={visible} transparent animationType="none">
      <View style={StyleSheet.absoluteFill} className="items-center justify-center">
        <BlurView intensity={60} tint="light" style={StyleSheet.absoluteFill} />
        
        <Animated.View 
          style={[
            modalStyle,
            {
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 20 },
              shadowOpacity: 0.15,
              shadowRadius: 30,
              elevation: 20,
              width: width * 0.85, 
              maxWidth: 340
            }
          ]}
          className="rounded-[40px] p-8 w-full items-center overflow-hidden"
        >
          {/* Main Fingerprint UI */}
          <View className="items-center justify-center py-8">
            {/* Ripples */}
            {status === 'scanning' && (
              <>
                <Animated.View style={[StyleSheet.absoluteFill, ripple1Style, { justifyContent:'center', alignItems:'center' }]}>
                   <View className="w-20 h-20 rounded-full border border-primary-500/30 bg-primary-500/10" />
                </Animated.View>
                <Animated.View style={[StyleSheet.absoluteFill, ripple2Style, { justifyContent:'center', alignItems:'center' }]}>
                   <View className="w-20 h-20 rounded-full border border-primary-500/20" />
                </Animated.View>
                <Animated.View style={[StyleSheet.absoluteFill, ripple3Style, { justifyContent:'center', alignItems:'center' }]}>
                   <View className="w-20 h-20 rounded-full border border-primary-500/10" />
                </Animated.View>
              </>
            )}
            
            {/* Main Sensor Icon */}
            <Animated.View 
              style={status === 'scanning' ? pulseStyle : undefined}
              className={`w-28 h-28 rounded-full items-center justify-center ${status === 'scanning' ? 'bg-primary-50 border-primary-100' : 'bg-slate-50 border-slate-100'} border-2`}
            >
              <Ionicons 
                name="finger-print" 
                size={64} 
                color={status === 'scanning' ? '#0176FF' : '#94A3B8'} 
              />
            </Animated.View>
          </View>

          {/* Text Feedback */}
          <View className="mt-8 items-center">
            <Text className="text-slate-900 text-xl font-bold tracking-tight text-center">
              {displayText}
            </Text>
            <Text className="text-slate-500 text-sm mt-2 font-medium text-center">
              {status === 'scanning' 
                ? 'Hold your finger on the sensor' 
                : 'Authentication In Progress'}
            </Text>
          </View>

          {/* Cancel Option */}
          {status !== 'verified' && (
            <TouchableOpacity 
              onPress={onDismiss}
              className="mt-8 py-2 px-6"
              activeOpacity={0.6}
            >
              <Text className="text-slate-400 font-semibold text-sm">Cancel</Text>
            </TouchableOpacity>
          )}
        </Animated.View>
      </View>
    </Modal>
  );
};

export default FingerprintScanModal;
