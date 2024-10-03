// @ts-nocheck

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const saveMapping = createAsyncThunk(
  'mapping/save',
  async (mapping: Record<string, string>, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/mapping', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mapping),
      });
      if (!response.ok) throw new Error('Failed to save mapping');
      return await response.json();
    } catch (error) {
      // @ts-ignore
      return rejectWithValue(error.message);
    }
  }
);

const mappingSlice = createSlice({
  name: 'mapping',
  initialState: {
    mapping: {},
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(saveMapping.fulfilled, (state, action) => {
        state.mapping = action.payload.mapping;
        state.error = null;
      })
      .addCase(saveMapping.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default mappingSlice.reducer;