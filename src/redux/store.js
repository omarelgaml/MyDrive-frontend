import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import packagesSlice from './slices/packagesSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    packages: packagesSlice
  }
});
