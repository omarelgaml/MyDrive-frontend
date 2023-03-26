import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const getPackages = createAsyncThunk('packages/getPackages', async () => {
  const response = await axios.get('/packages');
  return response.data;
});
