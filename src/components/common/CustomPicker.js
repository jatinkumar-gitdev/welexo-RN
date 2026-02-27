import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";

const CustomPicker = ({
  label,
  placeholder,
  value,
  onSelect,
  required,
  icon,
}) => (
  <View className="mb-4">
    <View className="flex-row items-center mb-2">
      <Text className="text-gray-700 text-sm font-semibold">
        {label} {required && <Text className="text-red-500">*</Text>}
      </Text>
      {icon && (
        <View className="ml-2">
          <FontAwesome5 name={icon} size={12} color="#6B7280" />
        </View>
      )}
    </View>
    <TouchableOpacity className="flex-row items-center justify-between bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
      <Text className={value ? "text-gray-900" : "text-gray-400"}>
        {value || placeholder}
      </Text>
      <Ionicons name="chevron-down" size={20} color="#9CA3AF" />
    </TouchableOpacity>
  </View>
);

export default CustomPicker;
