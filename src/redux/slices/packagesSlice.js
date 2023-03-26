import { createSlice } from '@reduxjs/toolkit';
import { getPackages } from '../thunks/packagesThunks';
const initialState = {
  packages: {},
  loading: false
};

export const packagesSlice = createSlice({
  name: 'packages',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPackages.fulfilled, (state, action) => {
      state.packages = action.payload.packages;
      state.loading = false;
    });
    builder.addCase(getPackages.pending, (state) => {
      state.loading = true;
    });
  }
});

export default packagesSlice.reducer;
