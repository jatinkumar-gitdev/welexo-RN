import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as LocalAuthentication from 'expo-local-authentication';
import { authenticateFace } from './FaceBiometric';
import { authenticateFingerprint } from './FingerprintBiometric';

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
          // Simulate API call - in a real app, you'd call your backend here
          await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay
          
          // Mock user data - in a real app, this would come from your API
          const mockUser = {
            id: '1',
            name: credentials.email.split('@')[0],
            email: credentials.email,
            avatar: null,
          };
          
          // Set authentication state
          set({
            isAuthenticated: true,
            user: mockUser,
            token: 'mock-jwt-token-' + Date.now(), // In real app, use actual JWT from API
            isLoading: false,
            error: null,
          });
          
          return { success: true, user: mockUser };
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error.message || 'Login failed. Please try again.' 
          });
          return { success: false, error: error.message || 'Login failed. Please try again.' };
        }
      },
      
      biometricLogin: async (type = 'face') => {
        set({ isLoading: true, error: null });
        
        try {
          // Dynamic import or usage based on type could be here, but we'll import at top level
          let result;
          if (type === 'face') {
             result = await authenticateFace();
          } else {
             result = await authenticateFingerprint();
          }

          if (result.success) {
             // Mock user data for biometric login (In real app, you'd exchange a stored token or key)
            const mockUser = {
              id: '1',
              name: 'John Doe',
              email: 'john.doe@example.com',
              avatar: null,
            };
            
            set({
              isAuthenticated: true,
              user: mockUser,
              token: 'biometric-jwt-token-' + Date.now(),
              biometricEnabled: true,
              isLoading: false,
              error: null,
            });
            
            return { success: true, user: mockUser };
          } else {
             throw new Error(result.error || 'Biometric authentication failed.');
          }
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error.message || 'Biometric authentication failed.' 
          });
          return { success: false, error: error.message };
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
        set({ isCheckingAuth: false });
      },
      
      // Update user profile
      updateUser: (userData) => {
        set((state) => ({
          user: { ...state.user, ...userData },
        }));
      },
    }),
    {
      name: 'auth-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => AsyncStorage), // Use AsyncStorage for persistence
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        token: state.token,
        biometricEnabled: state.biometricEnabled,
      }), // Only persist these fields
    }
  )
);

export default useAuthStore;