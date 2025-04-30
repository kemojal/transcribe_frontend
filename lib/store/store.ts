import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "./api";
import uiReducer from "./slices/uiSlice";
import projectReducer from "./slices/projectSlice";
import authReducer from "./slices/authSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const uiPersistConfig = {
  key: "ui",
  storage,
  whitelist: [
    "theme",
    "language",
    "bioTheme",
    "userSlug",
    "profileImg",
    "sidebar",
  ],
};

const projectPersistConfig = {
  key: "projects",
  storage,
  whitelist: ["currentProject", "filters", "pagination"],
};

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "token", "refreshToken", "isAuthenticated"],
};

export const makeStore = () => {
  const store = configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
      ui: persistReducer(uiPersistConfig, uiReducer),
      projects: persistReducer(projectPersistConfig, projectReducer),
      auth: persistReducer(authPersistConfig, authReducer),
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ["persist/PERSIST"],
        },
      }).concat(api.middleware),
  });

  setupListeners(store.dispatch);

  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const store = makeStore();
export const persistor = persistStore(store);
