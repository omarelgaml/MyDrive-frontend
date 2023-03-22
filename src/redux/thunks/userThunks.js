import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const logout = createAsyncThunk('user/logout', async () => {
  await axios.get('/auth/logout');
  window.location.href = '/login';
});

export const getCurrentUser = createAsyncThunk('user/getCurrentUser', async () => {
  const response = await axios.get('/current-user');
  return response.data;
});

export const addFolderToUser = createAsyncThunk(
  'user/addFolderToUser',
  async (name, { rejectWithValue }) => {
    try {
      const response = await axios.post('/folders/add-folder', { name });
      return response.data;
    } catch (err) {
      return rejectWithValue({ message: err.response.data.name });
    }
  }
);

export const addFileToUser = createAsyncThunk(
  'user/addFileToUser',
  async (body, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      const { files, userId } = body;
      const filesToUpload = files;
      for (let i = 0; i < filesToUpload.length; i++) {
        formData.append('uploadImages', filesToUpload[i]);
      }
      formData.append('userId', userId);
      const response = await axios.post('/folders/add-file-to-user', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (err) {
      return rejectWithValue({ message: err.response.data.name });
    }
  }
);

export const getFolder = createAsyncThunk('user/getFolder', async (body) => {
  const response = await axios.post('/folders/get-by-id', body);

  return response.data;
});
