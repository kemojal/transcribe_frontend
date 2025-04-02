import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  FileState,
  File,
  FileFilters,
  FileMetadata,
  PaginationState,
} from "../types";
import { api } from "../api";

const initialState: FileState = {
  files: [],
  currentFile: null,
  isLoading: false,
  error: null,
  uploadProgress: 0,
  filters: {
    search: "",
    format: "all",
    status: "all",
    sortBy: "createdAt",
    sortOrder: "desc",
  },
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
  },
  metadata: {
    totalSize: 0,
    totalDuration: 0,
    formats: {},
  },
};

const fileSlice = createSlice({
  name: "files",
  initialState,
  reducers: {
    setCurrentFile: (state, action: PayloadAction<File | null>) => {
      state.currentFile = action.payload;
    },
    setFilters: (state, action: PayloadAction<Partial<FileFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setPagination: (state, action: PayloadAction<Partial<PaginationState>>) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
    setUploadProgress: (state, action: PayloadAction<number>) => {
      state.uploadProgress = action.payload;
    },
    setMetadata: (state, action: PayloadAction<Partial<FileMetadata>>) => {
      state.metadata = { ...state.metadata, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(api.endpoints.getFiles.matchPending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(api.endpoints.getFiles.matchFulfilled, (state, action) => {
        state.isLoading = false;
        state.files = action.payload;
        state.pagination.total = action.payload.length;

        // Update metadata
        const totalSize = action.payload.reduce(
          (sum, file) => sum + file.size,
          0
        );
        const totalDuration = action.payload.reduce(
          (sum, file) => sum + (file.duration || 0),
          0
        );
        const formats = action.payload.reduce((acc, file) => {
          acc[file.format] = (acc[file.format] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        state.metadata = {
          totalSize,
          totalDuration,
          formats,
        };
      })
      .addMatcher(api.endpoints.getFiles.matchRejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch files";
      })
      .addMatcher(api.endpoints.getFile.matchPending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(api.endpoints.getFile.matchFulfilled, (state, action) => {
        state.isLoading = false;
        state.currentFile = action.payload;
      })
      .addMatcher(api.endpoints.getFile.matchRejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch file";
      })
      .addMatcher(api.endpoints.uploadFile.matchPending, (state) => {
        state.uploadProgress = 0;
      })
      .addMatcher(api.endpoints.uploadFile.matchFulfilled, (state, action) => {
        state.files.push(action.payload);
        state.currentFile = action.payload;
        state.uploadProgress = 100;

        // Update metadata
        state.metadata.totalSize += action.payload.size;
        state.metadata.totalDuration += action.payload.duration || 0;
        state.metadata.formats[action.payload.format] =
          (state.metadata.formats[action.payload.format] || 0) + 1;
      })
      .addMatcher(api.endpoints.deleteFile.matchFulfilled, (state, action) => {
        const fileToDelete = state.files.find(
          (f) => f.id === action.meta.arg.fileId
        );
        if (fileToDelete) {
          state.files = state.files.filter(
            (f) => f.id !== action.meta.arg.fileId
          );
          if (state.currentFile?.id === action.meta.arg.fileId) {
            state.currentFile = null;
          }

          // Update metadata
          state.metadata.totalSize -= fileToDelete.size;
          state.metadata.totalDuration -= fileToDelete.duration || 0;
          state.metadata.formats[fileToDelete.format]--;
          if (state.metadata.formats[fileToDelete.format] === 0) {
            delete state.metadata.formats[fileToDelete.format];
          }
        }
      });
  },
});

export const {
  setCurrentFile,
  setFilters,
  setPagination,
  setUploadProgress,
  setMetadata,
  clearFilters,
  setError,
  setLoading,
} = fileSlice.actions;

export default fileSlice.reducer;
