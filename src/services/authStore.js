import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authenticateFace } from './FaceBiometric';
import { authenticateFingerprint } from './FingerprintBiometric';

// Mock user data - centralized for consistency
const MOCK_USER = {
  id: '1',
  name: 'Alex Morgan',
  email: 'alex.morgan@welexo.com',
  avatar: null,
};

const useAuthStore = create(
  persist(
    (set, get) => ({
      // Authentication state
      isAuthenticated: false,
      user: null,
      token: null,
      biometricEnabled: false,
      
      // Loading states
      isLoading: false,
      isCheckingAuth: true,
      
      // Errors
      error: null,
      
      // Actions
      login: async (credentials) => {
        set({ isLoading: true, error: null });
        
        try {
          // Validate credentials
          if (!credentials?.email || !credentials?.password) {
            throw new Error('Email and password are required');
          }

          // Simulate API call - in a real app, you'd call your backend here
          await new Promise(resolve => setTimeout(resolve, 800));
          
          // Mock user data - use email to personalize
          const mockUser = {
            ...MOCK_USER,
            name: credentials.email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            email: credentials.email,
          };
          
          // Set authentication state
          set({
            isAuthenticated: true,
            user: mockUser,
            token: 'mock-jwt-token-' + Date.now(),
            isLoading: false,
            error: null,
          });
          
          return { success: true, user: mockUser };
        } catch (error) {
          const errorMessage = error.message || 'Login failed. Please try again.';
          set({ 
            isLoading: false, 
            error: errorMessage,
            isAuthenticated: false,
            user: null,
            token: null,
          });
          return { success: false, error: errorMessage };
        }
      },
      
      biometricLogin: async (type = 'face') => {
        set({ isLoading: true, error: null });
        
        try {
          // Authenticate based on type
          let result;
          if (type === 'face') {
            result = await authenticateFace();
          } else if (type === 'fingerprint') {
            result = await authenticateFingerprint();
          } else {
            throw new Error('Invalid biometric type');
          }

          if (result.success) {
            // Use consistent mock user data
            set({
              isAuthenticated: true,
              user: MOCK_USER,
              token: 'biometric-jwt-token-' + Date.now(),
              biometricEnabled: true,
              isLoading: false,
              error: null,
            });
            
            return { success: true, user: MOCK_USER };
          } else {
            throw new Error(result.error || 'Biometric authentication failed');
          }
        } catch (error) {
          const errorMessage = error.message || 'Biometric authentication failed';
          set({ 
            isLoading: false, 
            error: errorMessage,
            isAuthenticated: false,
            user: null,
            token: null,
          });
          return { success: false, error: errorMessage };
        }
      },
      
      logout: async () => {
        set({
          isAuthenticated: false,
          user: null,
          token: null,
          biometricEnabled: false,
          isLoading: false,
          error: null,
        });
      },
      
      enableBiometric: () => {
        set({ biometricEnabled: true });
      },
      
      disableBiometric: () => {
        set({ biometricEnabled: false });
      },
      
      clearError: () => {
        set({ error: null });
      },
      
      // Check authentication status
      checkAuthStatus: async () => {
        // This will be called on app startup to restore auth state
        // In a real app, you'd validate the stored token here
        const state = get();
        
        // If we have a token but no user, clear the auth state
        if (state.token && !state.user) {
          set({
            isAuthenticated: false,
            token: null,
            isCheckingAuth: false,
          });
        } else {
          set({ isCheckingAuth: false });
        }
      },
      
      // Update user profile
      updateUser: (userData) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        }));
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        token: state.token,
        biometricEnabled: state.biometricEnabled,
      }),
    }
  )
);

export default useAuthStore;