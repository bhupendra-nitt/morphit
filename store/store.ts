import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import fileReducer from './slices/fileSlice';
import mappingReducer from './slices/mappingSlice';
import databaseReducer from './slices/databaseSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    file: fileReducer,
    mapping: mappingReducer,
    database: databaseReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
