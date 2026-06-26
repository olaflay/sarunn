import { useSyncExternalStore } from 'react';

export function createStore(initializer) {
  let state;
  const listeners = new Set();

  const setState = (partial, replace = false) => {
    const nextState = typeof partial === 'function' ? partial(state) : partial;
    const updatedState = replace ? nextState : { ...state, ...nextState };
    if (Object.is(updatedState, state)) return;
    state = updatedState;
    listeners.forEach((listener) => listener());
  };

  const getState = () => state;

  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  const api = { setState, getState, subscribe };
  state = initializer(setState, getState, api);

  function useBoundStore(selector = (current) => current) {
    return useSyncExternalStore(
      subscribe,
      () => selector(state),
      () => selector(state),
    );
  }

  return Object.assign(useBoundStore, api);
}

