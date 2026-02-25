import React, { createContext, useContext, useEffect, useMemo } from 'react';
import useAuthStore from '../services/authStore';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const {
    isAuthenticated,
    user,
    token,
    isLoading,
    error,
    isCheckingAuth,
    login,
    biometricLogin,
    logout,
    enableBiometric,
    disableBiometric,
    clearError,
    checkAuthStatus,
    updateUser
  } = useAuthStore();

  // Check auth status on app start
  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  // Memoize context value to prevent unnecessary re-renders
  const authValue = useMemo(() => ({
    isAuthenticated,
    user,
    token,
    isLoading,
    error,
    isCheckingAuth,
    login,
    biometricLogin,
    logout,
    enableBiometric,
    disableBiometric,
    clearError,
    updateUser
  }), [
    isAuthenticated,
    user,
    token,
    isLoading,
    error,
    isCheckingAuth,
    login,
    biometricLogin,
    logout,
    enableBiometric,
    disableBiometric,
    clearError,
    updateUser
  ]);

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}