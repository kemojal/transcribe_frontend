import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Custom hooks for specific state slices
export const useAuth = () => useAppSelector((state) => state.auth);
export const useProjects = () => useAppSelector((state) => state.projects);
export const useFiles = () => useAppSelector((state) => state.files);
export const useUI = () => useAppSelector((state) => state.ui);
export const useSettings = () => useAppSelector((state) => state.settings);

// Derived state hooks
export const useCurrentProject = () =>
  useAppSelector((state) => state.projects.currentProject);
export const useCurrentFile = () =>
  useAppSelector((state) => state.files.currentFile);
export const useTheme = () => useAppSelector((state) => state.ui.theme);
export const useTranscriptionSettings = () =>
  useAppSelector((state) => state.settings.transcription);
export const usePlaybackSettings = () =>
  useAppSelector((state) => state.settings.playback);
export const useEditorSettings = () =>
  useAppSelector((state) => state.settings.editor);
export const useShortcuts = () =>
  useAppSelector((state) => state.settings.shortcuts);
export const useNotificationSettings = () =>
  useAppSelector((state) => state.settings.notifications);
export const usePrivacySettings = () =>
  useAppSelector((state) => state.settings.privacy);

// Loading and error state hooks
export const useIsLoading = () => {
  const authLoading = useAppSelector((state) => state.auth.isLoading);
  const projectsLoading = useAppSelector((state) => state.projects.isLoading);
  const filesLoading = useAppSelector((state) => state.files.isLoading);
  return authLoading || projectsLoading || filesLoading;
};

export const useError = () => {
  const authError = useAppSelector((state) => state.auth.error);
  const projectsError = useAppSelector((state) => state.projects.error);
  const filesError = useAppSelector((state) => state.files.error);
  return authError || projectsError || filesError;
};

// Modal and notification hooks
export const useModal = () => useAppSelector((state) => state.ui.modals);
export const useNotifications = () =>
  useAppSelector((state) => state.ui.notifications);

// Sidebar state hook
export const useSidebar = () => useAppSelector((state) => state.ui.sidebar);

// File metadata hooks
export const useFileMetadata = () =>
  useAppSelector((state) => state.files.metadata);
export const useUploadProgress = () =>
  useAppSelector((state) => state.files.uploadProgress);

// Filter and pagination hooks
export const useProjectFilters = () =>
  useAppSelector((state) => state.projects.filters);
export const useFileFilters = () =>
  useAppSelector((state) => state.files.filters);
export const useProjectPagination = () =>
  useAppSelector((state) => state.projects.pagination);
export const useFilePagination = () =>
  useAppSelector((state) => state.files.pagination);
