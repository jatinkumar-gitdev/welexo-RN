import React, { createContext, useContext, useEffect } from 'react';
import useAuthStore from '../services/authStore';

const AuthContext = createContext({});

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
  }, []);

  const authValue = {
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
  };

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}