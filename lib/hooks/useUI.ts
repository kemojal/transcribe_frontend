import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./useAppState";
import {
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
} from "../store/slices/uiSlice";

export const useUI = () => {
  const dispatch = useAppDispatch();
  const ui = useAppSelector((state) => state.ui);

  // Theme management
  const updateTheme = useCallback(
    (themeData: Partial<typeof ui.theme>) => {
      dispatch(setTheme(themeData));
      // Apply theme changes to document
      document.documentElement.style.setProperty(
        "--primary-color",
        themeData.primaryColor
      );
      document.documentElement.style.setProperty(
        "--secondary-color",
        themeData.secondaryColor
      );
      document.documentElement.style.setProperty(
        "--accent-color",
        themeData.accentColor
      );
      document.documentElement.style.setProperty(
        "--background-color",
        themeData.backgroundColor
      );
      document.documentElement.style.setProperty(
        "--text-color",
        themeData.textColor
      );
      document.documentElement.style.setProperty(
        "--error-color",
        themeData.errorColor
      );
      document.documentElement.style.setProperty(
        "--success-color",
        themeData.successColor
      );
      document.documentElement.style.setProperty(
        "--warning-color",
        themeData.warningColor
      );
      document.documentElement.style.setProperty(
        "--info-color",
        themeData.infoColor
      );
    },
    [dispatch]
  );

  // Language management
  const changeLanguage = useCallback(
    (language: string) => {
      dispatch(setLanguage(language));
      // Apply language changes
      document.documentElement.lang = language;
    },
    [dispatch]
  );

  // Modal management
  const showModal = useCallback(
    (type: string, data?: any) => {
      dispatch(openModal({ type, data }));
    },
    [dispatch]
  );

  const hideModal = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);

  // Notification management
  const showNotification = useCallback(
    (notification: Omit<(typeof ui.notifications)[0], "id">) => {
      dispatch(addNotification(notification));
    },
    [dispatch]
  );

  const removeNotificationById = useCallback(
    (id: string) => {
      dispatch(removeNotification(id));
    },
    [dispatch]
  );

  const clearAllNotifications = useCallback(() => {
    dispatch(clearNotifications());
  }, [dispatch]);

  // Sidebar management
  const toggleSidebarVisibility = useCallback(() => {
    dispatch(toggleSidebar());
  }, [dispatch]);

  const updateSidebarWidth = useCallback(
    (width: number) => {
      dispatch(setSidebarWidth(width));
    },
    [dispatch]
  );

  const updateSidebarCollapsedWidth = useCallback(
    (width: number) => {
      dispatch(setSidebarCollapsedWidth(width));
    },
    [dispatch]
  );

  // Auto-remove notifications after timeout
  useEffect(() => {
    const timeouts = ui.notifications.map((notification) => {
      if (notification.duration) {
        return setTimeout(() => {
          dispatch(removeNotification(notification.id));
        }, notification.duration);
      }
      return null;
    });

    return () => {
      timeouts.forEach((timeout) => {
        if (timeout) clearTimeout(timeout);
      });
    };
  }, [dispatch, ui.notifications]);

  // Apply theme on mount
  useEffect(() => {
    updateTheme(ui.theme);
  }, [updateTheme]);

  return {
    theme: ui.theme,
    language: ui.language,
    modals: ui.modals,
    notifications: ui.notifications,
    sidebar: ui.sidebar,
    updateTheme,
    changeLanguage,
    showModal,
    hideModal,
    showNotification,
    removeNotification: removeNotificationById,
    clearNotifications: clearAllNotifications,
    toggleSidebar: toggleSidebarVisibility,
    updateSidebarWidth,
    updateSidebarCollapsedWidth,
  };
};
