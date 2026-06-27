import { clearCart, clearDeliveryLocation } from '@/services/storageService';
import { getMenu, getLocationLabel, VENDORS } from '@/services/catalogService';

const STATE_KEY = 'sarunn_runtime_state_v1';
const SESSION_KEY = 'sarunn_session_token';
const DEMO_PASSWORD = 'demo1234';

const now = () => new Date().toISOString();
const randomId = () => (globalThis.crypto?.randomUUID ? globalThis.crypto.randomUUID() : `id_${Math.random().toString(36).slice(2, 11)}`);

const demoUsers = [
  {
    id: 'user_customer',
    email: 'customer@sarunn.app',
    password: DEMO_PASSWORD,
    role: 'customer',
    full_name: 'Adaeze Okafor',
    phone: '+234 800 000 0001',
    campus_id: 'lasu-epe',
    verified: true,
  },
  {
    id: 'user_vendor',
    email: 'vendor@sarunn.app',
    password: DEMO_PASSWORD,
    role: 'vendor',
    full_name: 'Burger Palace',
    phone: '+234 800 000 0002',
    campus_id: 'lasu-epe',
    verified: true,
  },
  {
    id: 'user_runner',
    email: 'runner@sarunn.app',
    password: DEMO_PASSWORD,
    role: 'runner',
    full_name: 'Chidi Obi',
    phone: '+234 800 000 0003',
    campus_id: 'lasu-epe',
    verified: true,
  },
  {
    id: 'user_admin',
    email: 'admin@sarunn.app',
    password: DEMO_PASSWORD,
    role: 'admin',
    full_name: 'Sarunn Admin',
    phone: '+234 800 000 0004',
    campus_id: 'lasu-epe',
    verified: true,
  },
];

const demoOrders = [
  {
    id: 'ord_1001',
    customer_id: 'demo_customer',
    customer_name: 'Adaeze Okafor',
    vendor_id: 'demo_vendor',
    vendor_name: 'Burger Palace',
    runner_name: null,
    status: 'pending',
    total: 11400,
    subtotal: 10400,
    delivery_fee: 1000,
    delivery_address: 'LASU Epe Main Campus, Library',
    estimated_delivery_min: 30,
    payment_method: 'card',
    payment_status: 'paid',
    notes: 'No onions',
    created_date: new Date(Date.now() - 18 * 60 * 1000).toISOString(),
    items: [
      { item_id: 'm2-1', name: 'Classic Beef Burger', price: 3200, quantity: 2 },
      { item_id: 'm2-4', name: 'Chapman', price: 1200, quantity: 1 },
    ],
  },
  {
    id: 'ord_1002',
    customer_id: 'demo_customer',
    customer_name: 'Adaeze Okafor',
    vendor_id: 'demo_vendor',
    vendor_name: 'Burger Palace',
    runner_name: 'Chidi Obi',
    status: 'confirmed',
    total: 8200,
    subtotal: 7400,
    delivery_fee: 800,
    delivery_address: 'LASU Epe Main Campus, Female Hostel',
    estimated_delivery_min: 25,
    payment_method: 'transfer',
    payment_status: 'paid',
    created_date: new Date(Date.now() - 55 * 60 * 1000).toISOString(),
    items: [
      { item_id: 'm2-2', name: 'Crispy Chicken Burger', price: 3500, quantity: 2 },
    ],
  },
];

const demoErrands = [
  {
    id: 'err_1001',
    customer_id: 'demo_customer',
    customer_name: 'Adaeze Okafor',
    title: 'Send package - Lab notes',
    description: 'Urgent delivery to the annex area',
    pickup_location: 'School Campus > Library',
    dropoff_location: 'LASUED Epe > Main Gate',
    budget: 1200,
    status: 'open',
    category: 'delivery',
    created_date: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
  },
];

function loadState() {
  if (typeof window === 'undefined') {
    return {
      users: demoUsers,
      sessions: {},
      otp: {},
      resets: {},
      orders: demoOrders,
      errands: demoErrands,
    };
  }

  try {
    const raw = window.localStorage.getItem(STATE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        users: parsed.users?.length ? parsed.users : demoUsers,
        sessions: parsed.sessions || {},
        otp: parsed.otp || {},
        resets: parsed.resets || {},
        orders: parsed.orders?.length ? parsed.orders : demoOrders,
        errands: parsed.errands?.length ? parsed.errands : demoErrands,
      };
    }
  } catch {}

  return {
    users: demoUsers,
    sessions: {},
    otp: {},
    resets: {},
    orders: demoOrders,
    errands: demoErrands,
  };
}

