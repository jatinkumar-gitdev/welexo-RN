import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import LoginScreen from './src/screens/LoginScreen';
import toastConfig from './src/components/common/Toast';

export default function App() {
  return (
    <SafeAreaProvider>
      <LoginScreen />
      <Toast config={toastConfig} />
    </SafeAreaProvider>
  );
}

