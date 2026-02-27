import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const CustomInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  required,
  rightIcon,
}) => (
  <View className="mb-4">
    <Text className="text-gray-700 text-sm font-semibold mb-2">
      {label} {required && <Text className="text-red-500">*</Text>}
    </Text>
    <View className="flex-row items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-1">
      <TextInput
        className="flex-1 py-2 text-gray-900"
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        value={value}
        onChangeText={onChangeText}
      />
      {rightIcon && (
        <TouchableOpacity className="ml-2">
          <FontAwesome5 name={rightIcon} size={16} color="#6B7280" />
        </TouchableOpacity>
      )}
    </View>
  </View>
);

export default CustomInput;
