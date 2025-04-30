import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Custom hooks for specific state slices
export const useProjects = () => useAppSelector((state) => state.projects);
export const useUI = () => useAppSelector((state) => state.ui);

// Derived state hooks
export const useCurrentProject = () =>
  useAppSelector((state) => state.projects.currentProject);
export const useTheme = () => useAppSelector((state) => state.ui.theme);

// Loading and error state hooks
export const useIsLoading = () => {
  const projectsLoading = useAppSelector((state) => state.projects.isLoading);
  return projectsLoading;
};

export const useError = () => {
  const projectsError = useAppSelector((state) => state.projects.error);
  return projectsError;
};

// Modal and notification hooks
export const useModal = () => useAppSelector((state) => state.ui.modals);
export const useNotifications = () =>
  useAppSelector((state) => state.ui.notifications);

// Sidebar state hook
export const useSidebar = () => useAppSelector((state) => state.ui.sidebar);

// Filter and pagination hooks
export const useProjectFilters = () =>
  useAppSelector((state) => state.projects.filters);
export const useProjectPagination = () =>
  useAppSelector((state) => state.projects.pagination);
