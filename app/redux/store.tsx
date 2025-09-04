import { configureStore } from '@reduxjs/toolkit';
import ocrUserReducer from './slice/OcrUserSlice';

export const store = configureStore({
  reducer: {
    ocrUser: ocrUserReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
