import { createStore } from '@/store/zustandLite';

const CART_KEY = 'sarunn_cart';
const LOC_KEY = 'sarunn_delivery_loc';
const CART_EVENT = 'sarunn:cart';
const LOC_EVENT = 'sarunn:deliveryloc';
const isClient = typeof window !== 'undefined';

function read(key) {
  if (!isClient) return null;
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch {
    return null;
  }
}

function write(key, value, eventName) {
  if (!isClient) return;
  localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new Event(eventName));
}

function initialCart() {
  return read(CART_KEY) || {};
}

function initialLocation() {
  return read(LOC_KEY);
}

export const useCartStore = createStore((set, get) => ({
  cart: initialCart(),
  deliveryLocation: initialLocation(),
  addToCart: (vendor, item, delta = 1) => {
    const cart = { ...get().cart };
    const group = cart[vendor.id] || {
      vendorId: vendor.id,
      store_name: vendor.store_name,
      delivery_fee: vendor.delivery_fee,
      cover_url: vendor.cover_url,
      items: {},
    };
    const existingQty = group.items[item.id]?.qty || 0;
    const nextQty = existingQty + delta;
    if (nextQty <= 0) {
      delete group.items[item.id];
    } else {
      group.items[item.id] = {
        id: item.id,
        name: item.name,
        price: item.price,
        image_url: item.image_url,
        qty: nextQty,
      };
    }
    if (Object.keys(group.items).length === 0) delete cart[vendor.id];
    else cart[vendor.id] = group;
    write(CART_KEY, cart, CART_EVENT);
    set({ cart });
  },
  setItemQty: (vendorId, itemId, qty) => {
    const cart = { ...get().cart };
    const group = cart[vendorId];
    if (!group) return;
    if (qty <= 0) delete group.items[itemId];
    else if (group.items[itemId]) group.items[itemId].qty = qty;
    if (Object.keys(group.items).length === 0) delete cart[vendorId];
    write(CART_KEY, cart, CART_EVENT);
    set({ cart });
  },
  clearVendorCart: (vendorId) => {
    const cart = { ...get().cart };
    delete cart[vendorId];
    write(CART_KEY, cart, CART_EVENT);
    set({ cart });
  },
  clearCart: () => {
    write(CART_KEY, {}, CART_EVENT);
    set({ cart: {} });
  },
  setDeliveryLocation: (loc) => {
    write(LOC_KEY, loc, LOC_EVENT);
    set({ deliveryLocation: loc });
  },
  clearDeliveryLocation: () => {
    if (!isClient) return;
    localStorage.removeItem(LOC_KEY);
    window.dispatchEvent(new Event(LOC_EVENT));
    set({ deliveryLocation: null });
  },
  hydrateCart: () => set({ cart: initialCart() }),
  hydrateDeliveryLocation: () => set({ deliveryLocation: initialLocation() }),
}));

export const getCart = () => useCartStore.getState().cart;
export const addToCart = (...args) => useCartStore.getState().addToCart(...args);
export const setItemQty = (...args) => useCartStore.getState().setItemQty(...args);
export const clearVendorCart = (...args) => useCartStore.getState().clearVendorCart(...args);
export const clearCart = () => useCartStore.getState().clearCart();
export const getDeliveryLocation = () => useCartStore.getState().deliveryLocation;
export const setDeliveryLocation = (loc) => useCartStore.getState().setDeliveryLocation(loc);
export const clearDeliveryLocation = () => useCartStore.getState().clearDeliveryLocation();
export const getItemQty = (vendorId, itemId) => getCart()[vendorId]?.items?.[itemId]?.qty || 0;

export function cartItemCount(cart = getCart()) {
  return Object.values(cart).reduce(
    (sum, group) => sum + Object.values(group.items).reduce((itemSum, item) => itemSum + item.qty, 0),
    0,
  );
}

export function vendorSubtotal(group) {
  return Object.values(group.items).reduce((sum, item) => sum + item.price * item.qty, 0);
}

export function useCart() {
  return useCartStore((state) => state.cart);
}

export function useDeliveryLocation() {
  return useCartStore((state) => state.deliveryLocation);
}

