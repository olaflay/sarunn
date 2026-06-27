import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuthStore, authActions, profileActions } from '@/store';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoadingAuth = useAuthStore((state) => state.isLoadingAuth);
  const authChecked = useAuthStore((state) => state.authChecked);
  const authError = useAuthStore((state) => state.authError);
  const [appPublicSettings] = useState({ id: 'sarunn-local', public_settings: { standalone: true } });
  const [isLoadingPublicSettings, setIsLoadingPublicSettings] = useState(false);

  useEffect(() => {
    Promise.resolve(authActions.syncFromSession()).then((currentUser) => {
      if (currentUser) {
        profileActions.syncFromUser(currentUser);
      }
    });
  }, []);

  const logout = (shouldRedirect = true) => {
    authActions.logout(shouldRedirect);
  };

  const navigateToLogin = () => {
    window.location.assign('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoadingAuth,
        isLoadingPublicSettings,
        authError,
        appPublicSettings,
        authChecked,
        logout,
        navigateToLogin,
        checkUserAuth: authActions.syncFromSession,
        checkAppState: authActions.syncFromSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
