import React from 'react';
import { TouchableOpacity, Text, View, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  ReduceMotion
} from 'react-native-reanimated';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const Button = ({ title, onPress, className = "", variant = "primary", rightIcon, disabled }) => {
  const isPrimary = variant === "primary";
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.96, { 
      damping: 15, 
      stiffness: 300,
      reduceMotion: ReduceMotion.Never 
    });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { 
      damping: 15, 
      stiffness: 300,
      reduceMotion: ReduceMotion.Never 
    });
  };
  
  return (
    <AnimatedTouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      style={[
        animatedStyle,
        isPrimary ? {
          shadowColor: '#0176FF',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.2,
          shadowRadius: 16,
          elevation: 8,
        } : {}
      ]}
      className={`
        w-full h-[60px] rounded-2xl flex-row items-center justify-center px-6
        ${isPrimary ? 'bg-primary-500' : 'bg-transparent border-2 border-slate-200'}
        ${disabled ? 'opacity-50' : ''}
        ${className}
      `}
    >
      <Text className={`
        text-[17px] font-bold tracking-tight
        ${isPrimary ? 'text-white' : 'text-slate-700'}
      `}>
        {title}
      </Text>
      {rightIcon && (
        <Ionicons 
          name={rightIcon} 
          size={20} 
          color={isPrimary ? 'white' : '#334155'} 
          style={{ marginLeft: 8 }}
        />
      )}
    </AnimatedTouchableOpacity>
  );
};

export default Button;