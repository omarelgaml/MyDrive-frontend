import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axios';

const initialState = {
  user: {},
  loading: false,
  error: '',
  token: ''
};

export const googleLogin = createAsyncThunk('user/googleLogin', async () => {
  const response = await axios.get();
  return response.data;
  // console.log(response.data.user);
});
export const logout = createAsyncThunk('user/logout', async () => {
  await axios.get('/auth/logout');
  window.location.href = '/login';
});
export const getCurrentUser = createAsyncThunk('user/getCurrentUser', async () => {
  const response = await axios.get('/current-user');
  //console.log('ree  ' + response.data.user.folders);
  return response.data;
});
export const addFolder = createAsyncThunk('user/addFolder', async (name) => {
  const response = await axios.post('/folders/add-folder', { name });
  return response.data;
});

export const usersSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(googleLogin.fulfilled, (state, action) => {
      // Add user to the state array
      state.user = action.payload.user;
      //state.token = action.payload.token;
      state.loading = false;
    });
    // eslint-disable-next-line no-unused-vars
    builder.addCase(googleLogin.pending, (state, _action) => {
      state.loading = true;
    });

    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      // Add user to the state array
      state.user = action.payload.user;
      console.log(action.payload.user);
      //state.token = action.payload.token;
      state.loading = false;
    });
    builder.addCase(addFolder.fulfilled, (state, action) => {
      // Add user to the state array
      console.log(action.payload.user);
      state.user = action.payload.user;
      //state.token = action.payload.token;
      state.loading = false;
    });

    builder.addCase(logout.fulfilled, (state) => {
      state.user = {};
    });
  }
});

export default usersSlice.reducer;
