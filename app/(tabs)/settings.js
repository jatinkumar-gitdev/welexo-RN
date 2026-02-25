import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch, RefreshControl } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import CustomRefreshHeader from '../../src/components/common/CustomRefreshHeader';
import { SkeletonSettingsScreen } from '../../src/components/common/SkeletonLoader';

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [chartAnimations, setChartAnimations] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setLoading(true);
    
    setTimeout(() => {
      setRefreshing(false);
      setLoading(false);
      console.log('Settings refreshed!');
    }, 2000);
  }, []);

  const SettingItem = ({ icon, title, subtitle, onPress, showArrow = true, rightComponent }) => (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center justify-between px-4 py-4 border-b border-gray-100"
      activeOpacity={0.7}
    >
      <View className="flex-row items-center flex-1">
        <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center mr-3">
          {icon}
        </View>
        <View className="flex-1">
          <Text className="text-gray-900 font-semibold">{title}</Text>
          {subtitle && <Text className="text-gray-500 text-xs mt-1">{subtitle}</Text>}
        </View>
      </View>
      {rightComponent || (showArrow && <Ionicons name="chevron-forward" size={20} color="#D1D5DB" />)}
    </TouchableOpacity>
  );

  const ToggleItem = ({ icon, title, subtitle, value, onValueChange }) => (
    <SettingItem
      icon={icon}
      title={title}
      subtitle={subtitle}
      onPress={() => onValueChange(!value)}
      showArrow={false}
      rightComponent={
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: '#D1D5DB', true: '#0176FF' }}
          thumbColor={value ? '#FFFFFF' : '#F3F4F6'}
        />
      }
    />
  );

  return (
    <View className="flex-1 bg-gray-50">
      <CustomRefreshHeader refreshing={refreshing} />
      
      {loading ? (
        <ScrollView className="flex-1">
          <SkeletonSettingsScreen />
        </ScrollView>
      ) : (
        <ScrollView 
          className="flex-1"
          overScrollMode="always"
          bounces={true}
          alwaysBounceVertical={true}
          showsVerticalScrollIndicator={true}
          scrollEventThrottle={16}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="transparent"
              colors={['transparent']}
              progressBackgroundColor="transparent"
            />
          }
          contentContainerStyle={{ paddingBottom: 140 }}
        >
      {/* Header */}
      <View className="bg-white px-6 pt-16 pb-6 rounded-b-3xl shadow-sm">
        <Text className="text-gray-900 text-2xl font-bold mb-2">Settings</Text>
        <Text className="text-gray-500 text-sm">Customize your app experience</Text>
      </View>

      <View className="px-6 py-6">
        {/* Notifications Section */}
        <View className="bg-white rounded-3xl overflow-hidden mb-6 shadow-sm">
          <View className="px-4 py-3 bg-gray-50 border-b border-gray-100">
            <Text className="text-gray-700 font-bold text-sm uppercase tracking-wide">Notifications</Text>
          </View>
          
          <ToggleItem
            icon={<Ionicons name="notifications" size={20} color="#0176FF" />}
            title="Push Notifications"
            subtitle="Receive alerts for new trades and updates"
            value={notifications}
            onValueChange={setNotifications}
          />
          
          <ToggleItem
            icon={<Ionicons name="mail" size={20} color="#0176FF" />}
            title="Email Alerts"
            subtitle="Get important updates via email"
            value={emailAlerts}
            onValueChange={setEmailAlerts}
          />
        </View>

        {/* Appearance Section */}
        <View className="bg-white rounded-3xl overflow-hidden mb-6 shadow-sm">
          <View className="px-4 py-3 bg-gray-50 border-b border-gray-100">
            <Text className="text-gray-700 font-bold text-sm uppercase tracking-wide">Appearance</Text>
          </View>
          
          <ToggleItem
            icon={<Ionicons name="moon" size={20} color="#0176FF" />}
            title="Dark Mode"
            subtitle="Switch to dark theme (Coming Soon)"
            value={darkMode}
            onValueChange={setDarkMode}
          />
          
          <ToggleItem
            icon={<FontAwesome5 name="chart-line" size={18} color="#0176FF" />}
            title="Chart Animations"
            subtitle="Enable smooth chart transitions"
            value={chartAnimations}
            onValueChange={setChartAnimations}
          />
        </View>

        {/* Data & Privacy Section */}
        <View className="bg-white rounded-3xl overflow-hidden mb-6 shadow-sm">
          <View className="px-4 py-3 bg-gray-50 border-b border-gray-100">
            <Text className="text-gray-700 font-bold text-sm uppercase tracking-wide">Data & Privacy</Text>
          </View>
          
          <SettingItem
            icon={<Ionicons name="refresh" size={20} color="#0176FF" />}
            title="Data Refresh Interval"
            subtitle="Currently: Every 5 minutes"
            onPress={() => {}}
          />
          
          <SettingItem
            icon={<Ionicons name="cloud-download" size={20} color="#0176FF" />}
            title="Cache Management"
            subtitle="Clear cached data"
            onPress={() => {}}
          />
          
          <SettingItem
            icon={<Ionicons name="lock-closed" size={20} color="#0176FF" />}
            title="Privacy Settings"
            subtitle="Manage your data and privacy"
            onPress={() => {}}
          />
        </View>

        {/* Account Section */}
        <View className="bg-white rounded-3xl overflow-hidden mb-6 shadow-sm">
          <View className="px-4 py-3 bg-gray-50 border-b border-gray-100">
            <Text className="text-gray-700 font-bold text-sm uppercase tracking-wide">Account</Text>
          </View>
          
          <SettingItem
            icon={<Ionicons name="person" size={20} color="#0176FF" />}
            title="Edit Profile"
            subtitle="Update your account information"
            onPress={() => {}}
          />
          
          <SettingItem
            icon={<Ionicons name="key" size={20} color="#0176FF" />}
            title="Change Password"
            subtitle="Update your security credentials"
            onPress={() => {}}
          />
          
          <SettingItem
            icon={<Ionicons name="finger-print" size={20} color="#0176FF" />}
            title="Biometric Settings"
            subtitle="Manage Face ID and Fingerprint"
            onPress={() => {}}
          />
        </View>

        {/* Support Section */}
        <View className="bg-white rounded-3xl overflow-hidden mb-6 shadow-sm">
          <View className="px-4 py-3 bg-gray-50 border-b border-gray-100">
            <Text className="text-gray-700 font-bold text-sm uppercase tracking-wide">Support</Text>
          </View>
          
          <SettingItem
            icon={<Ionicons name="help-circle" size={20} color="#0176FF" />}
            title="Help Center"
            subtitle="FAQs and tutorials"
            onPress={() => {}}
          />
          
          <SettingItem
            icon={<Ionicons name="chatbubble" size={20} color="#0176FF" />}
            title="Contact Support"
            subtitle="Get help from our team"
            onPress={() => {}}
          />
          
          <SettingItem
            icon={<Ionicons name="information-circle" size={20} color="#0176FF" />}
            title="About"
            subtitle="Version 1.0.0"
            onPress={() => {}}
          />
        </View>

        {/* App Info */}
        <View className="px-6 py-6">
          <Text className="text-center text-gray-400 text-sm">Welexo Trade App</Text>
          <Text className="text-center text-gray-400 text-xs mt-1">Version 1.0.0</Text>
        </View>
       </View>
      </ScrollView>
      )}
    </View>
  );
}
