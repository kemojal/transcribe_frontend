import { BASEURL } from "@/constants";
import { FileProps } from "@/types/interfaces";
import { fetchFileSize, getAudioDuration } from "@/utils";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface UserFileState {
  files: File[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UserFileState = {
  files: [],
  status: "idle",
  error: null,
};

export const fetchUserFiles = createAsyncThunk(
  "files/fetchUserFiles",
  async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${BASEURL}/user/files`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      timeout: 3000,
    });

    const filesWithDetails = await Promise.all(
      response.data.map(async (file: FileProps) => {
        const [duration, size] = await Promise.all([
          getAudioDuration(file.path),
          fetchFileSize(file.path),
        ]);
        return { ...file, duration, size };
      })
    );
    return filesWithDetails;
  }
);

const userfilesSlice = createSlice({
  name: "files",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserFiles.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchUserFiles.fulfilled,
        (state, action: PayloadAction<File[]>) => {
          state.status = "succeeded";
          state.files = action.payload;
        }
      )
      .addCase(fetchUserFiles.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export const userFilesReducer = userfilesSlice.reducer;
