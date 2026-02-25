import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabsHeader() {
  const { user } = useAuth();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleProfile = () => {
    router.push("/(tabs)/profile");
  };

  const handleNotifications = () => {
    console.log("Notifications pressed");
  };

  const getUserInitials = () => {
    if (user?.name) {
      const names = user.name.split(" ");
      if (names.length >= 2) {
        return `${names[0][0]}${names[1][0]}`.toUpperCase();
      }
      return user.name.substring(0, 2).toUpperCase();
    }
    if (user?.email) {
      return user.email.substring(0, 2).toUpperCase();
    }
    return "U";
  };

  const getDisplayName = () => {
    if (user?.name) return user.name;
    if (user?.email) return user.email.split("@")[0];
    return "User";
  };

  return (
    <View style={{ paddingTop: Math.max(insets.top, 20) }} className="bg-white">
      <View className="flex-row items-center justify-between px-6 py-4">
        {/* User Profile Section */}
        <TouchableOpacity
          onPress={handleProfile}
          className="flex-row items-center flex-1"
          activeOpacity={0.7}
        >
          <View className="relative">
            <View className="w-12 h-12 rounded-full bg-blue-50 border-2 border-blue-200 items-center justify-center shadow-sm">
              <Text className="text-blue-600 text-base font-bold">
                {getUserInitials()}
              </Text>
            </View>
            <View className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white shadow-sm" />
          </View>

          <View className="ml-3 flex-1">
            <Text className="text-gray-400 text-xs font-medium tracking-wider uppercase">
              Welcome back
            </Text>
            <Text
              className="text-gray-900 text-lg font-bold tracking-wide"
              numberOfLines={1}
            >
              {getDisplayName()}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Action Buttons */}
        <View className="flex-row items-center gap-3">
          <TouchableOpacity
            className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 items-center justify-center"
            activeOpacity={0.7}
          >
            <Ionicons name="search" size={20} color="#374151" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleNotifications}
            className="relative w-10 h-10 rounded-full bg-gray-50 border border-gray-100 items-center justify-center"
            activeOpacity={0.7}
          >
            <Ionicons name="notifications-outline" size={20} color="#374151" />
            <View className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
