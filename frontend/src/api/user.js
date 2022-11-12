import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'axios';

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const response = await Axios.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      const { message } = error.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const response = await Axios.post('/auth/register', credentials);
      return response.data;
    } catch (error) {
      const { message } = error.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    const response = await Axios.get('/auth/logout');
    return response.data.message;
  } catch (error) {
    const { message } = error.response.data;
    return thunkAPI.rejectWithValue(message);
  }
});

export const auth = createAsyncThunk('auth/auth', async (_, thunkAPI) => {
  try {
    const response = await Axios.post('/auth/auth');
    return response.data;
  } catch (error) {
    const { message } = error.response.data;
    return thunkAPI.rejectWithValue(message);
  }
});
