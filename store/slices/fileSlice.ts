// @ts-nocheck

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const uploadFile = createAsyncThunk(
  'file/upload',
  async (file: File, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('File upload failed');
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const fileSlice = createSlice({
  name: 'file',
  initialState: {
    fileName: null,
    columns: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.fileName = action.payload.fileName;
        state.columns = action.payload.columns;
        state.error = null;
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default fileSlice.reducer;