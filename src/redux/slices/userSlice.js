import { createSlice } from '@reduxjs/toolkit';
import { getCurrentUser, addFolderToUser, logout, uploadFiles } from '../thunks/userThunks';
import { message } from 'antd';
const initialState = {
  user: {},
  loading: false
};

export const usersSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCurrentUser.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.loading = false;
    });
    ///////
    builder.addCase(addFolderToUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addFolderToUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.loading = false;
      message.success(action.payload.message);
    });
    builder.addCase(addFolderToUser.rejected, (state, action) => {
      state.loading = false;
      message.error(action.payload.message);
    });
    ////////

    builder.addCase(uploadFiles.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(uploadFiles.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.loading = false;
      message.success(action.payload.message);
    });
    builder.addCase(uploadFiles.rejected, (state, action) => {
      // state.user = action.payload.user;
      state.loading = false;
      message.error(action.payload.message);
    });

    //////////////
    builder.addCase(logout.fulfilled, (state) => {
      state.user = {};
    });
  }
});

export default usersSlice.reducer;
