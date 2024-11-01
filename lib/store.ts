import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/authSlice";
import { projectReducer } from "./reducers/ProjectSlice";
import { fileReducer } from "./reducers/fileSlice";
import { ProjectDetailReducer } from "./reducers/projectDetailSlice";
import { userFilesReducer } from "./reducers/userFilesSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      project: projectReducer,
      projectDetail: ProjectDetailReducer,
      files: fileReducer,
      userFiles: userFilesReducer,
    },

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