let state = loadState();

function persistState() {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STATE_KEY, JSON.stringify(state));
}

function getSessionToken() {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(SESSION_KEY);
}

function setSessionToken(token) {
  if (typeof window === 'undefined') return;
  if (!token) {
    window.localStorage.removeItem(SESSION_KEY);
    return;
  }
  window.localStorage.setItem(SESSION_KEY, token);
}

function currentUserFromSession() {
  const token = getSessionToken();
  if (!token) return null;
  const userId = state.sessions?.[token];
  if (!userId) return null;
  return state.users.find((user) => user.id === userId) || null;
}

function ensureStateShape() {
  if (!state.sessions) state.sessions = {};
  if (!state.users) state.users = [...demoUsers];
  if (!state.otp) state.otp = {};
  if (!state.resets) state.resets = {};
  if (!state.orders) state.orders = [...demoOrders];
  if (!state.errands) state.errands = [...demoErrands];
}

function saveAndReturn(value) {
  ensureStateShape();
  persistState();
  return value;
}

function updateRecord(collection, id, patch) {
  const list = state[collection];
  const idx = list.findIndex((item) => item.id === id);
  if (idx === -1) throw new Error('Record not found');
  list[idx] = { ...list[idx], ...patch, updated_date: now() };
  return list[idx];
}

function compareByCreatedDate(sort) {
  const desc = typeof sort === 'string' && sort.startsWith('-');
  return (a, b) => {
    const av = new Date(a.created_date || a.updated_date || 0).getTime();
    const bv = new Date(b.created_date || b.updated_date || 0).getTime();
    return desc ? bv - av : av - bv;
  };
}

function filterRecords(records, query = {}) {
  const entries = Object.entries(query || {});
  if (!entries.length) return [...records];
  return records.filter((record) =>
    entries.every(([key, value]) => {
      if (value === undefined || value === null || value === '') return true;
      return String(record[key]) === String(value);
    }),
  );
}

function listRecords(records, sort, limit) {
  const sorted = [...records].sort(compareByCreatedDate(sort));
  return typeof limit === 'number' ? sorted.slice(0, limit) : sorted;
}

function seedUserSession(user) {
  ensureStateShape();
  const token = `sarunn_${randomId()}`;
  state.sessions[token] = user.id;
  setSessionToken(token);
  persistState();
  return { ...user };
}

function upsertPassword(user, password) {
  user.password = password;
  user.verified = true;
}

function makeUserPublic(user) {
  if (!user) return null;
  const { password, ...publicUser } = user;
  return publicUser;
}

function authenticate(email, password) {
  const user = state.users.find((item) => item.email.toLowerCase() === String(email).toLowerCase());
  if (!user || user.password !== password) {
    throw new Error('Invalid email or password');
  }
  if (!user.verified) {
    throw new Error('Please verify your email first');
  }
  return seedUserSession(user);
}

function createOrder(data) {
  const order = {
    id: `ord_${randomId().slice(0, 8)}`,
    status: 'pending',
    created_date: now(),
    updated_date: now(),
    ...data,
  };
  state.orders.unshift(order);
  return saveAndReturn({ ...order });
}

function createErrand(data) {
  const errand = {
    id: `err_${randomId().slice(0, 8)}`,
    created_date: now(),
    updated_date: now(),
    ...data,
  };
  state.errands.unshift(errand);
  return saveAndReturn({ ...errand });
}

function buildDefaultProfileForRole(role) {
  if (role === 'vendor') return { full_name: 'New Vendor', campus_id: 'lasu-epe' };
  if (role === 'runner') return { full_name: 'New Runner', campus_id: 'lasu-epe' };
  if (role === 'admin') return { full_name: 'Sarunn Admin', campus_id: 'lasu-epe' };
  return { full_name: 'New Customer', campus_id: 'lasu-epe' };
}

