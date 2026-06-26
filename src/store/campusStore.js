import { createStore } from '@/store/zustandLite';

const CAMPUS_KEY = 'runna_campus';
const CAMPUS_EVENT = 'runna:campus';
const isClient = typeof window !== 'undefined';

function readCampus() {
  if (!isClient) return null;
  try {
    return JSON.parse(localStorage.getItem(CAMPUS_KEY));
  } catch {
    return null;
  }
}

function writeCampus(campusId) {
  if (!isClient) return;
  localStorage.setItem(CAMPUS_KEY, JSON.stringify(campusId));
  window.dispatchEvent(new Event(CAMPUS_EVENT));
}

export const useCampusStore = createStore((set) => ({
  campusId: readCampus(),
  setCampus: (campusId) => {
    writeCampus(campusId);
    set({ campusId });
  },
  clearCampus: () => {
    writeCampus(null);
    set({ campusId: null });
  },
  hydrateCampus: () => set({ campusId: readCampus() }),
}));

export const getCampus = () => useCampusStore.getState().campusId;
export const setCampus = (campusId) => useCampusStore.getState().setCampus(campusId);
export const clearCampus = () => useCampusStore.getState().clearCampus();

export function useCampus() {
  return useCampusStore((state) => state.campusId);
}

