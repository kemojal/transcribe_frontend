export interface ThemeState {
  mode: "light" | "dark";
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  errorColor: string;
  successColor: string;
  warningColor: string;
  infoColor: string;
}

export interface BioThemeState {
  pageBgColor: string;
  linkButtonColor: string;
  linkButtonTextColor: string;
  socialIconColor: string;
  bioTextColor: string;
}

export interface ModalState {
  isOpen: boolean;
  type: string | null;
  data: any | null;
}

export interface NotificationState {
  id: string;
  type: "error" | "success" | "info" | "warning";
  message: string;
  duration?: number;
}

export interface SidebarState {
  isOpen: boolean;
  width: number;
  collapsedWidth: number;
}

export interface UIState {
  theme: ThemeState;
  language: string;
  modals: ModalState;
  notifications: NotificationState[];
  sidebar: SidebarState;
  currentLanguage: string;
  bioTheme: BioThemeState;
  userSlug: string;
  profileImg: string;
  isModalType: boolean;
}
