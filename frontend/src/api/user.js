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

export const fetchAllUsers = createAsyncThunk(
  'auth/allUsers',
  async (_, thunkAPI) => {
    try {
      const response = await Axios.get('/auth/users');
      return response.data;
    } catch (error) {
      const { message } = error.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  'auth/deleteUser',
  async (id, thunkAPI) => {
    try {
      const response = await Axios.delete(`/auth/users/${id}`);
      thunkAPI.dispatch(fetchAllUsers());
      return response.data;
    } catch (error) {
      const { message } = error.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const fetchSingleUser = createAsyncThunk(
  'auth/fetchSingleUser',
  async (id, thunkAPI) => {
    try {
      const response = await Axios.get(`/auth/users/${id}`);
      return response.data;
    } catch (error) {
      const { message } = error.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (user, thunkAPI) => {
    try {
      const response = await Axios.put(`/auth/users/${user._id}`, user);
      return response.data;
    } catch (error) {
      const { message } = error.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
