import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Project, File, User } from "./types";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Projects", "Project", "Files", "File", "User"],
  endpoints: (builder) => ({
    // Auth endpoints
    login: builder.mutation<
      { user: User; token: string; refreshToken: string },
      { email: string; password: string }
    >({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    refreshToken: builder.mutation<
      { token: string; refreshToken: string },
      string
    >({
      query: (refreshToken) => ({
        url: "auth/refresh",
        method: "POST",
        body: { refreshToken },
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
    }),

    // Project endpoints
    getProjects: builder.query<Project[], void>({
      query: () => "projects",
      providesTags: ["Projects"],
    }),
    getProject: builder.query<Project, string>({
      query: (id) => `projects/${id}`,
      providesTags: (result, error, id) => [{ type: "Project", id }],
    }),
    createProject: builder.mutation<Project, Partial<Project>>({
      query: (project) => ({
        url: "projects",
        method: "POST",
        body: project,
      }),
      invalidatesTags: ["Projects"],
    }),
    updateProject: builder.mutation<
      Project,
      { id: string; data: Partial<Project> }
    >({
      query: ({ id, data }) => ({
        url: `projects/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Projects" },
        { type: "Project", id },
      ],
    }),
    deleteProject: builder.mutation<void, string>({
      query: (id) => ({
        url: `projects/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Projects"],
    }),

    // File endpoints
    getFiles: builder.query<File[], string>({
      query: (projectId) => `projects/${projectId}/files`,
      providesTags: ["Files"],
    }),
    getFile: builder.query<File, { projectId: string; fileId: string }>({
      query: ({ projectId, fileId }) => `projects/${projectId}/files/${fileId}`,
      providesTags: (result, error, { fileId }) => [
        { type: "File", id: fileId },
      ],
    }),
    uploadFile: builder.mutation<File, { projectId: string; file: FormData }>({
      query: ({ projectId, file }) => ({
        url: `projects/${projectId}/files/upload`,
        method: "POST",
        body: file,
      }),
      invalidatesTags: ["Files"],
    }),
    deleteFile: builder.mutation<void, { projectId: string; fileId: string }>({
      query: ({ projectId, fileId }) => ({
        url: `projects/${projectId}/files/${fileId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Files"],
    }),

    // User endpoints
    getCurrentUser: builder.query<User, void>({
      query: () => "user/me",
      providesTags: ["User"],
    }),
    updateUser: builder.mutation<User, Partial<User>>({
      query: (userData) => ({
        url: "user/me",
        method: "PATCH",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});
