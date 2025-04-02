import { Middleware } from "@reduxjs/toolkit";
import { RootState } from "../index";

const PERSIST_KEYS = {
  AUTH: "auth",
  SETTINGS: "settings",
  UI: "ui",
};

export const persistenceMiddleware: Middleware = () => (next) => (action) => {
  const result = next(action);

  // Handle state persistence
  if (action.type.startsWith("auth/")) {
    const state = (window as any).store.getState();
    localStorage.setItem(PERSIST_KEYS.AUTH, JSON.stringify(state.auth));
  }

  if (action.type.startsWith("settings/")) {
    const state = (window as any).store.getState();
    localStorage.setItem(PERSIST_KEYS.SETTINGS, JSON.stringify(state.settings));
  }

  if (action.type.startsWith("ui/")) {
    const state = (window as any).store.getState();
    localStorage.setItem(PERSIST_KEYS.UI, JSON.stringify(state.ui));
  }

  return result;
};

// Function to load persisted state
export const loadPersistedState = (): Partial<RootState> => {
  const persistedState: Partial<RootState> = {};

  try {
    const auth = localStorage.getItem(PERSIST_KEYS.AUTH);
    if (auth) {
      persistedState.auth = JSON.parse(auth);
    }

    const settings = localStorage.getItem(PERSIST_KEYS.SETTINGS);
    if (settings) {
      persistedState.settings = JSON.parse(settings);
    }

    const ui = localStorage.getItem(PERSIST_KEYS.UI);
    if (ui) {
      persistedState.ui = JSON.parse(ui);
    }
  } catch (error) {
    console.error("Error loading persisted state:", error);
  }

  return persistedState;
};

// Function to clear persisted state
export const clearPersistedState = () => {
  Object.values(PERSIST_KEYS).forEach((key) => {
    localStorage.removeItem(key);
  });
};
