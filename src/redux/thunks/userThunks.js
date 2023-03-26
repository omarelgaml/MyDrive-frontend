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

export const uploadFiles = createAsyncThunk(
  'user/uploadFiles',
  async (body, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      let totalSize = 0;

      const { files, userId, totalStorage, usedStorage, folderId } = body;

      const filesToUpload = files;

      for (let i = 0; i < filesToUpload.length; i++) {
        totalSize += filesToUpload[i].size;

        formData.append('uploadImages', filesToUpload[i]);
      }

      const totalSizeMB = (totalSize / (1024 * 1024)).toFixed(2);

      if (totalStorage - usedStorage < totalSizeMB) {
        const needed = (totalSizeMB - (totalStorage - usedStorage)).toFixed(2);
        return rejectWithValue({ message: `You need ${needed} MB extra storage` });
      }

      formData.append('userId', userId);
      formData.append('size', totalSizeMB);
      if (folderId) formData.append('folderId', folderId);

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

// export const addFileToFolder = createAsyncThunk(
//   'user/addFileToFolder',
//   async (body, { rejectWithValue }) => {
//     try {
//       const { files, folderId, totalStorage, usedStorage, userId } = body;

//       let totalSize = 0;

//       const formData = new FormData();

//       const filesToUpload = files;

//       for (let i = 0; i < filesToUpload.length; i++) {
//         formData.append('uploadImages', filesToUpload[i]);

//         totalSize += filesToUpload[i].size;
//       }

//       const totalSizeMB = (totalSize / (1024 * 1024)).toFixed(2);

//       if (totalStorage - usedStorage < totalSizeMB) {
//         const needed = (totalSizeMB - (totalStorage - usedStorage)).toFixed(2);

//         return rejectWithValue({ message: `You need ${needed} MB extra storage` });
//       }

//       formData.append('folderId', folderId);
//       formData.append('userId', userId);

//       formData.append('size', totalSizeMB);

//       const response = await axios.post('/folders/upload-to-folder', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });
//       console.log(response.data);
//       return response.data;
//     } catch (err) {
//       return rejectWithValue({ message: err.response.data.name });
//     }
//   }
// );
