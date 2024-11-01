import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASEURL } from '@/constants';
import { fetchProjectDetails } from '@/utils/api';

export const fetchProjectDetail = createAsyncThunk(
  'project/fetchProject',
  async (id: string) => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${BASEURL}/projects/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
);

export const updateProjectName = createAsyncThunk(
  'project/updateProjectName',
  async ({ id, name }: { id: string; name: string }) => {
    const token = localStorage.getItem('token');
    const response = await axios.put(
      `${BASEURL}/projects/${id}`,
      { name },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  }
);

const projectSlice = createSlice({
  name: 'project',
  initialState: { data: null, status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjectDetail.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProjectDetail.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchProjectDetail.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateProjectName.fulfilled, (state, action) => {
        state.data = action.payload;
      });
  },
});

export const ProjectDetailReducer = projectSlice.reducer;