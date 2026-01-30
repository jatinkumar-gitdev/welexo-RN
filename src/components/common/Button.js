import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Button = ({ title, onPress, className = "", variant = "primary", rightIcon }) => {
  const isPrimary = variant === "primary";
  
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      className={`
        w-full h-[60px] rounded-2xl flex-row items-center justify-center px-6
        ${isPrimary ? 'bg-white' : 'bg-transparent border border-white/30'}
        ${className}
      `}
    >
      <Text className={`
        text-[17px] font-bold
        ${isPrimary ? 'text-[#0176FF]' : 'text-white'}
      `}>
        {title}
      </Text>
      {rightIcon && (
        <Ionicons 
          name={rightIcon} 
          size={20} 
          color={isPrimary ? '#0176FF' : 'white'} 
          style={{ marginLeft: 8 }}
        />
      )}
    </TouchableOpacity>
  );
};

export default Button;
