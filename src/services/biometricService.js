import * as LocalAuthentication from 'expo-local-authentication';

/**
 * Biometric Authentication Service
 * Handles face recognition and fingerprint authentication
 */
class BiometricAuthService {
  /**
   * Checks if the device has hardware support for biometric authentication
   */
  static async hasHardwareSupport() {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      return hasHardware;
    } catch (error) {
      console.error('Error checking hardware support:', error);
      return false;
    }
  }

  /**
   * Checks if biometric authentication is enrolled on the device
   */
  static async isBiometricEnrolled() {
    try {
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      return isEnrolled;
    } catch (error) {
      console.error('Error checking biometric enrollment:', error);
      return false;
    }
  }

  /**
   * Gets the supported authentication types on the device
   */
  static async getSupportedAuthenticationTypes() {
    try {
      const supportedTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();
      const result = {
        face: supportedTypes.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION),
        fingerprint: supportedTypes.includes(LocalAuthentication.AuthenticationType.FINGERPRINT),
        iris: supportedTypes.includes(LocalAuthentication.AuthenticationType.IRIS),
      };
      return result;
    } catch (error) {
      console.error('Error getting supported authentication types:', error);
      return { face: false, fingerprint: false, iris: false };
    }
  }

  /**
   * Checks if biometric authentication is available (hardware + enrollment)
   */
  static async isBiometricAvailable() {
    try {
      const hasHardware = await this.hasHardwareSupport();
      const isEnrolled = await this.isBiometricEnrolled();
      
      return hasHardware && isEnrolled;
    } catch (error) {
      console.error('Error checking biometric availability:', error);
      return false;
    }
  }

  /**
   * Performs face recognition authentication
   */
  static async authenticateWithFace(promptMessage = 'Authenticate with Face ID') {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage,
        fallbackLabel: 'Use password instead',
        cancelLabel: 'Cancel',
        disableDeviceFallback: false,
        biometryType: LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION,
      });

      return {
        success: result.success,
        error: result.error,
        authenticated: result.success,
        details: result
      };
    } catch (error) {
      console.error('Face recognition error:', error);
      return {
        success: false,
        error: error.message || 'Face recognition failed',
        authenticated: false,
        details: null
      };
    }
  }

  /**
   * Performs fingerprint authentication
   */
  static async authenticateWithFingerprint(promptMessage = 'Authenticate with Fingerprint') {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage,
        fallbackLabel: 'Use password instead',
        cancelLabel: 'Cancel',
        disableDeviceFallback: false,
        biometryType: LocalAuthentication.AuthenticationType.FINGERPRINT,
      });

      return {
        success: result.success,
        error: result.error,
        authenticated: result.success,
        details: result
      };
    } catch (error) {
      console.error('Fingerprint authentication error:', error);
      return {
        success: false,
        error: error.message || 'Fingerprint authentication failed',
        authenticated: false,
        details: null
      };
    }
  }

  /**
   * Performs biometric authentication (will try face first, then fingerprint if available)
   */
  static async authenticateBiometrically(options = {}) {
    const {
      promptMessage = 'Authenticate to continue',
      useFace = true,
      useFingerprint = true,
      allowManualRetry = true
    } = options;

    try {
      // Get supported biometric types
      const supportedTypes = await this.getSupportedAuthenticationTypes();

      // Prioritize face recognition if available and requested
      if (useFace && supportedTypes.face) {
        return await this.authenticateWithFace(promptMessage);
      }
      
      // Fall back to fingerprint if available and requested
      if (useFingerprint && supportedTypes.fingerprint) {
        return await this.authenticateWithFingerprint(promptMessage);
      }

      // If neither type is available or requested, return error
      return {
        success: false,
        error: 'No supported biometric authentication method available',
        authenticated: false,
        details: null
      };

    } catch (error) {
      console.error('Biometric authentication error:', error);
      return {
        success: false,
        error: error.message || 'Biometric authentication failed',
        authenticated: false,
        details: null
      };
    }
  }

  /**
   * Gets biometric credentials state for UI purposes
   */
  static async getBiometricCredentialsState() {
    try {
      const hasHardware = await this.hasHardwareSupport();
      const isEnrolled = await this.isBiometricEnrolled();
      const supportedTypes = await this.getSupportedAuthenticationTypes();

      return {
        hasHardware,
        isEnrolled,
        isAvailable: hasHardware && isEnrolled,
        supportedTypes,
        canUseFace: hasHardware && isEnrolled && supportedTypes.face,
        canUseFingerprint: hasHardware && isEnrolled && supportedTypes.fingerprint,
      };
    } catch (error) {
      console.error('Error getting biometric credentials state:', error);
      return {
        hasHardware: false,
        isEnrolled: false,
        isAvailable: false,
        supportedTypes: { face: false, fingerprint: false, iris: false },
        canUseFace: false,
        canUseFingerprint: false,
      };
    }
  }

  /**
   * Requests permission for biometric authentication (iOS)
   */
  static async requestBiometricPermission() {
    try {
      // On iOS, permission is requested automatically when authenticateAsync is called
      // On Android, permissions are handled via manifest
      // This function serves as a wrapper to maintain consistent API
      const credentialsState = await this.getBiometricCredentialsState();
      return credentialsState;
    } catch (error) {
      console.error('Error requesting biometric permission:', error);
      return {
        hasHardware: false,
        isEnrolled: false,
        isAvailable: false,
        supportedTypes: { face: false, fingerprint: false, iris: false },
        canUseFace: false,
        canUseFingerprint: false,
      };
    }
  }
}

export default BiometricAuthService;