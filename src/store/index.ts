import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';

import servicesReducer from './slices/servicesSlices';

// load persisted data from localStorage
function loadState() {
  try {
    const serialized = localStorage.getItem('auth');
    if (serialized === null) return undefined;
    return { auth: JSON.parse(serialized) };
  } catch {
    return undefined;
  }
}

// save auth data to localStorage
function saveState(state: RootState) {
  try {
    const serialized = JSON.stringify(state.auth);
    localStorage.setItem('auth', serialized);
  } catch {
    console.error('Failed to save auth state to localStorage');
  }
}

export const store = configureStore({
  reducer: {
    auth: authReducer,
    services: servicesReducer,
  },
  preloadedState: loadState(),
});

store.subscribe(() => {
  saveState(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
