import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./useAppState";
import {
  setTranscriptionSettings,
  setPlaybackSettings,
  setEditorSettings,
  setShortcuts,
  setNotificationSettings,
  setPrivacySettings,
  resetSettings,
  importSettings,
} from "../store/slices/settingsSlice";

export const useSettings = () => {
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state) => state.settings);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem("app_settings");
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        dispatch(importSettings(parsedSettings));
      } catch (error) {
        console.error("Failed to load settings:", error);
      }
    }
  }, [dispatch]);

  // Save settings to localStorage on change
  useEffect(() => {
    localStorage.setItem("app_settings", JSON.stringify(settings));
  }, [settings]);

  // Transcription settings
  const updateTranscriptionSettings = useCallback(
    (transcriptionData: Partial<typeof settings.transcription>) => {
      dispatch(setTranscriptionSettings(transcriptionData));
    },
    [dispatch]
  );

  // Playback settings
  const updatePlaybackSettings = useCallback(
    (playbackData: Partial<typeof settings.playback>) => {
      dispatch(setPlaybackSettings(playbackData));
    },
    [dispatch]
  );

  // Editor settings
  const updateEditorSettings = useCallback(
    (editorData: Partial<typeof settings.editor>) => {
      dispatch(setEditorSettings(editorData));
    },
    [dispatch]
  );

  // Shortcuts
  const updateShortcuts = useCallback(
    (shortcutsData: Partial<typeof settings.shortcuts>) => {
      dispatch(setShortcuts(shortcutsData));
    },
    [dispatch]
  );

  // Notification settings
  const updateNotificationSettings = useCallback(
    (notificationData: Partial<typeof settings.notifications>) => {
      dispatch(setNotificationSettings(notificationData));
    },
    [dispatch]
  );

  // Privacy settings
  const updatePrivacySettings = useCallback(
    (privacyData: Partial<typeof settings.privacy>) => {
      dispatch(setPrivacySettings(privacyData));
    },
    [dispatch]
  );

  // Reset all settings to default
  const resetAllSettings = useCallback(() => {
    dispatch(resetSettings());
  }, [dispatch]);

  // Import settings from file
  const importSettingsFromFile = useCallback(
    async (file: File) => {
      try {
        const text = await file.text();
        const parsedSettings = JSON.parse(text);
        dispatch(importSettings(parsedSettings));
        return true;
      } catch (error) {
        console.error("Failed to import settings:", error);
        return false;
      }
    },
    [dispatch]
  );

  // Export settings to file
  const exportSettingsToFile = useCallback(() => {
    const blob = new Blob([JSON.stringify(settings, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "app_settings.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [settings]);

  return {
    settings,
    transcription: settings.transcription,
    playback: settings.playback,
    editor: settings.editor,
    shortcuts: settings.shortcuts,
    notifications: settings.notifications,
    privacy: settings.privacy,
    updateTranscriptionSettings,
    updatePlaybackSettings,
    updateEditorSettings,
    updateShortcuts,
    updateNotificationSettings,
    updatePrivacySettings,
    resetAllSettings,
    importSettingsFromFile,
    exportSettingsToFile,
  };
};
