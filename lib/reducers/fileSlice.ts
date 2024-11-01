import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { BASEURL } from "@/constants";
import { getAudioDuration, fetchFileSize } from "@/utils";
import { FileProps, TranscriptionProps } from "@/types/interfaces";

interface FilesState {
  data: FileProps[];
  status: "idle" | "loading" | "succeeded" | "failed";
  addStatus: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
export const fetchFiles = createAsyncThunk(
  "files/fetchFiles",
  async (projectId: string) => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${BASEURL}/projects/${projectId}/files`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const filesWithDetails = await Promise.all(
      response.data.map(async (file: FileData) => {
        const [duration, size] = await Promise.all([
          getAudioDuration(file.path),
          fetchFileSize(file.path),
        ]);
        return { ...file, duration, size };
      })
    );
    // console.log("filesWithDetails = ", filesWithDetails);

    return filesWithDetails;
  }
);

export const getFileById = createAsyncThunk(
  "files/getFileById",
  async ({ projectId, fileId }: { projectId: string; fileId: string }) => {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${BASEURL}/projects/${projectId}/files/${fileId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const file = response.data;
    const [duration, size] = await Promise.all([
      getAudioDuration(file.path),
      fetchFileSize(file.path),
    ]);

    return { ...file, duration, size };
  }
);

export const addFile = createAsyncThunk(
  "files/addFile",
  async ({ projectId, file }: { projectId: string; file: File }) => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    //check if no file name

    formData.append("file", file);
    const response = await axios.post(
      `${BASEURL}/projects/${projectId}/files`,
      formData,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // console.log("resonse XXXD  = ", response.data);
    // Fetch additional details for the new file
    const newFile = response.data;
    const [duration, size] = await Promise.all([
      getAudioDuration(newFile.path),
      fetchFileSize(newFile.path),
    ]);

    return { ...newFile, duration, size };
  }
);

export const deleteFile = createAsyncThunk(
  "files/deleteFile",
  async ({ projectId, fileId }: { projectId: string; fileId: string }) => {
    // console.log("fileId = ", fileId);
    const token = localStorage.getItem("token");
    await axios.delete(`${BASEURL}/projects/${projectId}/files/${fileId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return fileId;
  }
);

export const editFile = createAsyncThunk(
  "files/editFile",
  async ({
    projectId,
    fileId,
    data,
  }: {
    projectId: string;
    fileId: string;
    data: any;
  }) => {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `${BASEURL}/projects/${projectId}/files/${fileId}`,
      data,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  }
);

// export const addTranscription = createAsyncThunk(
//   "files/addTranscription",
//   async ({
//     projectId,
//     file,
//     // transcription,
//   }: {
//     projectId: string;
//     file: FileProps;
//     transcription: Partial<TranscriptionProps>;
//   }) => {
//     const token = localStorage.getItem("token");
//     const response = await axios.post(
//       `${BASEURL}/projects/${projectId}/files/${file?.id}/transcriptions`,
//       // transcription,
//       { headers: { Authorization: `Bearer ${token}` } }
//     );

//     const newTransciption = response.data;

//     return { ...newFile, duration, size };
//     return { fileId, transcription: response.data };
//   }
// );
// export const addTranscription = createAsyncThunk(
//   "files/addTranscription",
//   async ({
//     file,
//   }: // transcription,
//   {
//     // projectId: string;
//     file: FileProps;
//     // transcription: Partial<TranscriptionProps>;
//   }) => {
//     const token = localStorage.getItem("token");
//     const response = await axios.post(
//       `${BASEURL}/projects/${file?.project_id}/files/${file?.id}/transcriptions`,
//       {},
//       // transcription, // Send transcription data in the request body
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     console.log("response transcription = ", response.data);

//     // The new transcription is in the response data
//     const newTranscription = response.data;

//     return {
//       fileId: file.id, // Return file ID to identify where to add the transcription
//       transcription: newTranscription, // Return the new transcription
//     };
//   }
// );

export const addTranscription = createAsyncThunk(
  "files/addTranscription",
  async ({
    projectId,
    file,
    transcription,
  }: {
    projectId: string;
    file: FileProps;
    transcription: Partial<TranscriptionProps>;
  }) => {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${BASEURL}/projects/${projectId}/files/${file?.id}/transcriptions`,
      transcription, // Pass transcription data in the request body
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return { fileId: file.id, transcription: response.data }; // Return fileId and the newly added transcription
  }
);

export const editTranscription = createAsyncThunk(
  "files/editTranscription",
  async ({
    projectId,
    fileId,
    transcriptionId,
    transcription,
  }: {
    projectId: string;
    fileId: string;
    transcriptionId: string;
    transcription: Partial<TranscriptionProps>;
  }) => {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `${BASEURL}/projects/${projectId}/files/${fileId}/transcriptions/${transcriptionId}`,
      transcription,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return { fileId, transcription: response.data };
  }
);

export const deleteTranscription = createAsyncThunk(
  "files/deleteTranscription",
  async ({
    projectId,
    fileId,
    transcriptionId,
  }: {
    projectId: string;
    fileId: string;
    transcriptionId: string;
  }) => {
    const token = localStorage.getItem("token");
    await axios.delete(
      `${BASEURL}/projects/${projectId}/files/${fileId}/transcriptions/${transcriptionId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return { fileId, transcriptionId };
  }
);

const filesSlice = createSlice({
  name: "files",
  initialState: {
    data: [],
    status: "idle",
    addStatus: "idle",
    error: null,
  } as FilesState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFiles.pending, (state) => {
        state.status = "loading";
      })

      .addCase(fetchFiles.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchFiles.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })

      // .addCase(addFile.fulfilled, (state, action) => {
      //   state.data.push(action.payload);
      // })
      .addCase(deleteFile.fulfilled, (state, action) => {
        state.data = state.data.filter((file) => file.id !== action.payload);
      })
      .addCase(editFile.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (file) => file.id === action.payload.id
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(addFile.pending, (state) => {
        state.addStatus = "loading";
      })
      .addCase(addFile.fulfilled, (state, action: PayloadAction<FileProps>) => {
        state.addStatus = "succeeded";
        // console.log("action.payloadXX = ", action.payload);
        state.data.push(action.payload);
        // console.log("state.dataXX = ", state.data);
      })
      .addCase(addFile.rejected, (state, action) => {
        state.addStatus = "failed";
        state.error = action.error.message || null;
      })
      // transcriptions
      .addCase(
        addTranscription.fulfilled,
        (
          state,
          action: PayloadAction<{
            fileId: string | number;
            transcription: TranscriptionProps;
          }>
        ) => {
          const file = state.data.find(
            (file) => file.id === action.payload.fileId
          );
          if (file) {
            file.transcriptions = file.transcriptions || [];
            file.transcriptions.push(action.payload.transcription);
          }
        }
      )

      .addCase(
        editTranscription.fulfilled,
        (
          state,
          action: PayloadAction<{
            fileId: string;
            transcription: TranscriptionProps;
          }>
        ) => {
          const file = state.data.find(
            (file) => file.id === action.payload.fileId
          );
          if (file) {
            const index = file.transcriptions.findIndex(
              (t) => t.id === action.payload.transcription.id
            );
            if (index !== -1) {
              file.transcriptions[index] = action.payload.transcription;
            }
          }
        }
      )
      .addCase(
        deleteTranscription.fulfilled,
        (
          state,
          action: PayloadAction<{ fileId: string; transcriptionId: string }>
        ) => {
          // Find the file by its ID
          const file = state.data.find(
            (file) => file?.id.toString() === action.payload.fileId
          );


          console.log("file transcript to delete = ", file?.transcriptions);

          // Debugging output
          console.log(
            "file transcriptions before deletion = ",
            file?.transcriptions
          );
          console.log(
            "action.payload.transcriptionId = ",
            action.payload.transcriptionId
          );
          console.log("Current fileId = ", action.payload.fileId);

          if (file && file?.transcriptions) {
            const originalLength = file?.transcriptions?.length;

            // Filter out the transcription by matching string IDs
            file.transcriptions = file.transcriptions.filter(
              (t) => t.id.toString() !== action.payload.transcriptionId // Ensure both are strings
            );

            // Logging for debugging
            console.log(
              "Deleted transcription, original length: ",
              originalLength,
              ", new length: ",
              file.transcriptions.length
            );
          }
        }
      );
  },
});

export const fileReducer = filesSlice.reducer;
