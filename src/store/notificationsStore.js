import { createStore } from '@/store/zustandLite';

const NOTIFY_KEY = 'runna_notifications';
const isClient = typeof window !== 'undefined';

const seedNotifications = [
  { id: 'n1', title: 'Order accepted', body: 'Burger Palace accepted your order.', read: false, created_at: new Date(Date.now() - 18 * 60 * 1000).toISOString() },
  { id: 'n2', title: 'Runner assigned', body: 'Chidi Obi is on the way.', read: true, created_at: new Date(Date.now() - 55 * 60 * 1000).toISOString() },
];

function readNotifications() {
  if (!isClient) return seedNotifications;
  try {
    const raw = localStorage.getItem(NOTIFY_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return seedNotifications;
}

function persistNotifications(notifications) {
  if (!isClient) return;
  localStorage.setItem(NOTIFY_KEY, JSON.stringify(notifications));
}

export const useNotificationsStore = createStore((set, get) => ({
  notifications: readNotifications(),
  addNotification: ({ title, body }) => {
    const notifications = [
      {
        id: `n_${Date.now()}`,
        title,
        body,
        read: false,
        created_at: new Date().toISOString(),
      },
      ...get().notifications,
    ];
    persistNotifications(notifications);
    set({ notifications });
  },
  markAsRead: (id) => {
    const notifications = get().notifications.map((item) => (item.id === id ? { ...item, read: true } : item));
    persistNotifications(notifications);
    set({ notifications });
  },
  markAllAsRead: () => {
    const notifications = get().notifications.map((item) => ({ ...item, read: true }));
    persistNotifications(notifications);
    set({ notifications });
  },
  clearNotifications: () => {
    persistNotifications([]);
    set({ notifications: [] });
  },
  unreadCount: () => get().notifications.filter((item) => !item.read).length,
}));

export const notificationsActions = {
  addNotification: (payload) => useNotificationsStore.getState().addNotification(payload),
  markAsRead: (id) => useNotificationsStore.getState().markAsRead(id),
  markAllAsRead: () => useNotificationsStore.getState().markAllAsRead(),
  clearNotifications: () => useNotificationsStore.getState().clearNotifications(),
};

