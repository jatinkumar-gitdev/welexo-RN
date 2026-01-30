import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  interpolateColor,
  ReduceMotion
} from 'react-native-reanimated';

const Input = ({ 
  label, 
  placeholder, 
  value, 
  onChangeText, 
  secureTextEntry, 
  leftIcon, 
  error, 
  errorMessage,
  className = "" 
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  
  const focusAnim = useSharedValue(0);

  useEffect(() => {
    focusAnim.value = withTiming(isFocused || error ? 1 : 0, { 
      duration: 200,
      reduceMotion: ReduceMotion.Never
    });
  }, [isFocused, error]);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const isPassword = secureTextEntry;
  const shouldHideText = isPassword && !isPasswordVisible;

  const containerStyle = useAnimatedStyle(() => {
    const borderColor = interpolateColor(
      focusAnim.value,
      [0, 1],
      ['#edf5fa', error ? '#FF4F4F' : '#fff']
    );
    
    return {
      borderColor,
      backgroundColor: withTiming(
        isFocused ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)',
        { 
          duration: 200,
          reduceMotion: ReduceMotion.Never
        }
      ),
    };
  });

  return (
    <View className={`mb-5 w-full ${className}`}>
      {label && (
        <Text className={`
          text-[11px] font-bold uppercase tracking-widest mb-1.5 ml-1
          ${error ? 'text-[#FF4F4F]' : 'text-white'}
        `}>
          {label}
        </Text>
      )}
      
      <Animated.View 
        style={containerStyle}
        className="border-2 rounded-2xl flex-row items-center overflow-hidden h-[60px] px-5"
      >
        {leftIcon && (
          <Ionicons 
            name={leftIcon} 
            size={20} 
            color={error ? '#FF4F4F' : (isFocused ? '#fff' : '#fff')} 
            style={{ marginRight: 12 }}
          />
        )}
        
        <TextInput
          className="flex-1 text-white text-[16px] h-full"
          style={Platform.OS === 'web' ? { outlineWidth: 0 } : {}}
          underlineColorAndroid="transparent"
          placeholder={placeholder}
          placeholderTextColor="rgba(255, 255, 255, 0.3)"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={shouldHideText}
          autoCapitalize="none"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        {isPassword && (
          <TouchableOpacity 
            onPress={togglePasswordVisibility}
            className="h-full justify-center"
            activeOpacity={0.7}
          >
            <Ionicons 
              name={isPasswordVisible ? "eye-off-outline" : "eye-outline"} 
              size={20} 
              color="#fff" 
            />
          </TouchableOpacity>
        )}
      </Animated.View>

      {error && errorMessage && (
        <Text className="text-[#FF4F4F] text-[12px] mt-1 ml-1 font-medium">
          {errorMessage}
        </Text>
      )}
    </View>
  );
};

export default Input;
