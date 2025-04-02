import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UIState, ThemeState, ModalState, NotificationState } from "../types";

const initialState: UIState = {
  theme: {
    mode: "light",
    primaryColor: "#007AFF",
    secondaryColor: "#5856D6",
    accentColor: "#FF2D55",
    backgroundColor: "#FFFFFF",
    textColor: "#000000",
    errorColor: "#FF3B30",
    successColor: "#34C759",
    warningColor: "#FF9500",
    infoColor: "#5856D6",
  },
  language: "en",
  modals: {
    isOpen: false,
    type: null,
    data: null,
  },
  notifications: [],
  sidebar: {
    isOpen: true,
    width: 250,
    collapsedWidth: 80,
  },
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Partial<ThemeState>>) => {
      state.theme = { ...state.theme, ...action.payload };
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    openModal: (state, action: PayloadAction<{ type: string; data?: any }>) => {
      state.modals = {
        isOpen: true,
        type: action.payload.type,
        data: action.payload.data,
      };
    },
    closeModal: (state) => {
      state.modals = {
        isOpen: false,
        type: null,
        data: null,
      };
    },
    addNotification: (
      state,
      action: PayloadAction<Omit<NotificationState, "id">>
    ) => {
      const id = Date.now().toString();
      state.notifications.push({
        ...action.payload,
        id,
      });
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    toggleSidebar: (state) => {
      state.sidebar.isOpen = !state.sidebar.isOpen;
    },
    setSidebarWidth: (state, action: PayloadAction<number>) => {
      state.sidebar.width = action.payload;
    },
    setSidebarCollapsedWidth: (state, action: PayloadAction<number>) => {
      state.sidebar.collapsedWidth = action.payload;
    },
  },
});

export const {
  setTheme,
  setLanguage,
  openModal,
  closeModal,
  addNotification,
  removeNotification,
  clearNotifications,
  toggleSidebar,
  setSidebarWidth,
  setSidebarCollapsedWidth,
} = uiSlice.actions;

export default uiSlice.reducer;
