import { createStore } from '@/store/zustandLite';
import { CURRENT_RUNNER_ID, mockAvailableRuns, mockRunnerProfile } from '@/lib/scaffoldData';

const RUNS_KEY = 'sarunn_runner_runs';
const RUNNER_KEY = 'sarunn_runner_profile';
const isClient = typeof window !== 'undefined';

function readJson(key, fallback) {
  if (!isClient) return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);
  } catch {}
  return fallback;
}

function persist(key, value) {
  if (!isClient) return;
  localStorage.setItem(key, JSON.stringify(value));
}

function initialRuns() {
  const fallback = {
    runs: mockAvailableRuns,
    history: [],
    events: [
      { id: 'evt-1', text: 'New run posted for University of Lagos', type: 'new', time: 'Just now' },
      { id: 'evt-2', text: 'Runner claim synced for Run #1002', type: 'claimed', time: '2 min ago' },
    ],
    earnings: {
      total: mockRunnerProfile.earnings_total,
      today: 12400,
      week: mockRunnerProfile.earnings_week,
      month: mockRunnerProfile.earnings_month,
    },
    syncTick: 0,
  };

  return readJson(RUNS_KEY, fallback);
}

const persistedRuns = initialRuns();

function persistState(state) {
  persist(RUNS_KEY, {
    runs: state.runs,
    history: state.history,
    events: state.events,
    earnings: state.earnings,
    syncTick: state.syncTick,
  });
}

function appendTimeline(run, label) {
  return {
    ...run,
    timeline: [
      ...(run.timeline || []),
      { label, at: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
    ],
  };
}

export const useRunStore = createStore((set, get) => ({
  currentRunnerId: CURRENT_RUNNER_ID,
  runnerProfile: readJson(RUNNER_KEY, mockRunnerProfile),
  runs: persistedRuns.runs,
  history: persistedRuns.history,
  events: persistedRuns.events,
  earnings: persistedRuns.earnings,
  syncTick: persistedRuns.syncTick,
  hydrate: () => {
    const state = initialRuns();
    set({
      runs: state.runs,
      history: state.history,
      events: state.events,
      earnings: state.earnings,
      syncTick: state.syncTick,
      runnerProfile: readJson(RUNNER_KEY, mockRunnerProfile),
    });
  },
  claimRun: (runId, runnerId = CURRENT_RUNNER_ID) => {
    const run = get().runs.find((item) => item.id === runId);
    if (!run || run.status !== 'open') return;

    const updatedRuns = get().runs.map((item) => (
      item.id === runId
        ? appendTimeline({ ...item, claimed_by: runnerId, status: 'claimed' }, 'Claimed by runner')
        : item
    ));
    const events = [
      { id: `evt-${Date.now()}`, text: `Run ${run.title} claimed`, type: 'claimed', time: 'Just now' },
      ...get().events.slice(0, 5),
    ];
    set({ runs: updatedRuns, events });
    persistState({ ...get(), runs: updatedRuns, events });
  },
  startRun: (runId) => {
    const updatedRuns = get().runs.map((item) => (
      item.id === runId
        ? appendTimeline({ ...item, status: 'in_progress' }, 'Runner started the trip')
        : item
    ));
    const events = [
      { id: `evt-${Date.now()}`, text: `Run ${runId} marked as started`, type: 'progress', time: 'Just now' },
      ...get().events.slice(0, 5),
    ];
    set({ runs: updatedRuns, events });
    persistState({ ...get(), runs: updatedRuns, events });
  },
  markPickedUp: (runId) => {
    const updatedRuns = get().runs.map((item) => (
      item.id === runId
        ? appendTimeline({ ...item, status: 'picked_up' }, 'Package picked up')
        : item
    ));
    const events = [
      { id: `evt-${Date.now()}`, text: `Pickup confirmed for ${runId}`, type: 'progress', time: 'Just now' },
      ...get().events.slice(0, 5),
    ];
    set({ runs: updatedRuns, events });
    persistState({ ...get(), runs: updatedRuns, events });
  },
  completeRun: (runId) => {
    const completedRun = get().runs.find((item) => item.id === runId);
    if (!completedRun) return;

    const completedAt = new Date().toISOString();
    const updatedRun = appendTimeline({
      ...completedRun,
      status: 'completed',
      completed_at: completedAt,
    }, 'Run completed');

    const remainingRuns = get().runs.filter((item) => item.id !== runId);
    const history = [updatedRun, ...get().history];
    const earnings = {
      ...get().earnings,
      total: get().earnings.total + completedRun.delivery_fee,
      today: get().earnings.today + completedRun.delivery_fee,
      week: get().earnings.week + completedRun.delivery_fee,
      month: get().earnings.month + completedRun.delivery_fee,
    };
    const events = [
      { id: `evt-${Date.now()}`, text: `Run ${completedRun.title} completed, notifications sent, and earnings synced`, type: 'completed', time: 'Just now' },
      ...get().events.slice(0, 5),
    ];
    set({ runs: remainingRuns, history, earnings, events });
    persistState({ ...get(), runs: remainingRuns, history, earnings, events });
  },
  simulateLiveUpdate: () => {
    const tick = get().syncTick + 1;
    const activeRuns = get().runs;
    const runs = activeRuns.length === 0
      ? activeRuns
      : activeRuns.map((item, index) => {
        if (item.status === 'open' && tick % 4 === 0 && index === tick % activeRuns.length) {
          return appendTimeline({ ...item, status: 'claimed', claimed_by: null }, 'Updated from live feed');
        }
        if (item.status === 'claimed' && tick % 3 === 0 && item.claimed_by === CURRENT_RUNNER_ID) {
          return appendTimeline({ ...item, status: 'in_progress' }, 'Live sync in progress');
        }
        return item;
      });

    const eventPool = [
      { text: 'New run posted in active zone', type: 'new' },
      { text: 'One claimed run updated from live feed', type: 'claimed' },
      { text: 'Cancellation sync received from vendor', type: 'cancelled' },
      { text: 'Completed run synced to history', type: 'completed' },
    ];
    const event = eventPool[tick % eventPool.length];
    const events = [
      { id: `evt-${Date.now()}`, text: event.text, type: event.type, time: 'Just now' },
      ...get().events.slice(0, 5),
    ];
    set({ runs, events, syncTick: tick });
    persistState({ ...get(), runs, events, syncTick: tick });
  },
  syncRunnerProfile: (patch) => {
    const runnerProfile = { ...get().runnerProfile, ...patch };
    set({ runnerProfile });
    persist(RUNNER_KEY, runnerProfile);
  },
}));

export const runActions = {
  hydrate: () => useRunStore.getState().hydrate(),
  claimRun: (runId, runnerId) => useRunStore.getState().claimRun(runId, runnerId),
  startRun: (runId) => useRunStore.getState().startRun(runId),
  markPickedUp: (runId) => useRunStore.getState().markPickedUp(runId),
  completeRun: (runId) => useRunStore.getState().completeRun(runId),
  simulateLiveUpdate: () => useRunStore.getState().simulateLiveUpdate(),
  syncRunnerProfile: (patch) => useRunStore.getState().syncRunnerProfile(patch),
};
