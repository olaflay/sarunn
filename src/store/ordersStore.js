import { createStore } from '@/store/zustandLite';
import { sarunnApi } from '@/lib/runnaClient';

export const useOrdersStore = createStore((set, get) => ({
  orders: [],
  isLoading: false,
  error: null,
  hydrateOrders: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await sarunnApi.entities.Order.list('-created_date', 50);
      set({ orders: data, isLoading: false });
      return data;
    } catch (error) {
      set({ error, isLoading: false });
      return [];
    }
  },
  ensureOrders: async () => {
    if (get().orders.length) return get().orders;
    return get().hydrateOrders();
  },
  setOrders: (orders) => set({ orders }),
  updateOrderStatus: async (orderId, status) => {
    const updated = await sarunnApi.entities.Order.update(orderId, { status });
    set({
      orders: get().orders.map((order) => (order.id === orderId ? updated : order)),
    });
    return updated;
  },
}));

export const ordersActions = {
  hydrateOrders: () => useOrdersStore.getState().hydrateOrders(),
  ensureOrders: () => useOrdersStore.getState().ensureOrders(),
  setOrders: (orders) => useOrdersStore.getState().setOrders(orders),
  updateOrderStatus: (orderId, status) => useOrdersStore.getState().updateOrderStatus(orderId, status),
};

