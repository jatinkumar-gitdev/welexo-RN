import React, { useState, useEffect } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as LocalAuthentication from 'expo-local-authentication';
import { showToast } from '../components/common/Toast';
import { validateLogin } from '../helpers/validation/auth';
import FaceScanModal from '../components/common/FaceScanModal';
import Container from '../components/common/Container';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import InteractiveBackground from '../components/common/InteractiveBackground';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [faceScanState, setFaceScanState] = useState({ visible: false, status: 'idle' });
  const [supportedBiometrics, setSupportedBiometrics] = useState({
    face: false,
    fingerprint: false,
  });

  const handleLogin = () => {
    setFieldErrors({});
    const { isValid, errors, value } = validateLogin({ email, password });

    if (!isValid) {
      setFieldErrors(errors);
      showToast.error('Validation Error', 'Please check your information');
      return;
    }

    console.log(JSON.stringify(value));
    showToast.success('Login Successful', 'Welcome back to Welexo!');
    
    // Reset fields on success
    setEmail('');
    setPassword('');
    setFieldErrors({});
  };

  useEffect(() => {
    const checkBiometrics = async () => {
      try {
        const hasHardware = await LocalAuthentication.hasHardwareAsync();
        const isEnrolled = await LocalAuthentication.isEnrolledAsync();
        const supportedTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();

        if (hasHardware && isEnrolled) {
          const face = supportedTypes.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION);
          const fingerprint = supportedTypes.includes(LocalAuthentication.AuthenticationType.FINGERPRINT);
          
          setSupportedBiometrics({ face, fingerprint });

          if (face && !fingerprint) {
            setTimeout(() => {
              handleBiometricAuth(true); 
            }, 1000);
          }
        }
      } catch (error) {
        console.log('Biometric check failed:', error);
      }
    };
    
    checkBiometrics();
  }, []);

  const handleBiometricAuth = async (isFace = false) => {
    try {
      if (isFace) {
        setFaceScanState({ visible: true, status: 'scanning' });
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: isFace ? 'Face Scan in Progress' : 'Sign in to Welexo',
        fallbackLabel: 'Use password',
        cancelLabel: 'Cancel',
        disableDeviceFallback: true,
      });

      if (result.success) {
        if (isFace) setFaceScanState(prev => ({ ...prev, status: 'captured' }));
        
        setTimeout(() => {
          if (isFace) setFaceScanState(prev => ({ ...prev, status: 'verified' }));
          
          setTimeout(() => {
            setFaceScanState({ visible: false, status: 'idle' });
            showToast.success('Biometric Login Success', 'Welcome back!');
            setEmail('');
            setPassword('');
            setFieldErrors({});
          }, isFace ? 1500 : 0);
        }, isFace ? 1000 : 0);
      } else {
        if (isFace) setFaceScanState(prev => ({ ...prev, status: 'failed' }));
        
        setTimeout(() => {
          setFaceScanState({ visible: false, status: 'idle' });
          if (result.error !== 'user_cancel') {
            showToast.error('Biometric Failed', 'Authentication unsuccessful');
          }
        }, isFace ? 2000 : 0);
      }
    } catch (error) {
      setFaceScanState({ visible: false, status: 'idle' });
      showToast.error('Biometric Error', 'An unexpected error occurred');
      console.log('Biometric error:', error);
    }
  };

  const handleFaceIDAuth = () => handleBiometricAuth(true); 
  const handleFingerprintAuth = () => handleBiometricAuth(false); 

  return (
    <Container safe={false}>
      <InteractiveBackground />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView 
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 justify-center px-6 pt-20 pb-10">
            {/* Header */}
            <View className="mb-12">
              <Text className="text-white text-5xl font-bold tracking-tight mb-2">
                Welcome
              </Text>
              <Text className="text-gray-200 text-lg">
                Sign in to continue to 
                <Text className="text-white">Welexo</Text>
              </Text>
            </View>

            {/* Login Card */}
            <View className="bg-white/10 border border-white/20 rounded-[32px] p-6 backdrop-blur-md">
              <Input
                label="Email Address"
                placeholder="name@example.com"
                value={email}
                onChangeText={setEmail}
                leftIcon="mail-outline"
                error={!!fieldErrors.email}
                errorMessage={fieldErrors.email}
              />
              <Input
                label="Password"
                placeholder="••••••••"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                leftIcon="lock-closed-outline"
                error={!!fieldErrors.password}
                errorMessage={fieldErrors.password}
              />
              
              <TouchableOpacity activeOpacity={0.6} className="self-end mb-6 mt-1">
                <Text className="text-white tracking-wide font-medium">
                  Forgot Password?
                </Text>
              </TouchableOpacity>

              <View className="flex-row items-center space-x-3 gap-3">
                <View className="flex-1">
                  <Button 
                    title="Sign In" 
                    onPress={handleLogin} 
                    rightIcon="arrow-forward"
                  />
                </View>
                
                {/* Face ID Button - Only if supported */}
                {supportedBiometrics.face && (
                  <TouchableOpacity 
                    activeOpacity={0.7}
                    className="bg-white/10 border border-white/20 h-[60px] w-[60px] rounded-2xl items-center justify-center"
                    onPress={handleFaceIDAuth}
                  >
                    <Ionicons name="scan-outline" size={26} color="white" />
                  </TouchableOpacity>
                )}

                {/* Fingerprint Button - Only if supported */}
                {supportedBiometrics.fingerprint && (
                  <TouchableOpacity 
                    activeOpacity={0.7}
                    className="bg-white/10 border border-white/20 h-[60px] w-[60px] rounded-2xl items-center justify-center"
                    onPress={handleFingerprintAuth}
                  >
                    <Ionicons name="finger-print" size={26} color="white" />
                  </TouchableOpacity>
                )}
              </View>
            </View>

            {/* Footer */}
            <View className="mt-auto items-center pt-10">
              <Text className="text-white tracking-wide text-[13px] text-center px-10">
                By continuing, you agree to our Terms of Service & Privacy Policy
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <FaceScanModal 
        visible={faceScanState.visible} 
        status={faceScanState.status} 
        onDismiss={() => setFaceScanState({ visible: false, status: 'idle' })}
      />
    </Container>
  );
};

export default LoginScreen;
