import { createStore } from '@/store/zustandLite';
import { sarunnApi, getCurrentSessionUser } from '@/lib/runnaClient';
import { profileActions } from '@/store/profileStore';

const authDefaults = {
  user: null,
  isAuthenticated: false,
  isLoadingAuth: true,
  authChecked: false,
  authError: null,
};

export const useAuthStore = createStore((set, get) => ({
  ...authDefaults,
  bootstrap: async () => {
    set({ isLoadingAuth: true });
    try {
      const currentUser = await sarunnApi.auth.me();
      set({
        user: currentUser,
        isAuthenticated: true,
        authError: null,
        isLoadingAuth: false,
        authChecked: true,
      });
      profileActions.syncFromUser(currentUser);
      return currentUser;
    } catch {
      set({
        user: null,
        isAuthenticated: false,
        isLoadingAuth: false,
        authChecked: true,
      });
      return null;
    }
  },
  syncFromSession: () => {
    const currentUser = getCurrentSessionUser();
    if (currentUser) {
      set({
        user: currentUser,
        isAuthenticated: true,
        isLoadingAuth: false,
        authChecked: true,
        authError: null,
      });
      profileActions.syncFromUser(currentUser);
      return currentUser;
    }
    return get().bootstrap();
  },
  login: async (email, password) => {
    const user = await sarunnApi.auth.loginViaEmailPassword(email, password);
    set({
      user,
      isAuthenticated: true,
      authError: null,
      isLoadingAuth: false,
      authChecked: true,
    });
    profileActions.syncFromUser(user);
    return user;
  },
  register: async (payload) => sarunnApi.auth.register(payload),
  verifyOtp: async (payload) => {
    const result = await sarunnApi.auth.verifyOtp(payload);
    set({
      user: result.user,
      isAuthenticated: true,
      authError: null,
      isLoadingAuth: false,
      authChecked: true,
    });
    profileActions.syncFromUser(result.user);
    return result;
  },
  resendOtp: async (email) => sarunnApi.auth.resendOtp(email),
  requestPasswordReset: async (email) => sarunnApi.auth.resetPasswordRequest(email),
  resetPassword: async (payload) => sarunnApi.auth.resetPassword(payload),
  loginWithProvider: async (redirect = '/customer/home') => sarunnApi.auth.loginWithProvider(redirect),
  logout: (shouldRedirect = true) => {
    sarunnApi.auth.logout(shouldRedirect ? '/login' : undefined);
    set({ ...authDefaults, isLoadingAuth: false, authChecked: true });
  },
  setAuthError: (authError) => set({ authError }),
}));

export const authActions = {
  bootstrap: () => useAuthStore.getState().bootstrap(),
  syncFromSession: () => useAuthStore.getState().syncFromSession(),
  login: (email, password) => useAuthStore.getState().login(email, password),
  register: (payload) => useAuthStore.getState().register(payload),
  verifyOtp: (payload) => useAuthStore.getState().verifyOtp(payload),
  resendOtp: (email) => useAuthStore.getState().resendOtp(email),
  requestPasswordReset: (email) => useAuthStore.getState().requestPasswordReset(email),
  resetPassword: (payload) => useAuthStore.getState().resetPassword(payload),
  loginWithProvider: (redirect) => useAuthStore.getState().loginWithProvider(redirect),
  logout: (shouldRedirect) => useAuthStore.getState().logout(shouldRedirect),
  setAuthError: (message) => useAuthStore.getState().setAuthError(message),
};
