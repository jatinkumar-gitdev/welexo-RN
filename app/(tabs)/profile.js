import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../src/contexts/AuthContext';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace('/(auth)/login');
  };

  return (
    <ScrollView 
      className="flex-1 bg-gray-50"
      contentContainerStyle={{ paddingBottom: 140 }}
    >
      {/* Profile Header */}
      <View className="bg-white px-4 py-8 items-center border-b border-gray-200">
        <View className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full items-center justify-center border-4 border-white shadow-lg">
          <Ionicons name="person" size={48} color="white" />
        </View>
        <Text className="text-2xl font-bold text-gray-900 mt-4">{user?.name || 'User'}</Text>
        <Text className="text-gray-600 text-sm mt-1">{user?.email || 'user@example.com'}</Text>
      </View>

      {/* Profile Info */}
      <View className="bg-white mx-4 mt-6 rounded-2xl p-4 shadow-sm">
        <Text className="text-lg font-semibold text-gray-900 mb-4">Profile Information</Text>
        
        <View className="space-y-4 gap-4">
          <View className="flex-row items-center justify-between pb-4 border-b border-gray-100">
            <View className="flex-row items-center gap-3">
              <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center">
                <Ionicons name="mail" size={20} color="#0176FF" />
              </View>
              <Text className="text-gray-700 font-medium">Email</Text>
            </View>
            <Text className="text-gray-600 text-sm">{user?.email || 'N/A'}</Text>
          </View>

          <View className="flex-row items-center justify-between pb-4 border-b border-gray-100">
            <View className="flex-row items-center gap-3">
              <View className="w-10 h-10 bg-green-100 rounded-full items-center justify-center">
                <Ionicons name="checkmark-circle" size={20} color="#10B981" />
              </View>
              <Text className="text-gray-700 font-medium">Status</Text>
            </View>
            <Text className="text-green-600 text-sm font-semibold">Active</Text>
          </View>
        </View>
      </View>

      {/* Settings */}
      <View className="bg-white mx-4 mt-6 rounded-2xl overflow-hidden shadow-sm">
        <TouchableOpacity className="flex-row items-center justify-between px-4 py-4 border-b border-gray-100">
          <View className="flex-row items-center gap-3">
            <Ionicons name="notifications" size={20} color="#0176FF" />
            <Text className="text-gray-900 font-medium">Notifications</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#D1D5DB" />
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center justify-between px-4 py-4 border-b border-gray-100">
          <View className="flex-row items-center gap-3">
            <Ionicons name="lock-closed" size={20} color="#0176FF" />
            <Text className="text-gray-900 font-medium">Security</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#D1D5DB" />
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center justify-between px-4 py-4">
          <View className="flex-row items-center gap-3">
            <Ionicons name="help-circle" size={20} color="#0176FF" />
            <Text className="text-gray-900 font-medium">Help & Support</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#D1D5DB" />
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <TouchableOpacity 
        onPress={handleLogout}
        className="bg-red-50 border-2 border-red-200 mx-4 mt-8 rounded-xl py-4 items-center mb-6"
        activeOpacity={0.7}
      >
        <View className="flex-row items-center gap-2">
          <Ionicons name="log-out" size={20} color="#EF4444" />
          <Text className="text-red-600 font-semibold text-base">Sign Out</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

