import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView, 
  TouchableOpacity,
  Alert, 
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { 
  FadeInDown, 
  FadeInUp,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withDelay
} from 'react-native-reanimated';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'expo-router';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import InteractiveBackground from '../components/common/InteractiveBackground';
import FaceScanModal from '../components/common/FaceScanModal';
import FingerprintScanModal from '../components/common/FingerprintScanModal';
import * as Haptics from 'expo-haptics';
import * as LocalAuthentication from 'expo-local-authentication';

const LoginScreen = () => {
  const { login, biometricLogin, isLoading, error, clearError } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [faceScanState, setFaceScanState] = useState({ visible: false, status: 'idle', type: 'face' });

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => clearError(), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    const success = await login(email, password);
    if (success) {
      router.replace('/(tabs)/home');
    }
  };

  const handleBiometricLogin = async (type = 'face') => {
    // 1. Check strict hardware availability for the requested type
    const supportedTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();
    
    // Map our 'type' string to Expo constants
    const requiredType = type === 'face' 
      ? LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION
      : LocalAuthentication.AuthenticationType.FINGERPRINT;

    if (!supportedTypes.includes(requiredType)) {
      const typeName = type === 'face' ? 'Face ID' : 'Fingerprint Scanner';
      Alert.alert(
        'Not Available', 
        `${typeName} is not available or supported on this device. Please try another method.`
      );
      return;
    }

    setFaceScanState({ visible: true, status: 'scanning', type });
    
    try {
        const result = await biometricLogin(type);
        
        if (result.success) {
            setFaceScanState({ visible: true, status: 'verified', type });
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            setTimeout(() => {
                setFaceScanState({ visible: false, status: 'idle', type });
                router.replace('/(tabs)/home');
            }, 1000);
        } else {
            setFaceScanState({ visible: true, status: 'failed', type });
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            setTimeout(() => setFaceScanState({ visible: false, status: 'idle', type }), 1500);
        }
    } catch (e) {
        setFaceScanState({ visible: true, status: 'failed', type });
        setTimeout(() => setFaceScanState({ visible: false, status: 'idle', type }), 1500);
    }
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
          contentContainerStyle={{ 
            flexGrow: 1, 
            justifyContent: 'center', 
            padding: 24,
            paddingBottom: 40
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header Section */}
          <Animated.View 
            entering={FadeInDown.duration(800).delay(200).springify()}
            className="items-center mb-4"
          >
           <View className="h-24 mb-6 items-center justify-center shadow-lg shadow-primary-500/20">
            <Image 
                source={require('../../assets/logo/welexo.png')} 
                className="w-56 h-full" 
                resizeMode="contain" 
            />
           </View>
            <Text className="text-slate-500 text-center text-base font-medium tracking-wide max-w-[280px] leading-relaxed">
              Your Gateway to Global Import–Export Insights
            </Text>
          </Animated.View>

          {/* Login Container */}
          <Animated.View 
            entering={FadeInUp.duration(800).delay(400).springify()}
            className="w-full"
          >
            {/* Error Message */}
            {error && (
              <Animated.View 
                entering={FadeInDown.springify()}
                className="bg-red-50/90 border border-red-200 p-4 rounded-xl mb-6 flex-row items-center gap-3 shadow-sm"
              >
                <Ionicons name="alert-circle" size={20} color="#EF4444" />
                <Text className="text-red-600 font-semibold text-sm flex-1">{error}</Text>
              </Animated.View>
            )}

            {/* Main Card */}
            <View className="bg-white/90 backdrop-blur-xl p-6 rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/50">
              <Text className="text-slate-900 text-2xl font-bold mb-8 text-center tracking-tight">
                Welcome Back
              </Text>
              
              <View className="gap-2.5">
                <Animated.View entering={FadeInDown.delay(500).duration(400)}>
                  <Input
                    label="Email Address"
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    icon="mail-outline"
                    className="mb-0"
                  />
                </Animated.View>

                <Animated.View entering={FadeInDown.delay(600).duration(400)}>
                  <Input
                    label="Password"
                    placeholder="••••••••"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    icon="lock-closed-outline"
                    className="mb-0"
                  />
                </Animated.View>

                <Animated.View entering={FadeInDown.delay(700).duration(400)}>
                  <TouchableOpacity 
                    className="self-end py-1"
                    onPress={() => router.push('/(auth)/forgot-password')}
                  >
                    <Text className="text-primary-500 font-semibold text-sm">Forgot Password?</Text>
                  </TouchableOpacity>
                </Animated.View>

                <Animated.View entering={FadeInDown.delay(800).duration(400)} className="pt-2">
                  <Button 
                    title="Sign In" 
                    onPress={handleLogin}
                    isLoading={isLoading}
                  />
                </Animated.View>

                <Animated.View 
                  entering={FadeInDown.delay(900).duration(400)}
                  className="flex-row items-center gap-4 py-4"
                >
                  <View className="flex-1 h-[1px] bg-slate-200" />
                  <Text className="text-slate-400 text-xs font-semibold uppercase tracking-wider">or continue with</Text>
                  <View className="flex-1 h-[1px] bg-slate-200" />
                </Animated.View>

                <Animated.View 
                  entering={FadeInDown.delay(1000).duration(400)}
                  className="flex-row gap-4"
                >
                  <TouchableOpacity 
                    activeOpacity={0.7}
                    onPress={() => handleBiometricLogin('face')}
                    className="flex-1 flex-row items-center justify-center gap-2 bg-slate-50 py-4 rounded-2xl border border-slate-200 shadow-sm"
                  >
                    <View className="w-8 h-8 rounded-full bg-primary-50 items-center justify-center">
                      <Ionicons name="scan-outline" size={18} color="#0176FF" />
                    </View>
                    <Text className="text-slate-600 font-semibold text-sm">Face ID</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    activeOpacity={0.7}
                    onPress={() => handleBiometricLogin('fingerprint')}
                    className="flex-1 flex-row items-center justify-center gap-2 bg-slate-50 py-4 rounded-2xl border border-slate-200 shadow-sm"
                  >
                    <View className="w-8 h-8 rounded-full bg-primary-50 items-center justify-center">
                      <Ionicons name="finger-print" size={18} color="#0176FF" />
                    </View>
                    <Text className="text-slate-600 font-semibold text-sm">Fingerprint</Text>
                  </TouchableOpacity>
                </Animated.View>
              </View>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>

      {faceScanState.type === 'face' ? (
        <FaceScanModal 
            visible={faceScanState.visible} 
            status={faceScanState.status} 
            onDismiss={() => setFaceScanState({ visible: false, status: 'idle', type: 'face' })}
        />
      ) : (
        <FingerprintScanModal
            visible={faceScanState.visible} 
            status={faceScanState.status} 
            onDismiss={() => setFaceScanState({ visible: false, status: 'idle', type: 'fingerprint' })}
        />
      )}
    </View>
  );
};

export default LoginScreen;