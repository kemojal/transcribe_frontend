// Core Types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  status: "active" | "archived";
}

export interface File {
  id: string;
  name: string;
  path: string;
  size: number;
  duration: number;
  format: string;
  projectId: string;
  createdAt: string;
  updatedAt: string;
  status: "processing" | "completed" | "failed";
}

// State Types
export interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface ProjectState {
  projects: Project[];
  currentProject: Project | null;
  loading: boolean;
  error: string | null;
  filters: ProjectFilters;
  pagination: PaginationState;
}

export interface FileState {
  files: File[];
  currentFile: File | null;
  loading: boolean;
  error: string | null;
  uploadProgress: number;
  filters: FileFilters;
  metadata: Record<string, FileMetadata>;
}

export interface UIState {
  theme: ThemeState;
  language: string;
  modals: ModalState;
  notifications: NotificationState;
  sidebar: {
    isOpen: boolean;
    width: number;
  };
}

export interface SettingsState {
  userPreferences: {
    language: string;
    theme: string;
    notifications: boolean;
  };
  appSettings: {
    audioQuality: string;
    transcriptionSettings: TranscriptionSettings;
  };
}

// Supporting Types
export interface ProjectFilters {
  status: "all" | "active" | "archived";
  dateRange: {
    start: Date;
    end: Date;
  };
  searchQuery: string;
}

export interface FileFilters {
  type: string[];
  dateRange: {
    start: Date;
    end: Date;
  };
  searchQuery: string;
}

export interface PaginationState {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
}

export interface FileMetadata {
  duration: number;
  size: number;
  format: string;
  lastModified: Date;
}

export interface ThemeState {
  mode: "light" | "dark";
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    error: string;
    success: string;
    warning: string;
    info: string;
  };
}

export interface ModalState {
  isOpen: boolean;
  type: string | null;
  data: any;
}

export interface NotificationState {
  notifications: Array<{
    id: string;
    type: "success" | "error" | "warning" | "info";
    message: string;
    duration?: number;
  }>;
}

export interface TranscriptionSettings {
  language: string;
  model: string;
  punctuation: boolean;
  diarization: boolean;
  customVocabulary?: string[];
}

// Root State
export interface RootState {
  auth: AuthState;
  project: ProjectState;
  files: FileState;
  ui: UIState;
  settings: SettingsState;
}
