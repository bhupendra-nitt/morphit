import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const saveDbConfig = createAsyncThunk(
  'database/saveConfig',
  async (config: any, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/database', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });
      if (!response.ok) throw new Error('Failed to save database configuration');
      return await response.json();
    } catch (error) {
      // @ts-ignore
      return rejectWithValue(error.message);
    }
  }
);

const databaseSlice = createSlice({
  name: 'database',
  initialState: {
    config: null,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(saveDbConfig.fulfilled, (state, action) => {
        state.config = action.payload.config;
        state.error = null;
      })
      .addCase(saveDbConfig.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default databaseSlice.reducer;