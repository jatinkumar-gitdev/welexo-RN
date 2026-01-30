import React, { useEffect, useState } from 'react';
import { View, Text, Modal, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming, 
  withSequence,
  interpolate,
  Easing,
  ReduceMotion 
} from 'react-native-reanimated';
import { BlurView } from 'expo-blur';

const { width, height } = Dimensions.get('window');

const FaceScanModal = ({ visible, status, onDismiss }) => {
  const scanAnim = useSharedValue(0);
  const pulseAnim = useSharedValue(1);
  const [displayText, setDisplayText] = useState('Position your face');

  useEffect(() => {
    if (visible) {
      scanAnim.value = withRepeat(
        withTiming(1, { 
          duration: 2500, 
          easing: Easing.inOut(Easing.ease),
          reduceMotion: ReduceMotion.Never
        }),
        -1,
        true,
        undefined,
        ReduceMotion.Never
      );
      pulseAnim.value = withRepeat(
        withTiming(1.1, { 
          duration: 800,
          reduceMotion: ReduceMotion.Never
        }),
        -1,
        true,
        undefined,
        ReduceMotion.Never
      );
    } else {
      scanAnim.value = 0;
      pulseAnim.value = 1;
    }
  }, [visible]);

  useEffect(() => {
    switch (status) {
      case 'scanning':
        setDisplayText('Scanning face...');
        break;
      case 'captured':
        setDisplayText('Face captured!');
        break;
      case 'verified':
        setDisplayText('Identity verified');
        break;
      case 'failed':
        setDisplayText('Scan failed');
        break;
      default:
        setDisplayText('Position your face');
    }
  }, [status]);

  const scanLineStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: interpolate(scanAnim.value, [0, 1], [0, 200]) }],
    opacity: status === 'scanning' ? 1 : 0
  }));

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseAnim.value }],
    opacity: interpolate(pulseAnim.value, [1, 1.1], [0.8, 1])
  }));

  const getStatusIcon = () => {
    switch (status) {
      case 'verified': return 'checkmark-circle';
      case 'failed': return 'alert-circle';
      case 'captured': return 'camera';
      default: return 'scan-outline';
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'verified': return '#4CAF50';
      case 'failed': return '#FF5252';
      case 'captured': return '#0176FF';
      default: return '#fff';
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFill}>
        <View className="flex-1 items-center justify-center">
          <View className="bg-black/60 border border-white/10 rounded-[40px] p-10 items-center justify-center w-[280px]">
            {/* Status Icon */}
            <Animated.View style={pulseStyle}>
              <Ionicons name={getStatusIcon()} size={80} color={getStatusColor()} />
            </Animated.View>

            {/* Scanning Box */}
            <View className="mt-8 border-2 border-dashed border-white/20 rounded-3xl w-48 h-48 items-center justify-center overflow-hidden">
              {status === 'scanning' && (
                <Animated.View 
                  style={[
                    scanLineStyle,
                    {
                      width: '100%',
                      height: 2,
                      backgroundColor: '#0176FF',
                      position: 'absolute',
                      top: 0,
                      shadowColor: '#0176FF',
                      shadowOffset: { width: 0, height: 0 },
                      shadowOpacity: 1,
                      shadowRadius: 10,
                      elevation: 10
                    }
                  ]}
                />
              )}
              <Ionicons 
                name="person-outline" 
                size={100} 
                color="rgba(255, 255, 255, 0.1)" 
              />
            </View>

            {/* Text Feedback */}
            <View className="mt-8 items-center">
              <Text className="text-white text-xl font-bold tracking-tight">
                {displayText}
              </Text>
              <Text className="text-white/40 text-sm mt-1">
                {status === 'scanning' ? 'Keep still' : 'Authenticating...'}
              </Text>
            </View>
          </View>
        </View>
      </BlurView>
    </Modal>
  );
};

export default FaceScanModal;
