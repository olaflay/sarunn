import { useEffect, useState } from 'react';

const isClient = typeof window !== 'undefined';

const CART_KEY = 'sarunn_cart';
const CAMPUS_KEY = 'sarunn_campus';
const LOC_KEY = 'sarunn_delivery_loc';
const CART_EVENT = 'sarunn:cart';
const CAMPUS_EVENT = 'sarunn:campus';
const LOC_EVENT = 'sarunn:deliveryloc';

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

function dispatch(eventName) {
  if (!isClient) return;
  window.dispatchEvent(new Event(eventName));
}

export function getCampus() {
  return read(CAMPUS_KEY);
}

export function setCampus(id) {
  const current = getCampus();
  if (current && current !== id) {
    clearCart();
    clearDeliveryLocation();
  }
  write(CAMPUS_KEY, id, CAMPUS_EVENT);
}

export function useCampus() {
  const [campus, setCampusState] = useState(getCampus());
  useEffect(() => {
    const handle = () => setCampusState(getCampus());
    window.addEventListener(CAMPUS_EVENT, handle);
    return () => window.removeEventListener(CAMPUS_EVENT, handle);
  }, []);
  return campus;
}

export function getCart() {
  return read(CART_KEY) || {};
}

function saveCart(cart) {
  write(CART_KEY, cart, CART_EVENT);
}

export function addToCart(vendor, item, delta = 1) {
  const cart = getCart();
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
  saveCart(cart);
}

export function setItemQty(vendorId, itemId, qty) {
  const cart = getCart();
  const group = cart[vendorId];
  if (!group) return;
  if (qty <= 0) delete group.items[itemId];
  else if (group.items[itemId]) group.items[itemId].qty = qty;
  if (Object.keys(group.items).length === 0) delete cart[vendorId];
  saveCart(cart);
}

export function clearVendorCart(vendorId) {
  const cart = getCart();
  delete cart[vendorId];
  saveCart(cart);
}

export function clearCart() {
  saveCart({});
}

export function getDeliveryLocation() {
  return read(LOC_KEY);
}

export function setDeliveryLocation(loc) {
  write(LOC_KEY, loc, LOC_EVENT);
}

export function clearDeliveryLocation() {
  if (!isClient) return;
  localStorage.removeItem(LOC_KEY);
  dispatch(LOC_EVENT);
}

export function useDeliveryLocation() {
  const [location, setLocation] = useState(getDeliveryLocation());
  useEffect(() => {
    const handle = () => setLocation(getDeliveryLocation());
    window.addEventListener(LOC_EVENT, handle);
    return () => window.removeEventListener(LOC_EVENT, handle);
  }, []);
  return location;
}

export function getItemQty(vendorId, itemId) {
  return getCart()[vendorId]?.items?.[itemId]?.qty || 0;
}

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
  const [cart, setCartState] = useState(getCart());
  useEffect(() => {
    const handle = () => setCartState(getCart());
    window.addEventListener(CART_EVENT, handle);
    return () => window.removeEventListener(CART_EVENT, handle);
  }, []);
  return cart;
}

