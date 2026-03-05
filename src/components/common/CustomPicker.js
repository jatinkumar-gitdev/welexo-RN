import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet,
} from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";

const CustomPicker = ({
  label,
  placeholder,
  value,
  onSelect,
  required,
  icon,
  options = [],
  disabled = false,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = (option) => {
    if (onSelect) {
      onSelect(option);
    }
    setModalVisible(false);
  };

  return (
    <View className="mb-4">
      <View className="flex-row items-center mb-2">
        <Text
          className={`text-sm font-semibold ${disabled ? "text-gray-400" : "text-gray-700"}`}
        >
          {label} {required && <Text className="text-red-500">*</Text>}
        </Text>
        {icon && (
          <View className="ml-2">
            <FontAwesome5
              name={icon}
              size={12}
              color={disabled ? "#D1D5DB" : "#6B7280"}
            />
          </View>
        )}
      </View>
      <TouchableOpacity
        onPress={() => !disabled && setModalVisible(true)}
        activeOpacity={disabled ? 1 : 0.7}
        className={`flex-row items-center justify-between border rounded-xl px-4 py-3 ${
          disabled
            ? "bg-gray-100 border-gray-200"
            : "bg-gray-50 border-gray-200"
        }`}
      >
        <Text
          className={
            value
              ? disabled
                ? "text-gray-400"
                : "text-gray-900"
              : "text-gray-400"
          }
        >
          {value || placeholder}
        </Text>
        <Ionicons
          name="chevron-down"
          size={20}
          color={disabled ? "#D1D5DB" : "#9CA3AF"}
        />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <View className="p-4 border-b border-gray-100">
              <Text className="text-lg font-bold text-gray-800 text-center">
                Select {label}
              </Text>
            </View>
            <ScrollView className="max-h-[300px]">
              {options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleSelect(option)}
                  className={`p-4 border-b border-gray-50 ${
                    value === option ? "bg-blue-50" : ""
                  }`}
                >
                  <Text
                    className={`text-base ${
                      value === option
                        ? "text-blue-600 font-bold"
                        : "text-gray-700"
                    }`}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    width: "100%",
    maxWidth: 400,
    overflow: "hidden",
  },
});

export default CustomPicker;
