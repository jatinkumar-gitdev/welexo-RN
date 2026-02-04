import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import toastConfig from '../src/components/common/Toast';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { AuthProvider, useAuth } from '../src/contexts/AuthContext';

SplashScreen.preventAutoHideAsync();

function RootLayoutInner() {
  const { isAuthenticated, isCheckingAuth } = useAuth();

  useEffect(() => {
    if (!isCheckingAuth) {
      SplashScreen.hideAsync();
    }
  }, [isCheckingAuth]);

  if (isCheckingAuth) {
    // You might want to show a splash screen or loading indicator here
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      {isAuthenticated ? (
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
      ) : (
        <Stack.Screen
          name="(auth)"
          options={{
            headerShown: false,
          }}
        />
      )}
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <RootLayoutInner />
        <Toast config={toastConfig} />
      </AuthProvider>
    </SafeAreaProvider>
  );
}