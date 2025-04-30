import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  UIState,
  ThemeState,
  BioThemeState,
  ModalState,
  NotificationState,
} from "../types/ui";

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
  currentLanguage: "en",
  bioTheme: {
    pageBgColor: "#ffffff",
    linkButtonColor: "#000000",
    linkButtonTextColor: "#ffffff",
    socialIconColor: "#000000",
    bioTextColor: "#000000",
  },
  userSlug: "",
  profileImg: "",
  isModalType: false,
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
    setBioTheme: (state, action: PayloadAction<BioThemeState>) => {
      state.bioTheme = action.payload;
    },
    setUserSlug: (state, action: PayloadAction<string>) => {
      state.userSlug = action.payload;
    },
    setProfileImg: (state, action: PayloadAction<string>) => {
      state.profileImg = action.payload;
    },
    setModalType: (state, action: PayloadAction<boolean>) => {
      state.isModalType = action.payload;
    },
    setCurrentLanguage: (state, action: PayloadAction<string>) => {
      state.currentLanguage = action.payload;
    },
    updateBioThemeProperty: (
      state,
      action: PayloadAction<{ key: keyof BioThemeState; value: string }>
    ) => {
      const { key, value } = action.payload;
      state.bioTheme[key] = value;
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
  setBioTheme,
  setUserSlug,
  setProfileImg,
  setModalType,
  setCurrentLanguage,
  updateBioThemeProperty,
} = uiSlice.actions;

export default uiSlice.reducer;
