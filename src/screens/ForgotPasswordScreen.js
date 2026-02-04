import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, Octicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';

// Components
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import InteractiveBackground from '../components/common/InteractiveBackground';

const ForgotPasswordScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleReset = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
    }, 1500);
  };

  return (
    <View className="flex-1 bg-slate-50">
      <InteractiveBackground />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView 
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Back Button */}
          <View className="absolute top-12 left-0 z-10 px-6">
            <TouchableOpacity 
              onPress={() => router.back()}
              className="w-10 h-10 rounded-full bg-white/50 items-center justify-center border border-slate-200"
            >
              <Ionicons name="arrow-back" size={20} color="#334155" />
            </TouchableOpacity>
          </View>

          <Animated.View 
            entering={FadeInDown.duration(600).springify()}
            className="w-full bg-white/90 backdrop-blur-xl p-6 rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/50"
          >
            {!isSent ? (
              <>
                <View className="items-center mb-6">
                  <View className="w-16 h-16 bg-primary-50 rounded-full items-center justify-center mb-4">
                    <Ionicons name="lock-closed" size={32} color="#0176FF" />
                  </View>
                  <Text className="text-slate-900 text-2xl font-bold text-center mb-2">Forgot Password?</Text>
                  <Text className="text-slate-500 text-center text-sm leading-6">
                    Enter your email address and we'll send you instructions to reset your password.
                  </Text>
                </View>

                <View className="gap-4">
                  <Input
                    label="Email Address"
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    icon="mail-outline"
                    className="mb-2"
                  />

                  <Button 
                    title="Send Reset Link" 
                    onPress={handleReset}
                    isLoading={isLoading}
                  />

                  <TouchableOpacity 
                    onPress={() => router.back()}
                    className="self-center mt-4 flex-row items-center gap-1"
                  >
                    <Octicons name="arrow-left" size={18} color="black" />
                    <Text className="text-slate-500 font-semibold text-sm">
                      Back to <Text className="text-primary-500">Login</Text>
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <Animated.View entering={FadeInDown}>
                <View className="items-center mb-6">
                  <View className="w-16 h-16 bg-emerald-50 rounded-full items-center justify-center mb-4">
                    <Ionicons name="checkmark-circle" size={32} color="#10B981" />
                  </View>
                  <Text className="text-slate-900 text-2xl font-bold text-center mb-2">Check Your Email</Text>
                  <Text className="text-slate-500 text-center text-sm leading-6">
                    We have sent a password reset link to <Text className="font-bold text-slate-800">{email}</Text>. Please check your inbox.
                  </Text>
                </View>
                <Button 
                  title="Back to Login" 
                  onPress={() => router.back()}
                  variant="outline"
                  className="bg-slate-50 border-slate-200"
                />
              </Animated.View>
            )}
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ForgotPasswordScreen;
