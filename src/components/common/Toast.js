import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      onPress={() => props.onPress?.()}
      style={{ 
        borderLeftColor: '#0176FF', 
        backgroundColor: 'rgba(25, 25, 25, 0.95)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        height: 70
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: '700',
        color: '#fff'
      }}
      text2Style={{
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.6)'
      }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      onPress={() => props.onPress?.()}
      style={{ 
        borderLeftColor: '#FF4F4F', 
        backgroundColor: 'rgba(25, 25, 25, 0.95)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        height: 70
      }}
      text1Style={{
        fontSize: 16,
        fontWeight: '700',
        color: '#fff'
      }}
      text2Style={{
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.6)'
      }}
    />
  )
};

export const showToast = {
  success: (text1, text2, onPress) => {
    Toast.show({
      type: 'success',
      text1,
      text2,
      onPress,
      position: 'top',
      visibilityTime: 4000,
    });
  },
  error: (text1, text2, onPress) => {
    Toast.show({
      type: 'error',
      text1,
      text2,
      onPress,
      position: 'top',
      visibilityTime: 4000,
    });
  },
  info: (text1, text2, onPress) => {
    Toast.show({
      type: 'info',
      text1,
      text2,
      onPress,
      position: 'top',
      visibilityTime: 4000,
    });
  }
};

export default toastConfig;
