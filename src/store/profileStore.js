import { createStore } from '@/store/zustandLite';

const PROFILE_KEY = 'sarunn_profile';
const isClient = typeof window !== 'undefined';

const defaultProfile = {
  full_name: 'Demo Customer',
  email: 'demo@sarunn.app',
  phone: '',
  bio: 'Campus-first user on SARUNN.',
  rating: 4.9,
  orders: 23,
  errands: 8,
  reviews: 15,
  savedAddresses: 2,
  paymentMethods: 1,
  notificationEnabled: true,
};

function readProfile() {
  if (!isClient) return defaultProfile;
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (raw) return { ...defaultProfile, ...JSON.parse(raw) };
  } catch {}
  return defaultProfile;
}

function persistProfile(profile) {
  if (!isClient) return;
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export const useProfileStore = createStore((set, get) => ({
  profile: readProfile(),
  syncFromUser: (user) => {
    if (!user) return;
    const profile = {
      ...get().profile,
      full_name: user.full_name || user.email?.split('@')?.[0] || defaultProfile.full_name,
      email: user.email || defaultProfile.email,
      phone: user.phone || '',
    };
    persistProfile(profile);
    set({ profile });
  },
  updateProfile: (patch) => {
    const profile = { ...get().profile, ...patch };
    persistProfile(profile);
    set({ profile });
  },
  hydrateProfile: () => set({ profile: readProfile() }),
}));

export const profileActions = {
  syncFromUser: (user) => useProfileStore.getState().syncFromUser(user),
  updateProfile: (patch) => useProfileStore.getState().updateProfile(patch),
  hydrateProfile: () => useProfileStore.getState().hydrateProfile(),
};

