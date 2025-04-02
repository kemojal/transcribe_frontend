import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SettingsState, TranscriptionSettings } from "../types";

const initialState: SettingsState = {
  transcription: {
    language: "en",
    model: "base",
    punctuate: true,
    diarize: false,
    speakerCount: 1,
    customVocabulary: [],
    customVocabularyBoost: 1.0,
    profanityFilter: true,
    interimResults: true,
    maxAlternatives: 1,
    wordTimestamps: true,
    vadFilter: true,
    vadParameters: {
      speechPadMs: 400,
      threshold: 0.5,
    },
  },
  playback: {
    speed: 1.0,
    volume: 1.0,
    autoPlay: false,
    loop: false,
    showWaveform: true,
    showTimestamps: true,
  },
  editor: {
    fontSize: 14,
    lineHeight: 1.5,
    showLineNumbers: true,
    autoSave: true,
    autoSaveInterval: 30000, // 30 seconds
    tabSize: 2,
    useSpaces: true,
    wordWrap: true,
  },
  shortcuts: {
    playPause: "Space",
    rewind: "ArrowLeft",
    forward: "ArrowRight",
    increaseSpeed: "ArrowUp",
    decreaseSpeed: "ArrowDown",
    increaseVolume: "Shift+ArrowUp",
    decreaseVolume: "Shift+ArrowDown",
    toggleWaveform: "W",
    toggleTimestamps: "T",
    save: "CmdOrCtrl+S",
    undo: "CmdOrCtrl+Z",
    redo: "CmdOrCtrl+Shift+Z",
  },
  notifications: {
    email: true,
    push: true,
    desktop: true,
    transcriptionComplete: true,
    errorOccurred: true,
    updatesAvailable: true,
  },
  privacy: {
    shareAnalytics: true,
    shareCrashReports: true,
    autoUpdate: true,
    telemetry: true,
  },
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setTranscriptionSettings: (
      state,
      action: PayloadAction<Partial<TranscriptionSettings>>
    ) => {
      state.transcription = { ...state.transcription, ...action.payload };
    },
    setPlaybackSettings: (
      state,
      action: PayloadAction<Partial<SettingsState["playback"]>>
    ) => {
      state.playback = { ...state.playback, ...action.payload };
    },
    setEditorSettings: (
      state,
      action: PayloadAction<Partial<SettingsState["editor"]>>
    ) => {
      state.editor = { ...state.editor, ...action.payload };
    },
    setShortcuts: (
      state,
      action: PayloadAction<Partial<SettingsState["shortcuts"]>>
    ) => {
      state.shortcuts = { ...state.shortcuts, ...action.payload };
    },
    setNotificationSettings: (
      state,
      action: PayloadAction<Partial<SettingsState["notifications"]>>
    ) => {
      state.notifications = { ...state.notifications, ...action.payload };
    },
    setPrivacySettings: (
      state,
      action: PayloadAction<Partial<SettingsState["privacy"]>>
    ) => {
      state.privacy = { ...state.privacy, ...action.payload };
    },
    resetSettings: (state) => {
      Object.assign(state, initialState);
    },
    importSettings: (state, action: PayloadAction<Partial<SettingsState>>) => {
      Object.assign(state, action.payload);
    },
  },
});

export const {
  setTranscriptionSettings,
  setPlaybackSettings,
  setEditorSettings,
  setShortcuts,
  setNotificationSettings,
  setPrivacySettings,
  resetSettings,
  importSettings,
} = settingsSlice.actions;

export default settingsSlice.reducer;
