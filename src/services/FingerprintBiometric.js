
import * as LocalAuthentication from 'expo-local-authentication';

export const authenticateFingerprint = async () => {
    try {
        // 1. Check for hardware
        const hasHardware = await LocalAuthentication.hasHardwareAsync();
        if (!hasHardware) {
            return { success: false, error: 'Biometric hardware not available' };
        }

        // 2. Check for enrollment
        const isEnrolled = await LocalAuthentication.isEnrolledAsync();
        if (!isEnrolled) {
            return { success: false, error: 'No biometrics enrolled' };
        }

        // 3. Check specific support for Fingerprint
        const supportedTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();
        if (!supportedTypes.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) {
            return { success: false, error: 'Fingerprint scanner is not supported on this device' };
        }

        // 4. Authenticate
        const result = await LocalAuthentication.authenticateAsync({
            promptMessage: 'Verify with Fingerprint',
            cancelLabel: 'Cancel',
            disableDeviceFallback: false,
        });

        if (result.success) {
            return { success: true };
        } else {
            return { success: false, error: result.error === 'user_cancel' ? 'Cancelled' : 'Authentication failed' };
        }
    } catch (error) {
        return { success: false, error: error.message };
    }
};
