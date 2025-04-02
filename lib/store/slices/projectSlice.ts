import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ProjectState,
  Project,
  ProjectFilters,
  PaginationState,
} from "../types";
import { api } from "../api";

const initialState: ProjectState = {
  projects: [],
  currentProject: null,
  isLoading: false,
  error: null,
  filters: {
    search: "",
    status: "all",
    sortBy: "createdAt",
    sortOrder: "desc",
  },
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
  },
};

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setCurrentProject: (state, action: PayloadAction<Project | null>) => {
      state.currentProject = action.payload;
    },
    setFilters: (state, action: PayloadAction<Partial<ProjectFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setPagination: (state, action: PayloadAction<Partial<PaginationState>>) => {
      state.pagination = { ...state.pagination, ...action.payload };
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
      .addMatcher(api.endpoints.getProjects.matchPending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(api.endpoints.getProjects.matchFulfilled, (state, action) => {
        state.isLoading = false;
        state.projects = action.payload;
        state.pagination.total = action.payload.length;
      })
      .addMatcher(api.endpoints.getProjects.matchRejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch projects";
      })
      .addMatcher(api.endpoints.getProject.matchPending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(api.endpoints.getProject.matchFulfilled, (state, action) => {
        state.isLoading = false;
        state.currentProject = action.payload;
      })
      .addMatcher(api.endpoints.getProject.matchRejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch project";
      })
      .addMatcher(
        api.endpoints.createProject.matchFulfilled,
        (state, action) => {
          state.projects.push(action.payload);
          state.currentProject = action.payload;
        }
      )
      .addMatcher(
        api.endpoints.updateProject.matchFulfilled,
        (state, action) => {
          const index = state.projects.findIndex(
            (p) => p.id === action.payload.id
          );
          if (index !== -1) {
            state.projects[index] = action.payload;
          }
          if (state.currentProject?.id === action.payload.id) {
            state.currentProject = action.payload;
          }
        }
      )
      .addMatcher(
        api.endpoints.deleteProject.matchFulfilled,
        (state, action) => {
          state.projects = state.projects.filter(
            (p) => p.id !== action.meta.arg
          );
          if (state.currentProject?.id === action.meta.arg) {
            state.currentProject = null;
          }
        }
      );
  },
});

export const {
  setCurrentProject,
  setFilters,
  setPagination,
  clearFilters,
  setError,
  setLoading,
} = projectSlice.actions;

export default projectSlice.reducer;
