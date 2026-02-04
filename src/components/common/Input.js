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
  className = "",
  editable = true
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
      ['#E2E8F0', error ? '#EF4444' : '#0176FF'] // Using slate-200 and accent-error
    );
    
    return {
      borderColor,
      backgroundColor: withTiming(
        isFocused ? '#FFFFFF' : '#F8FAFC', // white vs slate-50
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
          text-[11px] font-bold uppercase tracking-widest mb-2 ml-1
          ${error ? 'text-accent-error' : 'text-slate-500'}
        `}>
          {label}
        </Text>
      )}
      
      <Animated.View 
        style={containerStyle}
        className="border-[1.5px] rounded-2xl flex-row items-center overflow-hidden h-[60px] px-5 shadow-sm shadow-slate-100"
      >
        {leftIcon && (
          <Ionicons 
            name={leftIcon} 
            size={20} 
            color={error ? '#EF4444' : (isFocused ? '#0176FF' : '#94A3B8')} 
            style={{ marginRight: 12 }}
          />
        )}
        
        <TextInput
          className={`flex-1 text-slate-900 text-[16px] h-full ${!editable ? 'opacity-60' : ''}`}
          style={Platform.OS === 'web' ? { outlineWidth: 0 } : {}}
          underlineColorAndroid="transparent"
          placeholder={placeholder}
          placeholderTextColor="#94A3B8"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={shouldHideText}
          autoCapitalize="none"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          editable={editable}
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
              color="#94A3B8" 
            />
          </TouchableOpacity>
        )}
      </Animated.View>

      {error && errorMessage && (
        <Text className="text-accent-error text-[12px] mt-1.5 ml-1 font-medium">
          {errorMessage}
        </Text>
      )}
    </View>
  );
};

export default Input;