import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import { errorMiddleware } from "./middleware/errorMiddleware";
import { persistenceMiddleware } from "./middleware/persistenceMiddleware";
import { analyticsMiddleware } from "./middleware/analyticsMiddleware";
import authReducer from "./slices/authSlice";
import projectReducer from "./slices/projectSlice";
import fileReducer from "./slices/fileSlice";
import uiReducer from "./slices/uiSlice";
import settingsReducer from "./slices/settingsSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    projects: projectReducer,
    files: fileReducer,
    ui: uiReducer,
    settings: settingsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat([
      api.middleware,
      errorMiddleware,
      persistenceMiddleware,
      analyticsMiddleware,
    ]),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