export const sarunnApi = {
  auth: {
    me: async () => {
      const user = currentUserFromSession();
      if (!user) throw new Error('Unauthenticated');
      return makeUserPublic(user);
    },
    loginViaEmailPassword: async (email, password) => authenticate(email, password),
    register: async ({ email, password, role = 'customer', full_name }) => {
      const normalizedEmail = String(email || '').trim().toLowerCase();
      if (!normalizedEmail) throw new Error('Email is required');
      if (state.users.some((user) => user.email.toLowerCase() === normalizedEmail)) {
        throw new Error('An account already exists for that email');
      }
      const otpCode = '123456';
      const profile = buildDefaultProfileForRole(role);
      const user = {
        id: `user_${randomId().slice(0, 8)}`,
        email: normalizedEmail,
        password,
        role,
        full_name: full_name || profile.full_name,
        phone: '',
        campus_id: profile.campus_id,
        verified: false,
        created_date: now(),
      };
      state.users.unshift(user);
      state.otp[normalizedEmail] = otpCode;
      persistState();
      return { email: normalizedEmail, otpCode };
    },
    verifyOtp: async ({ email, otpCode }) => {
      const normalizedEmail = String(email || '').trim().toLowerCase();
      const user = state.users.find((item) => item.email.toLowerCase() === normalizedEmail);
      if (!user) throw new Error('No account found');
      if (state.otp[normalizedEmail] !== String(otpCode)) {
        throw new Error('Invalid verification code');
      }
      delete state.otp[normalizedEmail];
      user.verified = true;
      const sessionUser = seedUserSession(user);
      persistState();
      return { access_token: getSessionToken(), user: sessionUser };
    },
    resendOtp: async (email) => {
      const normalizedEmail = String(email || '').trim().toLowerCase();
      if (!state.users.some((item) => item.email.toLowerCase() === normalizedEmail)) {
        throw new Error('No account found');
      }
      state.otp[normalizedEmail] = '123456';
      persistState();
      return { ok: true };
    },
    resetPasswordRequest: async (email) => {
      const normalizedEmail = String(email || '').trim().toLowerCase();
      const user = state.users.find((item) => item.email.toLowerCase() === normalizedEmail);
      if (!user) return { ok: true };
      const token = `reset_${randomId().slice(0, 10)}`;
      state.resets[token] = normalizedEmail;
      persistState();
      return { ok: true, resetToken: token };
    },
    resetPassword: async ({ resetToken, newPassword }) => {
      const email = state.resets[resetToken];
      if (!email) throw new Error('Invalid reset token');
      const user = state.users.find((item) => item.email.toLowerCase() === email);
      if (!user) throw new Error('No account found');
      upsertPassword(user, newPassword);
      delete state.resets[resetToken];
      persistState();
      return { ok: true };
    },
    loginWithProvider: async (redirect = '/') => {
      const demo = state.users.find((item) => item.role === 'customer') || state.users[0];
      seedUserSession(demo);
      if (typeof window !== 'undefined') {
        const homeByRole = {
          admin: '/admin/dashboard',
          vendor: '/vendor/orders',
          runner: '/runner/home',
          customer: '/customer/home',
        };
        window.location.assign(redirect || homeByRole[demo.role] || '/customer/home');
      }
      return makeUserPublic(demo);
    },
    setToken: (token) => {
      if (typeof window === 'undefined') return;
      const userId = state.sessions?.[token];
      if (userId) {
        setSessionToken(token);
      }
    },
    logout: (redirect) => {
      const token = getSessionToken();
      if (token && state.sessions) delete state.sessions[token];
      setSessionToken(null);
      clearCart();
      clearDeliveryLocation();
      persistState();
      if (typeof window !== 'undefined' && redirect) {
        window.location.assign('/login');
      }
    },
    redirectToLogin: () => {
      if (typeof window !== 'undefined') window.location.assign('/login');
    },
  },
  entities: {
    Order: {
      list: async (sort = '-created_date', limit) => listRecords(state.orders, sort, limit),
      filter: async (query = {}, sort = '-created_date', limit) => listRecords(filterRecords(state.orders, query), sort, limit),
      create: async (data) => createOrder(data),
      update: async (id, patch) => {
        const updated = updateRecord('orders', id, patch);
        persistState();
        return { ...updated };
      },
    },
    ErrandRequest: {
      list: async (sort = '-created_date', limit) => listRecords(state.errands, sort, limit),
      filter: async (query = {}, sort = '-created_date', limit) => listRecords(filterRecords(state.errands, query), sort, limit),
      create: async (data) => createErrand(data),
      update: async (id, patch) => {
        const updated = updateRecord('errands', id, patch);
        persistState();
        return { ...updated };
      },
    },
  },
};

export function getCurrentSessionUser() {
  return makeUserPublic(currentUserFromSession());
}

export function signInWithDemoRole(role = 'customer') {
  const user = state.users.find((item) => item.role === role) || state.users[0];
  return seedUserSession(user);
}

export function getAvailableDemoAccounts() {
  return demoUsers.map(makeUserPublic);
}

export function getVendorOptions() {
  return VENDORS.map((vendor) => ({
    ...vendor,
    menu_count: getMenu(vendor.id).length,
    campus_label: vendor.campus,
    location_label: getLocationLabel(vendor.campus, 'school-campus', null),
  }));
}
