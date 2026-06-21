// RUNNA — lightweight client store for selected campus + cart (localStorage + pub/sub)
import { useState, useEffect } from 'react';

const CART_KEY = 'runna_cart';
const CAMPUS_KEY = 'runna_campus';
const CART_EVENT = 'runna:cart';
const CAMPUS_EVENT = 'runna:campus';

function read(key) {
  try { return JSON.parse(localStorage.getItem(key)); } catch { return null; }
}
function write(key, val, evt) {
  localStorage.setItem(key, JSON.stringify(val));
  window.dispatchEvent(new Event(evt));
}

/* ---------------- Campus ---------------- */
export function getCampus() { return read(CAMPUS_KEY); }
export function setCampus(id) {
  const current = getCampus();
  if (current && current !== id) clearCart(); // edge case A: clear cart on campus switch
  write(CAMPUS_KEY, id, CAMPUS_EVENT);
}

export function useCampus() {
  const [campus, setC] = useState(getCampus());
  useEffect(() => {
    const h = () => setC(getCampus());
    window.addEventListener(CAMPUS_EVENT, h);
    return () => window.removeEventListener(CAMPUS_EVENT, h);
  }, []);
  return campus;
}

/* ---------------- Cart ----------------
   Shape: { [vendorId]: { vendorId, store_name, delivery_fee, cover_url, items: { [itemId]: {id,name,price,image_url,qty} } } }
*/
export function getCart() { return read(CART_KEY) || {}; }
function saveCart(cart) { write(CART_KEY, cart, CART_EVENT); }

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
      id: item.id, name: item.name, price: item.price, image_url: item.image_url, qty: nextQty,
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

export function clearCart() { saveCart({}); }

export function getItemQty(vendorId, itemId) {
  return getCart()[vendorId]?.items?.[itemId]?.qty || 0;
}

export function cartItemCount(cart = getCart()) {
  return Object.values(cart).reduce(
    (sum, g) => sum + Object.values(g.items).reduce((s, i) => s + i.qty, 0), 0,
  );
}

export function vendorSubtotal(group) {
  return Object.values(group.items).reduce((s, i) => s + i.price * i.qty, 0);
}

export function useCart() {
  const [cart, setCart] = useState(getCart());
  useEffect(() => {
    const h = () => setCart(getCart());
    window.addEventListener(CART_EVENT, h);
    return () => window.removeEventListener(CART_EVENT, h);
  }, []);
  return cart;
}