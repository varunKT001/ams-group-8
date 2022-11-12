import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'axios';

export const fetchTodayAttendance = createAsyncThunk(
  'attendance/todayAttendance',
  async (_, thunkAPI) => {
    try {
      const response = await Axios.get('/attendance/today');
      return response.data;
    } catch (error) {
      const { message } = error.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const fetchMonthlyAttendance = createAsyncThunk(
  'attendance/monthlyAttendance',
  async (_, thunkAPI) => {
    try {
      const month = thunkAPI.getState().attendance.monthNumber;
      const response = await Axios.get(`/attendance/monthly/${month}`);
      return response.data;
    } catch (error) {
      const { message } = error.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const fetchSingleUserMonthlyAttendance = createAsyncThunk(
  'attendance/singleUserMonthlyAttendance',
  async (userId, thunkAPI) => {
    try {
      const month = thunkAPI.getState().attendance.monthNumber;
      const response = await Axios.get(`/attendance/user/${userId}/${month}`);
      return response.data;
    } catch (error) {
      const { message } = error.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
