// ProjectSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { BASEURL } from "@/constants";
import { ProjectProps } from "@/types/interfaces";

interface ProjectsState {
  projects: ProjectProps[];
  currentProject: ProjectProps | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ProjectsState = {
  projects: [],
  currentProject: null,
  isLoading: false,
  error: null,
};

export const fetchProjects = createAsyncThunk<
  ProjectProps[],
  void,
  { rejectValue: string }
>("projects/fetchProjects", async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get<ProjectProps[]>(`${BASEURL}/projects`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      timeout: 3000,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === "ECONNABORTED") {
        return rejectWithValue("Request timed out");
      }
      return rejectWithValue(error.response?.data || error.message);
    }
    return rejectWithValue("An unknown error occurred");
  }
});

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    addProject: (state, action: PayloadAction<ProjectProps>) => {
      state.projects.push(action.payload);
    },
    updateProject: (state, action: PayloadAction<ProjectProps>) => {
      const index = state.projects.findIndex(
        (project) => project.id === action.payload.id
      );
      if (index !== -1) {
        state.projects[index] = action.payload;
        if (
          state.currentProject &&
          state.currentProject.id === action.payload.id
        ) {
          state.currentProject = action.payload;
        }
      }
    },
    deleteProject: (state, action: PayloadAction<string>) => {
      state.projects = state.projects.filter(
        (project) => project.id !== action.payload
      );
      if (state.currentProject && state.currentProject.id === action.payload) {
        state.currentProject = state.projects[0] || null;
      }
    },
    setCurrentProject: (state, action: PayloadAction<ProjectProps | null>) => {
      state.currentProject = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projects = action.payload;
        state.currentProject = action.payload[0] || null;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Failed to fetch projects";
      });
  },
});

export const { addProject, updateProject, deleteProject, setCurrentProject } =
  projectsSlice.actions;
export const projectReducer = projectsSlice.reducer;
