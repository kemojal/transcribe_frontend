import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./useAppState";
import {
  setTheme,
  setLanguage,
  openModal as openModalAction,
  closeModal as closeModalAction,
  addNotification as addNotificationAction,
  removeNotification as removeNotificationAction,
  clearNotifications as clearNotificationsAction,
  toggleSidebar as toggleSidebarAction,
  setSidebarWidth as setSidebarWidthAction,
  setSidebarCollapsedWidth as setSidebarCollapsedWidthAction,
  setBioTheme as setBioThemeAction,
  setUserSlug as setUserSlugAction,
  setProfileImg as setProfileImgAction,
  setModalType as setModalTypeAction,
  setCurrentLanguage as setCurrentLanguageAction,
  updateBioThemeProperty as updateBioThemePropertyAction,
} from "@/lib/store/slices/uiSlice";
import {
  ThemeState,
  BioThemeState,
  NotificationState,
} from "@/lib/store/types/ui";

export const useUI = () => {
  const dispatch = useAppDispatch();
  const {
    theme,
    language,
    modals,
    notifications,
    sidebar,
    bioTheme,
    userSlug,
    profileImg,
    isModalType,
  } = useAppSelector((state) => state.ui);

  // Theme
  const updateTheme = useCallback(
    (newTheme: Partial<ThemeState>) => {
      dispatch(setTheme(newTheme));
    },
    [dispatch]
  );

  // Language
  const changeLanguage = useCallback(
    (lang: string) => {
      dispatch(setCurrentLanguageAction(lang));
      document.documentElement.lang = lang;
    },
    [dispatch]
  );

  // Bio Theme
  const updateBioTheme = useCallback(
    (theme: BioThemeState) => {
      dispatch(setBioThemeAction(theme));
    },
    [dispatch]
  );

  const updateBioThemeProperty = useCallback(
    (key: keyof BioThemeState, value: string) => {
      dispatch(updateBioThemePropertyAction({ key, value }));
    },
    [dispatch]
  );

  // User Profile
  const updateUserSlug = useCallback(
    (slug: string) => {
      dispatch(setUserSlugAction(slug));
    },
    [dispatch]
  );

  const updateProfileImg = useCallback(
    (img: string) => {
      dispatch(setProfileImgAction(img));
    },
    [dispatch]
  );

  // Modal
  const toggleModalType = useCallback(
    (isModal: boolean) => {
      dispatch(setModalTypeAction(isModal));
    },
    [dispatch]
  );

  // Modal Management
  const openModal = useCallback(
    (type: string, data?: any) => {
      dispatch(openModalAction({ type, data }));
    },
    [dispatch]
  );

  const closeModal = useCallback(() => {
    dispatch(closeModalAction());
  }, [dispatch]);

  // Notification Management
  const showNotification = useCallback(
    (notification: Omit<NotificationState, "id">) => {
      dispatch(addNotificationAction(notification));
      // Auto-remove notification after duration
      if (notification.duration) {
        setTimeout(() => {
          dispatch(removeNotificationAction(notification.id));
        }, notification.duration);
      }
    },
    [dispatch]
  );

  const removeNotification = useCallback(
    (id: string) => {
      dispatch(removeNotificationAction(id));
    },
    [dispatch]
  );

  const clearAllNotifications = useCallback(() => {
    dispatch(clearNotificationsAction());
  }, [dispatch]);

  // Sidebar Management
  const toggleSidebar = useCallback(() => {
    dispatch(toggleSidebarAction());
  }, [dispatch]);

  const updateSidebarWidth = useCallback(
    (width: number) => {
      dispatch(setSidebarWidthAction(width));
    },
    [dispatch]
  );

  const updateSidebarCollapsedWidth = useCallback(
    (width: number) => {
      dispatch(setSidebarCollapsedWidthAction(width));
    },
    [dispatch]
  );

  // Auto-remove notifications
  useEffect(() => {
    notifications.forEach((notification) => {
      if (notification.duration) {
        const timer = setTimeout(() => {
          dispatch(removeNotificationAction(notification.id));
        }, notification.duration);
        return () => clearTimeout(timer);
      }
    });
  }, [notifications, dispatch]);

  // Apply theme on mount
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme.mode === "dark");
  }, [theme.mode]);

  return {
    theme,
    language,
    modals,
    notifications,
    sidebar,
    bioTheme,
    userSlug,
    profileImg,
    isModalType,
    updateTheme,
    changeLanguage,
    updateBioTheme,
    updateBioThemeProperty,
    updateUserSlug,
    updateProfileImg,
    toggleModalType,
    openModal,
    closeModal,
    showNotification,
    removeNotification,
    clearAllNotifications,
    toggleSidebar,
    updateSidebarWidth,
    updateSidebarCollapsedWidth,
  };
};
